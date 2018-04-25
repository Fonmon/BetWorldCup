from django.contrib.auth.models import User
from django.db import IntegrityError,transaction, connection
from ..models import *
from ..serializers import *
from .team import *

def validateSignup(personalInfo):
    userQs = User.objects.filter(username = personalInfo['username'])
    if userQs.count() > 0:
        return (False,'Nombre de usuario ya registrado')
    authCodeQs = RegistrationCode.objects.filter(auth_code = personalInfo['authCode'],used=False)
    if authCodeQs.count() != 1:
        return (False,'Código de registro inválido')
    return (True,'')

def signup(signupData):
    state, message = validateSignup(signupData['step_1'])
    if not state:
        return (state, message)
    with transaction.atomic():
        try:
            user = User.objects.create_user(
                first_name=signupData['step_1']['names'],
                last_name=signupData['step_1']['lastNames'],
                username=signupData['step_1']['username'],
                email=signupData['step_1']['username'],
                password=signupData['step_1']['password']
            )
        except IntegrityError:
            return (False, 'Nombre de usuario ya registrado')
        authCode = RegistrationCode.objects.get(auth_code = signupData['step_1']['authCode'])
        authCode.used = True
        authCode.user = user
        authCode.save()

        addQualifiedTeams(user.id,2,signupData['step_2'])
        addQualifiedTeams(user.id,3,signupData['step_3'])
        addQualifiedTeams(user.id,4,signupData['step_4'])
        addQualifiedPodium(user.id, signupData['step_5'])
    return (True,'')

def getInfo(user_id):
    user = User.objects.get(id = user_id)
    return {
        'is_staff':user.is_staff,
        'username':user.username
    }

def getPoints(user_id):
    matchPoints = 0
    teamPoints = 0
    with connection.cursor() as cursor:
        cursor.execute('''SELECT SUM(points) AS points
                        FROM api_matchresult
                        WHERE user_id = %s
                        GROUP BY user_id''',[user_id])
        matchPointsCursor = cursor.fetchall()
        if len(matchPointsCursor) != 0:
            matchPoints = matchPointsCursor[0][0]

        cursor.execute('''SELECT SUM(points) AS points
                        FROM api_qualifiedteams
                        WHERE user_id = %s
                        GROUP BY user_id''',[user_id])
        teamPoints = cursor.fetchall()[0][0]
    return int(matchPoints + teamPoints)

def getTeamPoints(user_id):
    teamsDict = dict()
    with connection.cursor() as cursor:
        cursor.execute('''SELECT qteams.id, teams.name, teams.shortcut, qteams.points, qteams.round
                        FROM api_team teams JOIN api_qualifiedteams qteams ON teams.id = qteams.team_id
                        WHERE qteams.real = false AND qteams.user_id = %s
                        ORDER BY qteams.round''',[user_id])
        for team in cursor.fetchall():
            round = team[4]
            if 'G' in round:
                round = 'G'
            if round not in teamsDict:
                teamsDict[round] = []
            teamsDict[round].append({
                'id':team[0],
                'name':team[1],
                'shortcut':team[2],
                'points':team[3],
                'round':team[4]
            })
    return teamsDict
from django.contrib.auth.models import User
from ..models import *
from ..serializers import *

def getTeams():
    teams_by_group = dict()
    teams = Team.objects.all()
    for team in teams:
        teamSerializer = TeamSerializer(team)
        group = team.get_group_display()
        if group not in teams_by_group:
            teams_by_group[group] = []
        teams_by_group[group].append(teamSerializer.data)
    
    groups = []
    for group in teams_by_group:
        groups.append({
            'group':group,
            'teams':teams_by_group[group]
        })
    return groups

def validateSignup(personalInfo):
    userQs = User.objects.filter(username = personalInfo['username'])
    if userQs.count() > 0:
        return (False,'Nombre de usuario ya registrado')
    authCodeQs = RegistrationCode.objects.filter(auth_code = personalInfo['authCode'],used=False)
    if authCodeQs.count() != 1:
        return (False,'Código de registro inválido')
    return (True,'')
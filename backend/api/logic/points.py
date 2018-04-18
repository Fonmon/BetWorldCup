from django.db import transaction, connection
from ..models import *
from .utils import *

def calculateMatchPoints(result):
    with transaction.atomic():
        matchResultsQs = MatchResult.objects.filter(match_id = result.match_id, real = False)
        userPointsQs = UserPoints.objects.filter(match_id = result.match_id)
        for matchResult in matchResultsQs:
            points = matchPoints(result,matchResult)
            try:
                userPoint = userPointsQs.get(user_id = matchResult.user_id)
            except UserPoints.DoesNotExist:
                userPoint = UserPoints()
                userPoint.user_id = matchResult.user_id
                userPoint.match_id = matchResult.match_id
            userPoint.points = points
            userPoint.save()

def calculateTeamPoints(result):
    with transaction.atomic():
        qualifiedTeamsQs = QualifiedTeams.objects.filter(round = result.round, team_id=result.team_id, real=False)
        for qualifiedTeam in qualifiedTeamsQs:
            qualifiedTeam.points = teamPoints(result.round)
            qualifiedTeam.save()

def matchPoints(real_result, user_result):
    points = 0
    if real_result.score_A == user_result.score_A:
        points += 5
    if real_result.score_B == user_result.score_B:
        points += 5
    if points == 10:
        points += 5
    real_score = real_result.score_A - real_result.score_B
    user_score = user_result.score_A - user_result.score_B
    if (real_score < 0 and user_score < 0) or (real_score > 0 and user_score > 0) or (real_score == 0 and user_score == 0):
        points += 5
    return points

def teamPoints(round):
    points = 0
    if 'G' in round:
        points = 5
    elif round == 'R16' or round == 'C3':
        points = 10
    elif round == 'R8' or round == 'C2':
        points = 15
    elif round == 'C1':
        points = 20
    return points

def getRanking(user_id):
    with connection.cursor() as cursor:
        cursor.execute('''SELECT user.first_name, user.last_name, (IF(matchpoints.points IS NULL, 0, matchpoints.points) + qualifiedpoints.points) AS points, IF(user.id = %s,true,false) AS is_current
                        FROM auth_user user LEFT JOIN (
                            SELECT user_id, SUM(points) AS points
                            FROM api_userpoints
                            GROUP BY user_id
                        ) matchpoints ON matchpoints.user_id = user.id
                        LEFT JOIN (
                            SELECT user_id, SUM(points) AS points
                            FROM api_qualifiedteams
                            WHERE user_id IS NOT NULL
                            GROUP BY user_id
                        ) qualifiedpoints ON qualifiedpoints.user_id = user.id
                        LEFT JOIN (
                            SELECT user_id, COUNT(*) AS num_exact
                            FROM api_userpoints 
                            WHERE points = 20
                            GROUP BY user_id
                        ) exactpoints ON exactpoints.user_id = user.id
                        ORDER BY points DESC, exacpoints.num_exact DESC''',[user_id])
        return dictfetchall(cursor)

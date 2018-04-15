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

def getRanking():
    with connection.cursor() as cursor:
        cursor.execute('''SELECT user.first_name, user.last_name, (IF(matchpoints.points IS NULL, 0, matchpoints.points) + qualifiedpoints.points) AS points
                        FROM auth_user user LEFT JOIN (
                            SELECT user_id, SUM(points) AS points
                            FROM api_userpoints
                            GROUP BY user_id
                        ) matchpoints ON matchpoints.user_id = user.id
                        LEFT JOIN (
                            SELECT user_id, SUM(points) AS points
                            FROM api_qualifiedteams
                            GROUP BY user_id
                        ) qualifiedpoints ON qualifiedpoints.user_id = user.id
                        ORDER BY points DESC''')
        return dictfetchall(cursor)
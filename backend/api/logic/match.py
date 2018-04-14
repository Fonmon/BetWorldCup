from django.db import transaction, connection
import datetime
from ..models import *
from ..serializers import *

dateFormat = "%d %b, %Y - %H:%M"

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

def getMatchResults(user_id,is_real):
    operator = '<='
    if is_real:
        user_id = None
        operator = '>'
    with connection.cursor() as cursor:
        now = datetime.datetime.now() + datetime.timedelta(hours=1)
        cursor.execute('''SELECT matches.id as match_id, matches.date, IF(matches.score_A IS NULL,'',matches.score_A) AS team_A_score, IF(matches.score_B IS NULL,'',matches.score_B) AS team_B_score, matches.team_A_name, matches.team_A_shortcut, matches.team_A_id,matches.team_B_id, team.name AS team_B_name, team.shortcut AS team_B_shortcut, IF(matches.date ''' + operator + ''' %s,true,false) AS disabled, IF(matches.real IS NULL,false,matches.real) AS real_result, matches.result_id, matches.round
                        FROM api_team team, 
                        (
                            SELECT  matches.*, team.name AS team_A_name, team.shortcut AS team_A_shortcut
                            FROM api_team team,
                            (
                                SELECT api_match.*, result.score_A, result.score_b, result.real, result.user_id, result.id AS result_id
                                FROM api_match LEFT JOIN (
                                    SELECT * FROM api_matchresult
                                    WHERE user_id = %s
                                ) result ON result.match_id = api_match.id
                                WHERE api_match.team_A_id IS NOT NULL AND api_match.team_B_id IS NOT NULL) matches
                            WHERE matches.team_A_id = team.id) matches
                        WHERE matches.team_B_id = team.id''', [now,user_id])
        group_matches = dict()
        for row in dictfetchall(cursor):
            row['date'] = row['date'].strftime(dateFormat)
            row['disabled'] = row['disabled'] == 1
            if row['round'] not in group_matches:
                group_matches[row['round']] = []
            group_matches[row['round']].append(row)
        return group_matches

def saveMatchResult(user_id, match_result, is_real):
    # TODO: validate date
    result = MatchResult()
    if match_result['result_id'] is not None:
        result.id = int(match_result['result_id'])
    result.match_id = int(match_result['match_id'])
    result.score_A = 0 if match_result['team_A_score'] == '' else int(match_result['team_A_score'])
    result.score_B = 0 if match_result['team_B_score'] == '' else int(match_result['team_B_score'])
    result.real = is_real
    if not is_real:
        result.user_id = user_id
    result.save()
    # TODO: calculate points if is real

    resultSerializer = MatchResultSerializer(result)
    return (True,resultSerializer.data)
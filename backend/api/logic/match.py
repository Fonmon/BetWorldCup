from django.db import transaction, connection
from datetime import datetime, timedelta, date, time
from ..models import *
from ..serializers import *
from .points import *
from .utils import *

dateFormat = "%d %b, %Y - %H:%M"

def getMatchResults(user_id,is_real):
    date_operator = '<='
    user_operator = '='
    if is_real:
        user_id = None
        date_operator = '>'
        user_operator = 'IS'
    with connection.cursor() as cursor:
        now = getNow()
        cursor.execute('''SELECT matches.id as match_id, matches.date, IF(matches.score_A IS NULL,'',matches.score_A) AS team_A_score, IF(matches.score_B IS NULL,'',matches.score_B) AS team_B_score, matches.team_A_name, matches.team_A_shortcut, matches.team_A_id,matches.team_B_id, team.name AS team_B_name, team.shortcut AS team_B_shortcut, IF(matches.date ''' + date_operator + ''' %s,true,false) AS disabled, IF(matches.real IS NULL,false,matches.real) AS real_result, matches.result_id, matches.round, IF(matches.points IS NULL, 0, matches.points) AS points
                        FROM api_team team, 
                        (
                            SELECT  matches.*, team.name AS team_A_name, team.shortcut AS team_A_shortcut
                            FROM api_team team,
                            (
                                SELECT api_match.*, result.score_A, result.score_b, result.real, result.user_id, result.id AS result_id, result.points AS points
                                FROM api_match LEFT JOIN (
                                    SELECT * FROM api_matchresult
                                    WHERE user_id '''+ user_operator +''' %s
                                ) result ON result.match_id = api_match.id
                                WHERE api_match.team_A_id IS NOT NULL AND api_match.team_B_id IS NOT NULL) matches
                            WHERE matches.team_A_id = team.id) matches
                        WHERE matches.team_B_id = team.id
                        ORDER BY date''', [now,user_id])
        group_matches = dict()
        for row in dictfetchall(cursor):
            row['date'] = row['date'].strftime(dateFormat)
            row['disabled'] = row['disabled'] == 1
            if row['round'] not in group_matches:
                group_matches[row['round']] = []
            group_matches[row['round']].append(row)
        return group_matches

def saveMatchResult(user_id, match_result, is_real):
    now = getNow()
    match_date = datetime.strptime(match_result['date'],dateFormat)
    if is_real or now < match_date:
        result = MatchResult()
        match_id = int(match_result['match_id'])
        match_stored = []
        if is_real:
            match_stored = MatchResult.objects.filter(match_id = match_id, user_id = None, real = True)
        else:
            match_stored = MatchResult.objects.filter(match_id = match_id, user_id = user_id)

        if len(match_stored) == 1:
            result.id = match_stored[0].id
        elif match_result['result_id'] is not None:
            result.id = int(match_result['result_id'])
        
        result.match_id = match_id
        result.score_A = 0 if match_result['team_A_score'] == '' else int(match_result['team_A_score'])
        result.score_B = 0 if match_result['team_B_score'] == '' else int(match_result['team_B_score'])
        result.real = is_real
        if not is_real:
            result.user_id = user_id
        result.save()
        if is_real:
            calculateMatchPoints(result)

        resultSerializer = MatchResultSerializer(result)
        return (True,resultSerializer.data)
    if match_result['result_id'] is not None:
        current_result = MatchResult.objects.get(id = match_result['result_id'])
        match_result['team_A_score'] = current_result.score_A
        match_result['team_B_score'] = current_result.score_B
    return (False,match_result)

def getNow():
    # fakeDate = date(2018,7,26)
    # fakeTime = time(6,00)
    # fakeNow = datetime.combine(fakeDate,fakeTime)
    # datetime.now()
    return datetime.now() + timedelta(hours=1)

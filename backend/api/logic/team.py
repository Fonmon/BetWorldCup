from django.db import transaction,connection
from ..models import *
from ..serializers import *
from .points import *
from .utils import *

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

def getCurrentStepTeams():
    step = 2
    with connection.cursor() as cursor:
        cursor.execute('''SELECT round
                        FROM api_qualifiedteams
                        WHERE api_qualifiedteams.real = true
                        GROUP BY round''')
        rounds = listfetchsingle(cursor)
        round = 'R16'
        if len(rounds) == 8:
            step = 3
        elif len(rounds) == 9:
            step = 4
        elif len(rounds) == 10:
            round = 'R8'
            step = 5
        elif len(rounds) == 13:
            step = 6
            return {'step':step}

        condition = ''
        if step >=4 and step <= 5:
            condition = 'AND qteams.round = \'{}\''.format(round)

        if step > 2:
            teamsQs = Team.objects.raw('''SELECT DISTINCT(teams.id), teams.name, teams.shortcut
                        FROM api_team teams JOIN api_qualifiedteams qteams ON teams.id = qteams.team_id
                        WHERE qteams.real = true ''' + condition)
            teamsSerializer = TeamSerializer(teamsQs,many = True)
            return {'teams':teamsSerializer.data,'step':step}
    return {'step':step}

def addQualifiedTeams(user_id, step, teams):
    with transaction.atomic():
        for team in teams:
            round = 'R'
            if step == 2:
                round = getRoundKey(team['group'])
            if step == 3:
                round = 'R16'
            if step == 4:
                round = 'R8'
            qualifiedTeam = QualifiedTeams()
            qualifiedTeam.round = round
            qualifiedTeam.team_id = team['id']
            if user_id is not None:
                qualifiedTeam.user_id = user_id
            else:
                qualifiedTeam.real = True
            qualifiedTeam.save()
            
            if user_id is None:
                calculateTeamPoints(qualifiedTeam)

def addQualifiedPodium(user_id, teams):
    podium = dict()
    podium['third'] = 'C3'
    podium['second'] = 'C2'
    podium['first'] = 'C1'
    with transaction.atomic():
        for key, value in podium.items():
            team_id = teams[key]
            qualifiedTeam = QualifiedTeams()
            qualifiedTeam.round = value
            qualifiedTeam.team_id = team_id
            if user_id is not None:
                qualifiedTeam.user_id = user_id
            else:
                qualifiedTeam.real = True
            qualifiedTeam.save()

            if user_id is None:
                calculateTeamPoints(qualifiedTeam)

def getRoundKey(round_value):
    round_dict = {value: key for key, value in ROUND}
    return round_dict[round_value]
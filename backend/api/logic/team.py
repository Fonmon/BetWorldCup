from django.db import transaction
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
            qualifiedTeam.user_id = user_id
            qualifiedTeam.save()

def addQualifiedPodium(user_id, teams):
    podium = dict()
    podium['third'] = 'C3'
    podium['second'] = 'C2'
    podium['first'] = 'C1'
    print(podium)
    with transaction.atomic():
        for key, value in podium.items():
            team_id = teams[key]
            qualifiedTeam = QualifiedTeams()
            qualifiedTeam.round = value
            qualifiedTeam.team_id = team_id
            qualifiedTeam.user_id = user_id
            qualifiedTeam.save()

def getRoundKey(round_value):
    round_dict = {value: key for key, value in ROUND}
    return round_dict[round_value]
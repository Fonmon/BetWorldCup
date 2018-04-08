from ..models import Team
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
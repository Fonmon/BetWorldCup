from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status

from .logic.betworldcup import *

@api_view(['GET','POST'])
@permission_classes([])
def view_get_team(request):
    if request.method == 'GET':
        teams = getTeams()
        return Response(teams,status = status.HTTP_200_OK)
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

@api_view(['POST'])
@permission_classes([])
def view_validate_signup(request):
    if request.method == 'POST':
        success, message = validateSignup(request.data)
        if success:
            return Response(message, status = status.HTTP_200_OK)
        return Response(message, status = status.HTTP_409_CONFLICT)
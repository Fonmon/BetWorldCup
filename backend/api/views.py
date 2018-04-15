from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status

from .logic.user import *
from .logic.team import *
from .logic.match import *
from .logic.points import *

@api_view(['GET','POST'])
@permission_classes([])
def view_team(request):
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

@api_view(['POST'])
@permission_classes([])
def view_user(request):
    if request.method == 'POST':
        success, message = signup(request.data)
        if success:
            return Response(message, status = status.HTTP_200_OK)
        return Response(message, status = status.HTTP_409_CONFLICT)

@api_view(['GET'])
def view_is_staff(request):
    user_id = request.user.id
    if request.method == 'GET':
        return Response(isStaff(user_id), status = status.HTTP_200_OK)

@api_view(['GET','PATCH'])
def view_match(request):
    user_id = request.user.id
    is_real = (request.query_params.get('is_real') == 'true')
    if request.method == 'GET':
        return Response(getMatchResults(user_id,is_real),status=status.HTTP_200_OK)
    if request.method == 'PATCH':
        success, response = saveMatchResult(user_id,request.data,is_real)
        if success:
            return Response(response,status=status.HTTP_200_OK)
        return Response(response,status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
def view_ranking(request):
    if request.method == 'GET':
        return Response(getRanking(),status=status.HTTP_200_OK)
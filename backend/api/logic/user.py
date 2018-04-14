from django.contrib.auth.models import User
from django.db import IntegrityError,transaction
from ..models import *
from ..serializers import *
from .team import *

def validateSignup(personalInfo):
    userQs = User.objects.filter(username = personalInfo['username'])
    if userQs.count() > 0:
        return (False,'Nombre de usuario ya registrado')
    authCodeQs = RegistrationCode.objects.filter(auth_code = personalInfo['authCode'],used=False)
    if authCodeQs.count() != 1:
        return (False,'Código de registro inválido')
    return (True,'')

def signup(signupData):
    state, message = validateSignup(signupData['step_1'])
    if not state:
        return (state, message)
    with transaction.atomic():
        try:
            user = User.objects.create_user(
                first_name=signupData['step_1']['names'],
                last_name=signupData['step_1']['lastNames'],
                username=signupData['step_1']['username'],
                email=signupData['step_1']['username'],
                password=signupData['step_1']['password']
            )
        except IntegrityError:
            return (False, 'Nombre de usuario ya registrado')
        authCode = RegistrationCode.objects.get(auth_code = signupData['step_1']['authCode'])
        authCode.used = True
        authCode.user = user
        authCode.save()

        addQualifiedTeams(user.id,2,signupData['step_2'])
        addQualifiedTeams(user.id,3,signupData['step_3'])
        addQualifiedTeams(user.id,4,signupData['step_4'])
        addQualifiedPodium(user.id, signupData['step_5'])
    return (True,'')

def isStaff(user_id):
    user = User.objects.get(id = user_id)
    return user.is_staff
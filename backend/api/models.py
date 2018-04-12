from django.db import models
from django.contrib.auth.models import User

ROUND = (
    ('GA','Grupo A'),
    ('GB','Grupo B'),
    ('GC','Grupo C'),
    ('GD','Grupo D'),
    ('GE','Grupo E'),
    ('GF','Grupo F'),
    ('GG','Grupo G'),
    ('GH','Grupo H'),
    ('R16','Octavos de Final'),
    ('R8','Cuartos de Final'),
    ('R4','Semifinales'),
    ('R3','Partido por Tercer Lugar'),
    ('R2','Finales'),
    ('C3','Tercer Lugar'),
    ('C2','Subcampeón'),
    ('C1','Campeón')
)

class Team(models.Model):
    name = models.TextField(null=False)
    group = models.CharField(choices=ROUND,null=False,max_length=5)
    shortcut = models.CharField(default='', unique=True,max_length=5)

class Match(models.Model):
    team_A = models.ForeignKey(Team,on_delete=models.CASCADE,null=True,related_name='team_A')
    team_B = models.ForeignKey(Team,on_delete=models.CASCADE,null=True,related_name='team_B')
    date = models.DateTimeField(null=False)
    round = models.CharField(choices=ROUND,null=False,max_length=5)

class MatchResult(models.Model):
    match = models.ForeignKey(Match,on_delete=models.CASCADE)
    score_A = models.IntegerField(null=True)
    score_B = models.IntegerField(null=True)
    real = models.BooleanField(default=False,null=False)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

class UserPoints(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    match = models.ForeignKey(Match,on_delete=models.CASCADE,null=True)
    points = models.IntegerField(default=0)

class QualifiedTeams(models.Model):
    round = models.CharField(choices=ROUND,null=False,max_length=5)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    team = models.ForeignKey(Team,on_delete=models.CASCADE)

class RegistrationCode(models.Model):
    auth_code = models.CharField(null=False, max_length=50)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    used = models.BooleanField(default=False, null=False)

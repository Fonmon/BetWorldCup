from rest_framework import serializers
from .models import Team

dateFormat = "%d %b, %Y"

class TeamSerializer(serializers.ModelSerializer):
    group = serializers.CharField(source='get_group_display')
    class Meta:
        model = Team
        fields = ('name','group','shortcut','id')
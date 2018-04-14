from django.conf.urls import url
from rest_framework.authtoken import views as auth_views
from . import views

urlpatterns = [
    url( r'^api/auth/',auth_views.obtain_auth_token, name='obtain_auth_token'),
    url( r'^api/team/?$', views.view_team, name='view_team' ),
    url( r'^api/user/?$', views.view_user, name='view_user' ),
    url( r'^api/user/validate_signup?$', views.view_validate_signup, name='view_validate_signup' ),
    url( r'^api/user/is_staff?$', views.view_is_staff, name='view_is_staff' ),
    url( r'^api/user/matches?$', views.view_match, name='view_match' ),
]
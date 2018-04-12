from django.conf.urls import url
from . import views

urlpatterns = [
    #url( r'^api/loan/(?P<id>[0-9]+)$', views.view_get_update_loan, name='view_get_update_loan' ),
    url( r'^api/team/?$', views.view_get_team, name='view_get_team' ),
    url( r'^api/user/validate_signup?$', views.view_validate_signup, name='view_validate_signup' ),
]
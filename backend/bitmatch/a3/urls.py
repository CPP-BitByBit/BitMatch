from django.urls import path
from . import views

urlpatterns = [
    path('', views.base_api, name='base_api'),
    path('larry', views.simple_api_larry, name='simple_api_larry'),
    path('rebecca', views.simple_api_rebecca, name='simple_api_rebecca'),
    path('luis', views.simple_api_luis, name='simple_api_luis'),
    path('william', views.simple_api_william, name='sample_api_william'),

]


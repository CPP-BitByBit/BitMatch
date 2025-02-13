from django.urls import path
from . import views

urlpatterns = [
    path('', views.base_api, name='base_api'),
    path('larry', views.simple_api_larry, name='simple_api_larry'),
]
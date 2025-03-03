# TODO: DRF CRUD 
from django.urls import path
from . import views

urlpatterns = [
    path('', views.base_api, name='base_api'),
]


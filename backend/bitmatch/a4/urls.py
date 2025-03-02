from django.urls import path
from . import views

urlpatterns = [
    path('gemini-test/', views.gemini_test_GET, name='gemini_test_GET'),
    path('matplotlib-test/', views.matplotlib_test_GET, name = 'matplotlib_test_GET'),
]

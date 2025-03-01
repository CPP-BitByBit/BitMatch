from django.urls import path
from . import views

urlpatterns = [
    path('gemini-test/', views.gemini_test_GET, name='gemini_test_GET'),
    path('numpy-test/', views.numpy_test_GET, name='numpy_test_GET')
]

from django.urls import path
from . import views

urlpatterns = [
    path('gemini-test/', views.gemini_test_GET, name='gemini_test_GET'),
    path('upload-image/', views.upload_image, name='upload_image'),
]

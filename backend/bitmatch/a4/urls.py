from django.urls import path
from . import views

urlpatterns = [
    path('gemini-test/', views.gemini_test_GET, name='gemini_test_GET'),
    path('upload-image/', views.upload_image, name='upload_image'),
    path('matplotlib-test/', views.matplotlib_test_GET, name = 'matplotlib_test_GET'),
    path('numpy-test/', views.numpy_test_GET, name='numpy_test_GET')
]

from django.urls import path
from .views import ProjectCRUDView

urlpatterns = [
    path('create/', ProjectCRUDView.as_view(), name='project-create'),  # Create project
    path('<int:pk>/', ProjectCRUDView.as_view(), name='project-detail'),  # Read, Update, Delete project by ID
]

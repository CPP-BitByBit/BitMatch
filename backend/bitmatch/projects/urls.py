from django.urls import path
from .views import ProjectCRUDView, get_projects

urlpatterns = [
    path('', get_projects, name='get_projects'), # Fetch all projects
    path('create/', ProjectCRUDView.as_view(), name='project-create'),  # Create project
    path('<int:pk>/', ProjectCRUDView.as_view(), name='project-detail'),  # Read, Update, Delete project by ID
]

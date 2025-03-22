from django.urls import path
from .views import ProjectCRUDView, get_projects, toggle_follow, toggle_like

urlpatterns = [
    path('', get_projects, name='get_projects'),  # Fetch all projects
    path('create/', ProjectCRUDView.as_view(), name='project-create'),  # Create project
    path('<int:pk>/', ProjectCRUDView.as_view(), name='project-detail'),  # Read, Update, Delete project by ID
    path('projects/<int:project_id>/toggle-like/', toggle_like, name='toggle_like'), # route to edit projects' likes 
    path('projects/<int:project_id>/toggle-follow/', toggle_follow, name='toggle_follow') # route to edit projects' follows
]

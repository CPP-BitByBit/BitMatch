from django.urls import path
from .views import ProjectCRUDView, get_projects, toggle_follow, toggle_like, check_like_status

urlpatterns = [
    path('', get_projects, name='get_projects'),  # Fetch all projects
    path('create/', ProjectCRUDView.as_view(), name='project-create'),  # Create project
    path('<str:pk>/', ProjectCRUDView.as_view(), name='project-detail'),  # Read, Update, Delete project by ID
    path('like/<str:project_id>', toggle_like, name='toggle_like'), 
    path('follow/<str:project_id>', toggle_follow, name='toggle_follow'),
    path('likes/check/<str:user_id>/<str:project_id>/', check_like_status, name='check_like_status')
]

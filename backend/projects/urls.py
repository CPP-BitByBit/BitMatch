from django.urls import path
from .views import ProjectCRUDView, get_projects, toggle_follow, toggle_like, project_member_hander

urlpatterns = [
    path('', get_projects, name='get_projects'),  # Fetch all projects
    path('create/', ProjectCRUDView.as_view(), name='project-create'),  # Create project
    path('<str:pk>/', ProjectCRUDView.as_view(), name='project-detail'),  # Read, Update, Delete project by ID
    path('like/<str:project_id>', toggle_like, name='toggle_like'), 
<<<<<<< HEAD
    path('follow/<str:project_id>', toggle_follow, name='toggle_follow') 
=======
    path('follow/<str:project_id>', toggle_follow, name='toggle_follow'),
    path('member/manage/<str:project_id>', project_member_hander, name='project-member-handler'),
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84
]

from django.urls import path
from .views import UsersCRUDView

urlpatterns = [
    path('onboard/', UsersCRUDView.as_view(),  name='onboard-user'),  # Create user
    path('<str:pk>/', UsersCRUDView.as_view(), name='user'),  # Read, Update, Delete user by ID
]

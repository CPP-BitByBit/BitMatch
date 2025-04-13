from django.urls import path
from .views import UsersCRUDView, check_if_onboarded

urlpatterns = [
    path('onboard/', UsersCRUDView.as_view(),  name='onboard-user'),  # Create user
    path('onboard/check/<str:clerk_id>', check_if_onboarded, name="onboard-check"), # Check if user onboarded
    path('<str:pk>/', UsersCRUDView.as_view(), name='user'),  # Read, Update, Delete user by ID
]

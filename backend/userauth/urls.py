from django.urls import path
<<<<<<< HEAD
from .views import UsersCRUDView, check_if_onboarded
=======
from .views import UsersCRUDView, check_if_onboarded, fetch_by_uuid
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84

urlpatterns = [
    path('onboard/', UsersCRUDView.as_view(),  name='onboard-user'),  # Create user
    path('onboard/check/<str:clerk_id>', check_if_onboarded, name="onboard-check"), # Check if user onboarded
<<<<<<< HEAD
    path('<str:pk>/', UsersCRUDView.as_view(), name='user'),  # Read, Update, Delete user by ID
=======
    path('<str:clerk_id>/', UsersCRUDView.as_view(), name='user'),  # Read, Update, Delete user by ID
    path('fetch/<str:uuid>/', fetch_by_uuid, name='uuid-fetch'),  
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84
]

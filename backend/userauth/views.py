from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes([AllowAny])
def check_if_onboarded(request, clerk_id):
    if User.objects.filter(auth_id=clerk_id).exists():
        return Response({"message": "User already onboarded"})
    else:
        return Response({"message": "User not onboarded yet!"})

# DRF CRUD views for Users model
class UsersCRUDView(APIView):
    permission_classes = [AllowAny]
    # Onboard a new user (POST)
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "User successfully onboarded",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            error_details = {
                "message": "Invalid user data provided.",
                "errors": serializer.errors,
            }
            return Response(error_details, status=status.HTTP_400_BAD_REQUEST)

    # Get a single user by ID (GET)
    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    # Update an existing user by ID (PUT)
    def put(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "User successfully updated!",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            error_details = {
                "message": "Invalid user data provided.",
                "errors": serializer.errors,
            }
            return Response(error_details, status=status.HTTP_400_BAD_REQUEST)
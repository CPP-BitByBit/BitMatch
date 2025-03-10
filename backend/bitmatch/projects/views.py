from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

# Fetch all projects
@api_view(['GET'])  
@permission_classes([AllowAny]) 
def get_projects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

# DRF CRUD views for Project model
class ProjectCRUDView(APIView):
    permission_classes = [AllowAny]
    # Create a new project (POST)
    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Get a single project by ID (GET)
    def get(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    # Update an existing project by ID (PUT)
    def put(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete a project by ID (DELETE)
    def delete(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        project.delete()
        return Response({"message": "Project deleted"}, status=status.HTTP_204_NO_CONTENT)

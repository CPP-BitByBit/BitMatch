from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from .models import Project, Like, Follow, User
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
    parser_classes = (MultiPartParser, FormParser)  # Allow file uploads

    # Create a new project (POST)
    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            error_details = {
                "message": "Invalid project data provided.",
                "errors": serializer.errors,
            }
            return Response(error_details, status=status.HTTP_400_BAD_REQUEST)

    # Get a single project by ID (GET)
    def get(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    # Update an existing project by ID (PUT)
    def put(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            error_details = {
                "message": "Invalid project data provided.",
                "errors": serializer.errors,
            }
            return Response(error_details, status=status.HTTP_400_BAD_REQUEST)

    # Delete a project by ID (DELETE)
    def delete(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        project.delete()
        return Response({"message": "Project deleted"}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([AllowAny])
def toggle_like(request, project_id):
    if request.method == 'POST':
        data = request.data
        action = data.get('action')
        user_id = data.get('user_id')

        project = get_object_or_404(Project, id=project_id)
        user = get_object_or_404(User, id=user_id)

        if action == 'like':
            if not Like.objects.filter(project=project, user=user).exists():
                Like.objects.create(project=project, user=user)
                project.likes_count += 1
                project.save()
                return Response({'message': 'Project liked successfully','like_count': project.likes_count}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'You already liked this project.'}, status=status.HTTP_400_BAD_REQUEST)
                
        elif action == 'unlike':
            like = Like.objects.filter(project=project, user=user).first()
            if like:
                like.delete()
                project.likes_count -= 1
                project.save()
                return Response({'message': 'Project unliked successfully','like_count': project.likes_count}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'You already unliked this project.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def toggle_follow(request, project_id):
    if request.method == 'POST':
        data = request.data  
        action = data.get('action')
        user_id = data.get('user_id')

        project = get_object_or_404(Project, id=project_id)
        user = get_object_or_404(User, id=user_id)

        if action == 'follow':
            if not Follow.objects.filter(project=project, user=user).exists():
                Follow.objects.create(project=project, user=user)
                project.followers_count += 1
                project.save()
                return Response({'message': 'Project followed successfully', 'follow_count': project.followers_count}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'You already followed this project.'}, status=status.HTTP_400_BAD_REQUEST)
            
        elif action == 'unfollow':
            follow = Follow.objects.filter(project=project, user=user).first()
            if follow:
                follow.delete()
                project.followers_count -= 1
                project.save()
                return Response({'message': 'Project unfollowed successfully', 'follow_count': project.followers_count}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'You already unfollowed this project.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([AllowAny])
def project_member_hander(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        user = User.objects.get(id=request.data['user_id'])
        action = request.data.get('action')

        is_member = project.members.filter(id=user.id).exists()

        if action == "join":
            if is_member:
                return Response({'error': 'User is already a member of this project'}, status=400)
            project.members.add(user)
            user.projects.add(project)
            return Response({'message': 'Member added successfully'})
        
        elif action == "leave":
            if not is_member:
                return Response({'error': 'User is not a member of this project'}, status=400)
            project.members.remove(user)
            user.projects.remove(project)
            return Response({'message': 'Member removed successfully'})
        
        else:
            return Response({'error': 'Invalid action'}, status=400)
    
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=404)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
            
@api_view(['GET'])
@permission_classes([AllowAny])
def check_like_status(request, user_id, project_id):
    try:
        project = get_object_or_404(Project, id=project_id)
        user = get_object_or_404(User, id=user_id)

        liked = Like.objects.filter(project=project, user=user).exists()

        return Response({'liked': liked}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def check_follow_status(request, user_id, project_id):
    try:
        project = get_object_or_404(Project, id=project_id)
        user = get_object_or_404(User, id=user_id)

        followed = Follow.objects.filter(project=project, user=user).exists()

        return Response({'followed': followed}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

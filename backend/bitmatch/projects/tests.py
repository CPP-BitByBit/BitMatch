from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Project
from .serializers import ProjectSerializer

# Unit test for Project model
class ProjectModelTest(TestCase):
    def setUp(self):
        # Create a sample project record 
        self.project = Project.objects.create(
            group="CPP SEA",
            match_percentage=85.5,
            title="Icebreak",
            institution="Cal Poly Pomona",
            description="We help connect organizations with their members.",
            followers=10,
            likes=5,
            positions=[{"role": "Backend Developer", "available": 2}],
            image_url="https://example.com/image.jpg"
        )
        # Rebecca's test project
        self.project2 = Project.objects.create(
            group="Codebreaker's Club",
            match_percentage=20,
            title="Enigma Machine Emulator",
            institution="University of California, Irvine",
            description="An Enigma machine emulator that replicates the encryption process of the Enigma M3 series used by the Germans.",
            followers=320,
            likes=100,
            positions=[{"role": "Cyber Hacker", "available": 1}],
            image_url="https://www.101computing.net/wp/wp-content/uploads/enigma.png"
        )
    
    def test_project_creation_1(self):
        # Check if the record populated correctly
        self.assertEqual(self.project.group, "CPP SEA")
        self.assertEqual(self.project.match_percentage, 85.5)
        self.assertEqual(self.project.title, "Icebreak")
        self.assertEqual(self.project.institution, "Cal Poly Pomona")
        self.assertEqual(self.project.description, "We help connect organizations with their members.")
        self.assertEqual(self.project.followers, 10)
        self.assertEqual(self.project.likes, 5)
        self.assertEqual(self.project.positions, [{"role": "Backend Developer", "available": 2}])
        self.assertEqual(self.project.image_url, "https://example.com/image.jpg")

    # Rebecca's test project
    def test_project_creation_2(self):
        self.assertEqual(self.project2.group, "Codebreaker's Club")
        self.assertEqual(self.project2.match_percentage, 20)
        self.assertEqual(self.project2.title, "Enigma Machine Emulator")
        self.assertEqual(self.project2.institution, "University of California, Irvine")
        self.assertEqual(self.project2.description, "An Enigma machine emulator that replicates the encryption process of the Enigma M3 series used by the Germans.")
        self.assertEqual(self.project2.followers, 320)
        self.assertEqual(self.project2.likes, 100)
        self.assertEqual(self.project2.positions, [{"role": "Cyber Hacker", "available": 1}])
        self.assertEqual(self.project2.image_url, "https://www.101computing.net/wp/wp-content/uploads/enigma.png")
    
    # TODO: assert against the new project you made (luis) --> test with python manage.py test after --> delete this comment after commiting
    def test_project_creation_3(self):
        #self.project3
        ...

    # TODO: assert against the new project you made (william) --> test with python manage.py test after --> delete this comment after commiting
    def test_project_creation_4(self): 
        #self.project4
        ...

class GetProjectsAPITest(APITestCase):
    def setUp(self):
        # Add mock project data
        self.project1 = Project.objects.create(
            title="AI for Healthcare", institution="MIT", match_percentage=85.5
        )
        self.project2 = Project.objects.create(
            title="Web Dev", institution="Stanford", match_percentage=70.0
        )
        self.url = reverse("get_projects")  

    def test_get_projects_success(self):
        # Test route
        response = self.client.get(self.url)

        # Check if response is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Serialize expected data
        expected_data = ProjectSerializer([self.project1, self.project2], many=True).data

        # Check if response data matches expected serialized data
        self.assertEqual(response.data, expected_data)


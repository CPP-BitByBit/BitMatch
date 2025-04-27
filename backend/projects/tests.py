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
            title="Icebreak",
            institution="Cal Poly Pomona",
            description="We help connect organizations with their members.",
            followers_count=10,
            likes_count=5,
            positions=[{"role": "Backend Developer", "available": 2}],
            image_url="https://example.com/image.jpg"
        )
        # Rebecca's test project
        self.project2 = Project.objects.create(
            group="Codebreaker's Club",
            title="Enigma Machine Emulator",
            institution="University of California, Irvine",
            description="An Enigma machine emulator that replicates the encryption process of the Enigma M3 series used by the Germans.",
            followers_count=320,
            likes_count=100,
            positions=[{"role": "Cyber Hacker", "available": 1}],
            image_url="https://www.101computing.net/wp/wp-content/uploads/enigma.png"
        )
        # Luis' test project
        self.project3 = Project.objects.create(
            group="CodeWarriors",
            title="PersonalityPlaylist",
            institution="University of California, Riverside",
            description="An app to create custom Spotify playlists based on a personality profile.",
            followers_count=120,
            likes_count=80,
            positions=[{"role": "Backend Developer", "available": 2}],
            image_url="https://media.wired.com"
        )
        #William's test project 
        self.project4 = Project.objects.create(
            group="Byte Me",
            title="F1 Race Machine Learning Model",
            institution="University of California, Berkley",
            description="A machine learning model that takes data from F1 races and predicts winners based on previous results.",
            followers_count=20,
            likes_count=10,
            positions=[{"role": "Data Analyst", "available": 1}],
            image_url="https://robbreport.com/wp-content/uploads/2024/02/RR_2024_F1_Car_Roundup_Red_Bull_RB20.jpg"
        )
    def test_project_creation_1(self):
        # Check if the record populated correctly
        self.assertEqual(self.project.group, "CPP SEA")
        self.assertEqual(self.project.title, "Icebreak")
        self.assertEqual(self.project.institution, "Cal Poly Pomona")
        self.assertEqual(self.project.description, "We help connect organizations with their members.")
        self.assertEqual(self.project.followers_count, 10)
        self.assertEqual(self.project.likes_count, 5)
        self.assertEqual(self.project.positions, [{"role": "Backend Developer", "available": 2}])
        self.assertEqual(self.project.image_url, "https://example.com/image.jpg")

    # Rebecca's test project
    def test_project_creation_2(self):
        self.assertEqual(self.project2.group, "Codebreaker's Club")
        self.assertEqual(self.project2.title, "Enigma Machine Emulator")
        self.assertEqual(self.project2.institution, "University of California, Irvine")
        self.assertEqual(self.project2.description, "An Enigma machine emulator that replicates the encryption process of the Enigma M3 series used by the Germans.")
        self.assertEqual(self.project2.followers_count, 320)
        self.assertEqual(self.project2.likes_count, 100)
        self.assertEqual(self.project2.positions, [{"role": "Cyber Hacker", "available": 1}])
        self.assertEqual(self.project2.image_url, "https://www.101computing.net/wp/wp-content/uploads/enigma.png")
    
    # luis's test project
    def test_project_creation_3(self):
        # Check if the record populated correctly
        self.assertEqual(self.project3.group, "CodeWarriors")
        self.assertEqual(self.project3.title, "PersonalityPlaylist")
        self.assertEqual(self.project3.institution, "University of California, Riverside")
        self.assertEqual(self.project3.description, "An app to create custom Spotify playlists based on a personality profile.")
        self.assertEqual(self.project3.followers_count, 120)
        self.assertEqual(self.project3.likes_count, 80)
        self.assertEqual(self.project3.positions, [{"role": "Backend Developer", "available": 2}])
        self.assertEqual(self.project3.image_url, "https://media.wired.com")

    # William's test project
    def test_project_creation_4(self): 
        # Check if the record populated correctly
        self.assertEqual(self.project4.group, "Byte Me")
        self.assertEqual(self.project4.title, "F1 Race Machine Learning Model")
        self.assertEqual(self.project4.institution, "University of California, Berkley")
        self.assertEqual(self.project4.description, "A machine learning model that takes data from F1 races and predicts winners based on previous results.")
        self.assertEqual(self.project4.followers_count, 20)
        self.assertEqual(self.project4.likes_count, 10)
        self.assertEqual(self.project4.positions, [{"role": "Data Analyst", "available": 1}])
        self.assertEqual(self.project4.image_url, "https://robbreport.com/wp-content/uploads/2024/02/RR_2024_F1_Car_Roundup_Red_Bull_RB20.jpg")

class GetProjectsAPITest(APITestCase):
    def setUp(self):
        # Add mock project data
        self.project1 = Project.objects.create(
            title="AI for Healthcare", institution="MIT"
        )
        self.project2 = Project.objects.create(
            title="Web Dev", institution="Stanford"
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


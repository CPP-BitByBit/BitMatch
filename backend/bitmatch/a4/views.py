from django.shortcuts import render
from google import genai
from dotenv import load_dotenv
from django.http import JsonResponse
import os
load_dotenv()
from google import genai
from django.views.decorators.csrf import csrf_exempt
from .models import UserProfile
<<<<<<< HEAD
=======
import matplotlib.pyplot as plt
import numpy as np
>>>>>>> 44f648c3d9573bb7b43c0dcfc3e02050b7d65cf8

# Create your views here.

# Larry La - A4
def gemini_test_GET(request):
    if request.method == "GET":
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        prompt = request.GET.get("prompt", "empty prompt")

        try:
            response = client.models.generate_content(
                model="gemini-2.0-flash", contents=prompt
            )
            return JsonResponse({"response": response.text}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only GET requests are allowed"}, status=405)
    
# Luis Dominguez - A4
def numpy_test_GET(request):
    if request.method == "GET":
        try:
            random_matrix = np.random.rand(3, 3).tolist()
            return JsonResponse({"matrix": random_matrix}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only GET requests are allowed"}, status=405)
    
# Rebecca Smith - django-imagekit - A4
# ImageKit is a Django app for processing images.
@csrf_exempt
def upload_image(request):
    if request.method == "POST" and request.FILES.get("image"):
        image = request.FILES["image"]
        user_profile = UserProfile(image=image)
        user_profile.save()
        return JsonResponse({"message": "Image uploaded successfully!"}, status=201)

<<<<<<< HEAD
# Rebecca Smith - django-imagekit - A4
# ImageKit is a Django app for processing images.
@csrf_exempt
def upload_image(request):
    if request.method == "POST" and request.FILES.get("image"):
        image = request.FILES["image"]
        user_profile = UserProfile(image=image)
        user_profile.save()
        return JsonResponse({"message": "Image uploaded successfully!"}, status=201)

    return JsonResponse({"error": "Invalid request"}, status=400)
=======
    return JsonResponse({"error": "Invalid request"}, status=400)

# William Garica - A4 
def matplotlib_test_GET(request):
    if request.method == "GET":
        try:
           x = [1,2,3,4]
           e = (0.1, 0, 0.1, 0)
           plt.pie(x, explode = e)
           plt.title("Example")
           plt.show()
        except Exception as e:
            return JsonResponse({"error":str(e)},status = 500)
    else:
        return JsonResponse({"error":"Only GET requests are allowed"},status = 405)
>>>>>>> 44f648c3d9573bb7b43c0dcfc3e02050b7d65cf8

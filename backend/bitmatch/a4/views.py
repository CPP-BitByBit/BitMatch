from django.shortcuts import render
from google import genai
from dotenv import load_dotenv
from django.http import JsonResponse
import os
load_dotenv()
from google import genai
import numpy as np
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

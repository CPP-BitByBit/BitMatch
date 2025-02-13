from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

# Create your views here.
def base_api(request):
    return HttpResponse("Hello World!")

def simple_api_larry(request):
    # return a simple http response
    data = {"person": "Larry La"}
    return JsonResponse(data)


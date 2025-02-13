from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

# Create your views here.
def base_api(request):
    return HttpResponse("Welcome to the home page for assignment A3!")

def simple_api_larry(request):
    # return a simple json response
    data = {"person": "Larry La"}
    return JsonResponse(data)

# TODO: REBECCA API

# TODO: LUIS API

# TODO: WILLIAM API

def simple_api_johndoe(request):
    # return a simple json response
    data = {"person": "John Doe"}
    return JsonResponse(data)
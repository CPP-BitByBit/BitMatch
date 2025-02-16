from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

# Create your views here.
def base_api(request):
    return HttpResponse("Welcome to the home page for assignment A3!")

def simple_api_larry(request):
    # return a simple json response
    data = {"person": "Larry La"}
    return JsonResponse(data)

def simple_api_rebecca(request):
    # return a simple json response
    data = {"person": "Rebecca Smith"}
    return JsonResponse(data)

def simple_api_luis(request):
    # return a simple json response
    data = {"person": "Luis Dominguez"}
    return JsonResponse(data)

def simple_api_william(request):
    #return a simple json response
    data = {"person": "William Garcia"}
    return JsonResponse(data)
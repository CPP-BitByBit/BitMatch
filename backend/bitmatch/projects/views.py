from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

# Create your views here.
def base_api(request):
    return HttpResponse("Projects CRUD Home Page!")

# TODO: DRF CRUD
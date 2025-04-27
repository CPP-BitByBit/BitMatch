from django.contrib.postgres.fields import ArrayField
from django.db import models
import uuid

class User(models.Model):
    id = models.CharField(primary_key=True,default=uuid.uuid4, editable=False, max_length=36)
    auth_id = models.CharField(unique=True)
    username = models.CharField(max_length=150, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)  
    first_name = models.CharField(max_length=255, default="")
    last_name = models.CharField(max_length=255, default="")
<<<<<<< HEAD
    colleges = ArrayField(models.CharField(max_length=225), blank=True, null=True)  
=======
    college = models.CharField(max_length=255, default="")
    major = models.CharField(max_length=255, default="")
    grad_date = models.CharField(max_length=255, default="")
    about_me = models.TextField(max_length=500, blank=True, null=True)  
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84
    followers = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    roles = models.JSONField(default=list)
    interests = ArrayField(models.CharField(max_length=225), blank=True, null=True)  
    skills = ArrayField(models.CharField(max_length=225), blank=True, null=True)  
    location = models.CharField(max_length=255, default="")
    location_preferences = models.JSONField(default=list)

    projects = models.ManyToManyField(
        'projects.Project', 
        related_name='contributors',  
        blank=True
    )

    def __str__(self):
        return self.username or f"User-{self.id}"

from django.contrib.postgres.fields import ArrayField
from django.db import models
import uuid

class User(models.Model):
    id = models.CharField(primary_key=True,default=uuid.uuid4, editable=False, max_length=36)
    auth_id = models.CharField(unique=True)
    username = models.CharField(unique=True)
    email = models.EmailField(unique=True)  
    first_name = models.CharField(max_length=255, default="")
    last_name = models.CharField(max_length=255, default="")
    colleges = ArrayField(models.CharField(max_length=225), blank=True, null=True)  
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
    owned = models.ManyToManyField(
        'projects.Project',
        related_name='owners',
        blank=True
    )

    def __str__(self):
        return self.username

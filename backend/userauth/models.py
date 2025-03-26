from django.contrib.postgres.fields import ArrayField
from django.db import models

class User(models.Model):
    auth_id = models.IntegerField(default=999)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True, blank=True, null=True)  
    institution = models.CharField(max_length=255, blank=True, null=True)
    followers = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    positions = models.JSONField(default=list)
    interest_tags = ArrayField(models.CharField(max_length=225), blank=True, null=True)  
    skill_tags = ArrayField(models.CharField(max_length=225), blank=True, null=True)  
    location_preference = models.JSONField(default=list)

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

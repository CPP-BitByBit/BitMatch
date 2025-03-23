from django.contrib.postgres.fields import ArrayField
from django.db import models

class User(models.Model):
    auth_id = models.IntegerField(default=999)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)  
    institution = models.CharField(max_length=255, blank=True, null=True)
    followers = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    position = models.JSONField(default=list)
    tags = ArrayField(models.CharField(max_length=225), blank=True, null=True)  

    def __str__(self):
        return self.username

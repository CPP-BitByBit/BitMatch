from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=225)
    id = models.IntegerField(default = 0)
    institution = models.CharField(max_length=255)
    followers = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    position = models.JSONField(default=list)  
    tags = ArrayField(models.CharField(max_length=225), blank = True)
    

    def __str__(self):
        return self.title
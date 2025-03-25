from django.contrib.postgres.fields import ArrayField
from django.db import models

class User(models.Model):
    auth_id = models.IntegerField(default=999)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True, blank=True, null=True)  
    institution = models.CharField(max_length=255, blank=True, null=True)
    followers = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    position = models.JSONField(default=list)
    tags = ArrayField(models.CharField(max_length=225), blank=True, null=True)  
    
    projects = models.ForeignKey(
        'projects.Project', 
        on_delete=models.CASCADE,
        related_name='contributors',  # good practice to add related_name
        null=True,  # add null=True if this can be blank
        blank=True
    )
    owned = models.ForeignKey(
        'projects.Project',
        on_delete=models.CASCADE,
        related_name='owners',
        null=True,
        blank=True
    )

    def __str__(self):
        return self.username

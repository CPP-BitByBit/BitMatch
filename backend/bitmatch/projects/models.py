from django.db import models

# TODO: PROJECTS MODEL
# Create your models here.
class Project(models.Model):
    group = models.CharField(max_length=255)
    match_percentage = models.FloatField()
    title = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    description = models.TextField()
    followers = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    positions = models.JSONField(default=list)  
    image_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
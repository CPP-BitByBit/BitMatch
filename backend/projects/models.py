from django.db import models
from userauth.models import User
from django.contrib.postgres.fields import ArrayField

# PROJECTS MODEL
class Project(models.Model):
    group = models.CharField(max_length=255)
    match_percentage = models.FloatField()
    title = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    description = models.TextField()
    followers_count = models.IntegerField(default=0) 
    likes_count = models.IntegerField(default=0)  
    positions = models.JSONField(default=list)  
    image_url = models.ImageField(upload_to="projects/", blank=True, null=True)
    images = models.JSONField(default=list)
    tags = ArrayField(models.CharField(max_length=225), blank=True, null=True)  

    def __str__(self):
        return self.title

class Like(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_likes")  
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_likes")  

    class Meta:
        unique_together = ('project', 'user')

    def __str__(self):
        return f"{self.project.title} received a like from {self.user.username}"

class Follow(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project_follows')  
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_follows")  

    class Meta:
        unique_together = ('project', 'user')

    def __str__(self):
        return f"{self.project.title} received a follow from {self.user.username}"

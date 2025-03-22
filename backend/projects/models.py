from django.db import models
from userauth.models import User
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
    image_url = models.ImageField(upload_to="projects/", blank=True, null=True)
    images = models.JSONField(default=list)

    def __str__(self):
        return self.title
    
class Like(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name = "likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('project', 'user')

    def __str__(self):
        return f"{self.project.title} recieved a like from {self.user.username}"
    
class Follow(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='follows')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('project', 'user')
        
    def __str__(self):
        return f"{self.project.title} recieved a follow from {self.user.username}"
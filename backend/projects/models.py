from django.db import models
from userauth.models import User
from django.contrib.postgres.fields import ArrayField
import uuid
# PROJECTS MODEL
class Project(models.Model):
    project_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)                                                          
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
    full_description = models.CharField(max_length=1000, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)  
    other_contact = models.CharField(max_length=225, blank=True, null=True)
    #discussion = ArrayField(models.CharField(max_length=540), blank=True, null=True)
    updates = ArrayField(models.CharField(max_length=540), blank=True, null=True)
    wanted_description = models.CharField(max_length=540, blank=True, null=True)
    members = models.ForeignKey(
        'userauth.User',
        on_delete=models.CASCADE,
        related_name='member_of_projects',
        null=True,
        blank=True
    )
    
    owner = models.ForeignKey(
        'userauth.User',
        on_delete=models.CASCADE,
        related_name='owned_projects',
        null=True,
        blank=True
    )

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

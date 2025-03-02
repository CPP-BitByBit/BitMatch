from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

# Create your models here.

# Rebecca Smith - ImageKit
class UserProfile(models.Model):
    image = models.ImageField(upload_to='uploads/')
    thumbnail = ImageSpecField(
        source='image',
        processors=[ResizeToFill(100, 100)],
        format='JPEG',
        options={'quality': 80}
    )

    def __str__(self):
        return f"UserProfile {self.id}"


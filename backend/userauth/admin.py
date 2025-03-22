from django.contrib import admin
from .models import User  

# Register the User model
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'institution', 'followers', 'likes')
    search_fields = ('username', 'email', 'institution')  
    list_filter = ('institution',) 
    ordering = ('username',)  

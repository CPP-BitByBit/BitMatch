from django.contrib import admin
from .models import User  

# Register the User model
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'auth_id', 'username', 'email', 'first_name', 'last_name',
        'followers', 'likes', 'location'
    )
    search_fields = ('username', 'email', 'first_name', 'last_name')
    list_filter = ('location',)
    filter_horizontal = ('projects',)

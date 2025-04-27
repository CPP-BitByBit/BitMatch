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
<<<<<<< HEAD
    filter_horizontal = ('projects', 'owned')
=======
    filter_horizontal = ('projects',)
>>>>>>> d273cc17c82f58fa65fb0d6a01dc2146af9a0b84

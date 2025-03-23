from django.contrib import admin
from .models import Project, Like, Follow

# Register the Project model
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'group', 'institution', 'match_percentage', 'followers_count', 'likes_count')
    search_fields = ('title', 'group', 'institution')
    list_filter = ('group', 'institution')

# Register the Like model
@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('project', 'user')
    search_fields = ('project__title', 'user__username')

# Register the Follow model
@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ('project', 'user')
    search_fields = ('project__title', 'user__username')

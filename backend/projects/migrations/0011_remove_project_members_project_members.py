# Generated by Django 5.1.7 on 2025-03-26 04:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0010_rename_tags_project_interest_tags_project_location_and_more'),
        ('userauth', '0003_rename_tags_user_interest_tags_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='members',
        ),
        migrations.AddField(
            model_name='project',
            name='members',
            field=models.ManyToManyField(blank=True, null=True, related_name='member_of_projects', to='userauth.user'),
        ),
    ]

# Generated by Django 5.1.7 on 2025-03-26 04:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0012_alter_project_members'),
        ('userauth', '0003_rename_tags_user_interest_tags_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='owned',
        ),
        migrations.RemoveField(
            model_name='user',
            name='projects',
        ),
        migrations.AddField(
            model_name='user',
            name='owned',
            field=models.ManyToManyField(blank=True, related_name='owners', to='projects.project'),
        ),
        migrations.AddField(
            model_name='user',
            name='projects',
            field=models.ManyToManyField(blank=True, related_name='contributors', to='projects.project'),
        ),
    ]

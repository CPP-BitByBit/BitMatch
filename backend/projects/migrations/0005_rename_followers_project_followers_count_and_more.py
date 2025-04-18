# Generated by Django 5.1.7 on 2025-03-22 02:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_rename_image_project_image_url_and_more'),
        ('userauth', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='followers',
            new_name='followers_count',
        ),
        migrations.RenameField(
            model_name='project',
            old_name='likes',
            new_name='likes_count',
        ),
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_follows', to='projects.project')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_follows', to='userauth.user')),
            ],
            options={
                'unique_together': {('project', 'user')},
            },
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_likes', to='projects.project')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_likes', to='userauth.user')),
            ],
            options={
                'unique_together': {('project', 'user')},
            },
        ),
    ]

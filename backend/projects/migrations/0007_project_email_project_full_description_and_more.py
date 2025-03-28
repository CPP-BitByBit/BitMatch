# Generated by Django 5.1.6 on 2025-03-25 04:35

import django.contrib.postgres.fields
import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0006_project_tags'),
        ('userauth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='project',
            name='full_description',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='members',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='member_of_projects', to='userauth.user'),
        ),
        migrations.AddField(
            model_name='project',
            name='other_contact',
            field=models.CharField(blank=True, max_length=225, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='owned_projects', to='userauth.user'),
        ),
        migrations.AddField(
            model_name='project',
            name='project_id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='updates',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=540), blank=True, null=True, size=None),
        ),
        migrations.AddField(
            model_name='project',
            name='wanted_description',
            field=models.CharField(blank=True, max_length=540, null=True),
        ),
    ]

# Generated by Django 5.1.7 on 2025-03-22 02:27

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('auth_id', models.IntegerField(default=999)),
                ('username', models.CharField(max_length=255, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('institution', models.CharField(blank=True, max_length=255, null=True)),
                ('followers', models.IntegerField(default=0)),
                ('likes', models.IntegerField(default=0)),
                ('position', models.JSONField(default=list)),
                ('tags', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=225), blank=True, null=True, size=None)),
            ],
        ),
    ]

# Generated by Django 5.1.7 on 2025-04-13 23:04

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0002_rename_interest_tags_user_colleges_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=36, primary_key=True, serialize=False),
        ),
    ]

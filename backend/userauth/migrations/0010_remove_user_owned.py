# Generated by Django 5.1.7 on 2025-04-26 03:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0009_remove_user_colleges_user_about_me_user_college_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='owned',
        ),
    ]

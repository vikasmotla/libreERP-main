# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-23 17:54
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('PIM', '0012_calendareventfollower'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='calendareventfollower',
            name='follow_ptr',
        ),
        migrations.RemoveField(
            model_name='calendareventfollower',
            name='parent',
        ),
        migrations.AddField(
            model_name='calendar',
            name='followers',
            field=models.ManyToManyField(blank=True, related_name='calendarItemsFollowing', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='calendarEventFollower',
        ),
    ]
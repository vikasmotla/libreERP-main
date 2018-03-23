# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-26 19:30
from __future__ import unicode_literals

import LMS.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('LMS', '0002_auto_20171126_1726'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='dp',
            field=models.FileField(null=True, upload_to=LMS.models.getCourseDPAttachmentPath),
        ),
        migrations.AddField(
            model_name='studymaterial',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
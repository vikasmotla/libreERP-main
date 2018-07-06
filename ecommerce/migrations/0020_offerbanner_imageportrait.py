# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-07-06 05:42
from __future__ import unicode_literals

from django.db import migrations, models
import ecommerce.models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0019_auto_20180706_0525'),
    ]

    operations = [
        migrations.AddField(
            model_name='offerbanner',
            name='imagePortrait',
            field=models.ImageField(null=True, upload_to=ecommerce.models.getEcommerceBannerUploadPath),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-13 22:54
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0037_auto_20160214_0402'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviewdislike',
            name='review',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dislikes', to='ecommerce.review'),
        ),
    ]
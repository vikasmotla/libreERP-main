# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-01-08 14:42
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0088_merge_20190108_1357'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listing', to='POS.Product'),
        ),
    ]

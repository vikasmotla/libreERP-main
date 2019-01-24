# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-12-28 07:03
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('POS', '0105_remove_product_productmeta'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='productMeta',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='POSProducts', to='POS.ProductMeta'),
        ),
    ]
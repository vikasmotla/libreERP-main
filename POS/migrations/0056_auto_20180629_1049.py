# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-29 10:49
from __future__ import unicode_literals

import POS.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('POS', '0055_product_compositionqtymap'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='compositionQtyMap',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.TextField(blank=True, max_length=10000, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='displayPicture',
            field=models.ImageField(blank=True, null=True, upload_to=POS.models.getPOSProductUploadPath),
        ),
        migrations.AlterField(
            model_name='product',
            name='serialId',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='serialNo',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='purchaseorder',
            name='status',
            field=models.CharField(choices=[('created', 'created'), ('sent', 'sent'), ('returned', 'returned'), ('cancelled', 'cancelled'), ('recieved', 'recieved'), ('reconciled', 'reconciled'), ('approved', 'approved')], default='created', max_length=10),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-11-28 05:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('POS', '0096_manufacturemanifest'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='unit',
            field=models.CharField(choices=[('Ton', 'Ton'), ('Kilogram', 'Kilogram'), ('Gram', 'Gram'), ('Litre', 'Litre'), ('Millilitre', 'Millilitre'), ('Quantity', 'Quantity'), ('Size', 'Size')], max_length=10, null=True),
        ),
    ]
# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-11-29 10:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('POS', '0100_merge_20181129_0756'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='unit',
            field=models.CharField(choices=[('Ton', 'Ton'), ('Kilogram', 'Kilogram'), ('Gram', 'Gram'), ('Litre', 'Litre'), ('Millilitre', 'Millilitre'), ('Quantity', 'Quantity'), ('Size', 'Size'), ('Size and Color', 'Size and Color')], max_length=10, null=True),
        ),
    ]

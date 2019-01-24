# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-11-28 06:47
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('POS', '0096_manufacturemanifest'),
    ]

    operations = [
        migrations.AddField(
            model_name='manufacturemanifest',
            name='specialInstruction',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='manufacturemanifest',
            name='status',
            field=models.CharField(choices=[('created', 'created'), ('started', 'started'), ('completed', 'completed')], max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='manufacturemanifest',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inProgress', to='POS.Product'),
        ),
    ]
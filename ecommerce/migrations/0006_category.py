# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-05-23 10:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import ecommerce.models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0005_auto_20180523_0719'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(max_length=50)),
                ('dp', models.ImageField(null=True, upload_to=ecommerce.models.getEcommerceCategoryDpPath)),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parentCategory', to='ecommerce.Category')),
            ],
        ),
    ]

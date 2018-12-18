# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-31 13:29
from __future__ import unicode_literals

import PIM.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ERP', '0005_service_contactperson'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('PIM', '0009_blogpost_suggestedproducts'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('emailSecondary', models.EmailField(max_length=254, null=True)),
                ('mobile', models.CharField(max_length=12, null=True)),
                ('mobileSecondary', models.CharField(max_length=12, null=True)),
                ('designation', models.CharField(max_length=30, null=True)),
                ('notes', models.TextField(max_length=300, null=True)),
                ('linkedin', models.CharField(max_length=100, null=True)),
                ('facebook', models.CharField(max_length=100, null=True)),
                ('dp', models.FileField(null=True, upload_to=PIM.models.getClientRelationshipContactDP)),
                ('male', models.BooleanField(default=True)),
                ('company', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='contactsPIM', to='ERP.service')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contactsuser', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-01-29 04:54
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('LMS', '0070_auto_20190128_1242'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaperGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateField(auto_now=True)),
                ('title', models.CharField(max_length=100, null=True)),
                ('description', models.TextField(null=True)),
                ('url', models.CharField(max_length=100, null=True)),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='paperGroupSubject', to='LMS.Subject')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='paperGroupUser', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

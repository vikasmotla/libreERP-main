# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-27 09:30
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('HR', '0019_auto_20180927_0814'),
    ]

    operations = [
        migrations.CreateModel(
            name='MobileContact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, null=True)),
                ('mobile', models.CharField(max_length=15, null=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='contactAuthored', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-11-29 06:31
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import projects.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0015_auto_20181129_0630'),
    ]

    operations = [
        migrations.CreateModel(
            name='Issues',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(max_length=50)),
                ('status', models.CharField(choices=[('inprogress', 'inprogress'), ('created', 'created'), ('resolved', 'resolved'), ('stuck', 'stuck')], default='created', max_length=50)),
                ('tentresdt', models.DateField()),
                ('priority', models.CharField(choices=[('high', 'high'), ('medium', 'medium'), ('low', 'low')], max_length=50)),
                ('result', models.CharField(choices=[('resolved', 'resolved'), ('partial', 'partial'), ('parked', 'parked')], max_length=50, null=True)),
                ('resultComments', models.CharField(max_length=500, null=True)),
                ('description', models.CharField(max_length=500, null=True)),
                ('file', models.FileField(blank=True, null=True, upload_to=projects.models.getcontentFilePath)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projectsIssue', to='projects.project')),
                ('responsible', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='projectsIssueResponsible', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
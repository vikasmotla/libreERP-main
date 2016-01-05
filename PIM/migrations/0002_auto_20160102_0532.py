# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-02 00:02
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('PIM', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='notebook',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notebooks', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='page',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('source', models.TextField(max_length=40000, null=True)),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pages', to='PIM.notebook')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notebookPages', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='blogcomment',
            name='text',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='blogpost',
            name='source',
            field=models.TextField(max_length=40000, null=True),
        ),
    ]
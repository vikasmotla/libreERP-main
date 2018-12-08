# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-12-08 11:58
from __future__ import unicode_literals

import PIM.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='blogCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='blogComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('text', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='blogCommentLike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='PIM.blogComment')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blogCommentlikes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='blogLike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='blogPost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('public', models.BooleanField(default=False)),
                ('title', models.CharField(max_length=500, null=True)),
                ('state', models.CharField(choices=[(b'saved', b'saved'), (b'archived', b'archived'), (b'published', b'published'), (b'hidden', b'hidden')], default=b'saved', max_length=20)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('header', models.TextField(max_length=1000, null=True)),
                ('sourceFormat', models.CharField(choices=[(b'md', b'md'), (b'html', b'html')], default=b'md', max_length=10)),
                ('source', models.TextField(max_length=40000, null=True)),
                ('contentType', models.CharField(choices=[(b'article', b'article'), (b'tutorial', b'tutorial'), (b'whitepaper', b'whitepaper'), (b'product', b'product'), (b'book', b'book'), (b'question', b'question')], default=b'article', max_length=15)),
                ('contentFK', models.PositiveIntegerField(null=True)),
                ('shortUrl', models.CharField(max_length=100, null=True, unique=True)),
                ('ogimageUrl', models.CharField(max_length=1000, null=True)),
                ('ogimage', models.ImageField(null=True, upload_to=PIM.models.getOGImageAttachment)),
                ('description', models.CharField(max_length=1000, null=True)),
                ('tagsCSV', models.CharField(max_length=1000, null=True)),
                ('section', models.CharField(max_length=100, null=True)),
                ('author', models.CharField(max_length=100, null=True)),
                ('tags', models.ManyToManyField(blank=True, related_name='articles', to='PIM.blogCategory')),
                ('users', models.ManyToManyField(related_name='articles', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='calendar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('visibility', models.CharField(choices=[(b'personal', b'personal'), (b'public', b'public'), (b'management', b'management'), (b'friends', b'friends')], default=b'personal', max_length=20)),
                ('eventType', models.CharField(choices=[(b'Meeting', b'Meeting'), (b'Reminder', b'Reminder'), (b'ToDo', b'ToDo'), (b'EVENT', b'EVENT'), (b'Deadline', b'Deadline'), (b'Other', b'Other')], default=b'Other', max_length=11)),
                ('originator', models.CharField(max_length=20, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('text', models.CharField(max_length=200, null=True)),
                ('when', models.DateTimeField(null=True)),
                ('duration', models.IntegerField(null=True)),
                ('read', models.BooleanField(default=False)),
                ('deleted', models.BooleanField(default=False)),
                ('completed', models.BooleanField(default=False)),
                ('canceled', models.BooleanField(default=False)),
                ('level', models.CharField(choices=[(b'Normal', b'Normal'), (b'Critical', b'Critical'), (b'Optional', b'Optional'), (b'Mandatory', b'Mandatory')], default=b'Normal', max_length=10)),
                ('venue', models.CharField(max_length=50, null=True)),
                ('attachment', models.FileField(null=True, upload_to=PIM.models.getCalendarAttachment)),
                ('myNotes', models.CharField(blank=True, max_length=100)),
                ('data', models.CharField(max_length=200, null=True)),
                ('followers', models.ManyToManyField(blank=True, related_name='calendarItemsFollowing', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='chatMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=200, null=True)),
                ('attachment', models.FileField(null=True, upload_to=PIM.models.getChatMessageAttachment)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('read', models.BooleanField(default=False)),
                ('originator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sentIMs', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='notebook',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(max_length=500, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notebooks', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField(max_length=300, null=True)),
                ('link', models.URLField(max_length=100, null=True)),
                ('shortInfo', models.CharField(max_length=250, null=True)),
                ('read', models.BooleanField(default=False)),
                ('domain', models.CharField(choices=[(b'System', b'System'), (b'Administration', b'Administration'), (b'Application', b'Application')], default=b'SYS', max_length=3)),
                ('originator', models.CharField(max_length=20, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('onHold', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='page',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('source', models.TextField(max_length=1000000, null=True)),
                ('title', models.CharField(max_length=500, null=True)),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pages', to='PIM.notebook')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notebookPages', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='settings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('presence', models.CharField(choices=[(b'NA', b'NA'), (b'Available', b'Available'), (b'Busy', b'Busy'), (b'Away', b'Away'), (b'On Leave', b'On Leave'), (b'In A Meeting', b'In a meeting')], default=b'NA', max_length=15)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='theme',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('main', models.CharField(max_length=10, null=True)),
                ('highlight', models.CharField(max_length=10, null=True)),
                ('background', models.CharField(max_length=10, null=True)),
                ('backgroundImg', models.ImageField(null=True, upload_to=PIM.models.getThemeImageUploadPath)),
                ('parent', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='theme', to='PIM.settings')),
            ],
        ),
        migrations.AddField(
            model_name='calendar',
            name='notification',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='PIM.notification'),
        ),
        migrations.AddField(
            model_name='calendar',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='bloglike',
            name='parent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='PIM.blogPost'),
        ),
        migrations.AddField(
            model_name='bloglike',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blogLikes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='blogcomment',
            name='parent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='PIM.blogPost'),
        ),
        migrations.AddField(
            model_name='blogcomment',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blogComments', to=settings.AUTH_USER_MODEL),
        ),
    ]

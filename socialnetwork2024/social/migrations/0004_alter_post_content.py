# Generated by Django 5.1.4 on 2025-01-09 00:14

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0003_topic_active_topic_created_date_topic_updated_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content',
            field=ckeditor.fields.RichTextField(),
        ),
    ]
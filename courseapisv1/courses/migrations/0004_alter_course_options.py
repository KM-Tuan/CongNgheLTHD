# Generated by Django 5.1.2 on 2024-10-24 02:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0003_course_category_alter_course_created_day_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='course',
            options={'ordering': ['-id']},
        ),
    ]

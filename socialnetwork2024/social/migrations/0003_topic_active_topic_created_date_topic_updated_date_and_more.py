# Generated by Django 5.1.4 on 2025-01-08 15:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0002_topic'),
    ]

    operations = [
        migrations.AddField(
            model_name='topic',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='topic',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='topic',
            name='updated_date',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='topic',
            unique_together={('name', 'category')},
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_date', models.DateTimeField(auto_now=True, null=True)),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('image', models.ImageField(upload_to='posts/%Y/%m')),
                ('topic', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='social.topic')),
            ],
            options={
                'ordering': ['-id'],
                'abstract': False,
            },
        ),
    ]

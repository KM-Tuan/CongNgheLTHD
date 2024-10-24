from tkinter.font import names

from django.core.files.images import ImageFile
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Model


class User(AbstractUser):
    pass

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class BaseModel(models.Model):
    active = models.BooleanField(default=True)
    created_day = models.DateTimeField(auto_now_add=True, null=True)
    updated_day = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True
        ordering = ["-id"]

class Course(BaseModel):
    subject = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    image = models.ImageField(upload_to='courses/%Y/%m/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.subject

    class Meta:
        unique_together = ['subject', 'category']

class Lesson(BaseModel):
    subject = models.CharField(max_length=255, unique=True)
    content = models.TextField()
    image = models.ImageField(upload_to='courses/%Y/%m/')
    course = models.ForeignKey(Course, on_delete=models.RESTRICT)

    def __str__(self):
        return self.subject
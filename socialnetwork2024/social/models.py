from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class BaseModel(models.Model):
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True
        ordering = ["-id"]


class Topic(BaseModel):
    name = models.CharField(max_length=255, null=False)
    description = models.TextField()
    #vì Topic mình chỉ cần cái name với description thôi nên tui không thêm thuộc tính image ở trong này
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ['name', 'category']

class Post(BaseModel):
    title = models.CharField(max_length=255, null=False)
    content = models.TextField(null=False)
    image = models.ImageField(upload_to="posts/%Y/%m")
    topic = models.ForeignKey(Topic, on_delete=models.RESTRICT)

    def __str__(self):
        return self.title
from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField

class User(AbstractUser):
    pass

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class BaseModel(models.Model): #Lớp trừu tượng
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True
        ordering = ["-id"] #Giảm dần theo id


class Topic(BaseModel):
    name = models.CharField(max_length=255, null=False)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ['name', 'category'] #Ràng buộc: trong 1 category thì không được có 2 topic trùng tên

class Post(BaseModel):
    title = models.CharField(max_length=255, null=False)
    content = RichTextField(null=False)
    image = models.ImageField(upload_to="posts/%Y/%m")
    topic = models.ForeignKey(Topic, on_delete=models.RESTRICT)

    def __str__(self):
        return self.title
from tkinter.constants import CASCADE
from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField


class User(AbstractUser):
    avatar = CloudinaryField(null=True)


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class BaseModel(models.Model):  # Lớp trừu tượng
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True
        ordering = ["-id"]  # Giảm dần theo id


class Topic(BaseModel):
    name = models.CharField(max_length=255, null=False)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ['name', 'category']  # Ràng buộc: trong 1 category thì không được có 2 topic trùng tên


class Post(BaseModel):
    title = models.CharField(max_length=255, null=False)
    content = RichTextField(null=False)
    image = models.ImageField(upload_to="posts/%Y/%m")
    topic = models.ForeignKey(Topic, on_delete=models.RESTRICT)
    tag = models.ManyToManyField('Tag')  # Quan hệ nhiều nhiều: 1 bài post thì có nhiều tag

    def __str__(self):
        return self.title


class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Interaction(BaseModel):  # Lớp trừu tượng
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Comment(Interaction):
    content = models.TextField()

    def __str__(self):
        return self.content


class Like(Interaction):
    class Meta:
        unique_together = ['user', 'post']


class Haha(Interaction):
    class Meta:
        unique_together = ['user', 'post']


class Love(Interaction):
    class Meta:
        unique_together = ['user', 'post']

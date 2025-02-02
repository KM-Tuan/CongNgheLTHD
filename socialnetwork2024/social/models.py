from tkinter.constants import CASCADE
from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField


class User(AbstractUser):
    class Roles(models.TextChoices):
        ADMIN = 'admin', 'Quản trị viên'
        LECTURER = 'lecturer', 'Giảng viên'
        ALUMNI = 'alumni', 'Cựu sinh viên'

    avatar = CloudinaryField(null=True, blank=True)
    pic_cover = CloudinaryField(null=True, blank=True)
    role = models.CharField(
        max_length=20,
        choices=Roles.choices,
        default=Roles.ALUMNI,  # Mặc định là Cựu sinh viên
    )

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


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
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title


class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Interaction(BaseModel):  # Lớp trừu tượng
    active = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=False)

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

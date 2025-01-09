from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField

class User(AbstractUser):
    pass

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class BaseModel(models.Model): #Lớp này là lớp trừu tượng nha
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True
        ordering = ["-id"] #Cái ordering này là khi mà hiển thị danh sách nó giảm dần theo id nè


class Topic(BaseModel): #Vì Topic mình chỉ cần cái name với description thôi nên tui không thêm thuộc tính image ở trong này
    name = models.CharField(max_length=255, null=False)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ['name', 'category']

class Post(BaseModel):
    title = models.CharField(max_length=255, null=False)
    content = RichTextField(null=False)
    image = models.ImageField(upload_to="posts/%Y/%m")
    topic = models.ForeignKey(Topic, on_delete=models.RESTRICT)

    def __str__(self):
        return self.title
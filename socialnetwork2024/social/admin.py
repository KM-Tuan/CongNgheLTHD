from django.contrib import admin
from django.utils.safestring import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from social.models import Category, Topic, Post


class PostForm(forms.ModelForm):  # Tạo form tùy chỉnh ô nội dung
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Post
        fields = '__all__'


class PostAdmin(admin.ModelAdmin):  # Ghi đè lớp Post để tùy chỉnh giao diện
    list_display = ['id', 'title', 'active', 'created_date']  # Hiển thị thông tin các cột
    search_fields = ['title', 'content']  # Hiển thị ô tìm kiếm
    list_filter = ['id', 'title', 'created_date']  # Hiển thị khung lọc
    readonly_fields = ['avatar']  # Hiển thị ảnh xem trước trong mục nhập thông tin
    form = PostForm  # Tùy chỉnh ô nội dung

    def avatar(self, post):
        return mark_safe(f"<img src='/static/{post.image.name}' width=200 /")


# Hiển thị lên trang web admin
admin.site.register(Category)
admin.site.register(Topic)
admin.site.register(Post, PostAdmin)

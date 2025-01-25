from django.contrib import admin
from django.contrib.auth.hashers import make_password
from django.db.models import Count
from django.template.response import TemplateResponse
from django.utils.safestring import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from social.models import Category, Topic, Post, Tag, Comment, User, Like, Haha, Love
from django.urls import path


# Trang chủ thống kê chủ đề
class MyTopicAdmin(admin.AdminSite):
    site_header = "HỆ THỐNG SOCIAL NETWORK MANAGER"

    def get_urls(self):
        return [path('stats/', self.stats)] + super().get_urls()

    def stats(self, request):
        stats = Category.objects.annotate(count=Count('topic__id')).values('id', 'name', 'count')
        return TemplateResponse(request, 'admin/stats.html', {
            'stats': stats
        })


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


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'is_active', 'is_staff', 'role']
    search_fields = ['username', 'email']
    list_filter = ('role', 'is_active')

    def save_model(self, request, obj, form, change):
        obj.password = make_password(obj.password)
        super().save_model(request, obj, form, change)

# Hiển thị lên trang web admin
admin_site = MyTopicAdmin()

admin_site.register(Category)
admin_site.register(Topic)
admin_site.register(User, UserAdmin)
admin_site.register(Post, PostAdmin)
admin_site.register(Tag)
admin_site.register(Like)
admin_site.register(Haha)
admin_site.register(Love)
admin_site.register(Comment)
from django.contrib import admin
from django.utils.safestring import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from social.models import Category, Topic, Post


class PostForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Post
        fields = '__all__'


class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'active', 'created_date']
    search_fields = ['title', 'content']
    list_filter = ['id', 'title', 'created_date']
    readonly_fields = ['avatar']
    form = PostForm

    def avatar(self, post):
        return mark_safe(f"<img src='/static/{post.image.name}' width=200 /")


admin.site.register(Category)
admin.site.register(Topic)
admin.site.register(Post, PostAdmin)

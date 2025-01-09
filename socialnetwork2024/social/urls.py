from django.urls import path, include
from rest_framework.routers import DefaultRouter
from social import views

# Hiển thị các APIs lên trang chủ swagger
r = DefaultRouter()
r.register('categories', views.CategoryViewSet, basename='category')
r.register('topics', views.TopicViewSet, basename='topic')

urlpatterns = [
    path('', include(r.urls )),
]
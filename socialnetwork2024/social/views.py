from pickle import FALSE
from turtledemo.penrose import start
import tkinter

from rest_framework import viewsets, generics, permissions
from social.models import Category, Topic, Post, User, Comment, Like, Haha, Love
from social import serializers, paginators, perms
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):  # API Category
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer


class TopicViewSet(viewsets.ViewSet, generics.ListAPIView):  # API Topic
    queryset = Topic.objects.filter(active=True)
    serializer_class = serializers.TopicSerializer
    pagination_class = paginators.TopicPagination

    def get_queryset(self):
        query = self.queryset
        cate_id = self.request.query_params.get('category_id')

        if cate_id:
            query = query.filter(category_id=cate_id)  # Lấy danh sách các topic thuộc category

        q = self.request.query_params.get("q")
        if q:
            query = query.filter(name__icontains=q)  # Tìm kiếm topic theo tên

        return query

    @action(methods=['get'], url_path='posts', detail=True)  # Lấy danh sách các bài post thuộc topic
    def get_posts(self, request, pk):
        posts = self.get_object().post_set.filter(active=True)
        return Response(serializers.PostSerializer(posts, many=True, context={'request': request}).data)


class PostViewSet(viewsets.ViewSet, generics.RetrieveAPIView):  # API Post
    queryset = Post.objects.prefetch_related('tag').filter(active=True)
    serializer_class = serializers.PostDetailsSerializer

    def get_permissions(self):
        if self.action in ['get_comments', 'like', 'haha', 'love'] and self.request.method in ['POST']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get', 'post'], url_path='comments', detail=True)
    def get_comments(self, request, pk):  # Lấy danh sách các comment thuộc bài post
        if request.method.__eq__('POST'):
            content = request.data.get('content')
            c = Comment.objects.create(content=content, user=request.user, post=self.get_object())
            return Response(serializers.CommentSerializer(c).data)
        else:
            comments = self.get_object().comment_set.select_related('user').filter(active=True)
            return Response(serializers.CommentSerializer(comments, many=True).data)

    @action(methods=['post'], url_path='likes', detail=True)
    def like(self, request, pk):
        like, created = Like.objects.get_or_create(user=request.user, post=self.get_object())
        if not created:
            like.active = not like.active
            like.save()
        return Response(serializers.PostDetailsSerializer(self.get_object(), context={'request': request}).data)

    @action(methods=['post'], url_path='hahas', detail=True)
    def haha(self, request, pk):
        haha, created = Haha.objects.get_or_create(user=request.user, post=self.get_object())
        if not created:
            haha.active = not haha.active
            haha.save()
        return Response(serializers.PostDetailsSerializer(self.get_object(), context={'request': request}).data)

    @action(methods=['post'], url_path='loves', detail=True)
    def love(self, request, pk):
        love, created = Love.objects.get_or_create(user=request.user, post=self.get_object())
        if not created:
            love.active = not love.active
            love.save()
        return Response(serializers.PostDetailsSerializer(self.get_object(), context={'request': request}).data)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):  # API User
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer

    @action(methods=['get'], url_path='current-user', detail=False, permission_classes=[permissions.IsAuthenticated])
    def get_user(self, request):
        return Response(serializers.UserSerializer(request.user).data)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.filter(active=True)
    serializer_class = serializers.CommentSerializer
    permission_classes = [perms.OwnerPerms]

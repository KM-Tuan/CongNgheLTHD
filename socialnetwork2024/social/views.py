from rest_framework import viewsets, generics
from social.models import Category, Topic, Post
from social import serializers, paginators
from rest_framework.decorators import action
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
            query = query.filter(category_id=cate_id)  # Lấy danh sách các chủ đề thuộc danh mục

        q = self.request.query_params.get("q")
        if q:
            query = query.filter(name__icontains=q)  # Tìm kiếm chủ đề theo tên

        return query

    @action(methods=['get'], url_path='posts', detail=True) # Lấy danh sách các bài đăng thuộc chủ đề
    def get_posts(self, request, pk):
        posts = self.get_object().post_set.filter(active=True)
        return Response(serializers.PostSerializer(posts, many=True, context={'request': request}).data)

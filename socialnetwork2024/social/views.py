from rest_framework import viewsets, generics
from social.models import Category, Topic, Post
from social import serializers, paginators


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView): # API Category
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer


class TopicViewSet(viewsets.ViewSet, generics.ListAPIView): # API Topic
    queryset = Topic.objects.filter(active=True)
    serializer_class = serializers.TopicSerializer
    pagination_class = paginators.TopicPagination

    def get_queryset(self):
        query = self.queryset

        q = self.request.query_params.get("q")
        if q:
            query = query.filter(name__icontains=q)

        return query

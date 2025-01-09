from rest_framework import serializers
from social.models import Category, Topic, Post

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'name', 'category_id']

class PostSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')

    def get_image(self, post):
        request =  self.context.get('request')
        if request and post.image:
            return request.build_absolute_uri('/static/%s' % post.image)

    class Meta:
        model = Post
        fields = ['id', 'title', 'image', 'topic_id']
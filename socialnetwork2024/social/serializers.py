from rest_framework import serializers
from social.models import Category, Topic, Post, Tag, User, Comment


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

    def get_image(self, post):  # Click đường link ảnh trong APIs
        request = self.context.get('request')
        if request and post.image:
            return request.build_absolute_uri('/static/%s' % post.image)

    class Meta:
        model = Post
        fields = ['id', 'title', 'image', 'topic_id']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class PostDetailsSerializer(PostSerializer):
    tag = TagSerializer(many=True)
    like = serializers.SerializerMethodField()

    def get_like(self, post):
        request = self.context.get('request')
        if request.user.is_authenticated:
            return post.like_set.filter(active=True).exists()

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + ['content', 'tag', 'like']


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):  # Băm mật khẩu
        data = validated_data.copy()
        u = User(**data)
        u.set_password(u.password)
        u.save()
        return u

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['avatar'] = instance.avatar.url if instance.avatar else ''
        return data

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'avatar']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'created_date', 'content', 'user']

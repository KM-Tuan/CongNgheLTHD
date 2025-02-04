from rest_framework import serializers
from social.models import Category, Topic, Post, Tag, User, Comment
from rest_framework.exceptions import ValidationError


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class TopicSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Topic
        fields = ['id', 'name', 'category']


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
        data['pic_cover'] = instance.pic_cover.url if instance.pic_cover else ''
        data['role'] = instance.get_role_display()
        return data

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'avatar', 'role', 'email', 'pic_cover']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


class PostSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')
    user =  UserSerializer()
    topic = TopicSerializer()

    def get_image(self, post):  # Click đường link ảnh trong APIs
        request = self.context.get('request')
        if request and post.image:
            return request.build_absolute_uri('/static/%s' % post.image)

    class Meta:
        model = Post
        fields = ['id','content', 'title', 'image', 'topic', 'created_date', 'user']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class PostDetailsSerializer(PostSerializer):
    tag = TagSerializer(many=True)
    like = serializers.SerializerMethodField()
    haha = serializers.SerializerMethodField()
    love = serializers.SerializerMethodField()

    def get_like(self,post):
        request = self.context.get('request')
        if request.user.is_authenticated:
            return post.like_set.filter(user=request.user, active=True).exists()

    def get_haha(self,post):
        request = self.context.get('request')
        if request.user.is_authenticated:
            return post.haha_set.filter(user=request.user, active=True).exists()

    def get_love(self, post):
        request = self.context.get('request')
        if request.user.is_authenticated:
            return post.love_set.filter(user=request.user, active=True).exists()

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + ['content', 'tag', 'like', 'haha', 'love']


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    #post = PostSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'created_date', 'content', 'user']



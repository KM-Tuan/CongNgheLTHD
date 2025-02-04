from rest_framework import viewsets, generics, permissions
from social.models import Category, Topic, Post, User, Comment, Like, Haha, Love
from social import serializers, paginators, perms
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response

from social.perms import IsAdmin, IsLecturer, IsAlumni

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

    def get_reaction_count(self, post):
        return {
            "like": post.like_set.filter(active=True).count(),
            "haha": post.haha_set.filter(active=True).count(),
            "love": post.love_set.filter(active=True).count()
        }

    def validate_reaction(self, user, post, reaction_type):
        """
        Kiểm tra xem user đã thả cảm xúc nào khác chưa.
        Nếu đã thả cảm xúc khác, raise ValidationError.
        """
        if reaction_type != 'like' and Like.objects.filter(user=user, post=post, active=True).exists():
            raise serializers.ValidationError("You already liked this post.")
        if reaction_type != 'haha' and Haha.objects.filter(user=user, post=post, active=True).exists():
            raise serializers.ValidationError("You already reacted with 'haha' to this post.")
        if reaction_type != 'love' and Love.objects.filter(user=user, post=post, active=True).exists():
            raise serializers.ValidationError("You already reacted with 'love' to this post.")

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
        post = self.get_object()
        self.validate_reaction(request.user, post, 'like')
        like, created = Like.objects.get_or_create(user=request.user, post=self.get_object())
        if not created:
            like.active = not like.active
            like.save()

        reaction_count = self.get_reaction_count(post)
        #return Response({'reaction_counts': self.get_reaction_count(post)})
        response_data = serializers.PostDetailsSerializer(self.get_object(), context={'request': request}).data
        response_data['reaction_counts'] = reaction_count
        return Response(response_data)

    @action(methods=['post'], url_path='hahas', detail=True)
    def haha(self, request, pk):
        post = self.get_object()
        self.validate_reaction(request.user, post, 'haha')
        haha, created = Haha.objects.get_or_create(user=request.user, post=self.get_object())
        if not created:
            haha.active = not haha.active
            haha.save()
        reaction_count = self.get_reaction_count(post)
        #return Response({'reaction_counts': self.get_reaction_count(post)})
        response_data = serializers.PostDetailsSerializer(self.get_object(), context={'request': request}).data
        response_data['reaction_counts'] = reaction_count
        return Response(response_data)

    @action(methods=['post'], url_path='loves', detail=True)
    def love(self, request, pk):
        post = self.get_object()
        self.validate_reaction(request.user, post, 'love')
        love, created = Love.objects.get_or_create(user=request.user, post=self.get_object())
        if not created:
            love.active = not love.active
            love.save()
        reaction_count = self.get_reaction_count(post)
        #return Response({'reaction_counts': self.get_reaction_count(post)})
        response_data = serializers.PostDetailsSerializer(self.get_object(), context={'request': request}).data
        response_data['reaction_counts'] = reaction_count
        return Response(response_data)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):  # API User
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer

    @action(methods=['get'], url_path='current-user', detail=False, permission_classes=[permissions.IsAuthenticated])
    def get_user(self, request):
        return Response(serializers.UserSerializer(request.user).data)

    @action(methods=['get'], url_path='admin-actions', detail=False, permission_classes=[IsAdmin])
    def admin_actions(self, request):
        # Dành riêng cho quản trị viên
        return Response({"message": "Welcome Admin!"})

    @action(methods=['get'], url_path='lecturer-actions', detail=False, permission_classes=[IsLecturer])
    def lecturer_actions(self, request):
        # Dành riêng cho giảng viên
        return Response({"message": "Welcome Lecturer!"})

    @action(methods=['get'], url_path='alumni-actions', detail=False, permission_classes=[IsAlumni])
    def alumni_actions(self, request):
        # Dành riêng cho cựu sinh viên
        return Response({"message": "Welcome Alumni!"})


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.filter(active=True)
    serializer_class = serializers.CommentSerializer
    permission_classes = [perms.OwnerPerms]

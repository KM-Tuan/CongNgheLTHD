from rest_framework import pagination


class TopicPagination(pagination.PageNumberPagination):  # Phân trang
    page_size = 3

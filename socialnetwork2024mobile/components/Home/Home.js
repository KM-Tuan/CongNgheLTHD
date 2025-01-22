import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import HomeStyles from '../../components/Home/HomeStyles';


export default Home = () => {
  return (
    <View style={HomeStyles.container}>
      {/* Header */}
      <View style={HomeStyles.header}>
        <Text style={HomeStyles.headerTitle}>Social Network</Text>
        <TextInput style={HomeStyles.searchBar} placeholder="Search..." />
        <TouchableOpacity style={HomeStyles.menuButton}>
          <Text style={HomeStyles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={HomeStyles.content}>
        {/* Post Input */}
        <View style={HomeStyles.inputSection}>
          <View style={HomeStyles.avatar} />
          <TextInput style={HomeStyles.input} placeholder="Bạn đang nghĩ về điều gì?" />
        </View>

        {/* Post 1 */}
        <View style={HomeStyles.post}>
          <View style={HomeStyles.postHeader}>
            <View style={HomeStyles.postAvatar} />
            <View>
              <Text style={HomeStyles.postAuthor}>Cựu SV A</Text>
              <Text style={HomeStyles.postDate}>Ngày đăng tải: 20/01/2025</Text>
            </View>
            <TouchableOpacity>
              <Text style={HomeStyles.exchangeButton}>Trao đổi</Text>
            </TouchableOpacity>
          </View>
          <Text style={HomeStyles.postContent}>Học lập trình nên bắt đầu từ đâu?</Text>
          <Text style={HomeStyles.postTag}>#Hỏi & Đáp</Text>
          <View style={HomeStyles.postFooter}>
            <Text style={HomeStyles.postStats}>10 like, 22 haha, 1 love</Text>
            <Text style={HomeStyles.postComments}>2 bình luận</Text>
          </View>
          <View style={HomeStyles.actions}>
            <TouchableOpacity>
              <Text style={HomeStyles.actionButton}>👍 Thích</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={HomeStyles.actionButton}>💬 Bình luận</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Post 2 */}
        <View style={HomeStyles.post}>
          <View style={HomeStyles.postHeader}>
            <View style={HomeStyles.postAvatar} />
            <View>
              <Text style={HomeStyles.postAuthor}>Giảng Viên A</Text>
              <Text style={HomeStyles.postDate}>Ngày đăng tải: 19/01/2025</Text>
            </View>
            <TouchableOpacity>
              <Text style={HomeStyles.exchangeButton}>Sự kiện</Text>
            </TouchableOpacity>
          </View>
          <Text style={HomeStyles.postContent}>Hội thảo lập trình Ứng Dụng Di động</Text>
          <Text style={HomeStyles.postTag}>#Hội thảo chuyên đề</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={HomeStyles.footer}>
        <TouchableOpacity>
          <Text style={HomeStyles.footerButton}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={HomeStyles.footerButton}>Cá nhân</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

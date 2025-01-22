import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import PersonalStyles from '../../components/Personal/PersonalStyles';



export default Personal = () => {

  return (
    <View style={PersonalStyles.container}>
      {/* Header */}
      <View style={PersonalStyles.header}>
        <Text style={PersonalStyles.headerTitle}>Social Network</Text>
        <TextInput style={PersonalStyles.searchBox} placeholder="Search" />
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={PersonalStyles.mainContent}>
        {/* Post */}
        <View style={PersonalStyles.post}>
          <View style={PersonalStyles.postHeader}>
            <View style={PersonalStyles.avatar} />
            <View>
              <Text style={PersonalStyles.username}>Cựu SV A</Text>
              <Text style={PersonalStyles.postDate}>Ngày đăng tải: 20/01/2025</Text>
            </View>
          </View>
          <Text style={PersonalStyles.postText}>Học lập trình nên bắt đầu từ đâu?</Text>
          <Text style={PersonalStyles.tag}>#Hỏi & Đáp</Text>
          <View style={PersonalStyles.postFooter}>
            <Text style={PersonalStyles.reactions}>10 like, 22 haha, 1 love</Text>
            <Text style={PersonalStyles.comments}>2 bình luận</Text>
          </View>
        </View>

        {/* Another Post */}
        <View style={PersonalStyles.post}>
          <View style={PersonalStyles.postHeader}>
            <View style={PersonalStyles.avatar} />
            <View>
              <Text style={PersonalStyles.username}>Cựu SV A</Text>
              <Text style={PersonalStyles.postDate}>Ngày đăng tải: 17/01/2025</Text>
            </View>
          </View>
          <Text style={PersonalStyles.postText}>Giải pháp phần mềm chuyên dụng</Text>
          <Text style={PersonalStyles.tag}>#Tin tức & Xu hướng</Text>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={PersonalStyles.footer}>
        <TouchableOpacity>
          <Text style={PersonalStyles.footerButton}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={PersonalStyles.footerButton}>Cá nhân</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

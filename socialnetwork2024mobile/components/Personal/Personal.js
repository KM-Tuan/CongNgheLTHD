import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import PersonalStyles from '../../components/Personal/PersonalStyles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useContext } from 'react';
import { MyUserConText } from '../../configs/UserContexts';




export default Personal = () => {
  const nav = useNavigation();
  const user = useContext(MyUserConText);

  return (
    <View style={PersonalStyles.container}>
      {/* Header */}
      <View style={PersonalStyles.header}>
        <Text style={PersonalStyles.headerTitle}>Social Network</Text>
        <TextInput style={PersonalStyles.searchBar} placeholder="Search" />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={PersonalStyles.content}>
        {/* Avatar Cover */}
        <View style={PersonalStyles.info}>
          <Image style={PersonalStyles.avatarCover} source={{uri: user?._j?.pic_cover || "null"}} />
          <Image style={PersonalStyles.avatar} source={{uri: user?._j?.avatar || "null"}} />
          <Text style={PersonalStyles.author}>{user?._j?.first_name || "null"} {user?._j?.last_name || "null"}</Text>
        </View>




        {/* Post */}
        <View style={PersonalStyles.post}>
          <View style={PersonalStyles.HeaderRow}>
            <Image style={PersonalStyles.postAvatar} source={{ uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png' }} />
            <View style={PersonalStyles.HeaderCol}>
              <Text style={PersonalStyles.postAuthor}>Cựu SV A</Text>
              <Text style={PersonalStyles.postDate}>Ngày đăng tải: 20/01/2025</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="star" size={15} color="#2e3192" style={{ marginLeft: 50, marginRight: 5}} />
              <Text style={PersonalStyles.postCategory}>Trao đổi</Text>
            </View>
          </View>
          <Text style={PersonalStyles.postTitle}>Học lập trình nên bắt đầu từ đâu?</Text>
          <Text style={PersonalStyles.postContent}>Trong thời gian gần đây em đang bị phân vân không biết nên bắt đầu học lập trình từ đâu? Và gặp phải những trở ngại khó khăn gì? Mọi người có thể cho em xin vài lời khuyên được không ạ?</Text>
          <Text style={PersonalStyles.postTag}>#Hỏi & Đáp</Text>
          <Image style={PersonalStyles.postImage} source={{ uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png' }} />
          <View style={PersonalStyles.postFooter}>
            <Text style={PersonalStyles.postStats}>10 like, 22 haha, 1 love</Text>
            <Text style={PersonalStyles.postComments}>2 bình luận</Text>
          </View>
          <View style={PersonalStyles.actions}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="thumbs-up" size={20} color="black" style={{ marginRight: 12 }} />
              <Text style={PersonalStyles.actionButton}>Thích</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nav.navigate('postdetails')} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="comment" size={20} color="black" style={{ marginRight: 12 }} />
              <Text style={PersonalStyles.actionButton}>Bình luận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import HomeStyles from '../../components/Home/HomeStyles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';


export default Home = () => {
  const nav = useNavigation();

  return (
    <View style={HomeStyles.container}>
      {/* Header */}
      <View style={HomeStyles.header}>
        <Text style={HomeStyles.headerTitle}>Social Network</Text>
        <TextInput style={HomeStyles.searchBar} placeholder="Search" />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={HomeStyles.content}>
        {/* Post Input */}
        <View style={HomeStyles.inputSection}>
          <Image style={HomeStyles.avatar} source={{uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png'}} />
          <TouchableOpacity onPress={() => nav.navigate('post')}>
            <Text style={HomeStyles.input}>Bạn đang nghĩ về điều gì?</Text>
          </TouchableOpacity>
        </View>

        {/* Post */}
        <View style={HomeStyles.post}>
          <View style={HomeStyles.HeaderRow}>
            <Image style={HomeStyles.postAvatar} source={{uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png'}} />
            <View style={HomeStyles.HeaderCol}>
              <Text style={HomeStyles.postAuthor}>Cựu SV A</Text>
              <Text style={HomeStyles.postDate}>Ngày đăng tải: 20/01/2025</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="star" size={20} color="#2e3192" style={{marginLeft: 70, marginRight: 8}}/>
                <Text style={HomeStyles.postCategory}>Trao đổi</Text>
            </View>
            
          </View>
          <Text style={HomeStyles.postTitle}>Học lập trình nên bắt đầu từ đâu?</Text>
          <Text style={HomeStyles.postContent}>Trong thời gian gần đây em đang bị phân vân không biết nên bắt đầu học lập trình từ đâu? Và gặp phải những trở ngại khó khăn gì? Mọi người có thể cho em xin vài lời khuyên được không ạ?</Text>
          <Text style={HomeStyles.postTag}>#Hỏi & Đáp</Text>
          <Image style={HomeStyles.postImage} source={{uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png'}} />
          <View style={HomeStyles.postFooter}>
            <Text style={HomeStyles.postStats}>10 like, 22 haha, 1 love</Text>
            <Text style={HomeStyles.postComments}>2 bình luận</Text>
          </View>
          <View style={HomeStyles.actions}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="thumbs-up" size={20} color="black" style={{ marginRight: 12 }}/>
              <Text style={HomeStyles.actionButton}>Thích</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="comment" size={20} color="black" style={{ marginRight: 12 }}/>
              <Text style={HomeStyles.actionButton}>Bình luận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={HomeStyles.footer}>
        <TouchableOpacity style={HomeStyles.footerButton}>
        <FontAwesome name="home" size={24} color="black" style={HomeStyles.icon} />
          <Text style={HomeStyles.footerButton}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('personal')} style={HomeStyles.footerButton}>
        <FontAwesome name="user" size={24} color="#00000060" style={HomeStyles.icon} />
          <Text style={HomeStyles.footerButton}>Cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('menu')} style={HomeStyles.footerButton}>
        <FontAwesome name="bars" size={24} color="#00000060" style={HomeStyles.icon} />
          <Text style={HomeStyles.footerButton}>Tiện ích</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
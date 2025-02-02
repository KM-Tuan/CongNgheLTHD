import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, useWindowDimensions, Dimensions } from 'react-native';
import PostListStyles from '../../components/PostList/PostListStyles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import APIs, { endpoints } from '../../configs/APIs';
import { ActivityIndicator } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import { useContext } from 'react';
import { MyUserConText } from '../../configs/UserContexts';



export default PostList = ({ route = { params: {} } }) => {
  const topicId = route.params?.topicId || '';
  const [posts, setPosts] = useState(null);
  const { width: contentWidth } = useWindowDimensions();
  const user = useContext(MyUserConText);

  const formatDate = (dateString='') => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');       // Lấy ngày, thêm số 0 nếu cần
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tính từ 0)
    const year = date.getFullYear();                            // Lấy năm
    return `${day}/${month}/${year}`;                            // Định dạng theo kiểu dd/MM/yyyy
  };

  const RenderHTMLWrapper = ({ contentWidth, source }) => {
    const defaultContentWidth = Dimensions.get('window').width;
    return <RenderHTML contentWidth={contentWidth || defaultContentWidth} source={source} />;
  };

  const loadPosts = async () => {
    let res = await APIs.get(endpoints['posts'](topicId))
    setPosts(res.data);
    console.info(res.data);
  }

  useEffect(() => {
    loadPosts();
  }, [topicId]);

  const nav = useNavigation();

  return (
    <View style={PostListStyles.container}>
      {/* Header */}
      <View style={PostListStyles.header}>
        <Text style={PostListStyles.headerTitle}>Social Network</Text>
        <TextInput style={PostListStyles.searchBar} placeholder="Search" />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={PostListStyles.content}>

        {/* Post Input */}
        <View style={PostListStyles.inputSection}>
          <Image style={PostListStyles.avatar} source={{ uri: user?._j?.avatar || "null" }} />
          <TouchableOpacity onPress={() => nav.navigate('post')}>
            <Text style={PostListStyles.input}>Bạn đang nghĩ về điều gì?</Text>
          </TouchableOpacity>
        </View>

        {posts === null ? <ActivityIndicator /> : <>
          {posts.map(p =>
            <View key={p.id} style={PostListStyles.post}>
              <View style={PostListStyles.HeaderRow}>
                <Image style={PostListStyles.postAvatar} source={{ uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png' }} />
                <View style={PostListStyles.HeaderCol}>
                  <Text style={PostListStyles.postAuthor}>Cựu SV A</Text>
                  <Text style={PostListStyles.postDate}>Ngày đăng tải: {formatDate(p.created_date)}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome name="star" size={20} color="#2e3192" style={{ marginLeft: 70, marginRight: 8 }} />
                  <Text style={PostListStyles.postCategory}>Trao đổi</Text>
                </View>

              </View>
              <Text style={PostListStyles.postTitle}>{p.title}</Text>
              <Text style={PostListStyles.postContent}>{<RenderHTML
                contentWidth={contentWidth}
                source={{ 'html': p.content }}
              />}</Text>
              <Text style={PostListStyles.postTag}>#Hỏi & Đáp</Text>
              <Image style={PostListStyles.postImage} source={{ uri: p.image }} />
              <View style={PostListStyles.postFooter}>
                <Text style={PostListStyles.postStats}>10 like, 22 haha, 1 love</Text>
                <Text style={PostListStyles.postComments}>2 bình luận</Text>
              </View>
              <View style={PostListStyles.actions}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome name="thumbs-up" size={20} color="black" style={{ marginRight: 12 }} />
                  <Text style={PostListStyles.actionButton}>Thích</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav.navigate('postdetails')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome name="comment" size={20} color="black" style={{ marginRight: 12 }} />
                  <Text style={PostListStyles.actionButton}>Bình luận</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>}

        {/* Post */}

      </ScrollView>
    </View>
  );
};
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, useWindowDimensions } from 'react-native';
import PostListStyles from '../../components/PostList/PostListStyles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import APIs, { endpoints } from '../../configs/APIs';
import { ActivityIndicator } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import { useContext } from 'react';
import { MyUserConText } from '../../configs/UserContexts';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default PostList = ({ route }) => {
  const topicId = route.params?.topicId;
  const [posts, setPosts] = useState(null);
  const [reactionsState, setReactionsState] = useState({}); // '' (no reaction), 'like', 'love', 'haha'
  const { width: contentWidth } = useWindowDimensions();
  const user = useContext(MyUserConText);
  const images = {
    like: { active: require('./assets/icons/like.png'), inactive: require('./assets/icons/no_like.png') },
    love: { active: require('./assets/icons/heart.png'), inactive: require('./assets/icons/no_heart.png') },
    haha: { active: require('./assets/icons/haha.png'), inactive: require('./assets/icons/no_haha.png') },
  };
  const formatDate = (dateString = '') => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');       // Lấy ngày, thêm số 0 nếu cần
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tính từ 0)
    const year = date.getFullYear();                            // Lấy năm
    return `${day}/${month}/${year}`;                            // Định dạng theo kiểu dd/MM/yyyy
  };

  // Hàm xử lý khi nhấn nút phản ứng
  const handleToggleReaction = async (postId, reaction) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const endpoint = reaction === 'like' ? endpoints['reaction-like'](postId)
                      : reaction === 'haha' ? endpoints['reaction-haha'](postId)
                      : endpoints['reaction-love'](postId);
  
      // Nếu phản ứng hiện tại là cùng loại, gửi yêu cầu để hủy phản ứng
      const isActive = reactionsState[postId] === reaction;
  
      // Gửi yêu cầu cập nhật phản ứng lên server
      const res = await APIs.post(endpoint, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      const updatedPost = res.data;
  
      // Cập nhật lại danh sách bài viết với thông tin mới từ server
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost : post))
      );
  
      // Cập nhật trạng thái phản ứng của người dùng
      setReactionsState((prevState) => ({
        ...prevState,
        [postId]: isActive ? '' : reaction // Nếu đã nhấn phản ứng, hủy phản ứng
      }));
    } catch (error) {
      console.error('Error toggling reaction:', error);
    }
  };


  // setReactionsState((prevState) => ({
  //     ...prevState,
  //     [postId]: prevState[postId] === reaction ? '' : reaction, // Nếu đã nhấn rồi thì bỏ, nếu chưa nhấn thì gán phản ứng
  //   }));

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

        {posts === null ? (
          <ActivityIndicator />
        ) : (
          <>
            {posts.length === 0 ? (
              <Text style={PostListStyles.noPostsMessage}>Không có bài đăng nào trong chủ đề này</Text>
            ) : (
              posts.map(p => (
                <View key={p.id} style={PostListStyles.post}>
                  <View style={PostListStyles.HeaderRow}>
                    <Image
                      style={PostListStyles.postAvatar}
                      source={{ uri: p.user.avatar || 'https://res.cloudinary.com/djlyy5s5e/image/upload/v1738552067/default_avatar_user_jjl7xy.png' }}
                    />
                    <View style={PostListStyles.HeaderCol}>
                      <Text style={PostListStyles.postAuthor}>{p.user.first_name || "null"} {p.user.last_name || "null"}</Text>
                      <Text style={PostListStyles.postDate}>Ngày đăng tải: {formatDate(p.created_date)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <FontAwesome name="star" size={20} color="#2e3192" style={{ marginLeft: 70, marginRight: 8 }} />
                      <Text style={PostListStyles.postCategory}>{p.topic.category.name}</Text>
                    </View>
                  </View>
                  <Text style={PostListStyles.postTitle}>{p.title}</Text>
                  <Text style={PostListStyles.postContent}>
                    <RenderHTML contentWidth={contentWidth} source={{ 'html': p.content }} />
                  </Text>
                  <Text style={PostListStyles.postTag}>#{p.topic.name}</Text>
                  <Image style={PostListStyles.postImage} source={{ uri: p.image }} />
                  <View style={PostListStyles.actions}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleToggleReaction(p.id, 'like')}>
                      <Image
                        source={reactionsState[p.id] === 'like' ? images.like.active : images.like.inactive}
                        style={{ width: 24, height: 24, marginRight: 4, marginBottom: 3 }}
                      />
                      <Text style={PostListStyles.actionButton}>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleToggleReaction(p.id, 'love')}>
                      <Image
                        source={reactionsState[p.id] === 'love' ? images.love.active : images.love.inactive}
                        style={{ width: 22, height: 22, marginRight: 4 }}
                      />
                      <Text style={PostListStyles.actionButton}>Love</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleToggleReaction(p.id, 'haha')}>
                      <Image
                        source={reactionsState[p.id] === 'haha' ? images.haha.active : images.haha.inactive}
                        style={{ width: 28, height: 28, marginRight: 2 }}
                      />
                      <Text style={PostListStyles.actionButton}>Haha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => nav.navigate('postdetails', { 'postId': p.id })} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('./assets/icons/comment.png')} style={{ width: 25, height: 25, marginRight: 6 }} />
                      <Text style={PostListStyles.actionButton}>Bình luận</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import PersonalStyles from '../../components/Personal/PersonalStyles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useContext, useEffect, useState} from 'react';
import { MyUserConText } from '../../configs/UserContexts';
import { ActivityIndicator } from 'react-native-paper';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import { authApis, endpoints } from '../../configs/APIs';




export default Personal = () => {
  const nav = useNavigation();
  const user = useContext(MyUserConText);
  const [myPosts, setMyPosts] = useState(null);
  const { width: contentWidth } = useWindowDimensions();

  const loadMyPosts = async () => {
    try{
      let api = await authApis();
      let res = await api.get(endpoints['my-posts']);
      setMyPosts(res.data);
      console.info(res.data);
    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    loadMyPosts();
  }, []);

  return (
    <View style={PersonalStyles.container}>
      

      {/* Content */}
      <ScrollView contentContainerStyle={PersonalStyles.content}>
        {/* Avatar Cover */}
        <View style={PersonalStyles.info}>
          <Image style={PersonalStyles.avatarCover} source={{uri: user?._j?.pic_cover || "null"}} />
          <Image style={PersonalStyles.avatar} source={{uri: user?._j?.avatar || "null"}} />
          <Text style={PersonalStyles.author}>{user?._j?.first_name || "null"} {user?._j?.last_name || "null"}</Text>
        </View>


        {/* Post */}
        {myPosts === null ? <ActivityIndicator/> : <>
        {myPosts.map(p => <View key={p.id} style={PersonalStyles.post}>
          <View style={PersonalStyles.HeaderRow}>
            <Image style={PersonalStyles.postAvatar} source={{ uri: p.user.avatar || 'https://res.cloudinary.com/djlyy5s5e/image/upload/v1738552067/default_avatar_user_jjl7xy.png' }} />
            <View style={PersonalStyles.HeaderCol}>
              <Text style={PersonalStyles.postAuthor}>{p.user.first_name || "null"} {p.user.last_name || "null"}</Text>
              <Text style={PersonalStyles.postDate}>{moment(p.created_date).fromNow()}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="star" size={15} color="#2e3192" style={{ marginLeft: 150, marginRight: 5}} />
              <Text style={PersonalStyles.postCategory}>{p.topic.category.name}</Text>
            </View>
          </View>
          <Text style={PersonalStyles.postTitle}>{p.title}</Text>
          <Text style={PersonalStyles.postContent}>
            <RenderHTML contentWidth={contentWidth} source={{ 'html': p.content }} />
          </Text>
          <Text style={PersonalStyles.postTag}>#{p.topic.name}</Text>
          <Image style={PersonalStyles.postImage} source={{ uri: p.image }} />
          <View style={PersonalStyles.actions}>
            <TouchableOpacity onPress={() => nav.navigate('postdetails', { 'postId': p.id })} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../components/PostList/assets/icons/comment.png')} style={{ width: 25, height: 25, marginRight: 6 }} />
              <Text style={PersonalStyles.actionButton}>Bình luận</Text>
            </TouchableOpacity>
          </View>
        </View>)}
        </>}
      </ScrollView>
    </View>
  );
};

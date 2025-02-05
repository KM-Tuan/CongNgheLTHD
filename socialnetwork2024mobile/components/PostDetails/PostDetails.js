import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, useWindowDimensions } from 'react-native';
import PostDetailsStyles from '../../components/PostDetails/PostDetailsStyles';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import APIs, { authApis, endpoints } from '../../configs/APIs';
import { FontAwesome } from '@expo/vector-icons';
import RenderHTML from 'react-native-render-html';
import moment from 'moment';

export default PostDetail = ({ route }) => {
    const postId = route.params?.postId;
    const { width: contentWidth } = useWindowDimensions();
    const [postDetails, setPostDetails] = useState(null);
    const [comments, setComments] = useState(null);
    const [contents, setContents] = useState(null);

    const loadPostDetails = async () => {
        let res = await APIs.get(endpoints['post-details'](postId));
        console.info(res.data);
        setPostDetails(res.data);
    };

    const loadComments = async () => {
        let res = await APIs.get(endpoints['comments'](postId));
        console.info(res.data);
        setComments(res.data);
    };

    const addComments = async () =>{
        try{
            let api = await authApis(); 
            let res = await api.post(endpoints['add-comment'](postId), {
                'content': contents
            });
            setComments(current => [res.data, ...current]);
            console.info(res.data); 
        }catch(ex){
            console.error(ex);
        }
    };

    const formatDate = (dateString = '') => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');       // Lấy ngày, thêm số 0 nếu cần
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tính từ 0)
        const year = date.getFullYear();                            // Lấy năm
        return `${day}/${month}/${year}`;                            // Định dạng theo kiểu dd/MM/yyyy
    };

    useEffect(() => {
        loadPostDetails();
        loadComments();
    }, [postId]);

    return (
        <ScrollView style={PostDetailsStyles.content}>
            {postDetails === null ? <ActivityIndicator /> : <>
                <View style={PostDetailsStyles.post}>
                    <View style={PostDetailsStyles.HeaderRow}>
                        <Image style={PostDetailsStyles.postAvatar} source={{ uri: postDetails.user.avatar || 'https://res.cloudinary.com/djlyy5s5e/image/upload/v1738552067/default_avatar_user_jjl7xy.png' }} />
                        <View style={PostDetailsStyles.HeaderCol}>
                            <Text style={PostDetailsStyles.postAuthor}>{postDetails.user.first_name || "null"} {postDetails.user.last_name || "null"}</Text>
                            <Text style={PostDetailsStyles.postDate}>Ngày đăng tải: {formatDate(postDetails.created_date)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name="star" size={20} color="#2e3192" style={{ marginLeft: 70, marginRight: 8 }} />
                            <Text style={PostDetailsStyles.postCategory}>{postDetails.topic.category.name}</Text>
                        </View>
                    </View>
                    <Text style={PostDetailsStyles.postTitle}>{postDetails.title}</Text>
                    <Text style={PostDetailsStyles.postContent}>
                        <RenderHTML contentWidth={contentWidth} source={{ 'html': postDetails.content }} />
                    </Text>
                    <Text style={PostDetailsStyles.postTag}>#{postDetails.topic.name}</Text>
                    <Image style={PostDetailsStyles.postImage} source={{ uri: postDetails.image }} />
                    <View style={PostDetailsStyles.postFooter}>
                        <Text style={PostDetailsStyles.postStats}>{postDetails.reaction_counts.like} like, {postDetails.reaction_counts.haha} haha, {postDetails.reaction_counts.love} love</Text>
                        <Text style={PostDetailsStyles.postComments}>2 bình luận</Text>
                    </View>
                    <View style={PostDetailsStyles.actions}>
                        <TouchableOpacity>
                            <Text style={PostDetailsStyles.actionButton}>👍 Thích</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* My Comment */}
                <View style={PostDetailsStyles.myComment}>
                    <TextInput value={contents} onChangeText={t => setContents(t)} style={PostDetailsStyles.MyContent} placeholder="Nhập bình luận" />
                    <TouchableOpacity onPress={addComments}>
                        <Text style={PostDetailsStyles.saveComment}>Lưu</Text>
                    </TouchableOpacity>
                </View>

                {/* Comments */}
                {comments === null ? <ActivityIndicator /> : <>
                    {comments.map(c => <View style={PostDetailsStyles.comment}>
                        <View style={PostDetailsStyles.HeaderRow}>
                            <Image
                                style={PostDetailsStyles.commentAvatar}
                                source={{ uri: c.user.avatar || 'https://res.cloudinary.com/djlyy5s5e/image/upload/v1738552067/default_avatar_user_jjl7xy.png' }}
                            />
                            <View style={PostDetailsStyles.HeaderCol}>
                                <Text style={PostDetailsStyles.commentAuthor}>{c.user.first_name || "null"} {c.user.last_name || "null"}</Text>
                                <Text style={PostDetailsStyles.commentDate}>{moment(c.created_date).fromNow()}</Text>
                            </View>
                        </View>
                        <Text style={PostDetailsStyles.commentContent}>{c.content}</Text>
                    </View>
                    )}
                </>}
            </>}
        </ScrollView>
    );
    // return (
    //     <View style={PostDetailsStyles.container}>
    //         {/* Header */}
    //         <View style={PostDetailsStyles.header}>
    //             <Text style={PostDetailsStyles.headerTitle}>Social Network</Text>
    //             <TextInput style={PostDetailsStyles.searchBar} placeholder="Search" />
    //         </View>

    //         {/* Content */}
    //         <ScrollView contentContainerStyle={PostDetailsStyles.content}>
    //             {/* Post */}
    //             <View style={PostDetailsStyles.post}>
    //                 <View style={PostDetailsStyles.HeaderRow}>
    //                     <Image style={PostDetailsStyles.postAvatar} source={{uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png'}} />
    //                     <View style={PostDetailsStyles.HeaderCol}>
    //                         <Text style={PostDetailsStyles.postAuthor}>Cựu SV A</Text>
    //                         <Text style={PostDetailsStyles.postDate}>Ngày đăng tải: 20/01/2025</Text>
    //                     </View>
    //                     <Text style={PostDetailsStyles.postCategory}>Trao đổi</Text>
    //                 </View>
    //                 <Text style={PostDetailsStyles.postTitle}>Học lập trình nên bắt đầu từ đâu?</Text>
    //                 <Text style={PostDetailsStyles.postContent}>Trong thời gian gần đây em đang bị phân vân không biết nên bắt đầu học lập trình từ đâu? Và gặp phải những trở ngại khó khăn gì? Mọi người có thể cho em xin vài lời khuyên được không ạ?</Text>
    //                 <Text style={PostDetailsStyles.postTag}>#Hỏi & Đáp</Text>
    //                 <Image style={PostDetailsStyles.postImage} source={{uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png'}} />
    //                 <View style={PostDetailsStyles.postFooter}>
    //                 <Text style={PostDetailsStyles.postStats}>10 like, 22 haha, 1 love</Text>
    //                 <Text style={PostDetailsStyles.postComments}>2 bình luận</Text>
    //                 </View>
    //                 <View style={PostDetailsStyles.actions}>
    //                 <TouchableOpacity>
    //                     <Text style={PostDetailsStyles.actionButton}>👍 Thích</Text>
    //                 </TouchableOpacity>
    //                 </View>
    //             </View>

    //             {/* My Comment */}
    //             <View style={PostDetailsStyles.myComment}>
    //                 <TextInput style={PostDetailsStyles.MyContent} placeholder="Nhập bình luận" />
    //                 <TouchableOpacity>
    //                     <Text style={PostDetailsStyles.saveComment}>Lưu</Text>
    //                 </TouchableOpacity>
    //             </View>

    //             {/* Comments */}
    //             <View style={PostDetailsStyles.comment}>
    //                 <View style={PostDetailsStyles.HeaderRow}>
    //                     <Image style={PostDetailsStyles.commentAvatar} source={{uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png'}} />
    //                     <View style={PostDetailsStyles.HeaderCol}>
    //                         <Text style={PostDetailsStyles.commentAuthor}>Cựu SV A</Text>
    //                         <Text style={PostDetailsStyles.commentDate}>Ngày đăng tải: 20/01/2025</Text>
    //                     </View>
    //                 </View>
    //                 <Text style={PostDetailsStyles.commentContent}>Học lập trình nên bắt đầu từ đâu?</Text>
    //             </View>
    //         </ScrollView>
    //     </View>
    // );
};
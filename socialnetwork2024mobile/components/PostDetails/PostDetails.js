import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import PostDetailsStyles from '../../components/PostDetails/PostDetailsStyles';

export default PostDetail = () => {
    return (
        <View style={PostDetailsStyles.container}>
            {/* Header */}
            <View style={PostDetailsStyles.header}>
                <Text style={PostDetailsStyles.headerTitle}>Social Network</Text>
                <TextInput style={PostDetailsStyles.searchBar} placeholder="Search" />
            </View>
            
            {/* Content */}
            <ScrollView contentContainerStyle={PostDetailsStyles.content}>
                {/* Post */}
                <View style={PostDetailsStyles.post}>
                    <View style={PostDetailsStyles.HeaderRow}>
                        <Image style={PostDetailsStyles.postAvatar} source={{uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png'}} />
                        <View style={PostDetailsStyles.HeaderCol}>
                            <Text style={PostDetailsStyles.postAuthor}>Cựu SV A</Text>
                            <Text style={PostDetailsStyles.postDate}>Ngày đăng tải: 20/01/2025</Text>
                        </View>
                        <Text style={PostDetailsStyles.postCategory}>Trao đổi</Text>
                    </View>
                    <Text style={PostDetailsStyles.postTitle}>Học lập trình nên bắt đầu từ đâu?</Text>
                    <Text style={PostDetailsStyles.postContent}>Trong thời gian gần đây em đang bị phân vân không biết nên bắt đầu học lập trình từ đâu? Và gặp phải những trở ngại khó khăn gì? Mọi người có thể cho em xin vài lời khuyên được không ạ?</Text>
                    <Text style={PostDetailsStyles.postTag}>#Hỏi & Đáp</Text>
                    <Image style={PostDetailsStyles.postImage} source={{uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png'}} />
                    <View style={PostDetailsStyles.postFooter}>
                    <Text style={PostDetailsStyles.postStats}>10 like, 22 haha, 1 love</Text>
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
                    <TextInput style={PostDetailsStyles.MyContent} placeholder="Nhập bình luận" />
                    <TouchableOpacity>
                        <Text style={PostDetailsStyles.saveComment}>Lưu</Text>
                    </TouchableOpacity>
                </View>

                {/* Comments */}
                <View style={PostDetailsStyles.comment}>
                    <View style={PostDetailsStyles.HeaderRow}>
                        <Image style={PostDetailsStyles.commentAvatar} source={{uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png'}} />
                        <View style={PostDetailsStyles.HeaderCol}>
                            <Text style={PostDetailsStyles.commentAuthor}>Cựu SV A</Text>
                            <Text style={PostDetailsStyles.commentDate}>Ngày đăng tải: 20/01/2025</Text>
                        </View>
                    </View>
                    <Text style={PostDetailsStyles.commentContent}>Học lập trình nên bắt đầu từ đâu?</Text>
                </View>
            </ScrollView>
        </View>
    );
};
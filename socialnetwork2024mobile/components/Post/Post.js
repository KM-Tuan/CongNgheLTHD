import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import PostStyles from '../../components/Post/PostStyles';
import { useState } from 'react';

export default Post = () => {

    return (
        <View style={PostStyles.container}>
            {/* Header */}
            <View style={PostStyles.header}>
            <Text style={PostStyles.headerTitle}>Social Network</Text>
            <TextInput style={PostStyles.searchBar} placeholder="Search" />
            </View>
    
            {/* Content */}
            <ScrollView contentContainerStyle={PostStyles.content}>
            {/* Post Input */}
            <View style={PostStyles.inputSection}>
                <Image style={PostStyles.avatar} source={{uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png'}} />
                <TextInput style={PostStyles.input} placeholder="Tiêu đề" />
            </View>
            <View style={PostStyles.editSection}>
                <TextInput style={PostStyles.edit} multiline={true} placeholder="Nhập nội dung tại đây"/>
            </View>
            
            {/* Image */}

            </ScrollView>
        </View>
    );
};
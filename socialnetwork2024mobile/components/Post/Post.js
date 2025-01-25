import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import PostStyles from '../../components/Post/PostStyles';
import { useState } from 'react';

export default Post = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const openImagePicker = async () => {
        // Kiểm tra quyền truy cập
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                alert("Bạn cần cấp quyền để chọn ảnh!");
                return;
            }
        }
    

        // Mở thư viện ảnh
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            console.log("Selected Image URI: ", result.assets[0].uri);
            setSelectedImage(result.assets[0].uri);
        }
    };
    

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

            <View style={PostStyles.box}>
                {/* Topic */}
                <View style={PostStyles.picker}>
                    <Picker selectedValue={selectedOption} onValueChange={(itemValue) => setSelectedOption(itemValue)}>
                        <Picker.Item label="Chọn danh mục" value="" />
                        <Picker.Item label="Danh mục 1" value="category1" />
                        <Picker.Item label="Danh mục 2" value="category2" />
                    </Picker>
                </View>
            
                {/* Image */}
                <TouchableOpacity onPress={openImagePicker} style={PostStyles.addImage}>
                    <Text>Thêm ảnh</Text>
                </TouchableOpacity>
            </View>
            <View style={PostStyles.image}>
                {selectedImage && (<Image source={{ uri: selectedImage }} style={PostStyles.showImage} />)}
            </View>

            <TouchableOpacity style={PostStyles.submit}>
                <Text style={PostStyles.submitButton}>Đăng bài</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    );
};
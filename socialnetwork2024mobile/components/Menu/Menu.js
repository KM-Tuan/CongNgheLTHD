import { Image, TouchableOpacity, View, Text } from 'react-native';
import MenuStyles from '../../components/Menu/MenuStyles'
import { useContext } from 'react';
import { MyUserConText } from '../../configs/UserContexts';
import { useNavigation } from '@react-navigation/native';

export default Menu = () => {
    const nav = useNavigation();
    const user = useContext(MyUserConText);

    // console.info(user);

    return (
        <View style={MenuStyles.container}>
            <View style={MenuStyles.box}>
                <View style={MenuStyles.content}>
                    <Image style={MenuStyles.avatar} source={{uri: user?._j?.avatar || "null"}}/>
                    <Text style={MenuStyles.author}>Xin chào {user?._j?.last_name || "null"}</Text>
                    <Text style={MenuStyles.role}>Vai trò: {user?._j?.role || "null"}</Text>
                    <Text style={MenuStyles.email}>Email: {user?._j?.email || "null"}</Text>
                    <TouchableOpacity onPress={() => nav.navigate('login')} style={MenuStyles.buttonSignOut}>
                        <Text style={MenuStyles.textSignOut}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
import { Image, TouchableOpacity, View, Text } from 'react-native';
import MenuStyles from '../../components/Menu/MenuStyles'
import { useNavigation } from '@react-navigation/native';

export default Menu = () => {
    const nav = useNavigation();

    return (
        <View style={MenuStyles.container}>
            <View style={MenuStyles.box}>
                <View style={MenuStyles.content}>
                    <Image style={MenuStyles.avatar} source={{uri: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/11/narutossagemode-15944657133061535033027.png'}}/>
                    <Text style={MenuStyles.author}>Cựu SV A</Text>
                    <TouchableOpacity style={MenuStyles.buttonSignOut} onPress={() => nav.navigate('login')}>
                        <Text style={MenuStyles.textSignOut}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
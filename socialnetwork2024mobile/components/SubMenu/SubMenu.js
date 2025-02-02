import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import SubMenuStyles from '../../components/SubMenu/SubMenuStyles';

export default SubMenu = () => {
    const nav = useNavigation();

    return (
        <View style={SubMenuStyles.container}>
            <Text style={SubMenuStyles.title}>Bạn chưa đăng nhập</Text>
            <TouchableOpacity style={SubMenuStyles.buttonSignOut} onPress={() => nav.navigate('login')}>
                <Text style={SubMenuStyles.textSignOut}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
};
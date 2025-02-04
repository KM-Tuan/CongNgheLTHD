import { Image, TouchableOpacity, View, Text } from 'react-native';
import MenuStyles from '../../components/Menu/MenuStyles'
import { useContext } from 'react';
import { MyDispatchContext, MyUserConText } from '../../configs/UserContexts';
import { Button } from 'react-native-paper';
import * as Updates from 'expo-updates';

export default Menu = () => {
    const dispatch = useContext(MyDispatchContext);
    const user = useContext(MyUserConText);

    const handleSignOut = async () => {
        dispatch({ "type": "logout" })
        await Updates.reloadAsync();
    };


    // console.info(user);

    return (
        <View style={MenuStyles.container}>
            <View style={MenuStyles.box}>
                <View style={MenuStyles.content}>
                    <Image style={MenuStyles.avatar} source={{ uri: user?._j?.avatar || "null" }} />
                    <Text style={MenuStyles.author}>Xin chào {user?._j?.last_name || "null"}</Text>
                    <Text style={MenuStyles.role}>Vai trò: {user?._j?.role || "null"}</Text>
                    <Text style={MenuStyles.email}>Email: {user?._j?.email || "null"}</Text>
                    <Button onPress={handleSignOut} style={MenuStyles.buttonSignOut}>
                        <Text style={MenuStyles.textSignOut}>Đăng xuất</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};
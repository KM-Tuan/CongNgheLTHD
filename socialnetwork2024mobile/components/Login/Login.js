import React, { useContext, useState } from "react";
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginStyles from '../../components/Login/LoginStyles'
import APIs, { endpoints } from "../../configs/APIs";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyDispatchContext } from "../../configs/UserContexts";

export default Login = () => {
    const nav = useNavigation();


    const [user, setUser] = useState({
        "username": "",
        "password": ""
    });

    const [loading, setLoading] = useState(false);
    const users = {
        "username": {
            "holder": "abc@gmail.com",
            "field": "username",
            "secure": false
        },
        "password": {
            "holder": "*********",
            "field": "password",
            "secure": true
        }
    }

    const dispatch = useContext(MyDispatchContext);

    const updateUser = (value, field) => {
        setUser({ ...user, [field]: value });
    }

    const login = async () => {
        try {
            setLoading(true);
            // Nhớ đổi 2 client cho phù hợp
            const res = await APIs.post(endpoints['login'], {
                "client_id": "cM4zjyT3xpp6RncyTVVszv6M10MDPMma2ROJ38m9",
                "client_secret": "FyqfMZ3JHxGDEjInYjyVAjzD0DNV5Uo2cFZP3HqHbpVZsCCJxHjs0RdKyCpwDk95KVCUZTGlkY3JPKndJVBzCgSJWiwE701PKrsM5SH3PQAOp0RcszVdWAulmypSosPR",
                "grant_type": "password",
                ...user
            });
            await AsyncStorage.setItem('token', res.data.access_token);

            dispatch({ "type": "login" })
        } catch (ex) {

        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={LoginStyles.container}>
                <View style={LoginStyles.header}>
                    <Image
                        source={{ uri: 'https://res.cloudinary.com/djlyy5s5e/image/upload/v1737642180/logo_cntt_jdlssi.png' }}
                        style={LoginStyles.headerImg}
                        alt="Logo"
                    />

                    <Text style={LoginStyles.title}>ĐĂNG NHẬP</Text>
                    <View style={LoginStyles.input}>
                        {Object.values(users).map(u =>
                            <TextInput style={LoginStyles.inputControl} key={u.field}
                                secureTextEntry={u.secure}
                                placeholder={u.holder}
                                placeholderTextColor='#6b7280'
                                value={user[u.field]}
                                onChangeText={t => updateUser(t, u.field)}
                            />
                        )}
                    </View>

                    <Button onPress={login} loading={loading} style={LoginStyles.btn}>
                        <Text style={LoginStyles.btnText}>Đăng nhập</Text>
                    </Button>

                    <TouchableOpacity
                        style={{ marginTop: 12 }}
                        onPress={() => nav.navigate('signup')}>
                        <Text style={LoginStyles.formFooter}>Chưa có tài khoản? <Text style={{ textDecorationLine: 'underline' }}>ĐĂNG KÝ</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
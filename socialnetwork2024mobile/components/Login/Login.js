import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const nav = useNavigation();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    return(
        <SafeAreaView style = {{flex: 1, backgroundColor: '#fff'}}>
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Image 
                    source={{uri: 'https://res.cloudinary.com/djlyy5s5e/image/upload/v1737642180/logo_cntt_jdlssi.png'}} 
                    style = {styles.headerImg}
                    alt="Logo"
                    />

                    <Text style = {styles.title}>ĐĂNG NHẬP</Text>

                    <View>
                        <View style = {styles.input}>
                            <Text style = {styles.inputLabel}>Email</Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                style = {styles.inputControl}
                                placeholder="abc@gmail.com"
                                placeholderTextColor='#6b7280'
                                value={form.email}
                                onChangeText={email => setForm({...form, email})}
                            />
                        </View>

                        <View style = {styles.input}>
                            <Text style = {styles.inputLabel}>Password</Text>
                            <TextInput
                                secureTextEntry
                                style = {styles.inputControl}
                                placeholder="*******"
                                placeholderTextColor='#6b7280'
                                value={form.password}
                                onChangeText={password => setForm({...form, password})}
                            />
                        </View>

                        <View>
                            <TouchableOpacity onPress={() =>{

                            }}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>Đăng nhập</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            style = {{marginTop:12}} 
                            onPress={() => nav.navigate('signup')}>
                                <Text style = {styles.formFooter}>Chưa có tài khoản? <Text style={{textDecorationLine: 'underline'}}>ĐĂNG KÝ</Text></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
    }, 

    header: {
        marginVertical: 36,
    },

    headerImg: {
        width: 180,
        height: 120,
        alignSelf: 'center',
        marginBottom: 36, 
        marginTop: 30
    },

    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#1e1e1e', 
        textAlign: 'center',
    },

    input :{ marginBottom: 12},
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },

    inputControl: {
      height: 45,
      backgroundColor: '#e8ecf4',
      paddingVertical: 10, 
      paddingHorizontal: 16, 
      borderRadius: 12,
      fontSize: 15,
      fontWeight: '500',
      color: '#222',
      marginBottom: 8,  
    },

    btn: {
        backgroundColor: '#2e3192',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2e3192',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20, 
        marginTop: 20
    },

    btnText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff'
    },

    formFooter: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
    },
});

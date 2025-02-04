import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import SignUpStyles from '../../components/SignUp/SignUpStyles';
import * as ImagePicker from 'expo-image-picker';
import { Button, Icon } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";
import { useNavigation } from "@react-navigation/native";

export default SignUp = () => {
  const [userType, setUserType] = useState("Cựu sinh viên"); // Default user type

  // Set user
  const [user, setUser] = useState({
    "email": "",
    "mssv": "",
    "first_name": "",
    "last_name": "",
    "username": "",
    "password": "",
    "confirmPassword": "",
    "role": ""
  });

  const users = {
    "email": { "holder": "Email", "field": "email", "secure": false },
    "massv": { "holder": "MSSV", "field": "mssv", "secure": false },
    "first_name": { "holder": "Họ tên", "field": "first_name", "secure": false },
    "last_name": { "holder": "Tên", "field": "last_name", "secure": false },
    "username": { "holder": "Tên đăng nhập", "field": "username", "secure": false },
    "password": { "holder": "Mật khẩu", "field": "password", "secure": true },
    "confirmPassword": { "holder": "Xác nhận mật khẩu", "field": "confirmPassword", "secure": true },
  };

  const updateUser = (value, field) => {
    setUser({ ...user, [field]: value });
  };

  // Upload ảnh
  const [avatar, setAvatar] = useState();
  const [pic_cover, setPicCover] = useState();

  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert("Permissions denied!");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        setAvatar(result.assets[0]);
        updateUser(result.assets[0], 'avatar');
      }
    }
  };

  const pickImageCover = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert("Permissions denied!");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        setPicCover(result.assets[0]);
        updateUser(result.assets[0], 'pic_cover');
      }
    }
  };

  // Đăng ký
  const nav = useNavigation();
  const [loading, setLoading] = useState(false);

  const register = async () => {
    let form = new FormData();

    if (userType === "Giảng viên") {
      const generatedPassword = "ou@123";
      const generatedUsername = user.email;

      user.password = generatedPassword;
      user.username = generatedUsername;
      user.role = "lecturer";
    } else {
      user.role = "alumni";
    }

    for (let key in user) {
      if (key !== 'confirmPassword' && key !== 'avatar' && key !== 'pic_cover') {
        form.append(key, user[key]);
      }
    }

    // Thêm avatar
    if (avatar) {
      form.append('avatar', {
        uri: user.avatar.uri,
        name: user.avatar.fileName,
        type: user.avatar.type
      });
    }

    // Thêm picCover
    if (pic_cover) {
      form.append('pic_cover', {
        uri: user.pic_cover.uri,
        name: user.pic_cover.fileName,
        type: user.pic_cover.type
      });
    }

    console.info(form)
    try {
      setLoading(true);
      await APIs.post(endpoints['register'], form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      nav.navigate('login');
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={SignUpStyles.container}>
          <Image
            source={{ uri: 'https://res.cloudinary.com/djlyy5s5e/image/upload/v1737642180/logo_cntt_jdlssi.png' }}
            style={SignUpStyles.headerImg}
            alt="Logo"
          />
          {/* Title */}
          <Text style={SignUpStyles.title}>ĐĂNG KÝ</Text>

          {/* Set loại user */}
          <View style={SignUpStyles.userTypeToggle}>
            <TouchableOpacity style={[SignUpStyles.userTypeButton, userType === "Cựu sinh viên" && SignUpStyles.userTypeButtonActive]} onPress={() => setUserType("Cựu sinh viên")}>
              <Text style={[SignUpStyles.userTypeText, userType === "Cựu sinh viên" && SignUpStyles.userTypeTextActive]}>Cựu sinh viên</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[SignUpStyles.userTypeButton, userType === "Giảng viên" && SignUpStyles.userTypeButtonActive]} onPress={() => setUserType("Giảng viên")}>
              <Text style={[SignUpStyles.userTypeText, userType === "Giảng viên" && SignUpStyles.userTypeTextActive]}>Giảng viên</Text>
            </TouchableOpacity>
          </View>

          {/* Avatar Placeholder */}
          <TouchableOpacity style={SignUpStyles.avatarPlaceholder} onPress={pickImage}>
            {avatar ? (
              <Image source={{ uri: avatar.uri }} style={SignUpStyles.avatarIcon} />
            ) : (
              <Icon source="account" size={60} />
            )}
          </TouchableOpacity>

          {/* Cover Placeholder */}
          <TouchableOpacity style={SignUpStyles.coverPlaceholder} onPress={pickImageCover}>
            {pic_cover ? (
              <Image source={{ uri: pic_cover.uri }} style={SignUpStyles.coverIcon} />
            ) : (
              <Icon source="image-area" size={60} />
            )}
          </TouchableOpacity>

          {/* Form */}
          <View>
            {userType === "Giảng viên" && (
              <View style={SignUpStyles.input}>
                <TextInput
                  style={SignUpStyles.inputControl}
                  placeholder={users.email.holder}
                  placeholderTextColor='#6b7280'
                  value={user.email}
                  onChangeText={t => updateUser(t, "email")}
                />
                <TextInput
                  style={SignUpStyles.inputControl}
                  placeholder={users.first_name.holder}
                  placeholderTextColor='#6b7280'
                  value={user.first_name}
                  onChangeText={t => updateUser(t, "first_name")}
                />
                <TextInput
                  style={SignUpStyles.inputControl}
                  placeholder={users.last_name.holder}
                  placeholderTextColor='#6b7280'
                  value={user.last_name}
                  onChangeText={t => updateUser(t, "last_name")}
                />
              </View>
            )}

            {userType === "Cựu sinh viên" && (
              <>
                <View style={SignUpStyles.input}>
                  {Object.values(users).map(u =>
                    <TextInput style={SignUpStyles.inputControl} key={u.field}
                      secureTextEntry={u.secure}
                      placeholder={u.holder}
                      placeholderTextColor='#6b7280'
                      value={user[u.field]}
                      onChangeText={t => updateUser(t, u.field)}
                    />
                  )}
                </View>
              </>
            )}

            {/* Submit Button */}
            <Button style={SignUpStyles.btn} onPress={register} loading={loading}>
              <Text style={SignUpStyles.btnText}>Đăng ký</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

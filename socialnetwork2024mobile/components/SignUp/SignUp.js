import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";

export default function Register() {
  const [userType, setUserType] = useState("Giảng viên"); // Default user type

  const [form, setForm] = useState({
    email: "",
    mssv: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <ScrollView>
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Image 
                            source={{uri: 'https://res.cloudinary.com/djlyy5s5e/image/upload/v1737642180/logo_cntt_jdlssi.png'}} 
                            style = {styles.headerImg}
                            alt="Logo"
                            />
        {/* Title */}
        <Text style={styles.title}>ĐĂNG KÝ</Text>

        {/* User Type Toggle */}
        <View style={styles.userTypeToggle}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === "Cựu sinh viên" && styles.userTypeButtonActive,
            ]}
            onPress={() => setUserType("Cựu sinh viên")}
          >
            <Text
              style={[
                styles.userTypeText,
                userType === "Cựu sinh viên" && styles.userTypeTextActive,
              ]}
            >
              Cựu sinh viên
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === "Giảng viên" && styles.userTypeButtonActive,
            ]}
            onPress={() => setUserType("Giảng viên")}
          >
            <Text
              style={[
                styles.userTypeText,
                userType === "Giảng viên" && styles.userTypeTextActive,
              ]}
            >
              Giảng viên
            </Text>
          </TouchableOpacity>
        </View>

        {/* Avatar Placeholder */}
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>

        {/* Form */}
        <View>
          <View style={styles.input}>
            <TextInput
              style={styles.inputControl}
              placeholder="gmail"
              placeholderTextColor="#6b7280"
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
            />
          </View>

          {userType === "Cựu sinh viên" && (
            <>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputControl}
                  placeholder="MSSV"
                  placeholderTextColor="#6b7280"
                  value={form.mssv}
                  onChangeText={(mssv) => setForm({ ...form, mssv })}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputControl}
                  placeholder="Tên đăng nhập"
                  placeholderTextColor="#6b7280"
                  value={form.username}
                  onChangeText={(username) => setForm({ ...form, username })}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  secureTextEntry
                  style={styles.inputControl}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#6b7280"
                  value={form.password}
                  onChangeText={(password) => setForm({ ...form, password })}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  secureTextEntry
                  style={styles.inputControl}
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor="#6b7280"
                  value={form.confirmPassword}
                  onChangeText={(confirmPassword) =>
                    setForm({ ...form, confirmPassword })
                  }
                />
              </View>
            </>
          )}

          {/* Submit Button */}
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>ĐĂNG KÝ</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1e1e1e",
    textAlign: "center",
    marginBottom: 20,
  },
  userTypeToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  userTypeButtonActive: {
    backgroundColor: "#2e3192",
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6b7280",
  },
  userTypeTextActive: {
    color: "#fff",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e8ecf4",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  avatarIcon: {
    fontSize: 50,
    color: "#6b7280",
  },
  input: {
    marginBottom: 12,
  },
  inputControl: {
    height: 45,
    backgroundColor: "#e8ecf4",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  btn: {
    backgroundColor: "#2e3192",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },

  headerImg: {
    width: 180,
    height: 120,
    alignSelf: 'center',
    marginBottom: 36, 
    marginTop: 30
},
});
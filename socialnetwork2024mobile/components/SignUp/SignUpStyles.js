import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
      width: 120,
      height: 120,
      borderRadius: 60
    },
    coverPlaceholder: {
      width: 'auto',
      height: 120,
      borderRadius: 12,
      backgroundColor: "#e8ecf4",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      overflow: 'hidden'
    },
    coverIcon: {
      width: '100%',
      height: '100%',
      borderRadius: 12
    },
    input: {
      marginBottom: 20,
    },
    inputControl: {
      height: 60,
      backgroundColor: '#e8ecf4',
      paddingVertical: 10, 
      paddingHorizontal: 16, 
      borderRadius: 12,
      fontSize: 15,
      fontWeight: '500',
      color: '#222',
      marginBottom: 12,
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
    },
    btnText: {
      fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
  
    headerImg: {
      width: 180,
      height: 120,
      alignSelf: 'center',
      marginBottom: 36,
      marginTop: 30
    },
  });

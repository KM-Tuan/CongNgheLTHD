import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8' },
    box: { padding: 10, flex: 1 },
    content: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 5, elevation: 1, padding: 10 },
    avatar: { width: 200, height: 200, backgroundColor: '#ccc', borderRadius: 100, marginTop: 50 },
    author: { fontSize: 30, fontWeight: 'bold', marginTop: 50 },
    role: { fontSize: 15, marginTop: 10 },
    email: { fontSize: 15, marginTop: 10 },
    buttonSignOut: { backgroundColor: '#2e3192', padding: 10, borderRadius: 5, marginTop: 50, marginBottom: 20 },
    textSignOut: { fontSize: 20, fontWeight: 'bold', color: '#ccc' },
});
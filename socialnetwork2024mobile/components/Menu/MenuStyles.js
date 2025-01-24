import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8' },
    box: { padding: 10, flex: 1 },
    content: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 5, elevation: 1, padding: 10 },
    avatar: { width: 200, height: 200, backgroundColor: '#ccc', borderRadius: 100 },
    author: { fontSize: 30, fontWeight: 'bold', marginTop: 20 },
    buttonSignOut: { backgroundColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 100, marginBottom: 20 },
    textSignOut: { fontSize: 20, fontWeight: 'bold' },
});
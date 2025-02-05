import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', elevation: 2 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    searchBar: { flex: 2, marginHorizontal: 10, padding: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
    menuButton: { padding: 5 },
    menuText: { fontSize: 20 },
    content: { padding: 10 },

    info: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 20, elevation: 1 },
    avatarCover: { width: 'auto', height: 180, marginBottom: 5 },
    avatar: { width: 100, height: 100, marginBottom: 5, marginLeft: 20, marginTop: -40, borderRadius: 50 },
    author: { fontSize: 20, fontWeight: 'bold', marginLeft: 140, marginTop: -48, marginBottom: 30},


    post: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 20, elevation: 1 },
    HeaderRow: { flexDirection: 'row', marginBottom: 5},
    HeaderCol: { flexDirection: 'column'},
    postAvatar: { width: 40, height: 40, backgroundColor: '#ccc', borderRadius: 20, marginRight: 10 },
    postImage: { width: 'auto', height: 200, marginBottom: 5 },
    postAuthor: { fontSize: 16, fontWeight: 'bold' },
    postDate: { fontSize: 12, color: '#555' },
    postCategory: { marginTop: 4, fontSize: 12 },
    postTitle: { fontSize: 14, marginBottom: 5 },
    postContent: { fontSize: 14, marginBottom: 5 },
    postTag: { fontSize: 14, color: '#007BFF', marginBottom: 5 },
    postFooter: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    postStats: { fontSize: 12, color: '#555' },
    postComments: { fontSize: 12, color: '#555' },
    actions: { flexDirection: 'row', justifyContent: 'space-around' },
    actionButton: { fontSize: 14, color: 'black' }
});
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8' }, 

    // Header
    header: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', elevation: 2 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    searchBar: { flex: 2, marginHorizontal: 5, padding: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },

    content: { padding: 10 },

    // Post
    post: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10, elevation: 1 },
    HeaderRow: { flexDirection: 'row', marginBottom: 5},
    HeaderCol: { flexDirection: 'column'},
    postAvatar: { width: 40, height: 40, backgroundColor: '#ccc', borderRadius: 20, marginRight: 10 },
    postImage: { width: 355, height: 175, marginRight: 10, marginBottom: 5 },
    postAuthor: { fontSize: 16, fontWeight: 'bold' },
    postDate: { fontSize: 12, color: '#555' },
    postCategory: { marginTop: 20, marginLeft: 100, fontSize: 12 },
    postTitle: { fontSize: 14, marginBottom: 5 },
    postContent: { fontSize: 14, marginBottom: 5 },
    postTag: { fontSize: 14, color: '#007BFF', marginBottom: 5 },
    postFooter: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    postStats: { fontSize: 12, color: '#555' },
    postComments: { fontSize: 12, color: '#555' },
    actions: { flexDirection: 'row', justifyContent: 'space-around' },
    actionButton: { fontSize: 14, color: '#007BFF' },

    //My Comment
    myComment: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10, elevation: 1 },
    MyContent: { width: 290, padding: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
    saveComment: { width: 50, padding: 5, fontSize: 14, borderRadius: 5, textAlign: 'center', marginLeft: 10, fontWeight: 'bold', backgroundColor: '#2e3192', color: '#ccc'},

    //Comments
    comment: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10, elevation: 1 },
    commentAvatar: { width: 40, height: 40, backgroundColor: '#ccc', borderRadius: 20, marginRight: 10 },
    commentImage: { width: 355, height: 175, marginRight: 10, marginBottom: 5 },
    commentAuthor: { fontSize: 16, fontWeight: 'bold' },
    commentDate: { fontSize: 12, color: '#555' },
    commentContent: { fontSize: 14, marginLeft: 50 },
});
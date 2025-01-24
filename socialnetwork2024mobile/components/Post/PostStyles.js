import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8' }, 

    // Header
    header: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', elevation: 2 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    searchBar: { flex: 2, marginHorizontal: 10, padding: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
    menuButton: { padding: 5 },
    menuText: { fontSize: 20 },

    content: { padding: 10 },

    // Input
    inputSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, padding: 10, backgroundColor: '#fff', borderRadius: 5, elevation: 1 },
    avatar: { width: 40, height: 40, backgroundColor: '#ccc', borderRadius: 20, marginRight: 10 },
    input: { flex: 1, fontSize: 14 },

    // Content
    editSection: { marginBottom: 20, padding: 10, backgroundColor: '#fff', borderRadius: 5, elevation: 1 },
    edit: { flex: 1, fontSize: 14, height: 300, textAlignVertical: 'top' },

    // Image
    insertImageButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    insertImageText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    previewImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
},

    // Topics

    //Save
});
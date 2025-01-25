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
    editSection: { marginBottom: 10, padding: 10, backgroundColor: '#fff', borderRadius: 5, elevation: 1 },
    edit: { flex: 1, fontSize: 14, height: 300, textAlignVertical: 'top' },

    box: {flexDirection: 'row'},

    // Topics
    picker: { fontSize: 16, width: 200, marginBottom: 10, backgroundColor: '#fff', borderRadius: 5, elevation: 1 },

    // Image
    image: { marginBottom: 10, backgroundColor: '#fff', borderRadius: 5, elevation: 1, padding: 10, alignItems: 'center' },
    addImage: { fontSize: 16, width: 160, marginBottom: 10, marginLeft: 12, textAlign: 'center', justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderRadius: 5, elevation: 1 },
    showImage: { width: 355, height: 175, },
    
    //Save
    submit: { flex: 1, justifyContent: 'center', alignItems: 'center'},
    submitButton: { width: 150, padding: 10, fontSize: 16, borderRadius: 5, textAlign: 'center', marginLeft: 10, fontWeight: 'bold', backgroundColor: '#2e3192', color: '#ccc'},


});
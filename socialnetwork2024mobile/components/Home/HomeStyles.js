import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8', },

    //Header
    header: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', elevation: 2 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    searchBar: { flex: 2, marginLeft: 10, padding: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
    menuButton: { padding: 5 },
    menuText: { fontSize: 20 },

    content: { padding: 10, flex: 1, marginTop: 5},

    //Categories
    cates: {margin: 5, paddingHorizontal: 8, },
    //SearchBar
    searchBar: {marginLeft: 12, marginRight: 12},

    // Topics
    topics: { justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10, elevation: 1,  },
    myTopics: {textAlign: 'center', fontSize: 14, color: 'black', fontWeight: 'bold'},

    // Footer
    footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ddd', },
    footerButton: { fontSize: 16, color: 'black', textAlign: 'center', alignItems: 'center'},
    icon: {marginBottom: 5},
});
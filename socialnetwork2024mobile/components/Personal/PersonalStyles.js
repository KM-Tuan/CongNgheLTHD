import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#f5f5f5',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    searchBox: {
      flex: 1,
      marginLeft: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 5,
    },
    mainContent: {
      padding: 10,
    },
    post: {
      marginBottom: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
    },
    postHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    avatar: { width: 40, 
        height: 40, backgroundColor: '#ccc', 
        borderRadius: 20, 
        marginRight: 10 },
    username: {
      fontWeight: 'bold',
    },
    postDate: {
      color: '#666',
      fontSize: 12,
    },
    postText: {
      marginBottom: 5,
    },
    tag: {
      color: '#007BFF',
      marginBottom: 10,
    },
    postFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    reactions: {
      fontSize: 12,
      color: '#666',
    },
    comments: {
      fontSize: 12,
      color: '#666',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      borderTopWidth: 1,
      borderColor: '#ddd',
    },
    footerButton: {
      alignItems: 'center',
    },
    footerButtonText: {
      fontSize: 16,
    },
  });
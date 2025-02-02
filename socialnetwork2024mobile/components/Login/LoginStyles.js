import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
    }, 

    header: {
        marginVertical: 36,
    },

    headerImg: {
        width: 180,
        height: 120,
        alignSelf: 'center',
        marginBottom: 36, 
        marginTop: 30
    },

    title: {
        marginBottom: 36,
        fontSize: 30,
        fontWeight: '800',
        color: '#1e1e1e', 
        textAlign: 'center',
    },

    input :{ marginBottom: 12},
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
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
      marginBottom: 30,
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
        color: '#fff'
    },

    formFooter: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
    },
});
import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    card: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 8,
        paddingLeft: 8
    },
    maincontainer: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    userinfocontainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    userinfo: {
        flexDirection: 'row',
        marginRight: 8,
        marginBottom: 15
    },
    userImg: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    userName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginLeft: 6,

    },
    commentext: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000',
        marginTop: 4,
        marginBottom: 4,
        maxWidth: '70%'
    },
    textinput: {
        width: '90%',
        height: 40,
        backgroundColor: '#ECECEC',
        borderRadius: 24,
        paddingLeft: 12
    },
    btn: {
        marginLeft: 4
    },
    btntxt: {
        color: '#3897f1',
        fontSize: 15,
        fontWeight: '500'
    },
});

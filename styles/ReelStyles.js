import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'relative'
    },
    textcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 16,
        backgroundColor: 'transparent',
        zIndex: 2
    },
    videocontainer: {
        zIndex: 1,
        position: 'absolute',
        width: width,
        height: height
    },
    textreel: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff'
    },
    bottomcontainer: {
        width: '100%',
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 1,
        padding: 10,
        bottom: '1%'
    },
    userinfocontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        height: 60,
        padding: 5
    },
    userimg: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        marginRight: 6
    },
    username: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff'
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        color: '#9b9b9b'
    },
    rightcontainer: {
        backgroundColor: 'transparent',
        zIndex: 1,
        position: 'absolute',
        alignItems: 'center',
        zIndex: 1,
        bottom: '20%',
        right: 0,
    },
    rightouchcontainer: {
        alignItems: 'center',
        paddingRight: 8,
        padding: 4
    },
    comment: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000'
    },
    commentextinput: {
        width: '93%',
    }
})

export default styles
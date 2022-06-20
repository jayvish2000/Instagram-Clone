import { View, TouchableOpacity, Dimensions, Text, Image } from 'react-native';
import React, { useRef, useEffect, useState, useContext } from 'react';
import Video from 'react-native-video';
import styles from '../../styles/ReelStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const ReelCard = ({ currindex, item, index }) => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation()
    const [users, setUser] = useState(null)
    const videoRef = useRef(null)

    const onBuffer = (e) => {
        console.log("buffering", e)
    }

    const onError = (e) => {
        console.log("error", e)
    }

    useEffect(() => {
        if (!!videoRef.current) {
            videoRef.current.seek(0)
        }
    }, [currindex])

    const fetchUser = async () => {
        try {
            await firestore()
                .collection('users')
                .doc(item.userId)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        setUser(documentSnapshot.data())
                    }
                })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const onLike = () => {
        const currentlikes = !item.likesbyusers.includes(user.uid);
        firestore()
            .collection('reels')
            .doc(item.id)
            .update({
                likesbyusers: currentlikes
                    ? firestore.FieldValue.arrayUnion(user.uid)
                    : firestore.FieldValue.arrayRemove(user.uid),
            })
            .then(() => {
                console.log('reellike');
            })
            .catch(er => {
                console.log('faild', er);
            });
    }

    return (
        <View style={[styles.container, { height: height - 89 }, index % 2 == 0 ? { backgroundColor: "#ADD8E6" } : { backgroundColor: "pink" }]}>
            <View style={styles.textcontainer}>
                <Text style={styles.textreel}>Reels</Text>
                <Ionicons name="camera" color="#fff" size={30} onPress={() => navigation.navigate('ReelPost')} />
            </View>
            <Video
                style={styles.videocontainer}
                ref={videoRef}
                onBuffer={onBuffer}
                onError={onError}
                source={{ uri: item ? item.reelvideo || 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                resizeMode="cover"
                repeat
                rate={1.0}
                volume={1.0}
                paused={currindex !== index}
            />
            <View style={styles.bottomcontainer}>
                <View style={styles.userinfocontainer}>
                    <Image style={styles.userimg} source={{
                        uri: users
                            ? users.userImg ||
                            'https://1.bp.blogspot.com/-BZbzJ2rdptU/XhWLVBw58CI/AAAAAAAADWI/DnjRkzns2ZQI9LKSRj9aLgB4FyHFiZn_ACEwYBhgL/s1600/yet-not-died-whatsapp-dp.jpg'
                            : 'https://1.bp.blogspot.com/-BZbzJ2rdptU/XhWLVBw58CI/AAAAAAAADWI/DnjRkzns2ZQI9LKSRj9aLgB4FyHFiZn_ACEwYBhgL/s1600/yet-not-died-whatsapp-dp.jpg',
                    }} />
                    <Text style={styles.username}>
                        {users ? users.fname || 'User' : 'User'}
                    </Text>
                </View>
                <Text style={styles.text}>{item.text}</Text>
            </View>
            <View style={styles.rightcontainer}>
                <TouchableOpacity style={styles.rightouchcontainer} onPress={onLike}>
                    {item.likesbyusers.includes(user.uid) ? (
                        <Ionicons name="heart" size={30} color="red" />
                    ) : (
                        <Ionicons name="heart-outline" size={30} color="#fff" />
                    )}
                    <Text style={styles.username}>
                        {item.likesbyusers.length}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightouchcontainer}>
                    <Ionicons name="md-chatbubble-outline" color="#fff" size={30} />
                    <Text style={styles.username}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightouchcontainer}>
                    <MaterialCommunityIcons name="share" color="#fff" size={30} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReelCard
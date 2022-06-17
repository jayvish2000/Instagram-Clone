import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import styles from '../../../styles/LCFStyles'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../../../navigation/AuthProvider';

const LikeCommentFollowerScreen = () => {
    const { user } = useContext(AuthContext);
    const [follower, setFollower] = useState([])
    const [comment, setComment] = useState([])
    const [like, setLike] = useState([])
    console.log("follower", follower)

    const fetchFollower = async () => {
        await firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then((documentSnapshot) => {
                const { follower } = documentSnapshot.data()
                follower.map((item) => {
                    firestore()
                        .collection('users')
                        .doc(item)
                        .get()
                        .then((snapshot) => {
                            setFollower(snapshot.data())
                        }).catch(e => console.log(e))
                })
            }).catch(e => console.log(e))
    }

    useEffect(async () => {
        fetchFollower()
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchcontainer} onPress={() => navigation.navigate("HomeProfile", { uid: follower.uid, email: follower.email })}>
                <View style={styles.usercontainer}>
                    <Image style={styles.userimg} source={{ uri: follower.userImg }} />
                    <View style={styles.textmaincontainer}>
                        <Text style={styles.username}>
                            {follower.fname}
                        </Text>
                        <Text style={styles.userabout}>
                            started following you.
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default LikeCommentFollowerScreen
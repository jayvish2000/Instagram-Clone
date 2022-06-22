import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import styles from '../../../styles/LCFStyles'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../../../navigation/AuthProvider';
import { useTheme } from '@react-navigation/native'

const LikeCommentFollowerScreen = ({ navigation }) => {
    const { colors } = useTheme()
    const { user } = useContext(AuthContext);
    const [follower, setFollower] = useState([])
    const [comment, setComment] = useState([])
    const [like, setLike] = useState([])
    const [post, setPosts] = useState([])
    const [commentmsg, setCommentmsg] = useState([])

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

    const fetchLike = async () => {
        await firestore()
            .collection('posts')
            .where('userId', '==', user.uid)
            .get()
            .then((documentSnapshot) => {
                documentSnapshot.docs.forEach((doc) => {
                    console.log("like", doc.data())
                    const { likesbyusers } = doc.data()
                    likesbyusers.map((item) => {
                        firestore()
                            .collection('users')
                            .doc(item)
                            .get()
                            .then((snapshot) => {
                                setLike(snapshot.data())
                            }).catch(e => console.log(e))
                    })
                    firestore()
                        .collection('posts')
                        .doc(doc.id)
                        .collection('comments')
                        .get()
                        .then((snapshot) => {
                            snapshot.docs.forEach((doc) => {
                                setCommentmsg(doc.data())
                                const { commentbyusers } = doc.data()
                                firestore()
                                    .collection('users')
                                    .doc(commentbyusers)
                                    .get()
                                    .then((snapshot) => {
                                        setComment(snapshot.data())
                                    })
                            })
                        })
                })

            }).catch(e => console.log(e))
    }

    useEffect(async () => {
        fetchFollower()
        fetchLike()
    }, [])

    const likecurrentuserpost = () => {
        return (
            <TouchableOpacity style={[styles.touchcontainer, { backgroundColor: colors.background }]} onPress={() => navigation.navigate("HomeProfile", { uid: like.uid, email: like.email })}>
                <View style={styles.usercontainer}>
                    <Image style={styles.userimg} source={{ uri: like.userImg }} />
                    <View style={[styles.textmaincontainer, { width: 260 }]}>
                        <Text style={[styles.username, { color: colors.username }]}>
                            {like.fname}
                        </Text>
                        <Text style={[styles.userabout, { color: colors.about }]}>
                            like your post.
                        </Text>
                    </View>
                    {/* <Image style={styles.postimg} source={{ uri: post.postImg }} /> */}
                </View>
            </TouchableOpacity>
        )
    }

    const followcurrentuser = () => {
        return (
            <TouchableOpacity style={[styles.touchcontainer, { backgroundColor: colors.background }]} onPress={() => navigation.navigate("HomeProfile", { uid: follower.uid, email: follower.email })}>
                <View style={styles.usercontainer}>
                    <Image style={styles.userimg} source={{ uri: follower.userImg }} />
                    <View style={[styles.textmaincontainer, { width: 260 }]}>
                        <Text style={[styles.username, { color: colors.username }]}>
                            {follower.fname}
                        </Text>
                        <Text style={[styles.userabout, { color: colors.about }]}>
                            started following you.
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const commentcurrentuserpost = () => {
        return (
            <TouchableOpacity style={[styles.touchcontainer, { backgroundColor: colors.background }]} onPress={() => navigation.navigate("HomeProfile", { uid: comment.uid, email: comment.email })}>
                <View style={styles.usercontainer}>
                    <Image style={styles.userimg} source={{ uri: comment.userImg }} />
                    <View style={[styles.textmaincontainer, { width: 260 }]}>
                        <Text style={[styles.username, { color: colors.username }]}>
                            {comment.fname}
                        </Text>
                        <Text style={[styles.userabout, { color: colors.about }]}>
                            comment on your post.
                        </Text>
                    </View>
                    {/* <Image style={styles.userimg} source={{ uri: commentmsg.userImg }} /> */}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {followcurrentuser()}
            <View style={{ width: '100%', height: '1%' }} />
            {likecurrentuserpost()}
            <View style={{ width: '100%', height: '1%' }} />
            {commentcurrentuserpost()}
        </View>
    )
}

export default LikeCommentFollowerScreen
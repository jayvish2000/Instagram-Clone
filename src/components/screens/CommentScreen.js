import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../../../navigation/AuthProvider';

const CommentScreen = ({ route }) => {
    const { user } = useContext(AuthContext);
    const [comment, setcomment] = useState('')
    const [comments, setComments] = useState([])
    const [userinfo, setUserInfo] = useState()

    const onSendComment = async () => {
        await
            firestore()
                .collection("posts")
                .doc(route.params)
                .collection('comments')
                .add({
                    name: userinfo.fname,
                    email: userinfo.email,
                    commentbyusers: userinfo.uid,
                    userimg: userinfo.userImg,
                    comment,
                    createAt: new Date()
                }).then(() =>
                    console.log('sshhs')
                ).catch(e => console.log(e))
    }

    const getcomment = async () => {
        await
            firestore()
                .collection("posts")
                .doc(route.params)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comment = snapshot.docs.map(doc => {
                        const data = doc.data();
                        return { ...data }
                    })
                    setComments(comment)
                })
                .catch(e => console.log(e))
    }

    useEffect(() => {
        getcomment()
    }, [])

    useEffect(() => {
        try {
            firestore()
                .collection('users')
                .doc(user.uid)
                .onSnapshot((snap) => {
                    setUserInfo(snap.data())
                })
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ justifyContent: 'center', flex: 1, paddingTop: 8, paddingLeft: 8 }}>
                <FlatList
                    data={comments}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', marginRight: 8, marginBottom: 15 }}>
                                <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: item.userimg }} />
                                <Text style={{ fontSize: 16, fontWeight: '400', color: '#000', marginLeft: 6, }}>{item.name}</Text>
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#9b9b9b', marginTop: 4, marginBottom: 4, maxWidth: '70%' }}>{item.comment}</Text>
                        </View>
                    }
                />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', backgroundColor: '#fff', padding: 8, flexDirection: 'row', alignItems: 'center' }}>
                <TextInput style={{ width: '90%', height: 40, backgroundColor: '#ECECEC', borderRadius: 24, paddingLeft: 12 }}
                    placeholder={user.email}
                    // placeholderTextColor="#242526"
                    multiline={true}
                    value={comment}
                    onChangeText={(comment) => setcomment(comment)}
                />
                <TouchableOpacity style={{ marginLeft: 4 }} onPress={onSendComment}>
                    <Text style={{ color: '#3897f1', fontSize: 15, fontWeight: '500' }}>post</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CommentScreen
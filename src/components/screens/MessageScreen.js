import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { styles } from '../../../styles/MessageStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from '@react-navigation/native'
 
const MessageScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    try {
      const list = [];
      await firestore()
        .collection('users')
        .where('uid', '==', user.uid)
        .get()
        .then((documentSnapshot) => {
          documentSnapshot.forEach(doc => {
            const {
              userId,
              fname,
              userImg,
              status,
              about,
              follower,
              following
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              fname,
              userImg,
              status,
              about,
              follower,
              following
            });
            doc.data().following.map(id => {
              firestore()
                .collection('users')
                .where('uid', '==', id)
                .get()
                .then((snapshot) => {
                  snapshot.docs.forEach(doc => {
                    setUserData(doc.data())
                  })
                })
            })

          });

        })

    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={[styles.container,{backgroundColor:colors.background}]}>
      <View style={styles.Card}>
        {userData ?
          <TouchableOpacity
            style={styles.Card}
            onPress={() =>
              navigation.navigate('Chats', { userName: userData.fname, uid: userData.id, status: typeof (userData.status) == "string" ? userData.status : userData.status.toDate().toString() })
            }>
            <View style={styles.UserInfo}>
              <View style={styles.UserImgWrapper}>
                <Image
                  style={styles.UserImg}
                  source={{ uri: userData?.userImg }} />
              </View>
              <View style={styles.TextSection}>
                <View style={styles.UserInfoText}>
                  <Text style={[styles.UserName,{color:colors.username}]}>
                    {userData?.fname}
                  </Text>
                </View>
                <Text style={[styles.about,{color:colors.about}]}>
                  {userData?.about}
                </Text>
              </View>

            </View>
          </TouchableOpacity>
          :
          null
        }
      </View>
    </View>
  );
};

export default MessageScreen;

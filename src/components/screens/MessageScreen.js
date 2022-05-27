import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { styles } from '../../../styles/MessageStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const MessageScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  console.log("yt", userData)
  const getUser = async () => {
    try {
      const list = [];
      await firestore()
        .collection('users')
        .where('uid', '!=', user.uid)
        .get()
        .then((documentSnapshot) => {
          documentSnapshot.forEach(doc => {
            const {
              userId,
              fname,
              userImg,
              status,
              about
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              fname,
              userImg,
              status,
              about
            });
          });
        })
      setUserData(list)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.Card}>
        <FlatList data={userData}
          renderItem={({ item }) =>
            <TouchableOpacity
              style={styles.Card}
              onPress={() =>
                navigation.navigate('Chats', { userName: item.fname, uid: item.id, status: typeof (item.status) == "string" ? item.status : item.status.toDate().toString() })
              }>
              <View style={styles.UserInfo}>
                <View style={styles.UserImgWrapper}>
                  <Image
                    style={styles.UserImg}
                    source={{
                      uri: item
                        ? item.userImg ||
                        'https://1.bp.blogspot.com/-BZbzJ2rdptU/XhWLVBw58CI/AAAAAAAADWI/DnjRkzns2ZQI9LKSRj9aLgB4FyHFiZn_ACEwYBhgL/s1600/yet-not-died-whatsapp-dp.jpg'
                        : 'https://1.bp.blogspot.com/-BZbzJ2rdptU/XhWLVBw58CI/AAAAAAAADWI/DnjRkzns2ZQI9LKSRj9aLgB4FyHFiZn_ACEwYBhgL/s1600/yet-not-died-whatsapp-dp.jpg',
                    }}
                  />

                </View>
                <View style={styles.TextSection}>
                  <View style={styles.UserInfoText}>
                    <Text style={styles.UserName}>
                      {userData ? item.fname : 'JAY'}
                    </Text>
                  </View>
                  <Text style={styles.about}>
                    {userData ? item.about : 'Hi ! There I am using Insta clone'}
                  </Text>
                </View>

              </View>
            </TouchableOpacity>

          }
        />
      </View>
    </View>
  );
};

export default MessageScreen;

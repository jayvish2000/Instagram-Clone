import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { styles } from '../../../styles/MessageStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const MessageScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    try {
      const list = [];
      await firestore()
        .collection('users')
        .where('email', '!=', user.email)
        .get()
        .then((documentSnapshot) => {
          documentSnapshot.forEach(doc => {
            const {
              userId,
              fname,
              userImg,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              fname,
              userImg,

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

      <View
        style={{
          backgroundColor: '#2e64e515',
          width: 50,
          height: 50,
          borderRadius: 50 / 2,
          justifyContent: 'center',
          alignItems: 'center',
          left: '87%',
          bottom: '6%',
          position: 'absolute',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
          <MaterialCommunityIcons
            name="message-text-outline"
            size={30}
            color="#2e64e5"
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList data={userData}
          renderItem={({ item }) =>
            <TouchableOpacity
              style={styles.Card}
              onPress={() =>
                navigation.navigate('Chats', { userName: item.fname })
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
                      {' '}
                      {userData ? item.fname : 'JAY'}
                    </Text>
                  </View>
                  {/* <Text style={styles.about}>
                    Hi ! there I am using Social chat app
                  </Text> */}
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

import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {styles} from '../../../styles/MessageStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const MessageScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  console.log('userData', userData);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        console.log('cod', documentSnapshot);
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.Card}
        onPress={() =>
          navigation.navigate('Chats', {userName: userData.fname})
        }>
        <View style={styles.UserInfo}>
          <View style={styles.UserImgWrapper}>
            <Image
              style={styles.UserImg}
              source={{
                uri: userData
                  ? userData.userImg ||
                    'https://1.bp.blogspot.com/-BZbzJ2rdptU/XhWLVBw58CI/AAAAAAAADWI/DnjRkzns2ZQI9LKSRj9aLgB4FyHFiZn_ACEwYBhgL/s1600/yet-not-died-whatsapp-dp.jpg'
                  : 'https://1.bp.blogspot.com/-BZbzJ2rdptU/XhWLVBw58CI/AAAAAAAADWI/DnjRkzns2ZQI9LKSRj9aLgB4FyHFiZn_ACEwYBhgL/s1600/yet-not-died-whatsapp-dp.jpg',
              }}
            />
          </View>
          <View style={styles.TextSection}>
            <View style={styles.UserInfoText}>
              <Text style={styles.UserName}>
                {' '}
                {userData ? userData.fname : 'JAY'}
              </Text>
            </View>
            <Text style={styles.about}>
              {userData
                ? userData.about
                : 'Hi ! there I am using Social chat app'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

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
    </View>
  );
};

export default MessageScreen;

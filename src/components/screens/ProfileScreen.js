/* eslint-disable react-native/no-inline-styles */
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../../navigation/AuthProvider';
import {styles} from '../../../styles/ProfileStyles';
import firestore from '@react-native-firebase/firestore';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import VideoScreen from './VideoScreen';
import MixedScreen from './MixedScreen';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({navigation, route}) => {
  const {user, logout} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .where('userId', '==', route.params ? route.params.userId : user.uid)
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {userId, post, postImg, postTime, likes, comments} =
              doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'jay',
              userImg: 'https://wallpaper.dog/large/20481081.jpg',
              postTime: postTime,
              post,
              postImg,
              likes,
              comments,
            });
          });
        });
      setPosts(list);
      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
    fetchPosts();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 280,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 18,
        }}>
        <Image
          style={styles.userImg}
          source={{
            uri: userData
              ? userData.userImg ||
                'https://1.bp.blogspot.com/-BZbzJ2rdptU/XhWLVBw58CI/AAAAAAAADWI/DnjRkzns2ZQI9LKSRj9aLgB4FyHFiZn_ACEwYBhgL/s1600/yet-not-died-whatsapp-dp.jpg'
              : 'https://1.bp.blogspot.com/-BZbzJ2rdptU/XhWLVBw58CI/AAAAAAAADWI/DnjRkzns2ZQI9LKSRj9aLgB4FyHFiZn_ACEwYBhgL/s1600/yet-not-died-whatsapp-dp.jpg',
          }}
        />
        <Text style={styles.userName}>
          {userData ? userData.fname || 'JAY' : 'JAY'}
        </Text>
        <Text style={styles.aboutUser}>
          {userData ? userData.about || 'details not added' : ''}
        </Text>

        <View style={styles.userBtnWrapper}>
          {route.params ? (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                // onPress={() => navigation.navigate('Chats')}
              >
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn}>
                <Text style={styles.userBtnTxt}>Follow</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>3323</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>21</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
      </View>

      <View style={{width: '100%', height: '70%'}}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#2e64e5',
            headerShown: false,
            tabBarInactiveTintColor: '#949494',
          }}>
          <Tab.Screen
            name="Image"
            component={MixedScreen}
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({color}) => (
                <Fontisto name="nav-icon-grid" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="Video"
            component={VideoScreen}
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({color}) => (
                <Icon name="md-play-circle-outline" color={color} size={25} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default ProfileScreen;

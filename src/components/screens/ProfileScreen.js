import { Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../navigation/AuthProvider';
import { styles } from '../../../styles/ProfileStyles';
import firestore from '@react-native-firebase/firestore';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserPostDataVideo from '../UserPostDataVideo'
import UserPostData from '../UserPostData'
import auth from '@react-native-firebase/auth'

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [follow, setFollow] = useState(null);

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
            const { userId, postImg, postvideo } = doc.data();
            list.push({
              id: doc.id,
              userId,
              postImg,
              postvideo
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
      .onSnapshot(documentSnapshot => {
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

  const MixedScreen = () => {
    return (
      <View style={[styles.container, { flex: 1 }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => <UserPostData key={item.id} item={item} />}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }

  const VideoScreen = () => {
    return (
      <View style={[styles.container, { flex: 1 }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => <UserPostDataVideo key={item.id} item={item} />}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  const onfollow = () => {
    const currentfollower = !userData.follower.includes(route.params ? route.params.userId : user.uid);
    const currentfollowing = !userData.following.includes(route.params ? route.params.userId : user.uid);

    const following = firestore()
      .collection('users')
      .doc(user.uid)

    const follower = firestore()
      .collection('users')
      .doc(userData.uid)

    const batch = firestore().batch()
    batch.update(follower, { follower: currentfollower ? firestore.FieldValue.arrayUnion(user.uid) : firestore.FieldValue.arrayRemove(route.params ? route.params.userId : user.uid) })
    batch.update(following, { following: currentfollowing ? firestore.FieldValue.arrayUnion(userData.uid) : firestore.FieldValue.arrayRemove(userData.uid) })
    batch.commit();
  }

  const getfollower = () => {
    firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .onSnapshot((snapshot) => {
        setFollow(snapshot.data())
      })

  }
  useEffect(() => {
    getfollower()
  }, [])

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
              ? userData.userImg :
              'https://1.bp.blogspot.com/-BZbzJ2rdptU/XhWLVBw58CI/AAAAAAAADWI/DnjRkzns2ZQI9LKSRj9aLgB4FyHFiZn_ACEwYBhgL/s1600/yet-not-died-whatsapp-dp.jpg'

          }}
        />
        <Text style={styles.userName}>
          {userData ? userData.fname : ''}
        </Text>
        <Text style={styles.aboutUser}>
          {userData ? userData.about : ''}
        </Text>

        <View style={styles.userBtnWrapper}>
          {route.params ? (
            <>
              <TouchableOpacity
                style={[styles.userBtn, { backgroundColor: '#3897f0', borderColor: '#3897f0' }]}
                onPress={() => navigation.navigate('Chats', { userName: userData.fname, uid: user.uid, status: typeof (userData.status) == "string" ? userData.status : userData.status.toDate().toString() })}>
                <Text style={[styles.userBtnTxt, { color: '#fff' }]}>Message</Text>
              </TouchableOpacity>
              <>
                {route.params.userId ?
                  <>
                    {userData?.follower.includes(user.uid) ?
                      <TouchableOpacity style={[styles.userBtn, { backgroundColor: '#fff', borderColor: '#ECECEC' }]}
                        onPress={onfollow}>
                        <Text style={[styles.userBtnTxt, { color: '#000' }]}>following</Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={[styles.userBtn, { backgroundColor: '#3897f0', borderColor: '#3897f0' }]}
                        onPress={onfollow}>
                        <Text style={[styles.userBtnTxt, { color: '#fff' }]}>follow</Text>
                      </TouchableOpacity>

                    }
                  </>
                  :
                  null

                }
              </>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.userBtnTxt}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => {
                firestore()
                  .collection('users')
                  .doc(user.uid)
                  .update({
                    status: firestore.FieldValue.serverTimestamp()
                  }).then(() => {
                    logout()
                  })
              }}>
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
            {route.params ?
              <>
                {follow?.follower ?
                  <Text style={styles.userInfoTitle}>{follow?.follower.length}</Text>
                  :
                  <Text style={styles.userInfoTitle}>0</Text>
                }
              </>
              :
              <>
                {user.uid ?
                  <>
                    {follow?.follower ?
                      <Text style={styles.userInfoTitle}>{follow?.follower.length}</Text>
                      :
                      <Text style={styles.userInfoTitle}>0</Text>
                    }
                  </>
                  : null
                }
              </>
            }

            <Text style={styles.userInfoSubTitle}>Follower</Text>
          </View>
          <View style={styles.userInfoItem}>
            {route.params ?
              <>
                {route.params ?
                  <>
                    {follow?.following ?
                      <Text style={styles.userInfoTitle}>{follow?.following.length}</Text>
                      :
                      <Text style={styles.userInfoTitle}>0</Text>
                    }
                  </>
                  : null
                }
              </>
              :
              <>
                <Text style={styles.userInfoTitle}>{follow?.following.length}</Text>
              </>
            }
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>

        </View>
      </View>

      <View style={{ width: '100%', height: '70%' }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#000',
            headerShown: false,
            tabBarInactiveTintColor: '#949494',
            tabBarIndicatorStyle: {
              width: '50%', height: 1, backgroundColor: '#000'
            },
            tabBarStyle: {
              shadowColor: '#fff', marginBottom: 1,
            },

          }}>
          <Tab.Screen
            name="Image"
            component={MixedScreen}
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({ color }) => (
                <Fontisto name="nav-icon-grid" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="Video"
            component={VideoScreen}
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({ color }) => (
                <Icon name="md-play-circle-outline" color={color} size={25} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </View >
  );
};

export default ProfileScreen;

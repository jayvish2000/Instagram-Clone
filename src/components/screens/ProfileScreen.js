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


const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userFollowing, setUserFollowing] = useState(null)

  console.log("userData", userFollowing)


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

  const Follow = () => {
    const docid = userFollowing.id > user.uid ? user.uid + "-" + userFollowing.id : userFollowing.id + "-" + user.uid
    // const currentfollower = !userFollowing.follow.includes(user.uid);

    firestore()
      .collection('users')
      .doc(route.params.userId)
      .update({
        follow:
          firestore.FieldValue.arrayUnion(user.uid)
        // : firestore.FieldValue.arrayRemove(user.uid),
      })
      .then(() => {
        console.log("follow")
      }).catch((e) => {
        console.log(e)
      })
  }

  const UnFollow = () => {
    firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .update({
        follow: firestore.FieldValue.arrayRemove(user.uid)
      })
      .then(() => {
        console.log("Unfollow")
      }).catch((e) => {
        console.log(e)
      })
  }

  const UserFollowing = async () => {
    
    await firestore()
      .collection('users')
      .where("uid", "!=", user.uid)
      .get()
      .then(documentSnapshot => {
        documentSnapshot.forEach(doc => {
          const data = doc.data();
          setUserFollowing(data)
        });

      })

  };

  useEffect(() => {
    UserFollowing();
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
                onPress={() => navigation.navigate('Chats', { userName: userData.fname, uid: user.uid, status: typeof (userData.status) == "string" ? userData.status : userData.status.toDate().toString() })}
              >
                <Text style={[styles.userBtnTxt, { color: '#fff' }]}>Message</Text>
              </TouchableOpacity>
              {userData?.follow ?
                <TouchableOpacity onPress={Follow} style={[styles.userBtn, { backgroundColor: '#3897f0', borderColor: '#3897f0' }]}>
                  <Text style={[styles.userBtnTxt, { color: '#fff' }]}>Follow</Text>
                </TouchableOpacity>
                :
                null
              }
              <TouchableOpacity onPress={UnFollow} style={[styles.userBtn, { backgroundColor: '#fff', borderColor: '#ECECEC' }]}>
                <Text style={[styles.userBtnTxt, { color: '#000' }]}>Following</Text>
              </TouchableOpacity>
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
            {userData?.follow ?
              <Text style={styles.userInfoTitle}>
                {userData.follow.length} </Text> :
              <Text style={styles.userInfoTitle}>0</Text>}
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            {route.params ?
              <>
                {userData?.follow ?
                  <Text style={styles.userInfoTitle}>
                    {userData.follow.length} </Text>
                  :
                  <Text style={styles.userInfoTitle}>0</Text>
                }
              </>
              :
              <>
                {userFollowing?.follow ?
                  <Text style={styles.userInfoTitle}>
                    {userFollowing.follow.length} </Text>
                  :
                  <Text style={styles.userInfoTitle}>0</Text>
                }
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
    </View>
  );
};

export default ProfileScreen;

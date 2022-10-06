import {
  View,
  FlatList,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Text,
  Dimensions,
  ScrollView
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { styles } from '../../../styles/Feedstyles';
import PostCard from '../PostCard';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import SuggestionScreen from './suggestionScreen';
import { AuthContext } from '../../../navigation/AuthProvider';

const { width, height } = Dimensions.get('screen')

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [discoverpeople, setDiscoverPeople] = useState(null)

  console.log(posts)

  const fetchPosts = async () => {
    try {
      const list = [];
      const lists = [];
      await
        firestore()
          .collection('users')
          .get()
          .then((snapshot) => {
            snapshot.forEach(doc => {
              const data = doc.data()
              firestore()
                .collection('users')
                .where('uid', '!=', user.uid)
                .onSnapshot((snapshot) => {
                  snapshot.docs.forEach(doc => {
                    const { fname, follower, following, uid, email, userImg } = doc.data()
                    lists.push({
                      id: doc.id,
                      fname,
                      follower,
                      following,
                      uid,
                      email,
                      userImg
                    })
                  })
                  setDiscoverPeople(lists)
                })

              data.following.map((item) => {
                firestore()
                  .collection('posts')
                  .where("userId", "==", item)
                  .get()
                  .then((res) => {
                    res.forEach((doc) => {
                      const {
                        userId,
                        email,
                        post,
                        postImg,
                        postTime,
                        likesbyusers,
                        postvideo
                      } = doc.data();

                      list.push({
                        id: doc.id,
                        userId,
                        email,
                        postTime: postTime,
                        post,
                        postvideo,
                        postImg,
                        likesbyusers
                      });
                    })
                    setPosts(list)
                  })
              })
            })
          }).catch((err) => console.log(err))


      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const deletePost = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const { posts } = documentSnapshot.data();

          if (posts != null) {
            const storageRef = storage().refFromURL(posts);
            const filesRef = storage().ref(storageRef.fullPath);

            filesRef
              .delete()
              .then(() => {
                deleteFirestoreData(postId);
                setDeleted(true);
              })
              .catch(e => {
                console.log('😢😢😢😢', e);
              });
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        ToastAndroid.show(
          'Post has been deleted successfully',
          ToastAndroid.SHORT,
        );
      })
      .catch(e => console.log('❌❌❌❌❌', e));
  };

  const handledelete = postId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel Pressed!😊😊😊😊😊😊'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <ActivityIndicator size={45} color="#2e64e5" />
        </View>
      ) : (
        <>
          {posts ? (

            <View style={styles.container}>
              <FlatList
                data={posts}
                onRefresh={() => fetchPosts()}
                refreshing={loading}
                renderItem={({ item }) => (
                  <PostCard
                    item={item}
                    ondelete={handledelete}
                    onPress={() =>
                      navigation.navigate('HomeProfile', { userId: item.userId, email: item.email })
                    }
                  />
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )
            :
            <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.text}>Follow the people to see their posts</Text>
            </View>
          }
        </>
      )}
    </View>
  );
};

export default HomeScreen;

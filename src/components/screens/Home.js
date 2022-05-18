import {
  View,
  FlatList,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../../../styles/Feedstyles';
import PostCard from '../PostCard';
import firestore from '@react-native-firebase/firestore';
import storge from '@react-native-firebase/storage';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
// console.log("idddd",posts)
  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
      
            const {
              userId,
              userName,
              userImg,
              post,
              postImg,
              postTime,
              likesbyusers,
              comments,
              postvideo,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName,
              userImg,
              postTime: postTime,
              post,
              postvideo,
              postImg,
              likesbyusers,
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
  useEffect(() => {
    fetchPosts();
  }, []);

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
        // console.log("postid",documentSnapshot.data())
        if (documentSnapshot.exists) {
          const {posts} = documentSnapshot.data();

          if (posts != null) {
            const storageRef = storge().refFromURL(posts);
            const filesRef = storge().ref(storageRef.fullPath);

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
      {cancelable: false},
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
        <View style={styles.container}>
          <FlatList
            data={posts}
            onRefresh={() => fetchPosts()}
            refreshing={loading}
            renderItem={({item}) => (
              <PostCard
                item={item}
                ondelete={handledelete}
                onPress={() =>
                  navigation.navigate('HomeProfile', {userId: item.userId})
                }
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

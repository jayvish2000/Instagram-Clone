import {StyleSheet, FlatList, View} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../navigation/AuthProvider';
import UserPostDataVideo from '../UserPostDataVideo';

const VideoScreen = ({route, navigation}) => {
  const {user} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
            const {postvideo} = doc.data();
            list.push({
              id: doc.id,
              postvideo,
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
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={posts}
        renderItem={({item}) => <UserPostDataVideo key={item.id} item={item} />}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#2e64e515',
    flex: 1,
  },
});

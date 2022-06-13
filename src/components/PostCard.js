import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { styles } from '../../styles/Feedstyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../navigation/AuthProvider';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';
import { ProgressiveImage, ProgressiveVideo } from './ProgressiveData';
import { useNavigation } from '@react-navigation/native';

const PostCard = ({ item, ondelete, onPress }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [comments, setComments] = useState(null)

  console.log("comm", comments)
  const navigation = useNavigation()

  const onlike = () => {
    const currentlikes = !item.likesbyusers.includes(user.uid);
    firestore()
      .collection('posts')
      .doc(item.id)
      .update({
        likesbyusers: currentlikes
          ? firestore.FieldValue.arrayUnion(user.uid)
          : firestore.FieldValue.arrayRemove(user.uid),
      })
      .then(() => {
        console.log('userrrrrlikse');
      })
      .catch(er => {
        console.log('faild', er);
      });
  };

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  const ShareData = async () => {
    const ShareOptions = {
      url: item.postImg || item.postvideo,
    };
    try {
      const ShareRes = await Share.open(ShareOptions);
      console.log('✌✌✌✌res', JSON.stringify(ShareRes));
    } catch (er) {
      console.log('❌❌❌err', er);
    }
  };

  const getcomment = async () => {
    const list = [];
    await
      firestore()
        .collection("posts")
        .doc(item.id)
        .collection('comments')
        .get()
        .then((snapshot) => {
          snapshot.forEach(doc => {
            const {  comment } = doc.data()
            list.push({
               comment
            })
            setComments(list)
          })
        })
  }

  useEffect(() => {
    getcomment()
  }, [])

  const renderComment = () => {
    return (
      <FlatList horizontal={true}
        data={comments}
        renderItem={({ item }) =>
          <Text style={styles.InteractionText}>{Object.keys(item.comment)[0].length}</Text>
        } />
    )
  }
  return (
    <View style={styles.container}>
      <View key={item.id} style={styles.card}>
        <View style={styles.UserInfo}>
          <View style={styles.UserImg}>
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
          <View style={styles.UserInfoText}>
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.UserName}>
                {userData ? userData.fname || 'JAY' : 'JAY'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.PostTime}>
              {moment(item.postTime.toDate()).fromNow()}
            </Text>
          </View>
        </View>
        <Text style={styles.Posttext}>{item.post}</Text>

        {item.postImg != null ? (
          <ProgressiveImage
            defaultImageSource={{
              uri: 'https://www.touchtaiwan.com/images/default.jpg',
            }}
            source={{ uri: item.postImg }}
            style={{ width: '100%', height: 300 }}
            resizeMode="cover"
          />
        ) : null}
        {item.postvideo != null ? (
          <ProgressiveVideo
            poster="https://www.cloudlessons.net/images/video-thumb.png"
            style={{ width: '100%', height: 200 }}
            source={{ uri: item.postvideo }}
            resizeMode="cover"
          // controls={true}
          />
        ) : null}

        <View style={styles.InteractionWrapper}>
          <TouchableOpacity style={styles.Interaction} onPress={onlike}>
            {item.likesbyusers.includes(user.uid) ? (
              <Ionicons name="heart" size={30} color="red" />
            ) : (
              <Ionicons name="heart-outline" size={30} color="black" />
            )}
            <Text style={styles.InteractionText}>
              {item.likesbyusers.length} Likes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Interaction} onPress={() => navigation.navigate('comments', item.id)}>
            <Ionicons name="md-chatbubble-outline" size={24} />
            {renderComment()}
            {/* <Text style={styles.InteractionText}>
            {count('comment')}
            </Text> */}
            <Text style={styles.InteractionText}>Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Interaction} onPress={ShareData}>
            <MaterialCommunityIcons name="share" size={28} />
            <Text style={styles.InteractionText}>Share</Text>
          </TouchableOpacity>
          {user.uid === item.userId ? (
            <TouchableOpacity
              style={styles.Interaction}
              onPress={() => ondelete(item.id)}>
              <Ionicons name="md-trash-bin" size={24} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default PostCard;

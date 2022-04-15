/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  TextInput,
  Platform,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {styles} from '../../../styles/AddPostStyles';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../navigation/AuthProvider';
import Video from 'react-native-video';

const AddPostScreen = ({item}) => {
  const {user} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 320,
      height: 280,
      // cropping: true,
    }).then(image => {
      // console.log(image);
      const imageUrl = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUrl);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then(image => {
      const imageUrl = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUrl);
    });
  };

  const videolaunch = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      const videoUrl = Platform.OS === 'ios' ? video.sourceURL : video.path;

      setVideo(videoUrl);
    });
  };

  const submitPost = async () => {
    const videoUrl = await uploadVideo();
    const imageUrl = await uploadImage();

    firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        post: post,
        postImg: imageUrl,
        postvideo: videoUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        likes: null,
        Comment: null,
      })
      .then(() => {
        ToastAndroid.show(
          'Post has been uploaded successfully',
          ToastAndroid.SHORT,
        );
        setPost(post);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUrl = image;
    let filename = uploadUrl.substring(uploadUrl.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');

    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);

    const task = storageRef.putFile(uploadUrl);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      ToastAndroid.show(
        'Image has been uploaded successfully',
        ToastAndroid.SHORT,
      );
      setImage(image);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const uploadVideo = async () => {
    if (video == null) {
      return null;
    }
    const uploadUrl = video;

    let filename = uploadUrl.substring(uploadUrl.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');

    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`videos/${filename}`);
    const metadata = {
      contentType: 'video/mp4',
    };

    const task = storageRef.putFile(uploadUrl, metadata);

    task.on('state_changed', taskSnapshot => {
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await storageRef.putFile(uploadUrl);

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      ToastAndroid.show(
        'Video has been uploaded successfully',
        ToastAndroid.SHORT,
      );
      setVideo(video);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#ECE5DD',
      }}>
      <View style={styles.InputWrapper}>
        {image != null ? (
          <View style={{width: 180, height: 200, aspectRatio: 1 * 1.4}}>
            <Image style={styles.imageWrapper} source={{uri: image}} />
          </View>
        ) : (
          <Video
            style={{width: '100%', height: 220}}
            source={{uri: video}}
            resizeMode="cover"
          />
        )}

        <TextInput
          style={styles.Inputfield}
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={content => setPost(content)}
        />
        {uploading ? (
          <View style={styles.StatusWrapper}>
            <Text style={{fontSize: 15, color: '#2e64e5', fontWeight: '500'}}>
              {transferred} % Completed
            </Text>
            <ActivityIndicator size="large" color="#2e64e5" />
          </View>
        ) : (
          <TouchableOpacity style={styles.submitbtn} onPress={submitPost}>
            <Text style={styles.submitbtntext}>Post</Text>
          </TouchableOpacity>
        )}
      </View>
      <ActionButton
        style={styles.actionButtonIcon}
        buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title=""
          onPress={takePhotoFromCamera}>
          <Icon name="camera" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title=""
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor="#3498db" title="" onPress={videolaunch}>
          <Icon name="md-videocam-sharp" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </ScrollView>
  );
};

export default AddPostScreen;

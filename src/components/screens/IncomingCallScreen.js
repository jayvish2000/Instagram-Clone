import {View, Text, ImageBackground, Pressable} from 'react-native';
import React from 'react';
import styles from '../../../styles/IncomingCallStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const IncomingCallScreen = () => {
  const onDecline = () => {
    console.log('on decline');
  };

  const onAccept = () => {
    console.log('on accept');
  };

  return (
    <ImageBackground
      style={styles.imgbg}
      source={{uri: 'https://answers.unity.com/storage/temp/13202-1.png'}}>
      <Text style={styles.name}>RAJ</Text>
      <Text style={styles.phoneNumber}>ringing +917828727745</Text>
      <View style={[styles.iconRow, {marginTop: 'auto'}]}>
        <View style={styles.iconContainer}>
          <Ionicons name="alarm" size={30} color="#fff" />
          <Text style={styles.icontext}>Remind me</Text>
        </View>
        <View style={styles.iconContainer}>
          <Entypo name="message" size={30} color="#fff" />
          <Text style={styles.icontext}>Message</Text>
        </View>
      </View>
      <View style={styles.iconRow}>
        <Pressable style={styles.iconContainer} onPress={onDecline}>
          <View style={styles.iconbtncontainer}>
            <Feather name="x" size={30} color="#fff" />
          </View>
          <Text style={styles.icontext}>Decline</Text>
        </Pressable>
        <Pressable style={styles.iconContainer} onPress={onAccept}>
          <View style={[styles.iconbtncontainer, {backgroundColor: '#0288d1'}]}>
            <Feather name="check" size={30} color="#fff" />
          </View>
          <Text style={styles.icontext}>Accept</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default IncomingCallScreen;

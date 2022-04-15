import {View, Pressable} from 'react-native';
import React, {useState} from 'react';
import styles from '../../../styles/CallStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CallScreen = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const onReverseCamera = () => {
    console.log('onReverseCamera');
  };

  const onToggleCamera = () => {
    setIsCameraOn(currentValue => !currentValue);
  };

  const onToggleMicrophone = () => {
    setIsMicOn(currentValue => !currentValue);
  };

  const OnHangup = () => {
    console.log('OnHangup');
  };

  return (
    <View style={styles.pages}>
      <View style={styles.cameraPreview}></View>
      <View style={styles.btncontainer}>
        <Pressable style={styles.iconbtn} onPress={onReverseCamera}>
          <Ionicons name="camera-reverse" size={30} color="#fff" />
        </Pressable>
        <Pressable style={styles.iconbtn} onPress={onToggleCamera}>
          <MaterialCommunityIcons
            name={isCameraOn ? 'camera-off' : 'camera'}
            size={30}
            color="#fff"
          />
        </Pressable>
        <Pressable style={styles.iconbtn} onPress={onToggleMicrophone}>
          <MaterialCommunityIcons
            name={isMicOn ? 'microphone-off' : 'microphone'}
            size={30}
            color="#fff"
          />
        </Pressable>
        <Pressable
          style={[styles.iconbtn, {backgroundColor: '#FE4D4D'}]}
          onPress={OnHangup}>
          <MaterialIcons name="call-end" size={30} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

export default CallScreen;

/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import ProgressiveVideos from './ProgressiveVideos';

const UserPostDataVideo = ({item}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        margin: 1,
        backgroundColor: '#2e64e515',
        marginBottom: 4,
      }}>
      {item.postvideo != null ? (
        <ProgressiveVideos
          poster={'https://www.cloudlessons.net/images/video-thumb.png'}
          source={{uri: item.postvideo}}
          style={{width: '100%', height: 150}}
          resizeMode="cover"
        />
      ) : null}
    </View>
  );
};

export default UserPostDataVideo;

/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import ProgressiveImage from './ProgressiveImage';
import ProgressiveVideos from './ProgressiveVideos';

const UserPostData = ({item}) => {
  console.log('item',item.postvideo)
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        margin: 1,
        backgroundColor: '#2e64e515',
      }}>
      {item.postImg ? (
        <ProgressiveImage
          defaultImageSource={{
            uri: 'https://www.touchtaiwan.com/images/default.jpg',
          }}
          source={{uri: item.postImg}}
          style={{width: '100%', height: 150}}
          resizeMode="cover"
        />
      ) : (
        <ProgressiveVideos
        poster={'https://www.cloudlessons.net/images/video-thumb.png'}
        source={{uri: item.postvideo}}
        style={{width: '100%', height: 150}}
        resizeMode="cover"
        controls={true}
      />
      )}
      {item.postvideo  ? (
        <ProgressiveVideos
        poster={'https://www.cloudlessons.net/images/video-thumb.png'}
        source={{uri: item.postvideo}}
        style={{width: '100%', height: 150}}
        resizeMode="cover"
        controls={true}
      />
      ) : (
       null
      )}
    </View>
  );
};

export default UserPostData;

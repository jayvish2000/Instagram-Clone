import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';

const ProgressiveVideos = ({poster, source, style, ...props}) => {
  const [paused, setPaused] = useState(false);

  const playPaused = () => {
    setPaused(!paused);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={playPaused}>
        <Video
          {...props}
          source={source}
          style={styles.videos}
          paused={paused}
          poster={poster}
          
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ProgressiveVideos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
  videos: {
    width: '100%',
    height: 150,
  },
});

import {StyleSheet, TouchableWithoutFeedback, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';

const ProgressiveVideo = ({poster, source, style, ...props}) => {
  const [paused, setPaused] = useState(false);

  const playPaused = () => {
    setPaused(!paused);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableWithoutFeedback onPress={playPaused}>
        <Video
          {...props}
          source={source}
          style={styles.videos}
          paused={paused}
          poster={poster}
        />
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default ProgressiveVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
  videos: {
    width: '100%',
    height: 198,
  },
});

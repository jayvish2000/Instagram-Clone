import { View,Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const SplashScreen = ({ navigation }) => {

setTimeout(() => {
  navigation.replace('Login')
}, 3000);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../images/instalogo.jpg')} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: width,
    height: height
  }
})
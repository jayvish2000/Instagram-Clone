import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { windowHeight } from '../../utils/Dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({
  buttonTitle,
  btntype,
  color,
  backgroundColor,
  bgcolor,
  ...rest
}) => {
  let bgColor = backgroundColor;

  return (
    <TouchableOpacity
      style={[styles.butttonConatiner, { backgroundColor: bgColor }]}
      {...rest}>
      <View style={[styles.iconWrapper, { backgroundColor: bgcolor }]}>
        <FontAwesome
          style={styles.icon}
          name={btntype}
          size={22}
          color={color}
        />
      </View>
      <View style={[styles.btnTextWrapper, { backgroundColor: bgcolor }]}>
        <Text style={[styles.buttonText, { color: color }]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default SocialButton;

const styles = StyleSheet.create({
  butttonConatiner: {
    width: '100%',
    marginTop: 10,
    height: windowHeight / 18,
    backgroundColor: '#2e64e5',
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: '#ffffff',
  },
});

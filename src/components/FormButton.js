import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {windowHeight} from '../../utils/Dimensions';

const FormButton = ({buttonTitle, ...rest}) => {
  return (
    <TouchableOpacity style={styles.butttonConatiner} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};
export default FormButton;

const styles = StyleSheet.create({
  butttonConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#2e64e515',
    borderRadius: 5,
    padding: 10,
    width: '30%',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2e64e5',
  },
});

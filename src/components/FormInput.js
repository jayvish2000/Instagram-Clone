import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const FormInput = ({ iconType, labelValue, placeholderText, ...rest }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.inputContainer, { backgroundColor: colors.acbg, borderColor: colors.acbc }]}>
      <View style={[styles.iconstyle, { borderRightColor: colors.acbc }]}>
        <AntDesign name={iconType} size={20} color={colors.icon} />
      </View>
      <TextInput
        style={[styles.input, { color: colors.forminputtext }]}
        value={labelValue}
        placeholder={placeholderText}
        numberOfLines={1}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: height / 18,
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconstyle: {
    padding: 8,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    width: 38,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});

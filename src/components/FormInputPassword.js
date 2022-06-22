import {View, TextInput, StyleSheet, Pressable,Dimensions} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native'
 
const height =Dimensions.get('window').height
const width = Dimensions.get('window').width

const FormInputPassword = ({
  iconType,
  labelValue,
  placeholderText,
  secureTextEntry,
  ...rest
}) => {
  const { colors } = useTheme()
  const [isSecureEntry, setIsSecureEntry] = useState(false);
  const [rightIcon, setRightIcon] = useState('eye');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setIsSecureEntry(!isSecureEntry);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setIsSecureEntry(!isSecureEntry);
    }
  };

  return (
    <View style={  [styles.inputContainer,{backgroundColor:colors.acbg,borderColor:colors.acbc}]}>
      <View style={[styles.iconstyle,{borderRightColor:colors.acbc}]}>
        <AntDesign name={iconType} size={20} color={colors.icon}/>
      </View>
      <TextInput
        style={[styles.input,{color:colors.forminputtext}]}
        value={labelValue}
        placeholder={placeholderText}
        numberOfLines={1}
        placeholderTextColor="#666"
        {...rest}
        secureTextEntry={!isSecureEntry}
      />
      <Pressable style={{marginRight: 8}} onPress={handlePasswordVisibility}>
        <MaterialCommunityIcons name={rightIcon} size={22} color={colors.icon}/>
      </Pressable>
    </View>
  );
};

export default FormInputPassword;

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

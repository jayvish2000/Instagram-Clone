import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';

import FormInput from '../FormInput';
import FormButton from '../FormButton';
import SocialButton from '../SocialButton';
import {AuthContext} from '../../../navigation/AuthProvider';
import {Voximplant} from 'react-native-voximplant';
import FormInputPassword from '../FormInputPassword';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const voximplant = Voximplant.getInstance();

  useEffect(() => {
    const connect = async () => {
      const status = await voximplant.getClientState();
      console.log('dddd', status);
      if (status === Voximplant.ClientState.DISCONNECTED) {
        await voximplant.connect();
      }
    };
    connect();
  }, []);

  const {login, googleLogin, fbLogin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://raw.githubusercontent.com/itzpradip/react-native-firebase-social-app/master/assets/rn-social-logo.png',
        }}
      />
      <Text style={styles.text}>Social App</Text>
      <FormInput
        keyboardType="email-address"
        placeholderText="Email"
        iconType="user"
        autoCaitalize="none"
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <FormInputPassword
        placeholderText="Password"
        iconType="lock"
        labelValue={password}
        secureTextEntry
        onChangeText={userPassword => setPassword(userPassword)}
      />
      <FormButton
        buttonTitle="Sign In"
        onPress={() => login(email, password)}
      />
      <TouchableOpacity style={styles.forgotbtn}>
        <Text style={styles.navbtntext}>Forgot Password?</Text>
      </TouchableOpacity>
      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btntype="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            // onPress={() => fbLogin()}
          />
          <SocialButton
            buttonTitle="Sign In with Google"
            btntype="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.forgotbtn}>
        <Text style={styles.navbtntext}>Don't have an account? SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navbtn: {
    marginTop: 15,
  },
  forgotbtn: {
    marginVertical: 35,
  },
  navbtntext: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
});

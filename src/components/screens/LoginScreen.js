import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useContext, useState} from 'react';

import FormInput from '../FormInput';
import FormButton from '../FormButton';
import SocialButton from '../SocialButton';
import {AuthContext} from '../../../navigation/AuthProvider';
import FormInputPassword from '../FormInputPassword';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login, googleLogin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.maincontainer}>
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
       <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')} style={[styles.forgotbtn,{marginRight:4}]}>
        <Text style={styles.navbtntext}>Forgot Password?</Text>
      </TouchableOpacity>
      <FormButton
        buttonTitle="Login"
        onPress={() => login(email, password)}
      />
     
      {Platform.OS === 'android' ? (
        <View>
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
        style={[styles.forgotbtn,{justifyContent:'center',alignItems:'center',alignSelf:'center',marginTop:'15%'}]}>
        <Text style={styles.navbtntext}>Don't have an account? SignUp</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  maincontainer:{
    width:Dimensions.get('window').width/1.1,
    height:Dimensions.get('window').height/1.1,
    backgroundColor:'#2e64e515',
    padding:12,
    marginTop:'10%',
    marginBottom:'10%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    elevation:15,
    shadowColor:'#fff'
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
    justifyContent:'center',
    alignItems:'flex-end',
    alignSelf:'flex-end'
  },
  navbtntext: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2e64e5',
  },
});

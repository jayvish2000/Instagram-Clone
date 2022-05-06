import { StyleSheet, Text, View ,Dimensions} from 'react-native'
import React,{useContext,useState} from 'react'
import { AuthContext } from '../../../navigation/AuthProvider'
import FormInput from '../FormInput'
import FormButton from '../FormButton'

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState()
    const {forgotpassword}=useContext(AuthContext)

  return (
    <View style={styles.container}>
        <View style={styles.maincontainer}>
      <View style={styles.formcontainer}>
      <Text style={styles.text}>Rest Your Email Password</Text>
      <FormInput
        keyboardType="email-address"
        placeholderText="Enter Your Email"
        iconType="user"
        autoCaitalize="none"
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
      />    
       <FormButton 
        buttonTitle="Rest Password"
        onPress={() => forgotpassword(email)}
      />
       <FormButton
        buttonTitle="Go Back"
        onPress={()=>navigation.navigate("Login")}
      />
      </View>
     </View>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
container:{
    alignItems:'center',
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center'
},
maincontainer:{
    padding:12,
    width:Dimensions.get('window').width/1.1,
    height:Dimensions.get('window').height/1.1,
    backgroundColor:'#2e64e515', 
    marginTop:'10%',
    marginBottom:'10%',
    borderRadius:25,
    elevation:15,
    shadowColor:'#fff'
},
formcontainer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:'20%'
},
text:{
    fontSize:18,
    fontWeight:'bold',
    color:'#2e64e5',
    marginBottom:'40%'
}
})
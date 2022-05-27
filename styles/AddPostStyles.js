import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    justifyContent:'center'
  },
  InputWrapper: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2e64515',
  },
  Inputfield: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    textAlign: 'center',
    width: '100%',
  },

  actionButtonIcon: {
    fontSize: 22,
    // height: 22,
    color: 'white',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  StatusWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#2e64e515',
    borderRadius: 5,
    padding: 10,
    width: '30%',
  },
  submitbtntext: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2e64e5',
  },
});

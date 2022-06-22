import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    
  },
  InputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
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
    borderRadius: 5,
    padding: 10,
    width: '30%',
  },
  submitbtntext: {
    fontSize: 15,
    fontWeight: 'bold'
  },
});

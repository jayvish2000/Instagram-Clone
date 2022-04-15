import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  actioncontainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    padding: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  icon: {paddingLeft: 8},
  textInput: {
    flex: 1,
    padding: 10,
    color: '#333333',
    width: '100%',
    height: 50,
  },
  imgbg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  chooseimg: {
    textAlign: 'center',
    padding: 6,
    fontSize: 18,
  },
});

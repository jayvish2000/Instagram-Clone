import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '25%',
  },
  name: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: '30%',
  },
  phoneNumber: {
    fontSize: 20,
    color: '#fff',
  },
  btncontainer: {
    backgroundColor: '#128C7E',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
  },
  iconbtn: {
    backgroundColor: '#075e54',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    padding: 10,
  },
  icontext: {
    color: '#fff',
    marginTop: 10,
  },
  iconbtncontainer: {
    borderRadius: 50,
    padding: 12,
    backgroundColor: '#FE4D4D',
    margin: 10,
  },
});

export default styles;

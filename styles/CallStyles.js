import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: '#075e54',
  },
  cameraPreview: {
    backgroundColor: '#128C7E',
    width: 100,
    height: 150,
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 50,
  },
  name: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginTop: 'auto',
  },
  iconbtn: {
    backgroundColor: '#075e54',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

export default styles;

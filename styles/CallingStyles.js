import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cameraPreview: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    color: '#000',
    fontWeight: '400',
    marginBottom: 10,
    marginLeft: 12,
    marginTop: '10%',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#000',
  },
  iconview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textimgview: {
    width: 95,
    height: 95,
    marginBottom: 20,
    borderRadius: 95 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'tomato',
  },
  textimg: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  },
  borderview: {
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D4',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imgbtn: {
    width: '100%',
    height: '50%',
  },
  iconconatiner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 2,
    marginTop: 15,
  },
  phoneconatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  icontextcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 8,
    marginBottom: 15,
  },
  icontextcolor: {
    textAlign: 'center',
    color: '#2e64e5',
  },
});

export default styles;

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  ScrollContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    flexDirection: 'row',
  },
  displayName: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    marginBottom: 5,
  },
  textimgview: {
    backgroundColor: 'tomato',
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textimg: {
    color: '#fff',
  },
  usertextview: {
    justifyContent: 'center',
    padding: 12,
  },
  displayNumber: {
    fontSize: 12,
    color: '#2e64e5',
  },
  displayImg: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    resizeMode: 'cover',
  },
  textinput: {
    backgroundColor: '#2e64e515',
    borderRadius: 25,
    marginLeft: 14,
    marginTop: 14,
    marginRight: 14,
    paddingLeft: 18,
  },
  addview: {
    backgroundColor: '#2e64e515',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    left: '78%',
    bottom: '6%',
    position: 'absolute',
  },
});

export default styles;

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#ffffff',
  },
  Card: {
    width: '100%',
  },
  UserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  UserImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  TextSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
  },
  UserInfoText: {
    justifyContent: 'center',
    marginBottom: 5,
    marginRight: 20,
  },
  UserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  PostTime: {
    fontSize: 12,
    color: '#666',
  },
  about: {
    fontSize: 14,
    color: '#333333',
  },
});

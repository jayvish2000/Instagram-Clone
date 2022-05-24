import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#ffffff',
  },
  Card: {
    width: '100%',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
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
    color: '#2e64e5',
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

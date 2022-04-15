import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#2e64e515',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 6,
    color: '#000',
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 6,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 6,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

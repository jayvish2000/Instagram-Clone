import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#2e64e515',
  },
  card: {
    backgroundColor: '#fff',
    elevation: 2,
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  UserInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  UserName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2e64e5',
  },
  UserInfoText: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 8,
  },
  PostTime: {
    fontSize: 12,
    color: '#666',
  },
  Posttext: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 12,
  },
  PostImg: {
    width: '100%',
    height: 250,
    // marginTop: 15,
    resizeMode: 'cover',
  },
  InteractionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  Interaction: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  InteractionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
    marginRight: 5,
  },
});

/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../../../styles/MessageStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Data = [
  {
    id: '1',
    userName: 'Jay',
    userImg:
      'https://loveshayariimages.in/wp-content/uploads/2021/06/Cute-Baby-Boys-Whatsapp-DP-Download-Hd-Free.jpg',
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'Raj',
    userImg:
      'https://www.whatsappimages.in/wp-content/uploads/2020/05/Cute-Dp-Images-14.jpg',
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Om',
    userImg:
      'https://www.whatsappimages.in/wp-content/uploads/2020/05/Cute-Dp-Images-14.jpg',
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Rachit',
    userImg:
      'https://i.pinimg.com/550x/d7/c2/d2/d7c2d298955569f9eb15ac54784c1e39.jpg',
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Abhi',
    userImg:
      'https://loveshayariimages.in/wp-content/uploads/2021/06/Cute-Baby-Boys-Whatsapp-DP-Download-Hd-Free.jpg',
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '6',
    userName: 'Jay',
    userImg:
      'https://loveshayariimages.in/wp-content/uploads/2021/06/Cute-Baby-Boys-Whatsapp-DP-Download-Hd-Free.jpg',
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '7',
    userName: 'Raj',
    userImg:
      'https://www.whatsappimages.in/wp-content/uploads/2020/05/Cute-Dp-Images-14.jpg',
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '8',
    userName: 'Om',
    userImg:
      'https://www.whatsappimages.in/wp-content/uploads/2020/05/Cute-Dp-Images-14.jpg',
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '9',
    userName: 'Rachit',
    userImg:
      'https://i.pinimg.com/550x/d7/c2/d2/d7c2d298955569f9eb15ac54784c1e39.jpg',
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '10',
    userName: 'Abhi',
    userImg:
      'https://loveshayariimages.in/wp-content/uploads/2021/06/Cute-Baby-Boys-Whatsapp-DP-Download-Hd-Free.jpg',
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const MessageScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.Card}
            onPress={() =>
              navigation.navigate('Chats', {userName: item.userName})
            }>
            <View style={styles.UserInfo}>
              <View style={styles.UserImgWrapper}>
                <Image style={styles.UserImg} source={{uri: item.userImg}} />
              </View>
              <View style={styles.TextSection}>
                <View style={styles.UserInfoText}>
                  <Text style={styles.UserName}>{item.userName}</Text>
                  <Text style={styles.PostTime}>{item.messageTime}</Text>
                </View>
                <Text style={styles.MessageText}>{item.messageText}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          backgroundColor: '#2e64e515',
          borderRadius: 50 / 2,
          width: 50,
          height: 50,
          left: '40%',
          bottom: '5%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
          <MaterialCommunityIcons
            name="message-text-outline"
            size={30}
            color="#2e64e5"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageScreen;

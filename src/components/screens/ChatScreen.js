/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useLayoutEffect,
} from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = () => {
  const {user} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          })),
        ),
      );
    return unsubscribe;
  });

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    firestore().collection('chats').add({_id, createdAt, text, user});
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#a1acc7',
            borderRadius: 15,
          },
        }}
        textStyle={{
          color: '#1c2134',
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={{marginBottom: 5, marginRight: 5}}>
          <MaterialCommunityIcons
            name="send-circle"
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = props => {
    return (
      <FontAwesome
        {...props}
        name="angle-double-down"
        size={22}
        color="#2e64e5"
      />
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.uid,
        name: userData?.fname,
        avatar: userData?.userImg,
      }}
      renderBubble={renderBubble}
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

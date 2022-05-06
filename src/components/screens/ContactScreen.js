import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, ActivityIndicator} from 'react-native';
import Contacts from 'react-native-contacts';
import styles from '../../../styles/ContactsdataStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ContactScreen = () => {
  const [contacts, setContacts] = useState();
  const [searchContact, setSearchContact] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getContacts();
  }, []);
  const getContacts = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(
      Contacts.getAll()
        .then(contact => {
          setContacts(contact);
          if (loading) {
            setLoading(false);
          }

          console.log('👌👌👌👌👌contacts', contact);
        })
        .catch(e => {
          console.log(e);
        }),
    );
  };
  const callUser = user => {
    navigation.navigate('Calling', {user});
    console.log('ssaajatkkk😊😊😊😊😊', user);
  };
  const newPerson = {
    emailAddresses: [
      {
        label: '',
        email: '',
      },
    ],
    displayName: '',
  };
  const addNew = () => {
    Contacts.openContactForm({newPerson}).then(contact => {
      setContacts({
        contacts: [contact, ...Contacts],
      });
      console.log('contacts', contact);
    });
  };
  return (
    <View style={styles.ScrollContainer}>
      <TextInput
        style={styles.textinput}
        // value={searchContact}
        // onChangeText={setSearchContact}

        placeholderTextColor="#373D3F"
        placeholder="Search contacts"
      />
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <ActivityIndicator size={45} color="#2e64e5" />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={contacts}
          keyExtractor={(item, index) => index}
          onRefresh={() => getContacts()}
          refreshing={loading}
          renderItem={({item}) => (
            <Pressable style={styles.card} onPress={() => callUser(item)}>
              <View style={styles.textimgview}>
                <Text style={styles.textimg}>
                  {item.displayName.charAt(0).toUpperCase() +
                    '' +
                    item.familyName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.usertextview}>
                <Text style={styles.displayName}>{item.displayName}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
      <Pressable style={styles.addview} onPress={addNew}>
        <MaterialCommunityIcons name="plus" size={30} color="#2e64e5" />
      </Pressable>
    </View>
  );
};

export default ContactScreen;

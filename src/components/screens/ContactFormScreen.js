/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import Contacts from 'react-native-contacts';

const ContactFormScreen = () => {
  const [contacts, setContacts] = useState();

  const addNew = () => {
    Contacts.openContactForm({}).then(contact => {
      // Added new contact
      setContacts(({contacts}) => ({
        // contacts: [contact, ...contacts],
        // loading: false
      }));
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={addNew}>
        <Text>Form</Text>
      </Pressable>
    </View>
  );
};

export default ContactFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

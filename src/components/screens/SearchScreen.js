import { View, TextInput, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import styles from '../../../styles/SearchStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState([])
  console.log("search", search)
  const searchUser = async (search) => {
    try {
      await firestore()
        .collection('users')
        .where('fname', '>=', search)
        .get()
        .then(documentSnapshot => {
          let users = documentSnapshot.docs.map(doc => {
            const data = doc.data()
            const id = doc.id
            return { id, ...data }
          })
          setSearch(users)
        })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchcontainer}>
        <TouchableOpacity style={styles.iconcontainer}>
          <Ionicons name="search-outline" color="#242526" size={24} />
        </TouchableOpacity>
        <TextInput style={styles.textinput}
          placeholder="Search"
          onChangeText={(text) => searchUser(text)}
        />
      </View>
      <FlatList 
        data={search}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.touchcontainer} onPress={() => navigation.navigate("HomeProfile", { uid: item.uid, email: item.email })}>
            <View style={styles.usercontainer}>
              <Image style={styles.userimg} source={{ uri: item.userImg }} />
              <View style={styles.textmaincontainer}>
                <View style={styles.namecontainer}>
                  <Text style={styles.username}>
                    {item.fname}
                  </Text>
                </View>
                <Text style={styles.userabout}>
                  {item.about}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default SearchScreen
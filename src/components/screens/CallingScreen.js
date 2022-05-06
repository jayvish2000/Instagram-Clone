import {Text, View, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import styles from '../../../styles/CallingStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CallingScreen = ({route}) => {
  const user = route?.params?.user;
 
  return (
    <View style={styles.pages}>
      <View style={styles.cameraPreview}>
        <Pressable style={styles.imgbtn}>
          {user.thumbnailPath ? (
            <Image
              style={styles.img}
              source={{
                uri: user.thumbnailPath,
              }}
            />
          ) : (
            <View style={styles.textimgview}>
              <Text style={styles.textimg}>
                {user.displayName.charAt(0).toUpperCase() +
                  '' +
                  user.familyName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </Pressable>
        <Text style={styles.name}>{user?.displayName}</Text>

        <View style={styles.borderview} />
        <View style={styles.iconconatiner}>
          <Ionicons name="call-outline" size={25} color="#2e64e5" />

          <MaterialCommunityIcons
            name="message-text-outline"
            size={25}
            color="#2e64e5"
          />
          <Feather name="video" size={25} color="#2e64e5" />
        </View>

        <View style={styles.icontextcontainer}>
          <Text style={styles.icontextcolor}>Call</Text>
          <Text style={styles.icontextcolor}>Text</Text>
          <Text style={styles.icontextcolor}>Video</Text>
        </View>

        <View style={styles.borderview} />
        <View style={styles.phoneconatiner}>
          <Ionicons name="call-outline" size={25} color="#000" />
          <View style={{paddingHorizontal: 30}}>
            {user?.phoneNumbers.map(phone => (
              <Text style={styles.phoneNumber}>{phone.number}</Text>
            ))}
          </View>
          <View style={styles.iconview}>
            <Feather
              style={{marginRight: 28}}
              name="video"
              size={25}
              color="#2e64e5"
            />
            <MaterialCommunityIcons
              name="message-text-outline"
              size={25}
              color="#2e64e5"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CallingScreen;

import React, { useEffect, useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../src/components/screens/Home';
import MessageScreen from '../src/components/screens/MessageScreen';
import ProfileScreen from '../src/components/screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import AddPostScreen from '../src/components/screens/AddPostScreen';
import ChatScreen from '../src/components/screens/ChatScreen';
import EditProfileScreen from '../src/components/screens/EditProfileScreen';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import CommentScreen from '../src/components/screens/CommentScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabBar({ navigation }) {
  const [userProfile, setUserProfile] = useState(null)

  const { user } = useContext(AuthContext);

  const getuserProfile = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        setUserProfile(documentSnapshot.data())
      })
  }

  useEffect(() => {
    getuserProfile()
  }, [])

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#949494',
        tabBarStyle: {
          height: 52,
          shadowColor: '#fff'
        },
        tabBarLabelStyle: {
          marginBottom: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
          headerShown: true,
          headerLeft: () => (
            <Image style={{ width: 100, height: 40, resizeMode: 'cover', marginLeft: 10 }}
              source={require('../src/images/Insta.png')} />
          ),

          headerRight: () => (
            <AntDesign style={{ padding: '4%' }} name='message1' size={25} color="#000" onPress={() => navigation.navigate('Messages')} />
          ),
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="add"
        component={AddPostScreen}
        options={({ route }) => ({
          title: '',
          tabBarStyle: { display: 'none' },
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50 / 2,
                marginBottom: 40,
                backgroundColor: '#3897f1',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
              }}>
              <MaterialCommunityIcons name="plus" color="#fff" size={30} />
            </View>
          ),
          headerLeft: () => (
            <AntDesign style={{ padding: '4%' }} name='arrowleft' size={25} color="#000" onPress={() => navigation.navigate('Home')} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: userProfile?.email,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ backgroundColor: focused ? '#000' : "#fff", width: 35, height: 35, borderRadius: 35 / 2, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: userProfile?.userImg }} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function AppStack({ navigation }) {
  const [userProfile, setUserProfile] = useState(null)

  const { user } = useContext(AuthContext);

  const getuserProfile = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        setUserProfile(documentSnapshot.data())
      })
  }

  useEffect(() => {
    getuserProfile()
  }, [])

  return (
    <Stack.Navigator>
      <Stack.Screen name='Tab' component={TabBar} options={{ headerShown: false }} />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="HomeProfile"
        component={ProfileScreen}
        options={({ route }) => ({
          title: route.params.email,
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          headerShadowVisible: false,
          title: userProfile?.email,
          headerTitleStyle: {
            color: '#000'
          },
        }}
      />
      <Stack.Screen
        name="Chats"
        component={ChatScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: "#2e64e5" }}>{route.params.userName}</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: "#2e64e5" }}>{route.params.status}</Text>
            </View>
          ),
          headerTitleStyle: {
            color: '#2e64e5',
          },
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={({ route }) => ({
          headerShadowVisible: false,
          headerShown: false
        })}
      />
      <Stack.Screen
        name="comments"
        component={CommentScreen}
        options={({ route }) => ({

        })}
      />
    </Stack.Navigator>
  )
}
export default AppStack;

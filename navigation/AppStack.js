import React, { useEffect, useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../src/components/screens/Home';
import MessageScreen from '../src/components/screens/MessageScreen';
import ProfileScreen from '../src/components/screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Image } from 'react-native';
import AddPostScreen from '../src/components/screens/AddPostScreen';
import ChatScreen from '../src/components/screens/ChatScreen';
import EditProfileScreen from '../src/components/screens/EditProfileScreen';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import CommentScreen from '../src/components/screens/CommentScreen';
import moment from 'moment';
import SearchScreen from '../src/components/screens/SearchScreen';
import LikeCommentFollowerScreen from '../src/components/screens/LikeCommentFollowerScreen';
import ReelScreen from '../src/components/screens/ReelScreen';
import PostReelScreen from '../src/components/screens/PostReelScreen'

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
          marginBottom: 10
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
          headerShown: true,
          headerLeft: () => (
            <Image style={{ width: 110, height: 40, marginLeft: '4%' }} source={require('../src/images/logo.png')} />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign style={{ marginRight: '4%' }} name="plussquareo" color='#000' size={24} onPress={() => navigation.navigate('AddPost')} />
              <AntDesign style={{ marginRight: '4%' }} name="message1" color='#000' size={24} onPress={() => navigation.navigate('Messages')} />
            </View>
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
      <Tab.Screen name='Search' component={SearchScreen}
        options={({ route }) => ({
          title: "",
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={30}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Reel"
        component={ReelScreen}
        options={({ route }) => ({
          headerShown: false,
          title: '',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ width: 33, height: 33, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              {focused ?
                <Image style={{ width: 24, height: 24 }} source={require('../src/images/reel.png')} />
                :
                <Image style={{ width: 33, height: 33 }} source={require('../src/images/reels.png')} />
              }
            </View>
          ),
        })}
      />
      <Tab.Screen name="LCF" component={LikeCommentFollowerScreen}
        options={({ route }) => ({
          title: "Activity",
          headerShown: true,
          headerShadowVisible: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              color={color}
              size={30}
            />
          )
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='lock-closed-outline' size={20} color='#000' />
              <Text style={{ fontSize: 16, fontWeight: '500', color: '#000', marginLeft: 4 }}>{userProfile?.email}</Text>
            </View>
          ),
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ backgroundColor: focused ? '#000' : '#fff', width: 35, height: 35, borderRadius: 35 / 2, justifyContent: 'center', alignItems: 'center' }}>
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
      <Stack.Screen name='Tab' component={TabBar} options={{ headerShown: false, headerShadowVisible: false, }} />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ReelPost"
        component={PostReelScreen}
        options={{
          title: '',
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="HomeProfile"
        component={ProfileScreen}
        options={({ route }) => ({
          headerShadowVisible: false,
          headerTitle: () => (
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>{route.params.email}</Text>
            </View>
          ),
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
          headerShadowVisible: false,
          headerTitle: () => (
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>{route.params.userName}</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#949494' }}>{moment(route.params.status).calendar()}</Text>
            </View>
          ),
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
          title: 'Comment'
        })}
      />
    </Stack.Navigator>
  )
}
export default AppStack;

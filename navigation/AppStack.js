/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../src/components/screens/Home';
import MessageScreen from '../src/components/screens/MessageScreen';
import ProfileScreen from '../src/components/screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {View, Text, TouchableOpacity} from 'react-native';
import AddPostScreen from '../src/components/screens/AddPostScreen';
import ChatScreen from '../src/components/screens/ChatScreen';
import EditProfileScreen from '../src/components/screens/EditProfileScreen';
import ContactScreen from '../src/components/screens/ContactScreen';
import CallingScreen from '../src/components/screens/CallingScreen';
import CallScreen from '../src/components/screens/CallScreen';
import IncomingCallScreen from '../src/components/screens/IncomingCallScreen';
import ContactFormScreen from '../src/components/screens/ContactFormScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function FeedStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Social App"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#2e64e5',
            fontSize: 18,
            fontWeight: '600',
          },
          // headerShadowVisible: false,

          headerRight: () => (
            <View>
              <FontAwesome5.Button
                name="plus"
                color="#2e64e5"
                size={22}
                backgroundColor="#fff"
                onPress={() => navigation.navigate('AddPost')}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
          },
          // headerShadowVisible: false,
          headerBackTitle: false,
          headerLeft: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,

                alignItems: 'center',
                marginRight: 18,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Social App')}>
                <MaterialIcons
                  name="arrow-back"
                  color="#2e64e5"
                  size={22}
                  // backgroundColor="#2e64e515"
                />
              </TouchableOpacity>
              {/* <Text style={{color: '#2e64e5', fontSize: 18, fontWeight: '500'}}>
                Post
              </Text> */}
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="HomeProfile"
        component={ProfileScreen}
        options={{
          title: '',
          headerTitleAlign: 'center',

          headerBackTitle: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Social App')}>
              <MaterialIcons name="arrow-back" color="#2e64e5" size={22} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function MessageStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Messages">
      <Stack.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          title: '',

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Social App')}>
              <MaterialIcons name="arrow-back" color="#2e64e5" size={22} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Chats"
        component={ChatScreen}
        options={({route}) => ({
          title: route.params.userName,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Calling')}>
              <MaterialIcons name="add-call" size={28} color="#2e64e5" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={() => ({
          title: '',
        })}
      />
      <Stack.Screen
        name="Calling"
        component={CallingScreen}
        options={() => ({
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
        })}
      />
    </Stack.Navigator>
  );
}

function ContactsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Contacts" component={ContactScreen} />
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerShadowVisible: false,
          title: '',
        }}>
        <Stack.Screen name="Call" component={CallScreen} />
        <Stack.Screen name="Calling" component={CallingScreen} />
        <Stack.Screen name="Incoming" component={IncomingCallScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profiles">
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={({route}) => ({
          headerShown: false,
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Profiles"
        component={ProfileScreen}
        options={{headerShown: true, title: ''}}
      />
    </Stack.Navigator>
  );
}

function AppStack() {
  // const getTabBarVisibility = route => {
  //   const routeName = route.state
  //     ? route.state.routes[route.state.index].name
  //     : '';

  //   if (routeName === 'Chats') {
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2e64e5',
        headerShown: false,
        tabBarStyle: {
          height: 52,
        },

        tabBarLabelStyle: {
          marginBottom: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={({route}) => ({
          tabBarStyle: {display: 'none'},
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Contact"
        component={ContactsStack}
        options={({route}) => ({
          tabBarStyle: {display: 'none'},
          tabBarIcon: ({color, size}) => (
            <AntDesign name="contacts" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default AppStack;

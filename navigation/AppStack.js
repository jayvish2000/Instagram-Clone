/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../src/components/screens/Home';
import MessageScreen from '../src/components/screens/MessageScreen';
import ProfileScreen from '../src/components/screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity,Text } from 'react-native';
import AddPostScreen from '../src/components/screens/AddPostScreen';
import ChatScreen from '../src/components/screens/ChatScreen';
import EditProfileScreen from '../src/components/screens/EditProfileScreen';
import ContactScreen from '../src/components/screens/ContactScreen';
import CallingScreen from '../src/components/screens/CallingScreen';
import UserContact from '../src/components/screens/UserContact';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function FeedStack({ navigation }) {
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
function MessageStack({ navigation,route }) {

  console.log("route",route.params)
  return (
    <Stack.Navigator initialRouteName="Messages">
      <Stack.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          headerShadowVisible:false,
          title: 'Social App', 
          headerTitleStyle: {
            color: '#2e64e5'
          },

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
        options={({ route }) => ({
          headerTitle:()=>(
            <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:18,fontWeight:'500',color:"#2e64e5"}}>{route.params.userName}</Text>
            <Text style={{fontSize:12,fontWeight:'400',color:"#2e64e5"}}>{route.params.status}</Text>
            </View>
          ),
          headerTitleStyle: {
            color: '#2e64e5',
          },
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.navigate('Messages',{userName:route.params.userId})}>
          //     <MaterialIcons name="arrow-back" color="#2e64e5" size={22} />
          //   </TouchableOpacity>
          // ),
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
        name="User"
        component={UserContact}
        options={() => ({
          title: 'Social App',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#2e64e5'
          },
           headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" color="#2e64e5" size={22} />
            </TouchableOpacity>
          ),
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

function ContactsStack({navigation}) {
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
          title: 'Social App',headerTitleStyle: {
            color: '#2e64e5'
          },
          
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.replaceS('Calling')}>
          //     <MaterialIcons name="arrow-back" color="#2e64e5" size={22} />
          //   </TouchableOpacity>
          // ),
        }}>
        <Stack.Screen name="Calling" component={CallingScreen} />
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
        options={({ route }) => ({
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Profiles"
        component={ProfileScreen}
        options={{
          headerShadowVisible: false, title: 'Social App', headerTitleStyle: {
            color: '#2e64e5'
          }
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack() {
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
          tabBarIcon: ({ color, size }) => (
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
        options={({ route }) => ({
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="add"
        component={AddPostScreen}
        options={({ route }) => ({
          tabBarStyle: { display: 'none' },
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50 / 2,
                marginBottom: 40,
                backgroundColor: '#2e64e5',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
              }}>
              <MaterialCommunityIcons name="plus" color="#fff" size={30} />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Contact"
        component={ContactsStack}
        options={({ route }) => ({
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="contacts" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default AppStack;

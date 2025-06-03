import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {useContext} from 'react'
import {userDetailContext} from './../../context/userDetailContext'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

export default function Header() {
    const {userDetail, setUserDetail} = useContext(userDetailContext)
    const router = useRouter();
    console.log({userDetail})

  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    }}>
      <View >
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25,
        color:Colors.WHITE
        
// using the name of the logged in user /
      }}>Hello, {userDetail?.name}</Text> 
      <Text style={{
        fontFamily:'outfit',
        fontSize:17,
        color:Colors.WHITE
      }}>Let's Get Started</Text>
      </View>
      <TouchableOpacity>
      <Ionicons name="settings-outline" size={30} color="black" onPress={()=>{router.push("/profile")}} />
      </TouchableOpacity>
    </View>
  )
}
import { View, Text, Platform } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Colors from '../../constant/Colors'
import NoCourse from '../../components/Home/NoCourse'

export default function Home() {
  return (
    <View style={{
      padding:25,
      paddingTop: 20, //Platform.OS == 'ios' &&
      flex:1,
      backgroundColor: Colors.WHITE,
    }}>
      <Header/>
      <NoCourse/>
    </View>
  )
}
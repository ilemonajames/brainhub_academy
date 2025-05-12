import { View, Text, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Button from '../Home/Shared/Button.jsx'
import Colors from '../../constant/Colors.jsx'

export default function NoCourse() {
    const router=useRouter()
  return (
    <View style={{
        marginTop:40,
        display:'flex',
        alignItems: 'center'
    }}>
      <Image source={require('./../../assets/images/book.png')} // the book icon
      style={{
        height: 200,
        width: 200,
      }}/>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize: 25,
        textAlign: 'center'
      }}> You don't have any course</Text>
      <Button text={'Create New Course'} onPress={()=>router.push('/addCourse')}/>
      <Button text={'Explore Existing Courses'}
      type='outline'/>
    </View>
  )
}
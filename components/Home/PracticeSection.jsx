import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { PracticeOption } from '../../constant/Option'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'
export default function PracticeSection() {
  const router= useRouter();
  return (
    <View style={{
        marginTop: 10
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize: 25,
        
      }} 
      >Practice Section</Text>
      <View>
        <FlatList
        data={PracticeOption}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({item,index})=>(
            <TouchableOpacity onPress={()=>router.push('/practice/'+item.name)} key={index} style={{
                flex: 1,
                margin: 5,
                aspectRatio: 1
            }}>
                <Image source={item?.image} style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: 160,
                    borderRadius: 15,
                }}/>
                <Text style={{
                    position: 'absolute',
                    padding: 15,
                    fontFamily: 'outfit',
                    fontSize: 15,
                    color: Colors.WHITE
                }}>{item.name}</Text>
            </TouchableOpacity>
        )}/>
      </View>
    </View>
  )
}

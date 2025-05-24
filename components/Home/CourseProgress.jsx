import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constant/Option'
import Colors from '../../constant/Colors'
import * as Progress from 'react-native-progress';
import CourseProgressCard from '../Shared/CourseProgressCard';

export default function CourseProgress({courseList}) {
    const GetCompletedChapters=(course)=>{
        const completedChapter=course?.completedChapter?.length;
        const perc=completedChapter/course?.chapters?.length;
    
        return perc
      }
  return (
    <View style={{
        marginTop: 10
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25,
        color:Colors.WHITE
      }}>Progress</Text>
      <FlatList
      horizontal={true}
      data={courseList}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <View key={index}>
        <CourseProgressCard item={item}/>
        </View>
  )}
      />
    </View>
  )
}
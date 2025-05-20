import { View, Text, Image, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { imageAssets } from '../../../constant/Option';
import Intro from '../../../components/CourseView/intro';
import Colors from '../../../constant/Colors';
import Chapters from '../../../components/CourseView/Chapters';
import { doc, getDoc } from 'firebase/firestore';
import {db} from './../../../Config/firebaseConfig'
export default function CourseView() {

    const {courseParams, courseId} = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    // console.log(courseParams);
    console.log(courseId)

    
    const GetCourseById= async ()=>{
      const docRef = await getDoc(doc(db, 'Courses', courseId));
      const courseData= docRef.data();  
    }
  return (
    <FlatList 
      data={[]}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
        }}>
      <Intro course={course}/>
      <Chapters course={course}/>
    </View>
      }
    />
    
  )
}
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../Config/firebaseConfig'
import { FlatList } from 'react-native';
import { imageAssets } from '../../constant/Option';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import CourseList from '../Home/CourseList';


export default function CourseListByCategory({category}) {
    const [courseList, setCourseList]=useState([]);
    const [loading, setLoading]=useState(false);
    const router=useRouter();
    useEffect(()=>{
        GetCourseListByCategory();
    }, [category])
    const GetCourseListByCategory=async()=>{
        setCourseList([]);
        setLoading(true);
        const q = query(collection(db, 'Courses'), where('category','==', category),
    orderBy('createdOn', 'desc'))
    const querySnapshot=await getDocs(q);
    querySnapshot?.forEach((doc)=>{
        console.log(doc.data())
        setCourseList(prev=>[...prev,doc.data()])
    })
    setLoading(false);
    }
    return (
    <View>
     {courseList?.length>0 &&<CourseList courseList={courseList} heading={category} enroll={true}/>}
    </View>
  )
}

const styles = StyleSheet.create({
    courseContainer : {
        padding: 10,
        backgroundColor: Colors.BG_GRAY,
        margin: 6,
        borderRadius: 15,
        width: 260,
    }
  })
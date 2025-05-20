import { View, Text, Platform, ScrollView, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Home/Header'
import Colors from '../../constant/Colors'
import NoCourse from '../../components/Home/NoCourse'
import {db} from './../../Config/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { userDetailContext } from '../../context/userDetailContext'
import CourseList from '../../components/Home/CourseList'
import PracticeSection from '../../components/Home/PracticeSection'
import CourseProgress from '../../components/Home/CourseProgress'

export default function Home() {

  const [courseList, setCourseList] = useState([]);
  const {userDetail, setUserDetail}= useContext(userDetailContext);
  useEffect(()=>{
    userDetail && GetCourseList();
  }, [userDetail])
  const GetCourseList = async()=>{
    setCourseList([]);
    const q = query(collection(db, 'Courses'), where('createdBy','==', userDetail?.uid))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // setCourseList((prev)=>[...prev, doc.data()])
      console.log(doc.data())
      setCourseList(prev=>[...prev,doc.data()])
    });
  }
  return (
    <FlatList
    showsVerticalScrollIndicator={false}
    data={[]}
    ListHeaderComponent={
      <View style={{
      padding:25,
      paddingTop: 20, //Platform.OS == 'ios' &&
      flex:1,
      backgroundColor: Colors.WHITE,
    }}>
      <Header/>
      {courseList?.length==0?
      <NoCourse/>:
      <View>
        <CourseProgress
        courseList={courseList}/>
      <PracticeSection/>
      <CourseList courseList={courseList}/>  
      </View> }
    </View>
    }/>
    
  )
}
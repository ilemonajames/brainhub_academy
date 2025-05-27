import { View, Text, Platform, ScrollView, FlatList, Image } from 'react-native'
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
  const [loading, setLoading]= useState(false);
  useEffect(()=>{
    userDetail && GetCourseList();
  }, [userDetail])
  const GetCourseList = async()=>{
    setLoading(true)
    setCourseList([]);
    const q = query(collection(db, 'Courses'), where('createdBy','==', userDetail?.uid))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // setCourseList((prev)=>[...prev, doc.data()])
      // console.log(doc.data())
      setCourseList(prev=>[...prev,doc.data()])
    });
      setLoading(false);

  }
  return (
    <FlatList
    showsVerticalScrollIndicator={false}
    data={[]}
    onRefresh={()=>GetCourseList()}
    refreshing={loading}
    ListHeaderComponent={
      <View style={{
        flex:1,
      backgroundColor: Colors.WHITE,
      }} >
        <Image source={require('./../../assets/images/wave.png')}
        style={{
          position: 'absolute',
          width:'100%',
          height: 700
        }}/>
        <View style={{
      padding:25,
      paddingTop: 20, //Platform.OS == 'ios' &&
      
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
      </View>
      
    }/>
    
  )
}
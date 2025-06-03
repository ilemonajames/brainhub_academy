import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { imageAssets } from '../../constant/Option';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constant/Colors';
import Button from './../../components/Shared/Button';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import {userDetailContext} from './../../context/userDetailContext'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../Config/firebaseConfig';

export default function intro({course, enroll}) {
    const router = useRouter();
    const {userDetail, setUserDetail}=useContext(userDetailContext);
    const [loading, setLoading] = useState(false);
    const [courseList, setCourseList] = useState([]);
    const GetCourseList = async()=>{
        const q = query(collection(db, 'Courses'), where('createdBy','==', userDetail?.uid));
        const querySnapshot = await getDocs(q);
        const result = [];

          querySnapshot.forEach((doc) => {
          result.push(doc.data());
  });

        setCourseList(result); // still update state for UI
        return result;

  }
    const onEnrollCourse= async()=>{
      setLoading(true)
      const list = await GetCourseList();
      if(list?.length>=5){
          console.log(list?.length)
          setLoading(false);
          router.push('/subscription')
          return;
        }
        const docId=Date.now().toString();
        const data={
          ...course,
          createdBy:userDetail?.uid,
          createdOn: new Date(),
          enrolled: true
        }
        await setDoc(doc(db, 'Courses', docId), data)
        router.push({
              pathname: '/courseView/'+docId,
              params:{
                courseParams: JSON.stringify(data),
                enroll: false
              }
            })
        setLoading(false);
    }
  return (
    <View >
        
      <Image source={imageAssets[course?.banner_image]}
      style={{
        width: '100%',
        height: 280
      }}/>
      <View style={{
        padding: 20
      }}>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 25
        }}>{course.courseTitle}</Text>
        <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Ionicons name="book-outline" size={20} color={Colors.PRIMARY} />
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 18,
                    color: Colors.PRIMARY
                    
                }}>
                  {course?.chapters?.length} Chapters</Text>
                  </View>

        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            marginTop: 10
        }}>Description</Text>
        <Text style={{
            fontFamily: 'outfit',
            fontSize: 18,
            color: Colors.GRAY
        }}>{course?.description}</Text>
        {enroll=='true'?<Button text={'Enroll Now'}
        loading={loading}
        onPress={()=>onEnrollCourse()}/>:<Button text={'Start Now'}
        onPress={()=>console.log()}/>}
          
          
        
      </View>
      <Pressable style={{
            position: 'absolute',
            padding: 10,
            
        }}
        onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={34} color="black" />
        </Pressable>
    </View>
  )
}
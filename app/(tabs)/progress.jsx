import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../Config/firebaseConfig';
import { userDetailContext } from '../../context/userDetailContext';
import CourseProgressCard from '../../components/Shared/CourseProgressCard';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

export default function Progress() {
  const [courseList, setCourseList] = useState([]);
  const {userDetail, setUserDetail}= useContext(userDetailContext);
  const [loading, setLoading]= useState(false);
  const router=useRouter();
  useEffect(()=>{
    userDetail && GetCourseList();
  }, [userDetail])
  const GetCourseList = async()=>{
    setLoading(true)
    setCourseList([]);
    const q = query(collection(db, 'Courses'), where('createdBy','==', userDetail?.uid), orderBy('createdOn', 'desc'))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // setCourseList((prev)=>[...prev, doc.data()])
      console.log(doc.data())
      setCourseList(prev=>[...prev,doc.data()])
    });
      setLoading(false);

  }
  return (
    <View>
     <Image source={require('./../../assets/images/wave.png')}
             style={{
               position: 'absolute',
               width:'100%',
               height: 700
             }}/>
      <View style={{
        width: "100%",
        position: 'absolute',
        padding: 20,
        marginTop:20
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          color: Colors.WHITE,
          marginBlock: 10
        }}>Course Progress</Text>
          <FlatList
          data={courseList}
          showsVerticalScrollIndicator={false}
          onRefresh={()=>GetCourseList()}
          refreshing={loading}
          renderItem={({item, index})=>(
            <TouchableOpacity onPress={()=>router.push({
               pathname: '/courseView/'+item?.docId,
              params:{
                courseParams: JSON.stringify(item)
              }
            })}>
              <CourseProgressCard item={item} width={'95%'}/>
            </TouchableOpacity>
          )}
          />
      </View>
    </View>
  )
}
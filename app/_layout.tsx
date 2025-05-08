import { Stack } from "expo-router";
import {useFonts} from "expo-font";
import { userDetailContext } from '../context/userDetailContext';
import { useState } from "react";

export default function RootLayout() {
  useFonts({

    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
    'worksans': require('./../assets/fonts/WorkSans-Regular.ttf'),
    'worksans-bold': require('./../assets/fonts/WorkSans-Bold.ttf'),
    'worksans-medium': require('./../assets/fonts/WorkSans-Medium.ttf'),
    'worksans-thin': require('./../assets/fonts/WorkSans-Thin.ttf')

  });
  const [userDetail, setUserDetail] = useState();
  return (
    <userDetailContext.Provider value={{
      userDetail, setUserDetail
    }}>
        <Stack screenOptions={{
      headerShown: false
    }}>
    
    </Stack>
      
    </userDetailContext.Provider>
  )
}



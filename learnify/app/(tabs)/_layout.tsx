import {ImageSourcePropType, Text ,View} from 'react-native'
import {Image} from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { icons } from '../../constants';

interface TabIconProps {
  icon: ImageSourcePropType; // type for image source
  color: string;
  name: string;
  focused: boolean;
}
const TabIcon=({icon,color,name,focused}:TabIconProps)=>{
    return(
        <View className='items-center justify-center  gap-2'>      
            <Image source={icon}
            resizeMode='contain'
            tintColor={color}
            className='w-6 h-6'/>
            <Text className={`text-[12px] ${focused ? 'text-[#FFA001]' : 'text-[#CDCDE0]' }`} style={{color:color}}>{name}</Text>
            
        </View>

    )
}
export default function TabLayout(){

    return(
        <>
        <Tabs
        screenOptions={{
            tabBarActiveTintColor:"#FFA001",  
            tabBarInactiveTintColor:"CDCDE0",
            tabBarStyle:{
                backgroundColor:'#161622',
                borderTopWidth:1,
                borderTopColor:'#222232',
                height:70,
                paddingBottom:10,
                paddingTop:10,
            }

        }}>
            <Tabs.Screen name="home" 
            options={
                {
                    title:'Home',
                    headerShown:false,
                    tabBarIcon:({color,focused})=>(
                        <TabIcon
                        icon={icons.home}
                        color={color}
                        focused={focused}
                        name='Home'
                        />
                    )

                }
            }
            />
            <Tabs.Screen name="create" 
            options={
                {
                    title:'create',
                    headerShown:false,
                    tabBarIcon:({color,focused})=>(
                        <TabIcon
                        icon={icons.plus}
                        color={color}
                        focused={focused}
                        name='create'
                        />
                    )

                }
            }
            />
                <Tabs.Screen name="flashcards" 
            options={
                {
                    title:'flashcards',
                    headerShown:false,
                    tabBarIcon:({color,focused})=>(
                        <TabIcon
                        icon={icons.plus}
                        color={color}
                        focused={focused}
                        name='create'
                        />
                    )

                }
            }
            />
                <Tabs.Screen name="generate" 
            options={
                {
                    title:'generate',
                    headerShown:false,
                    tabBarIcon:({color,focused})=>(
                        <TabIcon
                        icon={icons.plus}
                        color={color}
                        focused={focused}
                        name='create'
                        />
                    )

                }
            }
            />
                <Tabs.Screen name="profile" 
            options={
                {
                    title:'profile',
                    headerShown:false,
                    tabBarIcon:({color,focused})=>(
                        <TabIcon
                        icon={icons.profile}
                        color={color}
                        focused={focused}
                        name='create'
                        />
                    )

                }
            }
            />
        
        </Tabs>
        </>
   
    )
}
import { View, Text,Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './customButton';
import { router } from 'expo-router';

export interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState = ({title,subtitle}:EmptyStateProps) => {
  return (
    <View className='justify-center items-center  '>

      <Image 
      source={images.empty}
      className="w-120 h-120 mb-6"
      resizeMode='contain'

      />
      
      <Text className='text-2xl font-pmedium text-white '>
         {title}
      </Text>
      <Text className='font-pmedium text-sm text-gray-100'>
         {subtitle}
      </Text>
      <CustomButton
      title="Create Flashcard"
      handlePress={()=>router.push('/create')}
      containerStyles='w-full my-5'
      />
    </View>
  )
}

export default EmptyState
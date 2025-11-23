import React
 from "react";
import { TextInput, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { icons } from "../constants";

export interface SearchInputProps   {   
    title?: string;  
    value?: string;
    handleChangeText?: (text: string) => void;
    otherStyles?: string;
    placeholder?: string;
}
 

export  default function SearchInput ({ title, value, placeholder, handleChangeText, otherStyles, ...props }: SearchInputProps) {
  

  return (
    
      <View className='border-2 border-yellow-400 w-full h-16 px-4 bg-black-100 rounded-2xl flex-row items-center'>
        
        {/* TextInput */}
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          
          
        />

        <TouchableOpacity>
            <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode="contain"
            />



        </TouchableOpacity>
      </View>
    
  )
}



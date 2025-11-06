import { View, Text, Image, TextInput, TouchableOpacity, TextInputProps } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

export interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
}

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View className='border-2 border-yellow-400 w-full h-16 px-4 bg-black-100 rounded-2xl flex-row items-center'>
        
        {/* TextInput */}
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />

        {/* Password toggle */}
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='w-6 h-6 ml-2'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}

      </View>
    </View>
  )
}

export default FormField

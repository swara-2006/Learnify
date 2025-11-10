import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { router } from 'expo-router';  // Only need router here
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '../components/customButton';
import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/sign-in');  // Navigate after 2.5 seconds
    }, 2500);

    return () => clearTimeout(timeout); // Clean up if unmounted
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full min-h-[75vh] items-center justify-center px-4 ">
          <Image
            source={images.logo}
            className="w-[200px] h-[100px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Revise smarter in seconds — create and learn with{' '}
              <Text className="text-secondary-200">Learnify</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Transform your study routine with AI-powered flashcards.
          </Text>
        </View>
        <CustomButton
          title="Continue with google"
          handlePress={() => router.push('./sign-in')}
          containerStyles="w-3/4 mt-7 mx-auto rounded-lg"
        />
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

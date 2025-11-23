import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";

interface subjectsdata {
  id: string;
}

export default function Home() {
  const data: subjectsdata[] = [{ id: "1" }, { id: "2" }, { id: "3" }];

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text className="text-3xl text-white">{item.id}</Text>
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">

              {/* Header */}
              <View className="flex-row items-start justify-between mb-6 mt-3">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back,
                  </Text>
                  <Text className="text-2xl font-pmedium text-white">User</Text>
                </View>

                <Image
                  source={images.logoSmall}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>

              {/* Search Bar */}
              <SearchInput placeholder="search for topics" />

              {/* Card Section */}
              <View className="mt-6 space-y-6">

                {/* Generate Flashcards Card */}
                <TouchableOpacity
                  onPress={() => router.push("/generate")}
                  className="w-full bg-gray-800 rounded-2xl overflow-hidden"
                >
                  <Image
                    source={images.thumbnail} // ADD THIS IMAGE IN constants
                    className="w-full h-40"
                    resizeMode="cover"
                  />
                  <Text className="text-white text-xl font-pmedium text-center py-3 mt-4">
                    Generate Flashcards
                  </Text>
                </TouchableOpacity>

                {/* Create Flashcards Card */}
                <TouchableOpacity
                  onPress={() => router.push("/create")}
                  className="w-full bg-gray-800 rounded-2xl overflow-hidden"
                >
                  <Image
                    source={images.profile} // ADD THIS IMAGE ALSO
                    className="w-full h-40"
                    resizeMode="cover"
                  />
                  <Text className="text-white text-xl font-pmedium text-center py-3">
                    Create Flashcards
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

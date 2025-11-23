import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../components/customButton";
import { saveProfile, getProfile, UserProfile } from "../../services/profileService";
import Header from "../../components/header";

export default function ProfileTab() {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [studyGoal, setStudyGoal] = useState("");
  const [favoriteSubject, setFavoriteSubject] = useState("");
  const [avatar, setAvatar] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );

  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    async function load() {
      const data: UserProfile | null = await getProfile();
      if (data) {
        setUsername(data.username || "");
        setAbout(data.about || "");
        setStudyGoal(data.studyGoal || "");
        setFavoriteSubject(data.favoriteSubject || "");
        setAvatar(data.avatar || avatar);
      }
    }
    load();
  }, []);

  async function handleSave() {
    await saveProfile({
      username,
      about,
      studyGoal,
      favoriteSubject,
      avatar,
    });
    alert("Profile saved successfully!");
    setIsEditing(false);
  }

  const pickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      
      <ScrollView className="flex-1 px-4 py-6">
         
        <Text className="text-2xl font-pbold text-secondary mb-6">Profile</Text>

        {isEditing ? (
          <>
            {/* Avatar */}
            <View className="items-center mb-8">
              <Image
                source={{ uri: avatar }}
                className="w-28 h-28 rounded-full bg-black-200 border border-gray-400"
              />
              <View className="mt-4">
                <CustomButton title="Change Avatar" handlePress={pickAvatar} textStyles="text-lg mr-2 ml-2" containerStyles="w-90" />
              </View>
            </View>

            {/* Username */}
            <View className="mb-6">
              <Text className="text-white font-pmedium text-base mb-2">Username</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                placeholderTextColor="#E5E7EB"
                className="w-full p-4 rounded-xl bg-black-200 text-gray-400 border-2 border-gray-400 text-base"
              />
            </View>

            {/* About */}
            <View className="mb-6">
              <Text className="text-white font-pmedium text-base mb-2">About You</Text>
              <TextInput
                value={about}
                onChangeText={setAbout}
                placeholder="Write something about yourself"
                placeholderTextColor="#E5E7EB"
                multiline
                textAlignVertical="top"
                className="w-full p-4 rounded-xl bg-black-200 text-gray-400 min-h-[120px] border-2 border-gray-400 text-base"
              />
            </View>

            {/* Study Goal */}
            <View className="mb-6">
              <Text className="text-white font-pmedium text-base mb-2">Daily Study Goal</Text>
              <TextInput
                value={studyGoal}
                onChangeText={setStudyGoal}
                placeholder="Flashcards per day (e.g. 20)"
                placeholderTextColor="#E5E7EB"
                keyboardType="numeric"
                className="w-full p-4 rounded-xl bg-black-200 text-gray-400 border-2 border-gray-400 text-base"
              />
            </View>

            {/* Favorite Subject */}
            <View className="mb-8">
              <Text className="text-white font-pmedium text-base mb-2">Favorite Subject</Text>
              <TextInput
                value={favoriteSubject}
                onChangeText={setFavoriteSubject}
                placeholder="e.g. Physics, Math, Biology"
                placeholderTextColor="#E5E7EB"
                className="w-full p-4 rounded-xl bg-black-200 text-gray-400 border-2 border-gray-400 text-base"
              />
            </View>

            <View className="mt-4 mb-12">
              <CustomButton title="Save Profile" handlePress={handleSave} />
            </View>
          </>
        ) : (
          // ⭐ VIEW MODE WITH GLASSMORPHISM ⭐
          <View className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <View className="items-center mb-6">
              <Image
                source={{ uri: avatar }}
                className="w-28 h-28 rounded-full bg-black-200 border border-gray-400 mb-4"
              />
              <CustomButton title="Edit Profile" handlePress={() => setIsEditing(true)} />
            </View>

            <View className="mb-4">
              <Text className="text-gray-400 text-sm">Username</Text>
              <Text className="text-white text-lg font-psemibold">{username}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-400 text-sm">About You</Text>
              <Text className="text-white text-base">{about}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-400 text-sm">Daily Study Goal</Text>
              <Text className="text-white text-base">{studyGoal} flashcards/day</Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-400 text-sm">Favorite Subject</Text>
              <Text className="text-white text-base">{favoriteSubject}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

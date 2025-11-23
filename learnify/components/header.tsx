import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity,Text } from "react-native";
import { getProfile } from "../services/profileService";
import { images } from "../constants";

interface HeaderProps {
  onAvatarPress?: () => void;
}

export default function Header({ onAvatarPress }: HeaderProps) {
  const [avatar, setAvatar] = useState<string>(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png" // fallback
  );

  useEffect(() => {
    async function loadAvatar() {
      const user = await getProfile();
      if (user?.avatar) {
        setAvatar(user.avatar);
      }
    }
    loadAvatar();
  }, []);

  return (
    <View className="w-full flex-row items-center justify-between px-4 py-3 bg-primary ">
      
      {/* LOGO (empty source for now) */}
      <Image
  source={images.logoSmall}
  className="w-10 h-12 border-2 border-lime-300 rounded-lg"
/>

      

      {/* PROFILE AVATAR */}
      <View className="items-center">
  <TouchableOpacity onPress={onAvatarPress} className="items-center">
    <Image
      source={{ uri: avatar }}
      className="w-12 h-12 rounded-full border-2 border-white"
    />
    <Text className="text-white text-[10px] mt-1 ">Profile</Text>
  </TouchableOpacity>
</View>

    </View>
  );
}

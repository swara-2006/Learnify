import { Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

interface TabIconProps {
  color: string;
  name?: string;
  focused: boolean;
  icon: React.ReactNode;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-1">
      {icon}
      <Text
        className={`text-[10px] ${
          focused ? "text-[#FFA001]" : "text-[#CDCDE0]"
        }`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#222232",
            height: 70,
            paddingBottom: insets.bottom + 45,
            paddingTop: 15,
          },
        }}
      >
        {/* HOME */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Home"
                color={color}
                focused={focused}
                icon={<Ionicons name="home-outline" size={26} color={color} />}
              />
            ),
          }}
        />

        {/* CREATE */}
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Create"
                color={color}
                focused={focused}
                icon={<MaterialIcons name="add-circle-outline" size={26} color={color} />}
              />
            ),
          }}
        />

        {/* GENERATE */}
        <Tabs.Screen
          name="generate"
          options={{
            title: "Generate",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Generate"
                color={color}
                focused={focused}
                icon={<FontAwesome5 name="magic" size={22} color={color} />}
              />
            ),
          }}
        />

        {/* PROFILE */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Profile"
                color={color}
                focused={focused}
                icon={<Ionicons name="person-circle-outline" size={26} color={color} />}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

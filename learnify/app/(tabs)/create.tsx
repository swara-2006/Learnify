import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import CustomButton from "../../components/customButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveFlashcard } from "../../services/createFlascard";
import Header from "../../components/header";

export default function Create() {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [subject, setSubject] = useState("");

  const handleSave = async () => {
    if (!subject || !topic || !explanation) {
      alert("Please fill in all the required fields");
      return;
    }
    try {
      await saveFlashcard({
        subject,
        topic,
        explanation,
      });
      alert("Flashcard added successfully!");

      setSubject("");
      setTopic("");
      setExplanation("");
    } catch (e) {
      alert("Failed to save flashcard!");
    }
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
       
      <ScrollView className="flex-1 px-4 py-6">
        <View className="flex-1 bg-primary">
            <Header onAvatarPress={() => console.log("Pressed")} />
                </View>
        <Text className="text-2xl font-pbold text-secondary mb-6">
          Create Flashcard
        </Text>

        {/* SUBJECT */}
        <View className="mb-6">
          <Text className="text-white font-pmedium text-base mb-2">
            Subject
          </Text>
          <TextInput
            value={subject}
            onChangeText={setSubject}
            placeholder="Enter subject"
            placeholderTextColor="#E5E7EB" // gray-200
            className="w-full p-4 rounded-xl bg-black-200 text-gray-400 border-gray-400 border-2 font-plight text-base"
          />
        </View>

        {/* TOPIC */}
        <View className="mb-6">
          <Text className="text-white font-pmedium text-base mb-2">
            Topic
          </Text>
          <TextInput
            value={topic}
            onChangeText={setTopic}
            placeholder="Enter topic"
            placeholderTextColor="#E5E7EB" // gray-200
            className="w-full p-4 rounded-xl bg-black-200 text-white border-gray-400 border-2 font-plight "
          />
        </View>

        {/* EXPLANATION */}
        <View className="mb-6">
          <Text className="text-white font-pmedium text-base mb-2">
            Explanation
          </Text>
          <TextInput
            value={explanation}
            onChangeText={setExplanation}
            placeholder="Enter explanation"
            placeholderTextColor="#E5E7EB" // gray-200
            multiline
            textAlignVertical="top"
            className="w-full p-4 rounded-xl bg-black-200 text-gray-400 border-gray-400 border-2 font-plight min-h-[140px] text-base"
          />
        </View>

        {/* BUTTON */}
        <View className="mt-4">
          <CustomButton
            title="Add"
            handlePress={handleSave}
            textStyles="text-lg font-psemibold"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

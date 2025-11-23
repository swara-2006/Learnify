import React, { useState } from "react";
import { View, Text, TextInput, Switch, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Removed: import * as DocumentPicker from "expo-document-picker";
import CustomButton from "../../components/customButton";
import { generateFlashcards, GeneratedFlashcard } from "../../services/FlashCardAPI";
import { saveGeneratedFlashcard } from "../../services/genertedservices";
// Removed: import * as FileSystem from "expo-file-system"; 
import Header from "../../components/header";

export default function Generate() {
  const [isTextMode, setIsTextMode] = useState(true);
  const [inputText, setInputText] = useState("");
  const [numberOfCards, setNumberOfCards] = useState("5");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(""); 

  // The function is now a placeholder with a warning
  const pickFile = async () => {
    // Keeping the UI function but disabling the complex backend logic
    Alert.alert("File Upload Disabled", "File processing logic has been temporarily removed.");
  };

  const handleGenerate = async () => {
    if (!inputText.trim() || !numberOfCards.trim()) {
      Alert.alert("Please enter text and number of flashcards");
      return;
    }

    // Since we removed the file parsing logic, restrict generation to text mode
    if (!isTextMode) {
      Alert.alert("Mode Error", "Please switch to Text Input mode to generate flashcards.");
      return;
    }

    setLoading(true);

    try {
      const cardsCount = parseInt(numberOfCards);
      if (isNaN(cardsCount) || cardsCount <= 0) {
        Alert.alert("Invalid number of flashcards. Please enter a positive number.");
        setLoading(false);
        return;
      }
      
      // Type annotation for TSX is preserved here
      const flashcards: GeneratedFlashcard[] = await generateFlashcards( 
        inputText,
        cardsCount
      );

      for (const card of flashcards) {
        await saveGeneratedFlashcard({
          subject: "Generated",
          topic: card.question,
          explanation: card.answer,
        });
      }

      Alert.alert(`Generated and saved ${flashcards.length} flashcards!`);
      setInputText("");
      setNumberOfCards("5");
      setFileName("");
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to generate flashcards.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      
      <ScrollView className="flex-1 px-4 py-6">
        <View className="flex-1 bg-gray-500">
          <Header onAvatarPress={() => console.log("Pressed")} />
        </View>
          
        
        <Text className="text-2xl font-pbold text-secondary mb-8 mt-8">
          Generate Flashcards
        </Text>

        {/* Toggle Mode (UI KEPT) */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-white text-base">
            Mode: {isTextMode ? "Text Input" : "Upload File"}
          </Text>
          <Switch value={isTextMode} onValueChange={setIsTextMode} />
        </View>

        {isTextMode ? (
          /* Text Input UI (KEPT) */
          <View className="mb-6">
            <Text className="text-white font-pmedium text-base mb-2">
              Enter Text Content
            </Text>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Paste or type text here"
              placeholderTextColor="#E5E7EB"
              multiline
              textAlignVertical="top"
              className="w-full p-4 rounded-xl bg-black-200 text-gray-400 min-h-[140px] text-base border-2 border-gray-400"
            />
          </View>
        ) : (
          /* File Upload UI (KEPT) */
          <View className="mb-6">
            <Text className="text-white font-pmedium text-base mb-3">
              Upload File (TXT, PDF, DOCX)
            </Text>

            {fileName ? (
              <Text className="mb-2 text-gray-400">{fileName}</Text>
            ) : null}

            <CustomButton 
              title="Pick File" 
              handlePress={pickFile} // Calls the non-functional placeholder
            />
          </View>
        )}

        {/* Number of Cards (KEPT) */}
        <View className="mb-8">
          <Text className="text-white font-pmedium text-base mb-2">
            Number of Flashcards
          </Text>
          <TextInput
            value={numberOfCards}
            onChangeText={setNumberOfCards}
            placeholder="Enter number"
            placeholderTextColor="#E5E7EB"
            keyboardType="numeric"
            className="w-full p-4 rounded-xl bg-black-200 text-gray-400 text-base border-2 border-gray-400"
          />
        </View>

        <View className="mt-4 mb-10">
          <CustomButton
            title={loading ? "Generating..." : "Generate Flashcards"}
            handlePress={handleGenerate}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
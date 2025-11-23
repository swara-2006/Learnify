import React, { useState } from "react";


import { Pressable, View, Text } from "react-native";
import { styled } from "nativewind";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface Flashcard {
  subject: string;
  topic: string;
  explanation: string;
  image?: string;
  file?: string;
  createdAt?: any;
}

interface FlashcardProps {
  topic: string;
  explanation: string;
}

// Ensure TypeScript support

// Remove duplicate declarations
const CardContainer = styled(Pressable);
const AnimatedView = styled(Animated.View);

// --- Firestore Fetch Hook (moved imports to top, cleaned) ---
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const useFlashcards = () => {
  const [cards, setCards] = React.useState<Flashcard[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCards = async () => {
      try {
        const snap = await getDocs(collection(db, "flashcards"));
        const list: Flashcard[] = snap.docs.map((doc) => ({
          ...(doc.data() as Flashcard),
        }));
        setCards(list);
      } catch (error) {
        console.error("Error fetching flashcards", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return { cards, loading };
};

export default function Flashcard({ topic, explanation }: FlashcardProps) {
  const rotate = useSharedValue(0);
  const flipped = useSharedValue(false);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${rotate.value}deg` }
    ],
    backfaceVisibility: "hidden",
    position: "absolute",
    width: "100%",
    height: "100%",
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${rotate.value + 180}deg` }
    ],
    backfaceVisibility: "hidden",
    position: "absolute",
    width: "100%",
    height: "100%",
  }));

  const toggleFlip = () => {
    flipped.value = !flipped.value;
    rotate.value = withTiming(flipped.value ? 180 : 0, { duration: 600 });
  };

  return (
    <View className="w-full items-center justify-center p-4">
      <CardContainer
        onPress={toggleFlip}
        className="w-72 h-96 rounded-2xl overflow-hidden"
      >
        {/* FRONT SIDE */}
        <AnimatedView
          className="flex-1 bg-blue-900/90 items-center justify-center p-4 rounded-2xl"
          style={frontStyle}
        >
          <Text className="text-white text-2xl font-bold">{topic}</Text>
          <Text className="text-white/60 mt-2">Tap to flip</Text>
        </AnimatedView>

        {/* BACK SIDE */}
        <AnimatedView
          className="flex-1 bg-purple-700/90 items-center justify-center p-4 rounded-2xl"
          style={backStyle}
        >
          <Text className="text-white text-base text-center leading-relaxed">
            {explanation}
          </Text>
        </AnimatedView>
      </CardContainer>
    </View>
  );
}

// --- Example Usage ---
// import { useFlashcards } from "../services/flashcardService";
//
// const { cards, loading } = useFlashcards();
//
// if (!loading) {
//   return <Flashcard topic={cards[0].topic} explanation={cards[0].explanation} />;
// }

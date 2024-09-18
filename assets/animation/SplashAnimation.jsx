import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";

export default function SpendySenseAnimation() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const AnimatedText = Animated.createAnimatedComponent(Text);

  const renderAnimatedText = (text, baseDelay) => {
    return text.split("").map((char, index) => (
      <AnimatedText
        key={`${char}-${index}`}
        className="text-white text-4xl font-bold"
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 50],
              }),
            },
          ],
        }}
      >
        {char}
      </AnimatedText>
    ));
  };

  return (
    <View className="flex-1 bg-[#0047AB] items-center justify-center p-4">
      <View className="items-center">
        <View className="flex-row flex-wrap justify-center mb-4">
          {renderAnimatedText("SpendySense", 0)}
        </View>
        <AnimatedText
          className="text-white text-lg text-center mt-2"
          style={{
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim,
              },
            ],
          }}
        >
          Manage Your Finances Smartly
        </AnimatedText>
      </View>
    </View>
  );
}

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors, typography } from "../styles"; // Import your custom styles

export const TypingText = ({ textArray, textStyle, containerStyle }) => {
  const [displayText, setDisplayText] = useState(""); // To display typed text
  const [currentTextIndex, setCurrentTextIndex] = useState(0); // To track the current text from array
  const [isDeleting, setIsDeleting] = useState(false); // To track if we are in deleting mode
  const [cursorVisible, setCursorVisible] = useState(true); // Blinking cursor effect

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500); // Blinks every 500ms
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing and deleting effect
  useEffect(() => {
    let typingInterval;
    const currentWord = textArray[currentTextIndex];

    if (!isDeleting && displayText.length < currentWord.length) {
      // Typing effect
      typingInterval = setTimeout(() => {
        setDisplayText((prev) => currentWord.slice(0, prev.length + 1));
      }, 150); // Delay between each character typing
    } else if (isDeleting && displayText.length > 0) {
      // Deleting effect
      typingInterval = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, prev.length - 1));
      }, 100); // Speed of deleting
    } else if (!isDeleting && displayText === currentWord) {
      // Wait before starting the deleting effect
      setTimeout(() => setIsDeleting(true), 1000); // 1-second pause before deleting
    } else if (isDeleting && displayText === "") {
      // Move to the next word after deleting
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
    }

    return () => clearTimeout(typingInterval);
  }, [displayText, isDeleting, currentTextIndex]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.typingText, textStyle]}>
        {displayText}
        {cursorVisible && "|"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  typingText: {
    ...typography.heading1,
    color: colors.primary.main,
  },
});

export default TypingText;

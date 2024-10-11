import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { colors, spacing, typography } from "../styles";

export const Dropdown = ({ label, options, selectedValue, onValueChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectOption = (option) => {
    onValueChange(option);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Text style={styles.selectedText}>
          {selectedValue ? selectedValue : `Select ${label}`}
        </Text>
      </TouchableOpacity>

      {/* Modal to display dropdown options */}
      <Modal
        visible={isDropdownOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleSelectOption(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.medium,
  },
  label: {
    ...typography.label,
    color: colors.text.primary,
    marginBottom: spacing.small,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: colors.surface.dark,
    borderRadius: 5,
    padding: spacing.medium,
    backgroundColor: colors.surface.light,
  },
  selectedText: {
    ...typography.body1,
    color: colors.text.primary,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    marginHorizontal: spacing.mediumLarge,
    backgroundColor: colors.surface.light,
    borderRadius: spacing.mediumLarge * 0.5,
    padding: spacing.medium,
  },
  optionButton: {
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.dark,
  },
  optionText: {
    ...typography.body1,
    color: colors.text.primary,
  },
});

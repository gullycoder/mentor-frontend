import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ButtonComponent } from "../button"; // Reuse your ButtonComponent
import { colors, typography } from "../../styles"; // Your app's design tokens

export const UniversalModal = ({
  visible,
  title,
  message,
  onClose,
  onConfirm,
  showConfirmButton = true, // Show confirm button or not
  confirmText = "Confirm",
  cancelText = "Cancel",
  isError = false, // To change styling based on error or not
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, isError && styles.errorContainer]}>
          <Text style={[styles.title, isError && styles.errorTitle]}>
            {title}
          </Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            <ButtonComponent
              title={cancelText}
              onPress={onClose}
              // style={styles.cancelButton}
              variant="secondary"
            />
            {showConfirmButton && (
              <ButtonComponent
                title={confirmText}
                onPress={onConfirm}
                // style={styles.confirmButton}
                variant="secondary"
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for modal overlay
  },
  modalContainer: {
    width: "80%",
    backgroundColor: colors.background.default, // Solid background color (white)
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  errorContainer: {
    backgroundColor: colors.error, // Different background color for error modals
  },
  title: {
    fontSize: typography.h2, // Heading 2 size
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: colors.primary, // Primary color for normal titles
  },
  errorTitle: {
    color: colors.error, // Color for error title
  },
  message: {
    // fontSize: typography.body, // Body text size
    textAlign: "center",
    marginBottom: 20,
    color: colors.textPrimary, // Primary text color
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: colors.lightGray, // Light gray background for cancel button
  },
  confirmButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: colors.primary, // Primary color background for confirm button
  },
});

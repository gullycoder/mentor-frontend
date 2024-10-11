import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing, width } from "../../styles";
import * as Linking from "expo-linking";
import { useSelector, useDispatch } from "react-redux";

const MentorshipHomeScreen = ({ navigation }) => {
  const { mentorshipPlans } = useSelector((state) => state.rule.rules);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Mentorship Plans</Text>
      <ScrollView>
        <TouchableOpacity
          onPress={() => Linking.openURL(`${mentorshipPlans[0].paymentUrl}`)}
          style={styles.containerPlan}
        >
          <Image
            style={{ width: width * 0.7, height: width * 0.7 * 2 }}
            //image from url
            source={{
              uri: mentorshipPlans[0].imageUrl,
            }}
            // source={require("../../assets/images/basic.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`${mentorshipPlans[1].paymentUrl}`)}
          style={styles.containerPlan}
        >
          <Image
            style={{ width: width * 0.7, height: width * 0.7 * 2 }}
            source={{
              uri: mentorshipPlans[1].imageUrl,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`${mentorshipPlans[2].paymentUrl}`)}
          style={styles.containerPlan}
        >
          <Image
            style={{ width: width * 0.7, height: width * 0.7 * 2 }}
            source={{
              uri: mentorshipPlans[2].imageUrl,
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MentorshipHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center the content
    alignItems: "center", // Center the content
  },
  containerPlan: {
    backgroundColor: colors.background.default,
    padding: spacing.medium,
    margin: spacing.medium,
    borderRadius: 10,
    elevation: 1,
    alignItems: "center",
  },
  titleText: {
    ...typography.heading1,
    color: colors.primary.main,
  },

  text: {
    ...typography.body2,
    color: colors.text.primary, // Dark text color
  },
});

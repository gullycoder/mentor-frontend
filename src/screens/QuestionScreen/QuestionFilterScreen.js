import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "../../components";

const FILTER_OPTIONS = {
  topics: [
    "Modern India",
    "Ancient India",
    "Medieval India",
    "Art & Culture",
    "World Geography",
    "Indian Geography",
    "Indian Polity and Governance",
    "International Relations",
    "Indian Economy",
    "Science & Tech and Basic Science",
    "Current Affairs and Miscellaneous",
  ],
  subTopics: {
    "Modern India": [
      "India in the 18th Century",
      "Indian Renaissance and Reform Movements",
      "Early Uprising Against the British and Revolt of 1857",
      "Rise of Indian National Movement: Moderate and Extremists Phase",
      "Phases of Revolutionary Nationalism",
      "The Beginning of Gandhian Era",
      "The National Movement in the 1940s",
      "Development of Press, Education and Civil Services",
      "Independence to Partition",
    ],
    "Ancient India": [
      "Prehistoric Period and Indus Valley Civilisation",
      "Vedic and Later Vedic Age",
      "Mauryan and Post-Mauryan Age",
      "Gupta and Post-Gupta Age",
      "Sangam Age",
    ],
    "Medieval India": [
      "Delhi Sultanate (1206 AD to 1526 AD)",
      "Mughal Empire (1526 AD to 1761 AD)",
      "Provincial Kingdoms in Medieval India",
      "Religious movement during medieval period",
    ],
    "Art & Culture": [
      "Architecture and Sculpture",
      "Literature: Religious and Scientific",
      "Performing Arts: Dance, Theatre and Music",
      "Visual Arts: Painting, ceramics and drawing",
      "Indian Philosophy and Bhakti & Sufi Movements",
      "Indian Traditions, Festivals, and Calendars",
      "Miscellaneous",
    ],
    "World Geography": [
      "The Earth and the Universe",
      "Geomorphology",
      "Climatology",
      "Oceanography",
      "World Climatic Regions",
      "Human and Economic Geography",
      "World Map",
    ],
    "Indian Geography": [
      "Physiography of India",
      "Drainage System of India",
      "Indian Climate",
      "Soils",
      "Natural Vegetation in India",
      "Mineral and Industries",
      "Agriculture in India",
      "Indian Map",
    ],
    "Environment & Ecology and Disaster Management": [
      "Protected Area Network: NP, WS, BR, etc.",
      "Ecosystem and Ecology",
      "Environmental Pollution",
      "Biodiversity",
      "Global Conservation Efforts",
      "National Conservation Efforts",
      "Climate Change: Causes and Implications",
      "Environment, Sustainable Development and General Issues",
      "Agriculture",
    ],
    "Indian Polity and Governance": [
      "Historical Background & Making of Indian Constitution",
      "Features of the Indian Constitution",
      "Legislature",
      "Executive",
      "Judiciary",
      "Local Self Government",
      "Governance",
      "Constitutional and Non-constitutional Bodies",
      "Judicial & Quasi-Judicial Bodies",
    ],
    "International Relations": [
      "India's Foreign Policy",
      "India & Its Neighbors",
      "International Groups and Political Organizations",
      "Places in news",
    ],
    "Indian Economy": [
      "Money",
      "Bank",
      "Share Market",
      "Budget",
      "Intl. Orgs",
      "Sectors of Economy",
      "National Org",
      "GDP, GNP",
      "Infra",
      "HRD",
    ],
    "Science & Tech and Basic Science": [
      "Biotechnology",
      "Defence Technology",
      "Space Science",
      "IT & Communication Technology",
      "Energy",
      "Miscellaneous",
      "Physics",
      "Chemistry",
      "Biology",
    ],
    "Current Affairs": [
      "Current Affairs: India",
      "Current Affairs: World",
      "GK/Persons in News",
      "Miscellaneous",
    ],
  },
  questionSource: [
    "UPSC", //Union Public Service Commission
    "CAPF", //Central Armed Police Forces
    "CDS", //Combined Defence Services
    "RPSC", //Rajasthan Public Service Commission
    "HPSC", //Haryana Public Service Commission
    "HSSC", //Haryana Staff Selection Commission
    "RSMSSB", //Rajasthan Subordinate and Ministerial Services Selection Board
    "PPSC", //Punjab Public Service Commission
    "HPPSC", //Himachal Pradesh Public Service Commission
    "UPPCS", //Uttar Pradesh Public Service Commission
    "UKPSC", //Uttarakhand Public Service Commission
    "CGPSC", //Chhattisgarh Public Service Commission
    "MPPSC", //Madhya Pradesh Public Service Commission
    "GPSC", //Gujarat Public Service Commission
    "BPSC", //Bihar Public Service Commission
    "APPSC", //Andhra Pradesh Public Service Commission
    "TSPSC", //Telangana State Public Service Commission
    "TNPSC", //Tamil Nadu Public Service Commission
    "KPSC", //Karnataka Public Service Commission
    "JPSC", //Jharkhand Public Service Commission
    "JKPSC", //Jammu and Kashmir Public Service Commission
    "WBPSC", //West Bengal Public Service Commission
    "KPSC", //Kerala Public Service Commission
    "SSC", //Staff Selection Commission
    "IBPS", //Institute of Banking Personnel Selection
    "NCERT",
    "Laxmikanth",
    "Spectrum",
    "ShankarIAS",
    "VisionIAS",
    "Current Affairs",
    "Miscellaneous",
    "Unacademy",
    "Miscellaneous",
  ],
  questionYear: [
    "last 3 years",
    "last 5 years",
    "last 10 years",
    2024,
    2023,
    2022,
    2021,
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
  ],
};

const QuestionFilterScreen = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Get subtopics based on the selected topic
  const subTopics = selectedTopic
    ? FILTER_OPTIONS.subTopics[selectedTopic]
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Questions</Text>

      {/* Topic Dropdown */}
      <Dropdown
        label="Topic"
        options={FILTER_OPTIONS.topics}
        selectedValue={selectedTopic}
        onValueChange={(value) => {
          setSelectedTopic(value);
          setSelectedSubTopic(""); // Reset subtopic when topic changes
        }}
      />

      {/* Subtopic Dropdown (conditional on selected topic) */}
      {selectedTopic && (
        <Dropdown
          label="Subtopic"
          options={subTopics}
          selectedValue={selectedSubTopic}
          onValueChange={(value) => setSelectedSubTopic(value)}
        />
      )}

      {/* Year dropdown*/}
      {selectedSubTopic && (
        <Dropdown
          label="Year"
          options={FILTER_OPTIONS.questionYear}
          selectedValue={selectedYear}
          onValueChange={(value) => setSelectedYear(value)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default QuestionFilterScreen;

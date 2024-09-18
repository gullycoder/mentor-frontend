//navigation state
const state = {
  type: "stack", // Main Navigator (Stack)
  key: "stack-1", // Unique key for the main stack
  routeNames: ["Auth", "Main"], // Routes within the MainNavigator
  routes: [
    {
      key: "auth-1",
      name: "Auth",
      state: {
        type: "stack",
        key: "auth-stack-1",
        routeNames: ["Splash", "Login"],
        routes: [
          { key: "splash-1", name: "Splash" },
          { key: "login-1", name: "Login" },
        ],
        index: 1, // Currently on the LoginScreen
        stale: false,
      },
    },
    {
      key: "main-1",
      name: "Main",
      state: {
        type: "tab",
        key: "tab-1",
        routeNames: ["Questions", "Mentorship", "Profile"],
        routes: [
          {
            key: "questions-1",
            name: "Questions",
            state: {
              type: "stack",
              key: "question-stack-1",
              routeNames: [
                "QuestionHomeScreen",
                "QuestionFilterScreen",
                "QuestionDetailScreen",
                "QuestionResultScreen",
              ],
              routes: [
                { key: "question-home-1", name: "QuestionHomeScreen" },
                { key: "question-filter-1", name: "QuestionFilterScreen" },
                { key: "question-detail-1", name: "QuestionDetailScreen" },
                { key: "question-result-1", name: "QuestionResultScreen" },
              ],
              index: 0, // Currently on the QuestionHomeScreen
              stale: false,
            },
          },
          {
            key: "mentorship-1",
            name: "Mentorship",
            state: {
              type: "stack",
              key: "mentorship-stack-1",
              routeNames: ["MentorshipHomeScreen", "MentorshipLiveScreen"],
              routes: [
                { key: "mentorship-home-1", name: "MentorshipHomeScreen" },
                { key: "mentorship-live-1", name: "MentorshipLiveScreen" },
              ],
              index: 0, // Currently on the MentorshipHomeScreen
              stale: false,
            },
          },
          {
            key: "profile-1",
            name: "Profile",
            state: {
              type: "stack",
              key: "profile-stack-1",
              routeNames: ["ProfileEditScreen"],
              routes: [{ key: "profile-edit-1", name: "ProfileEditScreen" }],
              index: 0, // Currently on the ProfileEditScreen
              stale: false,
            },
          },
        ],
        index: 0, // Currently on the Questions tab
        stale: false,
      },
    },
  ],
  index: 1, // Currently on the 'Main' route in the MainNavigator
  stale: false,
};

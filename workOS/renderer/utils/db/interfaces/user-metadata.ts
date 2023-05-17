export interface I_UserMetadataModel {
  lastOpenedPage: string; // The last page the user opened
  user_preferences: {
    theme: ThemeType; // The user's preferred theme
    language: string; // The user's preferred language
    notificationSettings: NotificationSettings; // The user's notification settings
    fontSize: number; // The preferred font size
  };
  lastOpenedProject: string;
  lastOpenedSolution: string;
}

interface NotificationSettings {
  email: boolean; // Whether email notifications are enabled
  push: boolean; // Whether push notifications are enabled
  // Add more notification properties as needed
}

type ThemeType = "light" | "dark";

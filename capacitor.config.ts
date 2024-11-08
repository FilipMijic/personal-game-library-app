import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app-library-game-personal',
  appName: 'Personal game library',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LocalNotifications: {
      iconColor: "#488AFF",
      smallIcon: "res://drawable/notification",
    },
  },
};

export default config;

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.msa.phaserGame',
  appName: 'phaserGame',
  webDir: 'www',
  server: {
    url: 'http://192.168.1.19:8100',
    cleartext: true,
    androidScheme: 'https',
  },
};

export default config;

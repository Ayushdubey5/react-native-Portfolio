import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

export function App() {
  // This explicitly grabs your app directory
  const ctx = require.context('./app');
  
  // FIXED: We must return the ExpoRoot component populated with the context
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
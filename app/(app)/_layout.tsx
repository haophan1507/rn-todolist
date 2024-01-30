import { Stack } from 'expo-router';

export default function TabLayoutApp() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

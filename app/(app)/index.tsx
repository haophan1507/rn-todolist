import { Redirect } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSession } from '../../context/AuthContext';

type Props = {};

export default function Home({}: Props) {
  const { session, isLoading, signOut } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(auth)" />;
  }

  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 100,
        }}
      >
        Home
      </Text>
      <Text
        style={{
          textAlign: 'center',
        }}
      >
        {JSON.parse(session).id}
      </Text>
      <Button mode="text" onPress={() => signOut()}>
        Sign Out
      </Button>
    </View>
  );
}

import { Link } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

type Props = {};

export default function Home({}: Props) {
  return (
    <Text
      style={{
        textAlign: 'center',
        marginTop: 100,
      }}
    >
      Home
      <Link href="/(auth)">
        <Text>Go to Login!</Text>
      </Link>
    </Text>
  );
}

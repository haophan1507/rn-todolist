import { useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

type Props = {};

export default function ForgetPassword({}: Props) {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 48,
      }}
    >
      <Text variant="titleLarge" style={{ marginBottom: 48 }}>
        Forget Password
      </Text>

      <TextInput
        mode="outlined"
        placeholder="Email"
        style={{
          width: '100%',
          marginBottom: 8,
        }}
        // value={user.email}
        // onChangeText={(text) => setUser((prev) => ({ ...prev, email: text }))}
      />
      <Text>
        Enter the email address you used to create your account and we will
        email you to link reset your password.
      </Text>

      <Button
        mode="contained"
        onPress={() => {}}
        style={{
          width: '100%',
          borderRadius: 4,
          marginVertical: 24,
        }}
        textColor="white"
        uppercase
      >
        Continue
      </Button>

      <Button mode="text" onPress={() => router.push('/(auth)/signup')}>
        Don't have an account? Sign Up
      </Button>
    </KeyboardAvoidingView>
  );
}

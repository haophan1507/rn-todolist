import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { signUp } from '../../utils/api';

type Props = {};

export default function SignUp({}: Props) {
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

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
        Sign Up
      </Text>
      <View style={{ gap: 24, alignSelf: 'stretch' }}>
        <TextInput
          mode="outlined"
          placeholder="Full Name"
          style={{
            width: '100%',
          }}
          value={user.name}
          onChangeText={(text) => setUser((prev) => ({ ...prev, name: text }))}
        />
        <TextInput
          mode="outlined"
          placeholder="Email"
          style={{
            width: '100%',
          }}
          value={user.email}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, email: text.trim() }))
          }
        />

        <TextInput
          mode="outlined"
          secureTextEntry
          placeholder="Password"
          style={{
            width: '100%',
          }}
          value={user.password}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, password: text.trim() }))
          }
        />

        <TextInput
          mode="outlined"
          secureTextEntry
          placeholder="Confirm Password"
          style={{
            width: '100%',
          }}
          value={user.confirm}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, confirm: text.trim() }))
          }
        />
      </View>
      <Button
        mode="contained"
        onPress={async () => {
          const res = await signUp(user);

          if (res.error) {
            Alert.alert('Error', res.error.message);
            return;
          }

          if (res.data.user) {
            router.replace('/');
          }
        }}
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

      <Button mode="text" onPress={() => router.push('/(auth)')}>
        Already have an account? Sign In
      </Button>
    </KeyboardAvoidingView>
  );
}

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSession } from '../../context/AuthContext';
import { signInWithPassword } from '../../utils/api';

type Props = {};

export default function SignIn({}: Props) {
  const router = useRouter();
  const { signIn } = useSession();

  const [user, setUser] = useState({
    email: '',
    password: '',
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
        Sign In
      </Text>
      <View style={{ gap: 24, alignSelf: 'stretch' }}>
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
        <View>
          <TextInput
            mode="outlined"
            placeholder="Password"
            secureTextEntry
            style={{
              width: '100%',
              marginBottom: 4,
            }}
            value={user.password}
            onChangeText={(text) =>
              setUser((prev) => ({ ...prev, password: text.trim() }))
            }
          />
          <TouchableOpacity
            onPress={() => router.push('/(auth)/forgetpassword')}
          >
            <Text>Forget Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={async () => {
          const res = await signInWithPassword(user);
          if (res.error) {
            Alert.alert('Error', res.error.message);
            return;
          }
          if (res.data.user) {
            signIn(res.data.user);
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

      <Button mode="text" onPress={() => router.push('/(auth)/signup')}>
        Don't have an account? Sign Up
      </Button>
    </KeyboardAvoidingView>
  );
}

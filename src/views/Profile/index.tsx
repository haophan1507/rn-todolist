import {Avatar, AvatarImage, Card, HStack, Text} from '@gluestack-ui/themed';
import * as React from 'react';
import {View} from 'react-native';
import {ScreenComponent, registerScreen} from '../../utils/Navigation';

const Name = 'ProfileScreen';

export type ProfileScreenParam = {
  [Name]: Record<string, unknown>;
};

const ProfileScreen: ScreenComponent<ProfileScreenParam, 'ProfileScreen'> = ({
  navigation,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings',
    });
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <Card size="md" variant="elevated" m="$3">
        <HStack space="lg" alignItems="center" mb="$1">
          <Avatar>
            <AvatarImage
              source={{
                uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
              }}
              alt="avatar"
            />
          </Avatar>
          <View style={{flex: 1}}>
            <Text mb="$1" size="sm" italic>
              "Genius is one percent inspiration and ninety-nine percent
              perspiration."
            </Text>
          </View>
        </HStack>

        <Text size="xs" textAlign="right">
          Thomas Edison
        </Text>
      </Card>
    </View>
  );
};

export default registerScreen<ProfileScreenParam, 'ProfileScreen'>(
  Name,
  ProfileScreen,
);

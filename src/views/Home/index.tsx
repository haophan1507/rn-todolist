import {
  AddIcon,
  Card,
  EditIcon,
  Icon,
  Image,
  Menu,
  MenuIcon,
  MenuItem,
  MenuItemLabel,
  Text,
  TrashIcon,
  View,
} from '@gluestack-ui/themed';
import * as React from 'react';
import {Alert, ScrollView, TouchableOpacity} from 'react-native';
import ModalAddTodo from '../../components/ModalAddTodo';
import {LIST_ICON, Todo, useTodoStore} from '../../store/todoStore';
import {ScreenComponent, registerScreen} from '../../utils/Navigation';

const Name = 'HomeScreen';

export type HomeScreenParam = {
  [Name]: Record<string, unknown>;
};

const HomeScreen: ScreenComponent<HomeScreenParam, 'HomeScreen'> = ({
  navigation,
}) => {
  const {listTodo, removeTodo} = useTodoStore();
  const [showModal, setShowModal] = React.useState(false);
  const [select, setSelect] = React.useState<Todo | null>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Categories',
      // headerLeft: () => (
      //   <TouchableOpacity>
      //     <Icon as={SettingsIcon} w="$6" h="$6" />
      //   </TouchableOpacity>
      // ),
      // headerRight: () => (
      //   <TouchableOpacity>
      //     <Icon as={SearchIcon} w="$6" h="$6" />
      //   </TouchableOpacity>
      // ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1}} m="$3">
      <Card size="md" variant="elevated" backgroundColor="$coolGray600">
        <Text mb="$2" size="sm" italic color="$white">
          "Genius is one percent inspiration and ninety-nine percent
          perspiration."
        </Text>

        <Text size="xs" textAlign="right" color="$white">
          Thomas Edison
        </Text>
      </Card>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View
          mt="$5"
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{width: '49%'}}
            onPress={() => {
              setSelect(null);
              setShowModal(true);
            }}>
            <Card
              size="md"
              variant="elevated"
              h={140}
              my="$2"
              p="$5"
              gap="$2"
              alignItems="center"
              justifyContent="center">
              <Icon as={AddIcon} w="$8" h="$8" />
            </Card>
          </TouchableOpacity>
          {listTodo.map(item => {
            return (
              <TouchableOpacity
                key={item.name}
                style={{width: '49%'}}
                onPress={() => {
                  navigation.navigate('TodoDetail', {todo: item});
                }}>
                <Card
                  size="md"
                  variant="elevated"
                  h={140}
                  my="$2"
                  p="$5"
                  gap="$2"
                  justifyContent="space-between">
                  {item?.icon && (
                    <Image
                      source={LIST_ICON[item?.icon]}
                      w={40}
                      h={40}
                      alt={item.name}
                    />
                  )}

                  <Text bold>{item.name}</Text>
                  <Text>{`${item?.item?.length} tasks`}</Text>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10, bottom: 10}}>
                    <Icon as={MenuIcon} w="$5" h="$5" />
                  </TouchableOpacity>
                  <Menu
                    placement="bottom"
                    trigger={({...triggerProps}) => {
                      return (
                        <TouchableOpacity
                          style={{position: 'absolute', right: 10, bottom: 10}}
                          {...triggerProps}>
                          <Icon as={MenuIcon} w="$5" h="$5" />
                        </TouchableOpacity>
                      );
                    }}>
                    <MenuItem
                      key="Edit"
                      textValue="Edit"
                      onPress={() => {
                        setSelect(item);
                        setShowModal(true);
                      }}>
                      <Icon as={EditIcon} size="sm" mr="$2" />
                      <MenuItemLabel size="sm">Edit</MenuItemLabel>
                    </MenuItem>
                    <MenuItem
                      key="Delete"
                      textValue="Delete"
                      onPress={() =>
                        Alert.alert(
                          'Delete Todo',
                          'Are you sure you want to delete?',
                          [
                            {
                              text: 'Cancel',
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: () => removeTodo(item.id),
                            },
                          ],
                        )
                      }>
                      <Icon as={TrashIcon} size="sm" mr="$2" />
                      <MenuItemLabel size="sm">Delete</MenuItemLabel>
                    </MenuItem>
                  </Menu>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <ModalAddTodo
        showModal={showModal}
        setShowModal={setShowModal}
        editTodo={select}
      />
    </View>
  );
};

export default registerScreen<HomeScreenParam, 'HomeScreen'>(Name, HomeScreen);

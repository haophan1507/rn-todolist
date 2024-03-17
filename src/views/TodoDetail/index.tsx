import {AddIcon, Card, Icon, Text} from '@gluestack-ui/themed';
import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import ModalAddTodoItem from '../../components/ModalAddTodoItem';
import {Todo, TodoItem, useTodoStore} from '../../store/todoStore';
import {ScreenComponent, registerScreen} from '../../utils/Navigation';

const Name = 'TodoDetail';

export type TodoDetailParam = {
  [Name]: {
    todo: Todo;
  };
};

const TodoDetail: ScreenComponent<TodoDetailParam, 'TodoDetail'> = ({
  navigation,
  route,
}) => {
  const {todo} = route.params || {};

  const {listTodo, addTodoItem, editTodoItem} = useTodoStore();

  const [showModal, setShowModal] = React.useState(false);
  const [listTodoItem, setListTodoItem] = React.useState<any>();

  const todoDetail = React.useMemo(() => {
    return listTodo.find(item => item.id === todo.id);
  }, [listTodo, todo.id]);

  const handleAddTodoItem = React.useCallback(
    (nameTodo: string) => {
      addTodoItem(todo.id, {
        id: uuidv4(),
        name: nameTodo,
        timeStart: new Date(),
        done: false,
      });
    },
    [addTodoItem, todo.id],
  );

  React.useEffect(() => {
    if (todoDetail) {
      const groups = todoDetail?.item.reduce((acc, cur) => {
        const key = dayjs(cur.timeStart).format('YYYY-MM-DD');
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(cur);
        return acc;
      }, {} as any);

      setListTodoItem(groups);
    }
  }, [todoDetail, todoDetail?.item]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: todo?.name,
    });
  }, [navigation, todo.name]);

  return (
    <View style={{flex: 1}}>
      <Card m="$3" flex={1}>
        <FlashList
          data={Object.keys(listTodoItem || {})}
          estimatedItemSize={20}
          renderItem={({item}) => {
            return (
              <View>
                <Text size="lg" bold>
                  {item}
                </Text>
                {listTodoItem[item].map((todoItem: TodoItem) => {
                  return (
                    <BouncyCheckbox
                      key={todoItem.id}
                      size={25}
                      isChecked={todoItem.done}
                      fillColor="green"
                      unfillColor="#FFFFFF"
                      text={todoItem.name}
                      iconStyle={{borderColor: 'green'}}
                      innerIconStyle={{borderWidth: 2}}
                      onPress={(isChecked: boolean) => {
                        editTodoItem(todo.id, {
                          ...todoItem,
                          done: isChecked,
                        });
                      }}
                      style={{
                        marginVertical: 8,
                      }}
                    />
                  );
                })}
              </View>
            );
          }}
        />
      </Card>

      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 20,
          bottom: 10,
          width: 60,
          height: 60,
          backgroundColor: '#000',
          borderRadius: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => setShowModal(true)}>
        <Icon as={AddIcon} w="$8" h="$8" color="#fff" />
      </TouchableOpacity>
      <ModalAddTodoItem
        showModal={showModal}
        setShowModal={setShowModal}
        onAddTodoItem={handleAddTodoItem}
      />
    </View>
  );
};

export default registerScreen<TodoDetailParam, 'TodoDetail'>(Name, TodoDetail);

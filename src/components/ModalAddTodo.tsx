import {
  Button,
  ButtonText,
  CloseIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Icon,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  VStack,
} from '@gluestack-ui/themed';
import * as React from 'react';
import {Alert} from 'react-native';
import {SelectCountry} from 'react-native-element-dropdown';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {LIST_ICON, Todo, useTodoStore} from '../store/todoStore';

type Props = {
  editTodo: Todo | null;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const data = Object.entries(LIST_ICON).map(item => ({
  value: item[0],
  label: item[0],
  image: item[1],
}));

const ModalAddTodo = ({editTodo, showModal, setShowModal}: Props) => {
  const {
    listTodo: todoStore,
    addTodo,
    editTodo: editTodoStore,
  } = useTodoStore();

  const [todo, setTodo] = React.useState<Todo>({
    id: uuidv4(),
    name: '',
    icon: 'SETTINGS',
    item: [],
  });

  React.useEffect(() => {
    setTodo({
      id: editTodo?.id ? editTodo.id : uuidv4(),
      name: editTodo?.name ? editTodo.name : '',
      icon: editTodo?.icon ? editTodo.icon : 'SETTINGS',
      item: editTodo?.item.length ? editTodo.item : [],
    });
  }, [editTodo]);

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">
            {editTodo ? 'Edit Todo List' : 'Add Todo List'}{' '}
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody p="$5">
          <VStack py="$2" space="xl">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  value={todo.name}
                  onChangeText={e => {
                    setTodo(prev => ({...prev, name: e.trim()}));
                  }}
                />
              </Input>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Icon</FormControlLabelText>
              </FormControlLabel>

              <SelectCountry
                style={{
                  height: 50,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  borderColor: '#262626',
                  borderWidth: 1,
                }}
                selectedTextStyle={{
                  fontSize: 16,
                  marginLeft: 8,
                }}
                placeholderStyle={{fontSize: 16}}
                imageStyle={{width: 24, height: 24, borderRadius: 12}}
                iconStyle={{width: 24, height: 24, borderRadius: 12}}
                data={data}
                value={todo?.icon}
                valueField="value"
                labelField="label"
                imageField="image"
                placeholder="Select Icon"
                onChange={e => {
                  setTodo(prev => ({...prev, icon: e.value}));
                }}
              />
            </FormControl>
          </VStack>
          <Button
            my="$4"
            onPress={() => {
              if (todoStore.findIndex(item => item.name === todo.name) !== -1) {
                Alert.alert('Please enter again', 'Duplicate name todo');
                return;
              }

              if (editTodo) {
                editTodoStore(todo);
                setShowModal(false);
                return;
              }

              addTodo(todo);
              setShowModal(false);
            }}>
            <ButtonText>Save Changes</ButtonText>
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddTodo;

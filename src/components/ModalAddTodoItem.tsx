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

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  onAddTodoItem: (todoName: string) => void;
};

const ModalAddTodoItem = ({showModal, setShowModal, onAddTodoItem}: Props) => {
  const [todoName, setTodoName] = React.useState('');

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Adđ Todo Item</Heading>
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
                  value={todoName}
                  onChangeText={e => {
                    setTodoName(e.trim());
                  }}
                />
              </Input>
            </FormControl>
          </VStack>
          <Button
            my="$4"
            onPress={() => {
              onAddTodoItem(todoName);
              setShowModal(false);
            }}>
            <ButtonText>Save Changes</ButtonText>
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddTodoItem;

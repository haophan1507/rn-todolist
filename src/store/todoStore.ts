import {produce} from 'immer';
import {ImageRequireSource} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {zustandStorage} from './zustandStorage';

export const LIST_ICON: Record<string, ImageRequireSource> = {
  SETTINGS: require('../assets/icon/settings.png'),
  ADDRESS: require('../assets/icon/address.png'),
  ANIMAL: require('../assets/icon/animal.png'),
  CALENDAR: require('../assets/icon/calendar.png'),
  CAMERA: require('../assets/icon/camera.png'),
  E_LEARNING: require('../assets/icon/e-learning.png'),
  FINANCE: require('../assets/icon/finance.png'),
  FOOD: require('../assets/icon/food.png'),
  GAME: require('../assets/icon/game.png'),
  HEALTHCARE: require('../assets/icon/healthcare.png'),
  HOME: require('../assets/icon/home.png'),
  HOMEWORK: require('../assets/icon/homework.png'),
  MESSAGING: require('../assets/icon/messaging.png'),
  MUSIC: require('../assets/icon/music.png'),
  SHOPPING_CART: require('../assets/icon/shopping-cart.png'),
  SOCIAL: require('../assets/icon/social.png'),
  SPORT: require('../assets/icon/sport.png'),
  WEATHER: require('../assets/icon/weather.png'),
};

export type TYPE_LIST_ICON = keyof typeof LIST_ICON;

export type TodoItem = {
  id: string;
  name: string;
  timeStart: Date;
  done: boolean;
};

export type Todo = {
  id: string;
  name: string;
  icon: TYPE_LIST_ICON;
  item: TodoItem[] | [];
};

export type TodoState = {
  listTodo: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (todoId: string) => void;
  editTodo: (todo: Todo) => void;
  addTodoItem: (todoId: string, todoItem: TodoItem) => void;
  editTodoItem: (todoId: string, todoItem: TodoItem) => void;
};

const LIST_TODO: Todo[] = [
  {
    id: uuidv4(),
    name: 'Home',
    icon: 'HOME',
    item: [],
  },
  {
    id: uuidv4(),
    name: 'Sport',
    icon: 'SPORT',
    item: [],
  },
  {
    id: uuidv4(),
    name: 'Shopping',
    icon: 'SHOPPING_CART',
    item: [],
  },
  {
    id: uuidv4(),
    name: 'Food',
    icon: 'FOOD',
    item: [],
  },
  {
    id: uuidv4(),
    name: 'Game',
    icon: 'GAME',
    item: [],
  },
  {
    id: uuidv4(),
    name: 'Camera',
    icon: 'CAMERA',
    item: [],
  },
  {
    id: uuidv4(),
    name: 'Social',
    icon: 'SOCIAL',
    item: [],
  },
  {
    id: uuidv4(),
    name: 'Healthcare',
    icon: 'HEALTHCARE',
    item: [],
  },
];

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      set => ({
        listTodo: LIST_TODO,
        addTodo: (todo: Todo) => {
          set(
            produce((state: TodoState) => ({
              listTodo: [...state.listTodo, todo],
            })),
          );
        },
        removeTodo: (todoId: string) =>
          set(
            produce((state: TodoState) => ({
              listTodo: state.listTodo.filter(item => item.id !== todoId),
            })),
          ),
        editTodo: (todo: Omit<Todo, 'id'>) =>
          set(
            produce((state: TodoState) => {
              const index = state.listTodo.findIndex(item => item.id);
              if (index !== -1) {
                state.listTodo[index] = {...todo, id: state.listTodo[index].id};
              }
            }),
          ),
        addTodoItem: (todoId: string, todoItem: TodoItem) =>
          set(
            produce((state: TodoState) => {
              const index = state.listTodo.findIndex(
                item => todoId === item.id,
              );
              if (index !== -1) {
                state.listTodo[index] = {
                  ...state.listTodo[index],
                  item: [...state.listTodo[index].item, todoItem],
                };
              }
            }),
          ),
        editTodoItem: (todoId: string, todoItem: TodoItem) =>
          set(
            produce((state: TodoState) => {
              const index = state.listTodo.findIndex(
                item => todoId === item.id,
              );
              if (index !== -1) {
                const indexTodoItem = state.listTodo[index].item.findIndex(
                  item => item.id === todoItem.id,
                );
                if (indexTodoItem !== -1) {
                  state.listTodo[index].item[indexTodoItem] = todoItem;
                }
              }
            }),
          ),
      }),
      {
        name: 'todoStore',
        storage: createJSONStorage(() => zustandStorage),
      },
    ),
  ),
);

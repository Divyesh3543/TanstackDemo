import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, deleteTodo, getTodos } from '../apis/todoApi';
import { useNavigation } from '@react-navigation/native';

export interface Todo {
  id: string;
  todo: string;
  completed: boolean;
}

const TodoListScreen = () => {
  const [todo, setTodo] = useState('');
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const { data, isPending, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: Error) => {
      console.log('onError', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: Error) => {
      console.log('onError', error);
    },
  });

  const renderItem = ({ item }: { item: Todo }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fffffe',
          padding: 15,
          borderRadius: 15,
        }}
      >
        <Text>{item.todo}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Pressable
            onPress={() => {
              navigation.navigate('EditTodo', item.id);
            }}
          >
            <Text
              style={{
                color: 'blue',
              }}
            >
              Edit
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              deleteMutation.mutate(item.id);
            }}
          >
            <Text
              style={{
                color: 'red',
              }}
            >
              Delete
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  if (isPending || isLoading) return <ActivityIndicator />;

  if (error) return <Text>{error.message ?? 'Unable to fetch todos'}</Text>;
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 15,
          margin: 15,
          backgroundColor: '#fffffe',
          borderRadius: 15,
          gap: 10,
        }}
      >
        <TextInput
          placeholder="Enter your Todo"
          style={{ flex: 1 }}
          value={todo}
          onChangeText={setTodo}
        />
        <Pressable
          onPress={() => {
            if (!todo) return;
            addMutation.mutate(todo);
            setTodo('');
          }}
        >
          <Text>+</Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{
          margin: 15,
          marginTop: 0,
          flexGrow: 1,
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 10,
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({});

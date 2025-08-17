import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Todo } from './TodoListScreen';
import { getTodoByID, updateTodo } from '../apis/todoApi';

const EditTodoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const params = route.params;
  const queryClient = useQueryClient();

  const [todo, setTodo] = useState<string>('');

  const { data, isLoading, isPending, error } = useQuery({
    queryKey: ['todos', params],
    queryFn: () => getTodoByID(params as string),
  });

  console.log('datadata', data);

  useEffect(() => {
    if (data) {
      setTodo(data.todo ?? '');
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigation.goBack();
    },
    onError: (error: Error) => {
      console.log('onError', error);
    },
  });

  if (isPending || isLoading) return <ActivityIndicator />;

  if (error) return <Text>{error.message ?? 'Unable to fetch todo'}</Text>;

  return (
    <View>
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
            const todoPayload: Todo = {
              ...(data as Todo),
              todo,
            };
            updateMutation.mutate(todoPayload);
          }}
        >
          <Text
            style={{
              color: 'blue',
            }}
          >
            Update
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditTodoScreen;

const styles = StyleSheet.create({});

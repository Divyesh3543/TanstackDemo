import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoListScreen from './src/screens/TodoListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditTodoScreen from './src/screens/EditTodoScreen';

const queryClient = new QueryClient();

const Stack = createStackNavigator();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Todos" component={TodoListScreen} />
          <Stack.Screen name="EditTodo" component={EditTodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;

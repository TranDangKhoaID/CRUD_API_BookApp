import * as React from 'react';
import { View, Button, Text, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import AddBook from '../screens/AddBook';
import Books from '../screens/Books';
import EditBook from '../screens/EditBook';
import Chapters from '../screens/Chapters';
import AddChapter from '../screens/AddChapter';
import ChartBook from '../screens/ChartBook';
const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
        }}
      />
      <Stack.Screen
        name="AddBook"
        component={AddBook}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Books"
        component={Books}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="EditBook"
        component={EditBook}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="AddChapter"
        component={AddChapter}
        options={{ headerStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="StatisticBook"
        component={ChartBook}
        options={{ headerStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
}

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

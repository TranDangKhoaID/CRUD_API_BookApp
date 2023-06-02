import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import AddBook from './screens/AddBook';
import StackNavigation from './component/StackNavigation';
import Books from './screens/Books';

export default function App() {
  return (
    <StackNavigation></StackNavigation>
  );
}



import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Search from './Components/Search'

export default class App extends React.Component {
  render() {
    return (
     <Search/>
    );
    }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

});

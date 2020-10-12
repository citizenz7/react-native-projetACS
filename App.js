import 'react-native-gesture-handler';
import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, Image, View, TextInput, Button } from 'react-native';
import Search from './Components/Search'

import * as ImagePicker from 'expo-image-picker';

function HomeScreen({ navigation, route }) {login()
  let archaique = false;
  useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  const [session, setSession] = useState(true);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  const [image, setImage] = useState(null);

  const handleChoosePhoto = async () => {
    console.log('Enter image library');

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  if (archaique === true) logout().then(res => { archaique = false; setSession(false) } ).catch(e => console.log(e));

  return (
    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Search"
        onPress={() => navigation.navigate('Search')}
      />
      <Button title="Logout"
          onPress={() => {
            logout().then(res => setSession(false))
            .catch(e => console.log(e));
          }
          } />
      { session ?
        <View>
          <Button title="Logout"
          onPress={() => {
            logout().then(res => setSession(false))
            .catch(e => console.log(e));
          }
          } />
          <TextInput style={styles.textinput}  placeholder="Title" onChangeText={ setTitle } />
          <TextInput style={styles.textinput}  placeholder="Description" onChangeText={ setDescription } />
          <TextInput style={styles.textinput}  placeholder="Price" onChangeText={ setPrice } />
          {image && (
            <Image
                source={{ uri: image }}
                style={{ width: 300, height: 300 }}
              />
            )}
          <Button title="Choose Photo" onPress={handleChoosePhoto} />
          <Button title="Post article" onPress={ () => { postArticle(title, description, price, image).then(res => console.log(res)).catch(e => console.log(e)); setImage(null) } } />
          </View>
        :
        <View>
          <TextInput style={styles.textinput}  placeholder="Username" onChangeText={ setUsername } />
          <TextInput style={styles.textinput}  placeholder="Password" onChangeText={ setPassword } />
          <Button title="Connect"
          onPress={() => {
            let log;
            console.log(username + " " + password);
            if (username && password) log = login(username, password);
            else log = login();

            log.then(res => {
              if (res === true) setSession(true);
              else console.log(res);
            })
            .catch(e => console.log(e));
          }
          } />
          <Text>Or signup</Text>
          <TextInput style={styles.textinput}  placeholder="Username" onChangeText={ setUsername } />
          <TextInput style={styles.textinput}  placeholder="email" onChangeText={ setEmail } />
          <TextInput style={styles.textinput}  placeholder="Password" onChangeText={ setPassword } />
          <TextInput style={styles.textinput}  placeholder="Confirm password" onChangeText={ setConfirmPassword } />
          <Button title="Signup"
          onPress={() => {
            let log;
            console.log(username + " " + password);
            register(username, email, password, confirmPassword).then(res => {
              if (res === true) console.log('register succesfull');
              else console.log(res);
            })
            .catch(e => console.log(e));
          }
          } />
        </View>
      }
    </View>
  );
}

const postArticle = async (title, description, price, image) => {
  const article = {
    title: title,
    description: description,
    price: price
  }

  const options = {
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data', Accept: "application/json" },
    body: createFormData(image, article)
  }

  const res = await fetch('https://localeo.herokuapp.com/API/newArticle', options);
  const json = await res.json();

  console.log(json);

  return res;
}

const createFormData = (photo, body) => {
  const data = new FormData();
  console.log(photo);

  data.append("image1", {
    type: 'image/jpeg',
    uri: photo
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
console.log(data);
  return data;
};

const login = async (username = null, password = null) => {
  const creds = {};

  if (!username || !password)
  {
    creds.username = 'tuncay';
    creds.password = '14531453';
  }
  else
  {
    creds.username = username;
    creds.password = password;
  }

  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds)
  }

  const res = await fetch('http://localeo.herokuapp.com/API/login', options);
  const json = await res.json();

  if (json.error)
  {
    return json.error;
  }
  else
  {
    return true;
  }
}

const register = async (username, email, password, confirmPassword) => {
  const creds = {
    username: username,
    email: email,
    password: password,
    passwordConfirm: confirmPassword
  };

  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds)
  }

  const res = await fetch('http://localeo.herokuapp.com/API/register', options);
  const json = await res.json();

  if (json.error)
  {
    return json.error;
  }
  else
  {
    return true;
  }
}

const logout = async () => {
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  }

  const res = await fetch('http://localeo.herokuapp.com/API/logout', options);
  const json = await res.json();

  if (json.error)
  {
    return json.error;
  }
  else
  {
    return true;
  }
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', { post: postText });
        }}
      />
    </>
  );
}

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator mode="modal">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
              title: 'LOCALEO, Bienvenue !',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
          name="Search"
          component={ Search }
          options={{
            title: 'LOCALEO, Bienvenue !',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red'
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 5,
  },

});

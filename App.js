import 'react-native-gesture-handler';
import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, Image, View, TextInput, Button } from 'react-native';
import Search from './Components/Search'

import * as ImagePicker from 'expo-image-picker';
import * as Fs from 'expo-file-system';
import * as ImageManipulator from "expo-image-manipulator";

// import { Dimensions } from 'Dimensions';

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

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const handleChoosePhoto = async (imgNo) => {
    console.log('Enter image library');

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      if (imgNo === 1) setImage1(result.uri);
      else if (imgNo === 2) setImage2(result.uri);
      else if (imgNo === 3) setImage3(result.uri);
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
          { image1 &&
            <View style={ {height: 100, flexDirection: "row"} }>
              {image1 &&
                <Image
                  source={{ uri: image1 }}
                  style={{ width: "33%" }}
              />}
              {image2 &&
                <Image
                  source={{ uri: image2 }}
                  style={{ width: "33%" }}
              />}
              {image3 &&
                <Image
                  source={{ uri: image3 }}
                  style={{ width: "33%" }}
              />}
            </View>
          }
          <View style={ { margin: 5, flexDirection: "row", justifyContent: "space-around" } }>
            <View style={ { width: "30%" } }>
              <Button title="Choose Photo 1" onPress={ () => handleChoosePhoto(1)} />
            </View>
            <View style={ { width: "30%" } }>
              <Button title="Choose Photo 2" onPress={ () => handleChoosePhoto(2)} />
            </View>
            <View style={ { width: "30%" } }>
              <Button title="Choose Photo 3" onPress={ () => handleChoosePhoto(3)} />
            </View>
          </View>
          <Button title="Post article" onPress={ () => { postArticle({ title: title, description: description, price: price }, [image1, image2, image3]).then(res => console.log(res)).catch(e => console.log(e)); setImage1(null); setImage2(null); setImage3(null); } } />
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

const fetchApi = async (url, options) => {
  let res = await fetch(url, options);

  let json = await res.text();
  if (json.charAt(0) !== '<') json = JSON.parse(json);
  return json;
}

const postArticle = async (article, images) => {
  const url = "https://localeo.herokuapp.com/API/";

  let dataImages = [];
  for (let image of images)
  {
    if (image)
    {
      const info = await Fs.getInfoAsync(image, {size: true});
      const resizedImage = await ImageManipulator.manipulateAsync(image, new Array({resize: {width: 800}}), { compress: 1 });
      const newInfo = await Fs.getInfoAsync(resizedImage.uri, {size: true});console.log(info.size + "=>" + newInfo.size);

      let data = await Fs.readAsStringAsync(resizedImage.uri, { encoding: Fs.EncodingType.Base64 });
      dataImages.push(data);
    }
  }

  try {
    const body = {
      article: article,
      images: dataImages
    }


    const options = {
      method: 'post',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(body)
    }

    let json = await fetchApi(url + "newArticle", options);

    return json;
  }
  catch (e) {
    console.log(e);
  }
}

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

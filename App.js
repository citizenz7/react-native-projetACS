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

import Api from './API/api';

async function test()
{
  try {
    let res;

    res = await Api.login('tuncay', '12345678');
    console.log(res);

    res = await Api.createAvis({ destinaterId: 2, title: "Test", message: "Salut olivier", stars: 6 });
    console.log(res);

    res = await Api.getAvisFrom(1);
    console.log(res);

    res = await Api.createMessage({ text: "Salut olivier!", destinaterId: 2 });
    console.log(res);

  } catch (e) {
    console.log(e);
  }
}

test();

// import { Dimensions } from 'Dimensions';

function HomeScreen({ navigation, route }) {
  const url = "https://localeo.herokuapp.com/API/";
  useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  const [session, setSession] = useState(false);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  const [isPostArticle, setIsPostArticle] = useState(false);
  const [isArticlePosted, setIsArticlePosted] = useState(false);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  if (!image1 && !image2 && !image3 && isArticlePosted) setIsArticlePosted(false);

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

  async function handlePostArticle()
  {
    try {let test = await Api.createAvis(); console.log(test);
      setIsPostArticle(true);

      const newArticle = { title: title, description: description, price: price };

      const res = await createArticle(newArticle);

      if (res.error)
      {
        console.log(res.error);
        return
      }

      if (!res.article)
      {
        console.log("No article in return");
        return;
      }

      if (!res.article.id)
      {
        console.log("No article id!");
        return;
      }

      setIsPostArticle(false);
      setIsArticlePosted(true);

      let images = [image1, image2, image3];

      let i = 1;
      for (let image of images)
      {
        if (image)
        {
          let index = i;
          uploadImage(image, res.article.id)
          .then((res) => {
            if (res.error)
            {
              console.log(res.error);
              return
            }

            console.log(res);
            console.log(i);
            if (res.success)
            {
              if (index === 1) setImage1(null);
              else if (index === 2) setImage2(null);
              else if (index === 3) setImage3(null);

              console.log("Image uploaded succesfull!");
              return;
            }
          })
          .catch(e => console.log(e))
        }
        i++;
      }
    } catch (e) {
      console.log(e);
    }
  }

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
          { isPostArticle && <Text>Posting article</Text> }
          <TextInput style={styles.textinput}  placeholder="Title" onChangeText={ setTitle } />
          <TextInput style={styles.textinput}  placeholder="Description" onChangeText={ setDescription } />
          <TextInput style={styles.textinput}  placeholder="Price" onChangeText={ setPrice } />
          { isArticlePosted && <Text>Uploading images...</Text> }
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
          <Button title="Post article" onPress={ handlePostArticle } />
          </View>
        :
        <View>
          <TextInput style={styles.textinput}  placeholder="Username" onChangeText={ setUsername } />
          <TextInput style={styles.textinput}  placeholder="Password" onChangeText={ setPassword } />
          <Button title="Connect"
          onPress={() => {
            Api.login(username, password)
            .then(res => {
              if (res.error) console.log(res);
              else setSession(true);
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
            Api.register(username, email, password, confirmPassword)
            .then(res => {
              if (res.error) console.log(res);
              else console.log("Register succesfull!");;
            })
            .catch(e => console.log(e));
          }
          } />
        </View>
      }
    </View>
  );
}

const url = "https://localeo.herokuapp.com/API/";

async function createArticle(article)
{
  try {
    const options = {
      method: 'post',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ article: article })
    }

    let json = await fetchApi(url + "article/create", options);

    return json;
  }
  catch (e) {
    console.log(e);
  }
}

async function uploadImage(image, articleId)
{
  try {
    if (image && articleId)
    {
      const info = await Fs.getInfoAsync(image, {size: true});
      const resizedImage = await ImageManipulator.manipulateAsync(image, new Array({resize: {width: 800}}), { compress: 1 });
      const newInfo = await Fs.getInfoAsync(resizedImage.uri, {size: true});console.log(info.size + "=>" + newInfo.size);

      let data = await Fs.readAsStringAsync(resizedImage.uri, { encoding: Fs.EncodingType.Base64 });

      const options = {
        method: 'post',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ data: data, articleId: articleId })
      }

      const json = await fetchApi(url + "article/image/create", options);

      return json;
    }
  }
  catch (e) {
    console.log(e);
  }
}

const fetchApi = async (url, options) => {
  let res = await fetch(url, options);

  let json = await res.text();
  if (json.charAt(0) !== '<') json = JSON.parse(json);
  else
  {
    return { error: json };
  }
  return json;
}



const register = async (username, email, password, confirmPassword) => {
  const user = {
    username: username,
    email: email,
    password: password,
    passwordConfirm: confirmPassword
  };

  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userInputs: user })
  }

  const json = await fetchApi('http://localeo.herokuapp.com/API/user/register', options);

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

  const json = await fetchApi('http://localeo.herokuapp.com/API/user/logout', options);

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

import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Button, TextInput, Text, FlatList } from 'react-native'
import produits from '../Helpers/produitsData'
import ProduitItem from './ProduitItem'

function Search() {
  const [isSearched, setSearch] = useState(false);
  const [isloading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [words, setWords] = useState(null);

  return (
    <View style={styles.main_container}>
      { isloading ?
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder="Nom du produit" onChangeText={ setWords } />
        <Button style={styles.button} title="recherche" onPress={() => {
          setSearch(true);
          getAllArticle(words)
          .then(articles => {
            setArticles(articles);
            setLoading(false);
          })
          .catch(e => console.log(e));
        }} />
        { isSearched && <Text>Chargement...</Text> }
      </View>
      :
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder="Nom du produit" onChangeText={ setWords } />
        <Button style={styles.button} title="recherche" onPress={() => {
          getAllArticle(words)
          .then(articles => {
            setArticles(articles);
            setLoading(false);
          })
          .catch(e => console.log(e));
        }} />
        <Text style={styles.textTitle}>Les derniers produits en ligne</Text>
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <ProduitItem article={item}/>
          }
        />
      </View>
      }
    </View>
)
}

const getAllArticle = async (words) =>
{
  if (!words) words = ''
  else words = '?words=' + words;
  const res = await fetch('http://localeo.herokuapp.com/API/search' + words);

  const json = await res.json();

  return json;
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 10
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
    button: {
      marginLeft: 5,
      marginRight: 5,
    },
    textTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 8,
  },
  })

export default Search
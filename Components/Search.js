import React from 'react'
import { StyleSheet, View, Button, TextInput, Text, FlatList } from 'react-native'
import produits from '../Helpers/produitsData'
import ProduitItem from './ProduitItem'

class Search extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <TextInput style={styles.textinput} placeholder="Nom du produit"/>
                <Button style={styles.button} title="recherche" onPress={() => {}}/>
                <Text style={styles.textTitle}>Les derniers produits en ligne</Text>
                <FlatList
                  data={produits}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({item}) => <ProduitItem produits={item}/>
                  }
                />
            </View>
        )
    }
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
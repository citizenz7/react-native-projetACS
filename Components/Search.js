import React from 'react'
import { StyleSheet, View, Button, TextInput, Text, FlatList } from 'react-native'
import produits from '../Helpers/produitsData'
import ProduitItem from './ProduitItem'

class Search extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.textTitle}>L O C A L E O</Text>
                <TextInput style={styles.textinput} placeholder="Nom du produit"/>
                <Button title="recherche" onPress={() => {}}/>
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
        flex:1,
        marginTop: 50
      },
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    },
    textTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    }
  })

export default Search
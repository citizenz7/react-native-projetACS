import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class ProduitsItem extends React.Component {
    render() {
        const produit = this.props.produits
        return (
          <View style={styles.main_container}>
            <Image
              style={styles.image}
              source={{uri: produit.image_path}}
            />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text style={styles.title_text}>{produit.title}</Text>
                <Text style={styles.vote_text}>{produit.vote_average}</Text>
              </View>
              <View>
                <Text style={styles.auteur_text}>par {produit.vendeur}</Text>
              </View>
              <View style={styles.description_container}>
                <Text style={styles.description_text} numberOfLines={6}>{produit.overview}</Text>
              </View>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>Mis en ligne le {produit.creation_date}</Text></View>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 17,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#666666',
    borderWidth: 1,
    paddingRight: 5,
    paddingLeft: 5,
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 13
  },
  auteur_text: {
    textAlign: 'right',
    fontSize: 16
  },
})

export default ProduitsItem
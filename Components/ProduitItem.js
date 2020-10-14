import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native'

function ProduitsItem({ article }) {
        let img1 = false;
        let img2 = false;
        let img3 = false;
        if (article.Images.length > 0) img1 = true;
        if (article.Images.length > 1) img2 = true;
        if (article.Images.length > 2) img3 = true;
        return (
          <View style={styles.main_container}>
              { img1 &&  <Image
                style={styles.image}
                source={{uri: `data:image/jpeg;base64,${article.Images[0].data}`}}
              />}
              { img2 &&  <Image
                style={styles.image}
                source={{uri: `data:image/jpeg;base64,${article.Images[1].data}`}}
              />}
              { img3 &&  <Image
                style={styles.image}
                source={{uri: `data:image/jpeg;base64,${article.Images[2].data}`}}
              />}
              <View style={styles.header_container}>
                <Text style={styles.title_text}>{article.title}</Text>
                <Text style={styles.description_text} numberOfLines={6}>{article.description}</Text>
                <Text style={styles.date_text}>Mis en ligne le {article.createdAt}</Text>
              </View>
          </View>
        )
}



const styles = StyleSheet.create({
  main_container: {
    height: 400,
    padding: 10,
    flexDirection: 'row'
  },
  image: {
    width: 400,
    height: 400,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {

  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 17,
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

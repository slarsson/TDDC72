import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import img from './lulea.png';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>          
          <View style={styles.imageContainer}>
            <Image style={styles.image}
              source={img}
            />
          </View>
          <View style={styles.buttonCols}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                <Text style={styles.buttonText}>BUTTON 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                <Text style={styles.buttonText}>BUTTON 2</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                <Text style={styles.buttonText}>BUTTON 3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                <Text style={styles.buttonText}>BUTTON 4</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.epostContainer}>
            <View style={styles.epost}>
              <Text style={styles.epostText}>Epost:</Text>
              <TextInput 
                style={styles.textInput}
                placeholder="hejsan@svejsan.net"
              />
            </View>
          </View> 
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  buttonCols: {
    flexDirection: 'row',
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '50%',
    justifyContent: 'flex-start'
  },
  button: {
    backgroundColor: '#187bcd',
    padding: 20,
    margin: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 15
  },
  imageContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
  },
  epostContainer: {
    marginTop: 50,
    flex: 1
  },
  epost: {
    width: '100%',
    flexDirection: 'row',
  },
  epostText: {
    flex: 1,
    fontSize: 15,
    marginRight: 20,  
    textAlign: 'right',
    alignSelf: 'center'
  },
  textInput: {
    flex: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginRight: 20
  },
});

export default App;
import React, { useState, useRef } from 'react';
import CardForm from './components/CardForm';
import Card from './components/Card';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated
} from 'react-native';

const initialCardInfo = {
  cardNumber: '',
  cardName: '',
  expMonth: 'MM',
  expYear: 'YY',
  cardType: null,
  cvv: '',
  isRotated: false
}

const App = () => {
  const [cardInfo, setCardInfo] = useState(initialCardInfo);
  const anime = useRef(new Animated.Value(0)).current;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.lighter}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{flex: 1}}
        >
          <View style={styles.container}>
              <View style={styles.cardContainer}>
                <Card cardInfo={cardInfo} anime={anime}/>
              </View>
              <CardForm cardInfo={cardInfo} setCardInfo={setCardInfo} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    flex: 1,
    justifyContent: 'center'
  },
  cardContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});

export default App;

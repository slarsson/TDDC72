import React, {useState} from 'react';

import {StyleSheet, ImageBackground, Text, View, Image} from 'react-native';

const cardBackground = require('../assets/7.jpeg');
const chip = require('../assets/chip.png');
const amex = require('../assets/amex.png');
const discover = require('../assets/discover.png');
const mastercard = require('../assets/mastercard.png');
const visa = require('../assets/visa.png');

const label = {
  amex: amex,
  discover: discover,
  mastercard: mastercard,
  visa: visa,
};

const Card = ({cardInfo}) => {
  const CardFront = () => {
    return (
      <>
        <ImageBackground source={cardBackground} style={styles.card}>
          <View style={styles.container}>
            <View style={styles.row}>
              <Image source={chip} style={styles.chip}></Image>
              <Image source={amex} style={styles.label}></Image>
            </View>

            <Text style={styles.cardNumber}>{cardInfo.cardNumber}</Text>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={{color: 'white'}}>Card Holder</Text>
                <Text style={styles.cardName}>{cardInfo.cardName}</Text>
              </View>

              <View style={styles.col}>
                <Text style={{color: 'white'}}>Expires</Text>
                <Text
                  style={{
                    color: 'white',
                  }}>{`${cardInfo.expMonth}/${cardInfo.expYear}`}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </>
    );
  };

  const CardBack = () => {
    return (
      <>
        <ImageBackground source={cardBackground} style={styles.card}>
          <View style={styles.container}>
            <Text style={styles.line}></Text>

          </View>

        </ImageBackground>
      </>
    );
  };

  return cardInfo.isRotated ? <CardBack /> : <CardFront />;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    //borderWidth: 2,
    //borderColor: 'white',
    //backgroundColor: 'blue',
  },
  chip: {
    width: 70,
    height: 50,
    borderRadius: 10,
  },
  label: {
    width: 90,
    height: 40,
    resizeMode: 'contain',
  },
  cardNumber: {
    color: 'white',
    fontSize: 25,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'white',
  },
  cardName: {
    flex: 1,
    color: 'white',
    alignItems: 'flex-start',
  },
  line: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'black',
    width: '100%',
  },

});

export default Card;

import React, { useState, useEffect } from 'react';
import {
  StyleSheet, 
  ImageBackground, 
  Text, 
  View, 
  Image, 
  Animated
} from 'react-native';

const cardBackground = require('../assets/7.jpeg');
const chip = require('../assets/chip.png');
const amex = require('../assets/amex.png');
const discover = require('../assets/discover.png');
const mastercard = require('../assets/mastercard.png');
const visa = require('../assets/visa.png');

const label = {
  3: {img: amex,  width: 40, height: 30},
  4: {img: visa,  width: 40, height: 30},
  5: {img: mastercard,  width: 40, height: 30},
  6: {img: discover,  width: 80, height: 20},
};

const Card = ({cardInfo, anime}) => {
  const hashtag = (arg) => {
    arg = arg.replace(/\s+/g, '');
    
    const n = 16 - arg.length;
    for (let i = 0; i < n; i++) {
      arg += '#';
    }    
    let text = arg.match(/.{1,4}/g);
    return text.join(' ');
  };

  const addZero = (arg) => {
    if (!Number.isInteger(arg) || arg > 9) return arg;
    return `0${arg}`;
  }

  const rotFront = anime.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const rotBack = anime.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  useEffect(() => {
    if (cardInfo.isRotated) {
      Animated.timing(anime, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(anime, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start()
    }
  }, [cardInfo.isRotated]);

  return (
    <View style={{width: 300, height: 193}}>
      <Animated.View
        style={{
          transform: [{rotateY: rotFront}],
          backfaceVisibility: 'hidden'
        }}
      >
        <ImageBackground source={cardBackground} style={{...styles.card, padding: 10}} imageStyle={{borderRadius: 5}}>
            <View style={styles.row}>
                <Image source={chip} style={styles.chip}></Image> 
                {label[cardInfo.cardType] && <Image source={label[cardInfo.cardType].img} style={{...styles.label, width: label[cardInfo.cardType].width, height: label[cardInfo.cardType].height}}></Image>}
            </View>
            <View style={styles.row}>
              <Text style={styles.cardNumber}>{hashtag(cardInfo.cardNumber)}</Text>
            </View>
            <View style={{...styles.row, flex: 1, alignItems: 'flex-end'}}>
              <View style={{...styles.col, flex: 1, marginRight: 10}}>
                <Text style={{color: '#ccc'}}>Card Holder</Text>
                <Text numberOfLines={1} style={styles.cardName}>{cardInfo.cardName}</Text>
              </View>
              <View style={styles.col}>
                <Text style={{color: '#ccc'}}>Expires</Text>
                <Text style={{color: 'white',}}>{`${addZero(cardInfo.expMonth)}/${cardInfo.expYear}`}</Text>
              </View>
            </View>
        </ImageBackground>
      </Animated.View>    
      <Animated.View            
        style={{
          transform: [{rotateY: rotBack}],
          backfaceVisibility: 'hidden'
        }}
      >
        <ImageBackground source={cardBackground} style={styles.card} imageStyle={{borderRadius: 5}}>
          <View style={styles.line}></View>
          <View style={styles.bottomBack}>
            <Text style={{color: '#fff', paddingBottom: 2}}>CVV</Text>
            <View style={styles.containerCvv}>
              <Text style={styles.cvv}>{cardInfo.cvv}</Text>
            </View>
            <View style={styles.imageBack}>
              {label[cardInfo.cardType] && <Image source={label[cardInfo.cardType].img} style={{...styles.label, width: label[cardInfo.cardType].width, height: label[cardInfo.cardType].height}}></Image>}
            </View>
          </View>
        </ImageBackground>
      </Animated.View>  
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 193,
    borderRadius: 45,
    position: 'absolute',
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    minWidth: '25%',
    borderRadius: 4
  },
  chip: {
    width: 40,
    height: 30,
    borderRadius: 4,
  },
  label: {
    resizeMode: 'contain',
  },
  cardNumber: {
    color: 'white',
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'white',
    marginTop: 30,
    padding: 5,
    width: '100%'
  },
  cardName: {
    color: 'white',
  },
  line: {
    backgroundColor: 'black',
    width: '100%',
    height: 35,
    marginTop: 30,
  },
  containerCvv: {
    backgroundColor: 'white',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cvv: {
    flex: 1,
    fontSize: 15,
    textAlign: 'right',
    marginRight: 5,
    fontStyle: 'italic',
  },
  bottomBack: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '90%',
    padding: 10
  },
  imageBack: {
    minHeight: 40,
    justifyContent: 'center'
  }
});

export default Card;
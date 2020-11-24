import React, { useState, useEffect } from 'react';

import {StyleSheet, ImageBackground, Text, View, Image, Animated} from 'react-native';

//
//    {!current && <CardFront cardInfo={cardInfo} />}
//   {current && <CardBack style={{transform: [{rotateY: '-180deg'}]}} cardInfo={cardInfo} />} */}

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

const Card = ({cardInfo}) => {

  const [rot, setRot] = useState('0deg');

  /* return (
  <Animated.View                 // Special animatable View
    style={{
      transform: [{rotateY: rot}]          // Bind opacity to animated value
    }}
  >
   <CardFront cardInfo={cardInfo} />
   <CardBack cardInfo={cardInfo} />
  </Animated.View>
  ); */
  return (
    <CardFront cardInfo={cardInfo} />
  ) 
 

  /* return cardInfo.isRotated ? <CardBack cardInfo={cardInfo} /> : <CardFront cardInfo={cardInfo} />; */
};

const CardFront = ({cardInfo}) => {
  const hashtag = (arg) => {
    arg = arg.replace(/\s+/g, '');
    
    const n = 16 - arg.length;
    for (let i = 0; i < n; i++) {
      arg += '#';
    }    
    let text = arg.match(/.{1,4}/g);
    return text.join(' ');
  };

  return (
    <>
      <ImageBackground source={cardBackground} style={styles.card} imageStyle={{ borderRadius: 16}}>
        <View style={styles.container}>
          <View style={styles.row}>
              <Image source={chip} style={styles.chip}></Image> 
              {label[cardInfo.cardType] && <Image source={label[cardInfo.cardType].img} style={{...styles.label, width: label[cardInfo.cardType].width, height: label[cardInfo.cardType].height}}></Image>}
          </View>

          <View style={styles.row}>
            <Text style={styles.cardNumber}>{hashtag(cardInfo.cardNumber)}</Text>
          </View>

          <View style={{...styles.row, flex: 1}}>
            <View style={{flex:1, flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'space-between'}}>
            <View style={{...styles.col, flex: 1, marginRight: 10 }}>
              <Text style={{color: 'white'}}>Card Holder</Text>
              <Text numberOfLines={1} style={styles.cardName}>{cardInfo.cardName}</Text>
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
        </View>
      </ImageBackground>
    </>
  );
};

const CardBack = ({cardInfo}) => {
  return (
    <View style={{transform: [{rotateY: '180deg'}]}}>
      <ImageBackground source={cardBackground} style={styles.card}>
        <View style={{...styles.container, padding: 0, alignItems: 'center'}}>
          <View style={styles.line}></View>
  
            <Text style={{color: 'white', alignSelf: 'flex-end', marginTop: 30, marginRight: 15}}>CVV</Text>
   
          
          <View style={styles.containerCvv}>
            <Text style={styles.cvv}>{cardInfo.cvv}</Text>
          </View>
          <View style={{flex: 1, alignSelf: 'flex-end', marginRight: 20 }}> 
            {label[cardInfo.cardType] && <Image source={label[cardInfo.cardType].img} style={{...styles.label, width: label[cardInfo.cardType].width, height: label[cardInfo.cardType].height}}></Image>}
          </View>
        </View>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 193,
    //borderWidth: 2,
    borderRadius: 45,
    //borderColor: 'red'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    //borderWidth: 2,
    //borderRadius: 10, 
    //borderColor: 'white',
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
    overflow: 'hidden',
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
    width: '90%',
    height: 20,

    flexDirection: 'row',
    alignItems: 'center'
  },
  cvv: {
    flex: 1,
    fontSize: 10,
    textAlign: 'right',
    marginRight: 5,
    fontStyle: 'italic',
  }

});

export default Card;

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';

const CardForm = ({cardInfo, setCardInfo}) => {
  
  const handleCardNumber = (value) => {
    let text = `${value}`;
    if (!text.match(/^[0-9\s+]*$/g) || text.length > 19) return;
    text = text.replace(/\s+/g, '');
    text = text.match(/.{1,4}/g);
    if (text == null) {
      cardInfo.cardNumber = '';
    } else {
      cardInfo.cardNumber = text.join(' ');
    }

    if (cardInfo.cardNumber.length > 0) {
      cardInfo.cardType = Number.parseInt(cardInfo.cardNumber[0]);
    } else {
      cardInfo.cardType = null;
      cardInfo.cvv = '';
    }
    setCardInfo({...cardInfo});
  };

  const handleCvv = (value) => {
    let text = `${value}`;
    if (
      !text.match(/^[0-9]*$/g) ||
      text.length > (cardInfo.cardType === 3 ? 4 : 3)
    )
      return;
    cardInfo.cvv = text;
    setCardInfo({...cardInfo});
  };

  const handleCardName = (value) => {
    cardInfo.cardName = value;
    setCardInfo({...cardInfo});
  };

  const handleSubmit = () => {
    setCardInfo({
      cardNumber: '',
      cardName: '',
      cardType: null,
      expMonth: '',
      expYear: '',
      cvv: '',
    });
  };

  const onChangeMonth = (value) => {
    let n = Number.parseInt(value);
    if (Number.isNaN(n)) return;
    cardInfo.expMonth = n;
    setCardInfo({...cardInfo});
  };

  const onChangeYear = (value) => {
    let n = Number.parseInt(value);
    if (Number.isNaN(n)) return;
    cardInfo.expYear = n;
    setCardInfo({...cardInfo});
  };

  let months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(<Picker.Item label={i > 9 ? `${i}` : `0${i}`} value={i} key={'m' + i}/>);
  }

  let years = [];
  let currentYear = new Date(Date.now()).getFullYear() % 2000;
  for (let i = currentYear; i <= currentYear + 10; i++) {
    years.push(<Picker.Item label={`${i}`} value={i} />);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={{marginBottom: 20}}>
            <Text style={{marginBottom: 5}}>Card Number</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.inputField}
              onChangeText={handleCardNumber}
              value={cardInfo.cardNumber}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={{marginBottom: 5}}>Card Name</Text>
            <TextInput
              style={styles.inputField}
              value={cardInfo.cardName}
              onChangeText={handleCardName}
            />
          </View>
          <View style={styles.dateCvv}>
            <View style={styles.expContainer}>
              <Text style={{marginBottom: 5}}>Expiration Date</Text>
              <View style={styles.expInputs}>
                <View style={styles.wtf}>
                  <View
                    style={{
                      ...styles.expInput,
                      marginRight: 10,
                      borderRadius: 6,
                    }}>
                    <Picker
                      onValueChange={onChangeMonth}
                      selectedValue={cardInfo.expMonth}>
                      <Picker.Item value="" label="MM" />
                      {months}
                    </Picker>
                  </View>
                </View>
                <View style={styles.wtf}>
                  <View
                    style={{
                      ...styles.expInput,
                      marginLeft: 10,
                      borderRadius: 6,
                    }}>
                    <Picker
                      onValueChange={onChangeYear}
                      selectedValue={cardInfo.expYear}>
                      <Picker.Item value="" label="YY" />
                      {years}
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.cvvContainer}>
              <Text style={{marginBottom: 5}}>CVV</Text>
              <TextInput
                keyboardType="numeric"
                style={{...styles.inputField, fontSize: 16}}
                value={cardInfo.cvv}
                onChangeText={handleCvv}
                onFocus={() => {cardInfo.isRotated = true; setCardInfo({...cardInfo});}}
                onBlur={() => {cardInfo.isRotated = false; setCardInfo({...cardInfo});}}
              />  
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
  },
  expContainer: {
    width: '70%',
    marginBottom: 20,
  },
  expInputs: {
    flexDirection: 'row',
  },
  expInput: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  wtf: {
    width: '50%',
  },
  dateCvv: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  inputField: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
  },
  cvvContainer: {
    flex: 1,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#33A2FF',
    padding: 20,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CardForm;

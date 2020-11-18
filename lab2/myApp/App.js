import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,

  Picker
} from 'react-native';

//import { Picker } from '@react-native-picker/picker';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [year, setYear] = useState(true);
  const [input, setInput] = useState({
    cardNumber: '',
    cardName: '',
    cardType: null,
    expMonth: '10',
    expYear: '',
    cvv: ''
  });

  const handleCardNumber = (value) => {
    let text = `${value}`;
    if (!text.match(/^[0-9\s+]*$/g) || text.length > 19) return;
    text = text.replace(/\s+/g, '');
    text = text.match(/.{1,4}/g);
    if(text == null) {
      input.cardNumber = '';
    } else {
      input.cardNumber = text.join(' ');
    }
    
    if (input.cardNumber.length > 0) {
      input.cardType = Number.parseInt(input.cardNumber[0]);
    } else {
      input.cardType = null;
      input.cvv = '';
    }
    setInput({...input});
  };

  const handleCvv = (value) => {
    let text = `${value}`;
    if (!text.match(/^[0-9]*$/g) || text.length > (input.cardType === 3 ? 4 : 3)) return;
    input.cvv = text;
    setInput({...input});
  }

  const handleCardName = (value) => {
    input.cardName = value;
    setInput({...input});
  };
  
  const handleSubmit = () => {
    setInput({ 
      cardNumber: '',
      cardName: '',
      cardType: null,
      expMonth: '',
      expYear: '',
      cvv: ''
    });
  }

  const onChangeMonth = (value) => {
    input.expMonth = Number.parseInt(value);
    setInput({...input});
  } 

  const onChangeYear = (value) => {
    input.expYear = Number.parseInt(value);
    setInput({...input});
  } 

  let months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(<Picker.Item label={i > 9 ? `${i}` : `0${i}`} value={i} />);
  }

  let years = [];
  let currentYear = new Date(Date.now()).getFullYear();
  for (let i = currentYear; i <= (currentYear + 10); i++) {
    years.push(<Picker.Item label={`${i % 2000}`} value={i} />);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ flex: 1}}
        >              
        <View style={styles.container}>
      
            <View style={styles.box}>
              <View style={{marginBottom: 20}}>
                <Text style={{marginBottom: 5}}>Card Number</Text>
                <TextInput 
                  
                  keyboardType="numeric"
                  style={styles.inputField}
                  onChangeText={handleCardNumber}
                  value={input.cardNumber}
                  
                /> 
              </View>
              <View style={{marginBottom: 20}}>
                <Text style={{marginBottom: 5}}>Card Name</Text>
                <TextInput 
                  style={styles.inputField} 
                  value={input.cardName}
                  onChangeText={handleCardName}
                />
              </View>
              <View style={styles.dateCvv}>
                <View style={styles.expContainer}>               
                  <Text style={{marginBottom: 5}}>Expiration Date</Text>
                  <View style={styles.expInputs}>
                    <View style={styles.wtf}>
                      <View style={{...styles.expInput, marginRight: 10, borderRadius: 6,}}>
                        <Picker
                          onValueChange={onChangeMonth}
                          selectedValue={input.expMonth}
                        >
                           <Picker.Item value='' label='MM' />
                          {months}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.wtf}>
                      <View style={{...styles.expInput, marginLeft: 10, borderRadius: 6,}}>
                        <Picker
                          onValueChange={onChangeYear}
                          selectedValue={input.expYear}
                        >
                          <Picker.Item value='' label='YY' />
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
                    value={input.cvv}
                    onChangeText={handleCvv}
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleSubmit}>
                <Text 
                style={styles.buttonText}
                >Submit</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    padding:20,
    width: '100%',
    //justifyContent: 'center',
    //padding: 20
  },
  expContainer: {
    width: '70%',
    marginBottom: 20,
  },
  expInputs: {
    flexDirection: 'row'
  },
  expInput: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    //padding: 5
  },
  wtf: {
    width: '50%',
    //backgroundColor: 'red',
    //width: '50
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.lighter,
    padding: 30
  },
  dateCvv: {
    flexDirection: 'row',
    marginBottom: 10
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
    marginLeft: 20
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
    fontSize: 16
  }


});

export default App;

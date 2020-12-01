import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const test = () => {
  let asdf = [];
  for (let j = 0; j <= 5; j++) {
    let arr = [];
    for (let i = 1; i <= 7; i++) {
      arr.push(
        <TouchableOpacity style={styles.day}>
          <Text>{i}</Text>
        </TouchableOpacity>
      );
    }
    asdf.push(<View style={{flexDirection: 'row'}}>{arr}</View>)
  }
  return asdf;
}

const Calender = () => {
  return (
    <View style={{margin: 20}}>
      <View>
        <Icon name="chevron-left" size={25} color={'gold'} />        
        <Text>JUNE 2020</Text>
        <Icon name="chevron-right" size={25} color={'gold'} />
      </View>

      
      <View style={styles.dayHeader}>
        <Text>SUN</Text>
        <Text>MON</Text>
        <Text>TUE</Text>
        <Text>WED</Text>
        <Text>THU</Text>
        <Text>FRI</Text>
        <Text>SAT</Text>
      </View>
      
      <View style={styles.daysContainer}>
        {test()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  daysContainer: {
    width: '100%',
    backgroundColor: 'red',
    //flexWrap: 'wrap',
    //flexDirection: 'row',
  },
  dayHeader: {
    width: 100/7 + '%',
    flexDirection: 'row',
  },
  day: {
    width: 100/7 + '%',
    backgroundColor: 'blue',
    borderWidth: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

  
});


export default Calender;
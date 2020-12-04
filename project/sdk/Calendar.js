import React, { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { calendarTable } from './calendarTable'; 

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Calender = ({onSelect, currentYear, currentMonth, currentDay, containerStyle, selectedColor, todayColor}) => {
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth - 1);
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    if (typeof onSelect !== 'function' || selected === -1) return;
    onSelect({
      year: year,
      month: month + 1,
      day: selected
    });
  }, [year, month, selected])

  const today = useRef({
    day: currentDay,
    month: currentMonth - 1,
    year: currentYear
  });

  const next = () => {
    if (month == 11) {
      setMonth(0);  
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const prev = () => {
    if(month == 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => prev()} style={styles.chevron}>
          <Icon name="chevron-left" size={20} color={'black'} />   
        </TouchableOpacity>     
          <Text style={styles.headerText}>{MONTHS[month]} {year}</Text>
        <TouchableOpacity onPress={() => next()} style={styles.chevron}
        >
          <Icon name="chevron-right" size={20} color={'black'} />
        </TouchableOpacity>
      </View>

      <View style={styles.dayHeader}>
        {DAYS.map(item => <Text key={item} style={styles.dayHeaderText}>{item}</Text>)}
      </View>
      
      <View style={styles.daysContainer}>
        {calendarTable(
          year, 
          month, 
          (year == today.current.year && month == today.current.month ? today.current.day : -1), 
          selected, 
          selectedColor, 
          todayColor, 
          value => {
            if (value.month == 1) {
              next();
            } else if (value.month == -1) {
              prev();
            }
            setSelected(value.day);
          }
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20, 
    paddingTop: 10, 
    maxWidth: 600, 
    borderWidth: 1, 
    backgroundColor: '#ededed'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  daysContainer: {
    width: '100%',
  },
  dayHeader: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 5,
  },
  dayHeaderText: {
    width: 100/7 + '%',
    textAlign: 'center',
  },
  chevron: {
    padding: 10,
  }
});

export default Calender;
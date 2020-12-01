import React, { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const gridStyles = StyleSheet.create({
  current: {
    backgroundColor: 'red'
  },
  currentText: {
    color: 'green'
  },
  today: {
    backgroundColor: 'orange'
  },
  todayText: {
    color: 'red'
  },
  other: {
    backgroundColor: 'blue'
  },
  otherText: {
    color: 'pink'
  }
});

const test = (year, month, today, cb) => {
  let lastMonth = new Date(year, month, 0).getDate();
  let currentMonth = new Date(year, (month + 1), 0).getDate();
  let offset = new Date(year, month, 1).getDay();
  
  let rows = [];
  let day, type;

  if (offset > 0) {
    day = lastMonth - (offset - 1);
    type = true;
  } else {
    day = 1;
    type = false;
  }
  
  let styleBox, styleText;
  let count = 0; 

  for (let j = 0; j <= 5; j++) {
    let row = [];
    for (let i = 1; i <= 7; i++) {
      if (type) {
        styleBox = gridStyles.other;
        styleText = gridStyles.otherText;
      } else if (day == today) {
        styleBox = gridStyles.today;
        styleText = gridStyles.todayText;
      } else {
        styleBox = gridStyles.current;
        styleText = gridStyles.currenText;
      }
      
      let x = {
        day: day,
        month: type ? (day > 15 ? -1 : 1) : 0,
      };

      row.push(
        <TouchableOpacity
          key={Math.random() + Math.random()}
          style={[styles.day, styleBox]}
          onPress={() => cb(x)}
        >
          <Text style={styleText}>{day}</Text>
        </TouchableOpacity>
      );
      
      day++;
      count++;
      if (type) {
        if (day > lastMonth) {
          type = false;
          day = 1;
        }
      } else {
        if (day > currentMonth) {
          day = 1;
          type = true;     
        }
      }
    }
    rows.push(<View key={j} style={{flexDirection: 'row'}}>{row}</View>)
  }
  return rows;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Calender = ({currentYear, currentMonth, currentDay}) => {
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  
  const today = useRef({
    day: currentDay,
    month: currentMonth,
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
    <View style={{margin: 20}}>
      <View style={styles.dateHeaderPicker}>
        <TouchableOpacity
          onPress={() => prev()}
        >
          <Icon name="chevron-left" size={40} color={'gold'} />   
        </TouchableOpacity>     
          <Text style={styles.dateHeader}>{MONTHS[month]} {year}</Text>
        <TouchableOpacity
          onPress={() => next()}
        >
          <Icon name="chevron-right" size={40} color={'gold'} />
        </TouchableOpacity>
      </View>

      <View style={styles.dayHeader}>
        {DAYS.map(item => {
          return <Text key={item} style={styles.dayHeaderItem}>{item}</Text>
        })}
      </View>
      
      <View style={styles.daysContainer}>
        {test(year, month, (year == today.current.year && month == today.current.month ? today.current.day : -1), (x) => {
          if (x.month == 1) {
            next();
          } else if (x.month == -1) {
            prev();
          }
          console.log(x.day);
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateHeaderPicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateHeader: {
    fontSize: 20,
    textAlign: 'center',
  },
  daysContainer: {
    width: '100%',
    backgroundColor: 'red',
  },
  dayHeader: {
    width: '100%',
    flexDirection: 'row',
  },
  dayHeaderItem: {
    width: 100/7 + '%',
    textAlign: 'center',
  },
  day: {
    width: 100/7 + '%',
    backgroundColor: '#ededed',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
});


export default Calender;
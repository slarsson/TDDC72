import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const calendarTable = (year, month, today, selected, selectedColor, todayColor, cb) => {
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

  for (let j = 0; j <= 5; j++) {
    let row = [];
    for (let i = 1; i <= 7; i++) {
      if (type) {
        styleBox = {};
        styleText = gridStyles.otherText;
      } else if (day == today) {
        if (todayColor != null) {
          styleBox = {...gridStyles.today, backgroundColor: todayColor};
        } else {
          styleBox = gridStyles.today;
        }
        styleText = gridStyles.todayText;
      } else if (day == selected) {
        if (selectedColor != null) {
          styleBox = {...gridStyles.selected, backgroundColor: selectedColor};
        } else {
          styleBox = gridStyles.selected;
        }
        styleText = gridStyles.selectedText;
      } else {
        styleBox = {};
        styleText = gridStyles.currentText;
      }

      const obj = {
        day: day,
        month: type ? (day > 15 ? -1 : 1) : 0,
      };

      row.push(
        <TouchableOpacity
          key={Math.random() + Math.random()}
          style={gridStyles.day}
          onPress={() => cb(obj)}
        >
          <View style={[gridStyles.tableCell, styleBox]}>
            <Text style={styleText}>{day}</Text>
          </View>
        </TouchableOpacity>
      );
      
      day++;

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

const gridStyles = StyleSheet.create({
  currentText: {
    fontWeight: 'bold'
  },
  today: {
    backgroundColor: 'orange',
    borderRadius: 100
  },
  todayText: {
    color: 'white'
  },
  otherText: {
    color: '#808080'
  },
  selected: {
    backgroundColor: 'tomato',
    borderRadius: 100,
  },
  selectedText: {
    color: 'white'
  },
  day: {
    width: 100/7 + '%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2
  },
  tableCell: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }   
});

export {
  calendarTable
}
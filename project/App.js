import React, { useState } from 'react';
import { Calendar, Carousel } from './sdk';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const today = new Date(Date.now());

const parseDate = (year, month, day) => {
  let d = day < 10 ? `0${day}` : `${day}`;
  let m = month < 10 ? `0${month}` : `${month}`;
  return `${year}-${m}-${d}`;
} 

const DATA1 = [
  {
    id: 'id-1',
    name: 'No time to die"',
    rating: '-',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BYmQ3MTY4NDUtOWExZi00OGQxLTgzNmQtODI1MTFkZjMyMDY0XkEyXkFqcGdeQXVyODk2NDQ3MTA@._V1_UX182_CR0,0,182,268_AL_.jpg',
  },
  {
    id: 'id-2',
    name: 'Spectre"',
    rating: 6.8,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BOWQ1MDE1NzgtNTQ4OC00ZjliLTllZDAtN2IyOTVmMTc5YjUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY209_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 'id-3',
    name: 'Skyfall',
    rating: 7.7,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMWZiNjE2OWItMTkwNy00ZWQzLWI0NTgtMWE0NjNiYTljN2Q1XkEyXkFqcGdeQXVyNzAwMjYxMzA@._V1_UY209_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 'id-4',
    name: 'Quantum of Solace',
    rating: 6.6,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjZiYTUzMzktZWI5Yy00Mzk4LWFlMDgtYjRmNWU0Mzc0MzNiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UY209_CR0,0,140,209_AL_.jpg',
  },  
  {
    id: 'id-5',
    name: 'Casino Royale',
    rating: 8,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UY209_CR0,0,140,209_AL_.jpg',
  },
  {
    id: 'id-6',
    name: 'From Russia with love',
    rating: 7.4,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjBiNGNlNmItZTk2Zi00YjRlLTk1NzEtNDI2YTNmN2EwNDhlXkEyXkFqcGdeQXVyNDY2MTk1ODk@._V1_UX140_CR0,0,140,209_AL_.jpg',
  }
];

const App = () => {
  const [showCalender, setShowCalender] = useState(false);
  const [date, setDate] = useState(parseDate(today.getFullYear(), today.getMonth() + 1, today.getDate()));
  const [data, setData] = useState(DATA1);

  const updateData = () => {
    for (let i = 0; i < data.length; i++) { 
      let idx = Math.floor(Math.random() * data.length);
      [data[idx], data[i]] = [data[i], data[idx]];
      setData(data);
    }
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.scrollView}>
          
          <Carousel 
            style={{paddingBottom: 30, paddingTop: 20}}
            title={"Aktuella filmer"}
            titleStyle={{}}
            itemWidth={150}
            onPress={item => alert(`name: ${item.name}`)}
            itemContainerStyle={{backgroundColor: '#454545'}}
            itemTextStyle={{fontSize: 20}}
          >
            {data.map(item => <Carousel.Item key={item.id} name={item.name} rating={item.rating} url={item.imageUrl} />)}
          </Carousel>

          <Carousel 
            style={{paddingBottom: 30}}
            title={"Norrländska favoriter"}
            titleStyle={{}}
            itemWidth={150}
            onPress={item => alert(`pressed id: ${JSON.stringify(item)}`)}
            itemContainerStyle={{backgroundColor: '#454545'}}
            itemTextStyle={{fontSize: 20}}
          >
            <Carousel.Item id={1} name={"Jägarna"} rating={10} url="https://m.media-amazon.com/images/M/MV5BOTFmNzY4Y2UtYTIzYy00MmE2LTk0YzUtYmY2Y2ZlNjQ0OGUxXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_UY268_CR1,0,182,268_AL_.jpg"/>
            <Carousel.Item id={2} name={"Jägarna 2"} rating={9.8} url="https://m.media-amazon.com/images/M/MV5BMTY2NjA4MjgwOF5BMl5BanBnXkFtZTcwMjI2MzYyNw@@._V1_UY268_CR3,0,182,268_AL_.jpg"/>
            <Carousel.Item id={3} name={"Pistvakt"} rating={9.6} url="https://m.media-amazon.com/images/M/MV5BYTIyYTgyZmMtNGNlMy00ZWQzLWI0YjctOTAxOWJmYmJjMWY1XkEyXkFqcGdeQXVyMTQzMjU1NjE@._V1_UY268_CR3,0,182,268_AL_.jpg"/>
            <Carousel.Item id={4} name={"Sameblod"} rating={0.3} url="https://duifokus.se/wp-content/uploads/2017/02/Sameblod-affisch.jpg"/>
          </Carousel>

          <Carousel title={"Nyheter"} style={{paddingBottom: 100}}>
            <Carousel.Item url="https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_UX182_CR0,0,182,268_AL_.jpg"/>
            <Carousel.Item url="https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_UX182_CR0,0,182,268_AL_.jpg"/>
            <Carousel.Item url="https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_UX182_CR0,0,182,268_AL_.jpg"/>
            <Carousel.Item url="https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_UX182_CR0,0,182,268_AL_.jpg"/>
            <Carousel.Item url="https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_UX182_CR0,0,182,268_AL_.jpg"/>
            <Carousel.Item url="https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_UX182_CR0,0,182,268_AL_.jpg"/>
            <Carousel.Item url="https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_UX182_CR0,0,182,268_AL_.jpg"/>
            <Carousel.Item url="https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_UX182_CR0,0,182,268_AL_.jpg"/>
          </Carousel>

        </ScrollView>
        
        <View style={{...styles.headerContainer, height: showCalender ? '100%' : 'auto'}}>
          <View style={styles.header}>
            <Text style={{fontSize: 25, color: '#fff'}}>{date}</Text>
            <TouchableOpacity onPress={() => setShowCalender(!showCalender)}>
              <Icon name="calendar" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
          {showCalender && 
            <View style={styles.calenderContainer}>
              <Calendar
                onSelect={(data) => {
                  setDate(parseDate(data.year, data.month, data.day));
                  updateData();
                }}
                currentDay={today.getDate()}
                currentMonth={today.getMonth() + 1}
                currentYear={today.getFullYear()}          
                containerStyle={{borderColor: 'red'}}
                selectedColor="tomato"
                todayColor="lightsalmon"
            />
            </View>
          }
          <TouchableWithoutFeedback onPress={() => setShowCalender(false)}><View style={{flex: 1}}></View></TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 70, 
    backgroundColor: '#202020'
  },
  header: {
    flexDirection: 'row', 
    justifyContent:'space-between', 
    alignItems: 'center', 
    backgroundColor: 'tomato',
    height: 70,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'red'
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%'
  },
  calenderContainer: {
    backgroundColor: 'tomato'
  }
});

export default App;

import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const Card = ({data, handler}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handler({...data})}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.repo}>{data.repo}</Text>
      <Text style={styles.text}>{data.text}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.stats}>
          <Icon name="star" size={30} />
          <Text style={styles.statsText}>{data.stars}</Text>
        </View>
        <View style={{...styles.stats, marginLeft: 20}}>
          <Icon name="code-fork" size={30} />
          <Text style={styles.statsText}>{data.forks}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    lineHeight: 30,
    color: '#0366d6',
    fontFamily: 'Ubuntu-Regular'
  },
  repo: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Ubuntu-Regular'
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    paddingTop: 10,
    color: '#586069',
    fontFamily: 'Ubuntu-Regular'
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statsText: {
    fontFamily: 'Ubuntu-Regular',
    paddingLeft: 10,
    fontSize: 18
  }
});

export default Card;
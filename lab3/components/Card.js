import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const format = (value) => {
  return `${Math.round((value / 1000) * 10) / 10}k`;
}

const Card = ({data, handler}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handler({...data})}>
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.repo}>{`${data.owner.login}/${data.name}`}</Text>
      <Text style={styles.text}>{data.description}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.stats}>
          <Icon name="star" size={30} />
          <Text style={styles.statsText}>{format(data.stargazerCount)}</Text>
        </View>
        <View style={{...styles.stats, marginLeft: 20}}>
          <Icon name="code-fork" size={30} />
          <Text style={styles.statsText}>{format(data.forkCount)}</Text>
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
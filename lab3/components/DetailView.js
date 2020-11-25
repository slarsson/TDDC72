import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const DetailView = ({data, close}) => {
  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.back} onPress={close}>
        <Text>GO BACK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 99999,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  back: {
    backgroundColor: 'red',
    height: 100
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

export default DetailView;
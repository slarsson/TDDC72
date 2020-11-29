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
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.repo}>{`${data.owner.login}/${data.name}`}</Text>
      <Text style={styles.text}>{data.description}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.stats}>
          <Icon name="star" size={30} />
          <Text style={styles.statsText}>{data.stargazerCount}</Text>
        </View>
        <View style={styles.stats}>
          <Icon name="code-fork" size={30} />
          <Text style={styles.statsText}>{data.forkCount}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.back} onPress={close}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <Text style={styles.backText}>GO BACK</Text>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  back: {
    padding: 20,
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: '#863e92',
    flexDirection: 'row',
    alignItems: 'center'
  },
  backText: {
    color: '#fff',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 18,
    marginLeft: 15
  },
  title: {
    fontSize: 30,
    lineHeight: 40,
    paddingBottom: 10,
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
    padding: 25,
    paddingBottom: 0,
    color: '#586069',
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center'
  },
  statsContainer: {
    flexDirection: 'column',
    marginTop: 10
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    justifyContent: 'center'
  },
  statsText: {
    fontFamily: 'Ubuntu-Regular',
    paddingLeft: 10,
    fontSize: 18
  }
});

export default DetailView;
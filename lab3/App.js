import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
  BackHandler,
  Alert
} from 'react-native';

import Card from './components/Card';
import DetailView from './components/DetailView';
import Select from './components/Select';
import { API_TOKEN } from './_token';

const OPTIONS = [
  {
    key: null,
    value: 'All'
  },
  {
    key: 'c',
    value: 'C'
  },
  {
    key: 'cpp',
    value: 'C++'
  },
  {
    key: 'go',
    value: 'Go'
  },
  {
    key: 'java',
    value: 'JAVA'
  },
  {
    key: 'javascript',
    value: 'JavaScript'
  },
  {
    key: 'matlab',
    value: 'MATLAB'
  },
  {
    key: 'php',
    value: 'PHP'
  },
  {
    key: 'python',
    value: 'Python'
  },
  {
    key: 'rust',
    value: 'Rust'
  },
  {
    key: 'starlark',
    value: 'Starlark'
  },
  {
    key: 'typescript',
    value: 'TypeScript'
  },
];

const fetchData = (language) => {
  return new Promise((resolve, reject) => {
    fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            query($query: String!) {
              search(query: $query, type: REPOSITORY, first: 20) { 
                nodes {
                  ... on Repository {
                    id,
                    name,
                    owner {
                      login
                    },
                    description,
                    stargazerCount,
                    forkCount,
                  }
                }
              },
            }`,
          variables: {
            query: language ? `language:${language} stars:>0 sort:stars` : `${OPTIONS.slice(1).reduce((acc, value) => {return acc + ` language:${value.key}`}, '')} sort:stars stars:>10000`} 
        })
      })
      .then(v => v.json())
      .then(v => resolve(v.data.search.nodes))
      .catch(err => reject(err));
  });
};

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(null);
  const [option, setOption] = useState(0);
  const lastRequest = useRef(0);

  useEffect(() => {
    lastRequest.current = option;
    const currentRequest = option; 
    setLoading(true);
    setData([]);
    fetchData(OPTIONS[option].key).then(value => {
      if (currentRequest != lastRequest.current) return; // abort if "old" request finish before new
      setLoading(false);
      setData(value);
    }).catch(err => {
      setLoading(false);
      Alert.alert('Error', 'something went wrong', [{ text: 'OK', onPress: () => {}}])
    })
  }, [option]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // "The event subscriptions are called in reverse order (i.e. the last registered subscription is called first)."
      setCurrent(null);
      return true;
    });
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{backgroundColor: '#f3f3f3', flex: 1}}>
        {current && <DetailView data={current} close={() => setCurrent(null)}/>}
        {loading && 
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="black" />
          </View>
        } 
        <View style={styles.main}>
          <FlatList
            data={data}
            renderItem={(value) => <Card data={value.item} handler={setCurrent} />}
            keyExtractor={item => item.id}
          />
        </View>
        <Select options={OPTIONS} selected={option} setSelected={setOption} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 80
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default App;

import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  BackHandler
} from 'react-native';

import Card from './components/Card';
import DetailView from './components/DetailView';
import Select from './components/Select';
import { API_TOKEN } from './_token';

// test data
const DATA = [
  {
    id: 'id1',
    title: 'react-native',
    repo: 'facebook/react-native',
    text: 'zapSuper fast and lightweight anchor-free object detection model. fireOnly 1.8mb and run 97FPS on cellphonefire ',
    stars: 12343,
    forks: 2000
  },
  {
    id: 'id2',
    title: 'react-native',
    repo: 'facebook/react-native',
    text: 'zapSuper fast and lightweight anchor-free object detection model. fireOnly 1.8mb and run 97FPS on cellphonefire ',
    stars: 12343,
    forks: 100345
  },
  {
    id: 'id3',
    title: 'react-native',
    repo: 'facebook/react-native',
    text: 'zapSuper fast and lightweight anchor-free object detection model. fireOnly 1.8mb and run 97FPS on cellphonefire ',
    stars: 12343,
    forks: 234
  },
  {
    id: 'id4',
    title: 'react-native',
    repo: 'facebook/react-native',
    text: 'zapSuper fast and lightweight anchor-free object detection model. fireOnly 1.8mb and run 97FPS on cellphonefire ',
    stars: 12343,
    forks: 234
  },
  {
    id: 'id5',
    title: 'react-native',
    repo: 'facebook/react-native',
    text: 'zapSuper fast and lightweight anchor-free object detection model. fireOnly 1.8mb and run 97FPS on cellphonefire ',
    stars: 12343,
    forks: 234
  }
];

const OPTIONS = [
  {
    key: 'PHP',
    value: 'PHP'
  },
  {
    key: 'go',
    value: 'Go'
  },
  {
    key: 'cpp',
    value: 'C++'
  },
  {
    key: 'java',
    value: 'JAVA'
  },
  {
    key: 'rust',
    value: 'Rust'
  }
];

const fetchData = (language) => {
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
    //   resolve(null);
    // }, 1000);

    fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            query {
              search(query: "language:javascript sort:stars", type: REPOSITORY, first: 10) { 
              repositoryCount,
              nodes {
                ... on Repository {
                  name,
                  stargazers {
                    totalCount
                  }
                }
              }
            },
          }`
        })
      })
      .then(v => v.json())
      .then(v => resolve(v))
      .catch(err => reject(err));
  });
};

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(null);
  const [option, setOption] = useState(0);
  const lastRequest = useRef(0);
  
  const renderItem = (value) => {
    if (value.item.stars > 1000) {
      value.item.stars = `${Math.round((value.item.stars / 1000) * 10) / 10}k`;
    }
    if (value.item.forks > 1000) {
      value.item.forks = `${Math.round((value.item.forks / 1000) * 10) / 10}k`;
    }
    return <Card data={value.item} handler={setCurrent} />;
  };

  useEffect(() => {
    lastRequest.current = option;
    const currentRequest = option; 
    setLoading(true);
    setData([]);
    fetchData().then(data => {
      if (currentRequest != lastRequest.current) return; // abort if "old" request finish before new
      setLoading(false);
      setData(DATA);  // TODO
      console.log(data);
    });
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
            style={{zIndex: 2}}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            // refreshControl={
            //   <RefreshControl
            //    refreshing={true}
            //    onRefresh={() => {}}
            //   />
            //}
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

import React, { Component, useContext, createContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CarouselContext = createContext(null);

class Carousel extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={this.props.style}>
        {this.props.title && <Text style={{...styles.containerTitle, ...this.props.titleStyle}}>{this.props.title}</Text>}
        <ScrollView horizontal={true} contentContainerStyle={{alignItems: 'flex-start'}}>
          <CarouselContext.Provider value={{
            callback: this.props.onPress,
            width: this.props.itemWidth ? this.props.itemWidth : 150,
            containerStyle: this.props.itemContainerStyle ? this.props.itemContainerStyle : {},  
            textStyle: this.props.itemTextStyle ? this.props.itemTextStyle : {} 
          }}>
            {this.props.children}
          </CarouselContext.Provider>
        </ScrollView>
      </View>
    );
  }
}

const Item = (props) => {
  const ctx = useContext(CarouselContext);

  return (
    <TouchableOpacity style={{...styles.item, width: ctx.width}} activeOpacity={0.6} onPress={() => {
      if (typeof ctx.callback !== 'function') return;
      ctx.callback({...props});
    }}>
      <Image
        style={styles.image}
        source={{uri: props.url}}
      />
      <View style={{...ctx.containerStyle}}>
        {props.rating && <View style={styles.rating}>
          <Icon name="star" size={25} color={'gold'} />
          <Text style={{...styles.ratingText, color: ctx.textStyle.color ? ctx.textStyle.color : '#fff'}}>{props.rating}</Text>
        </View>}
        {props.name && <Text style={{...styles.title, ...ctx.textStyle}} numberOfLines={1}>{props.name}</Text>}
      </View>
    </TouchableOpacity>
  ); 
};

Carousel.Item = Item;

const styles = StyleSheet.create({
  containerTitle: {
    color: '#fff',
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 10
  },
  item: {
    flexDirection: 'column',
    margin: 10
  },
  image: {
    minWidth: '100%',
    aspectRatio: 2/3
  },
  rating: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingText: {
    paddingLeft: 5,
    fontSize: 20
  },
  title: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    fontSize: 20,
    color: 'white',
  }
});

export default Carousel


/**
 * @jest-environment jsdom
*/

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { Carousel } from '../sdk';

// Test if <Carousel/> renders without any items
it('empty carousel renders correctly', () => {
  const tree = renderer.create(<Carousel></Carousel>).toJSON();
  expect(tree).toMatchSnapshot();
});

// Test if <Carousel/> renders with items
it('carousel with items renders correctly', () => {
  const tree = renderer.create(
    <Carousel>
      <Carousel.Item id={1} name={"item 1"} rating={10} url="https://m.media-amazon.com/images/M/MV5BOTFmNzY4Y2UtYTIzYy00MmE2LTk0YzUtYmY2Y2ZlNjQ0OGUxXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_UY268_CR1,0,182,268_AL_.jpg"/>
      <Carousel.Item id={2} name={"item 2"} rating={9.8} url="https://m.media-amazon.com/images/M/MV5BMTY2NjA4MjgwOF5BMl5BanBnXkFtZTcwMjI2MzYyNw@@._V1_UY268_CR3,0,182,268_AL_.jpg"/>
      <Carousel.Item id={3} name={"item 3"} rating={9.6} url="https://m.media-amazon.com/images/M/MV5BYTIyYTgyZmMtNGNlMy00ZWQzLWI0YjctOTAxOWJmYmJjMWY1XkEyXkFqcGdeQXVyMTQzMjU1NjE@._V1_UY268_CR3,0,182,268_AL_.jpg"/>
      <Carousel.Item id={4} name={"item 4"} rating={0.3} url="https://duifokus.se/wp-content/uploads/2017/02/Sameblod-affisch.jpg"/>
    </Carousel>
  ).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[0].children[0].children.length).toBe(4);
});

// Test if <Carousel/> renders without name and rating prop
it('carousel with items (images only) renders correctly', () => {
  const tree = renderer.create(
    <Carousel>
      <Carousel.Item id={1} url="https://m.media-amazon.com/images/M/MV5BOTFmNzY4Y2UtYTIzYy00MmE2LTk0YzUtYmY2Y2ZlNjQ0OGUxXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_UY268_CR1,0,182,268_AL_.jpg"/>
      <Carousel.Item id={2} url="https://m.media-amazon.com/images/M/MV5BMTY2NjA4MjgwOF5BMl5BanBnXkFtZTcwMjI2MzYyNw@@._V1_UY268_CR3,0,182,268_AL_.jpg"/>
      <Carousel.Item id={3} url="https://m.media-amazon.com/images/M/MV5BYTIyYTgyZmMtNGNlMy00ZWQzLWI0YjctOTAxOWJmYmJjMWY1XkEyXkFqcGdeQXVyMTQzMjU1NjE@._V1_UY268_CR3,0,182,268_AL_.jpg"/>
      <Carousel.Item id={4} url="https://duifokus.se/wp-content/uploads/2017/02/Sameblod-affisch.jpg"/>
    </Carousel>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

// Test if <Carousel.Item/> props renders
it('carousel item name + rating renders correctly', () => {
  const testTitle = 'my test title';
  const testRating = 123;

  const tree = renderer.create(
    <Carousel>
      <Carousel.Item id={1} name={testTitle} rating={testRating} url="https://m.media-amazon.com/images/M/MV5BOTFmNzY4Y2UtYTIzYy00MmE2LTk0YzUtYmY2Y2ZlNjQ0OGUxXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_UY268_CR1,0,182,268_AL_.jpg"/>
    </Carousel>
  ).toJSON();

  const title = tree.children[0].children[0].children[0].children[1].children[1].children[0];
  const rating = tree.children[0].children[0].children[0].children[1].children[0].children[1].children[0];

  expect(title).toBe(testTitle); 
  expect(rating).toBe(testRating.toString());
});

// Test if <Carousel.Item/> width has been set successfully
it('carousel item width set ok', () => {
  const itemWidth = 123;

  const tree = renderer.create(
    <Carousel
      itemWidth={itemWidth}
    >
      <Carousel.Item id={1} name={'test'} rating={0} url="https://m.media-amazon.com/images/M/MV5BOTFmNzY4Y2UtYTIzYy00MmE2LTk0YzUtYmY2Y2ZlNjQ0OGUxXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_UY268_CR1,0,182,268_AL_.jpg"/>
    </Carousel>
  ).toJSON();

  const width = tree.children[0].children[0].children[0].props.style.width;
  expect(width).toBe(itemWidth);
});

// Test if <Carousel/> callback works
it('carousel item callback props', () => {
  const testItem1 = {
    id: 1,
    name: 'my name 1',
    rating: 123
  };

  const testItem2 = {
    id: 2,
    name: 'my name 2',
    rating: 0.2
  };

  const mockCallBack = jest.fn();
  let carousel = mount(
    <Carousel
      onPress={mockCallBack}
    >
      <Carousel.Item 
        id={testItem1.id} 
        name={testItem1.name} 
        rating={testItem1.rating} 
        url="https://m.media-amazon.com/images/M/MV5BOTFmNzY4Y2UtYTIzYy00MmE2LTk0YzUtYmY2Y2ZlNjQ0OGUxXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_UY268_CR1,0,182,268_AL_.jpg"
      />
      <Carousel.Item 
        id={testItem2.id} 
        name={testItem2.name} 
        rating={testItem2.rating} 
        url="https://m.media-amazon.com/images/M/MV5BOTFmNzY4Y2UtYTIzYy00MmE2LTk0YzUtYmY2Y2ZlNjQ0OGUxXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_UY268_CR1,0,182,268_AL_.jpg"
      />
    </Carousel>
  );
  
  // test first child
  carousel.find('Item').at(0).simulate('click');
  expect(mockCallBack.mock.calls[0][0].id).toBe(testItem1.id);
  expect(mockCallBack.mock.calls[0][0].name).toBe(testItem1.name);
  expect(mockCallBack.mock.calls[0][0].rating).toBe(testItem1.rating);
  
  // test second child
  carousel.find('Item').at(1).simulate('click');
  expect(mockCallBack.mock.calls[1][0].id).toBe(testItem2.id);
  expect(mockCallBack.mock.calls[1][0].name).toBe(testItem2.name);
  expect(mockCallBack.mock.calls[1][0].rating).toBe(testItem2.rating);
});

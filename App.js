/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';

const SQUARE_DIMENSIONS = 50;
const { height, width } = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  componentWillMount() {
    this._animatedValueX = 0;
    this._animatedValueY = 0;
    this.state.pan.x.addListener(value => (this._animatedValueX = value.value));
    this.state.pan.y.addListener(value => (this._animatedValueY = value.value));

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this._animatedValueX,
          y: this._animatedValueY
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        // custom logic here
        let elStringy = JSON.stringify(this.state.pan.y);
        alert(elStringy, this.state.pan.y);
        Animated.event([
          null,
          {
            dx: this.state.pan.x,
            dy: this.state.pan.y
          }
        ])(e, gestureState); // <<--- INVOKING HERE!
      },
      onPanResponderRelease: () => {
        // alert(height);
        let valorparseado = JSON.stringify(this.state.pan.y) * 1 + 10;
        let variableNueva = valorparseado * 100 / height;

        //redux :D

        // alert(variableNueva);
        // Animated.spring(this.state.pan);
        // alert(JSON.stringify(this.state.pan.y)); //Shows an object with X and Y coords
      }
    });
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }
  getStyleRoller() {
    return [
      styles.roller,
      {
        height: this.state.pan.y
      }
    ];
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={this.getStyleRoller()} />
        <Animated.View
          style={styles.square}
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  square: {
    width: SQUARE_DIMENSIONS,
    height: SQUARE_DIMENSIONS,
    borderRadius: 30,
    backgroundColor: 'blue',
    marginTop: 5
  },
  roller: {
    backgroundColor: 'blue',
    width: '100%',
    height: 10,
    paddingTop: 10
  }
});

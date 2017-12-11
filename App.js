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
  PanResponder
} from 'react-native';

const SQUARE_DIMENSIONS = 50;

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
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        Animated.spring(this.state.pan);
        // alert(JSON.stringify(this.state.pan)); //Shows an object with X and Y coords
      }
    });
  }

  componentWillUnmoun() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  getStyle() {
    return [
      styles.square,
      {
        transform: [
          {
            translateY: this.state.pan.y
          }
        ]
      }
    ];
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.roller} />
        <Animated.View
          style={this.getStyle()}
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
    backgroundColor: 'blue'
  },
  roller: {
    backgroundColor: 'blue',
    height: 10,
    width: '100%'
  }
});

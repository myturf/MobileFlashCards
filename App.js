import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useState} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {YellowBox} from 'react-native';

import AppNavigator from './navigation/AppNavigator';

import PropTypes from 'prop-types';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Provider} from 'react-redux';
import IndexReducer from './reducers/IndexReducer';
import Constants from 'expo-constants';
import {setLocalNotification} from './utils/NotificationUtils';

const store = createStore(
    IndexReducer /* preloadedState, */,
    applyMiddleware(thunk, logger)
);


function FlashcardStatusBar({backgroundColor, ...props}) {
  return (
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
  );
}

FlashcardStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired
};

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
        <Provider store={store}>
          <View style={styles.container}>
            <FlashcardStatusBar
                backgroundColor="gray"
                barStyle="light-content"
            />
            <AppNavigator/>
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dde'
  }
});

import React from 'react';
import PropTypes from 'prop-types';
import {Platform} from 'react-native';
import * as Icon from '@expo/vector-icons';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import DeckListComponent from '../components/DeckListComponent';
import AddDeckComponent from '../components/AddDeckComponent';
import DeckDetail from '../components/DeckDetailComponent';
import AddCardComponent from '../components/AddCardComponent';
import QuizComponent from '../components/QuizComponent';
import SettingsComponent from '../components/SettingsComponent';

import {gray, darkGray, white, green, lightGreen, textGray} from '../utils/ColorsUtil';

const isIOS = Platform.OS === 'ios' ? true : false;

const routeConfigs = {
  Decks: {
    screen: DeckListComponent,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => (
          <Icon.MaterialCommunityIcons
              name={'cards'}
              size={30}
              color={tintColor}
          />

      )
    }
  },
  AddDeck: {
    screen: AddDeckComponent,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => (
          <Icon.MaterialIcons name="add" size={30} color={tintColor}/>
      )
    }
  },
  Settings: {
    screen: SettingsComponent,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({tintColor}) => (
          <Icon.MaterialCommunityIcons name="settings-outline" size={30} color={tintColor}/>
      )
    }
  }
};

routeConfigs.Decks.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
routeConfigs.AddDeck.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
routeConfigs.Settings.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

const tabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  defaultNavigationOptions: {
    bounces: true
  },
  tabBarOptions: {
    activeTintColor: gray,
    style: {
      height: 60,
      backgroundColor: white,
      shadowColor:  white,
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      borderTopWidth: 1,
      borderTopColor: darkGray
    },
    labelStyle: {
      fontSize: 12
    },
    tabStyle: {
      marginTop: 5,
      marginBottom: 3
    },
    showIcon: true
  }
};

const Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);

const MainNavigator = createStackNavigator(
    {
      Home: {
        screen: Tabs
      },
      DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
          headerTintColor: textGray,
          headerStyle: {
            backgroundColor: white
          },
          title: 'Deck Details'
        }
      },
      AddCard: {
        screen: AddCardComponent,
        navigationOptions: {
          headerTintColor: gray,
          headerStyle: {
            backgroundColor: white
          },
          headerTitleStyle: {
            justifyContent: 'center',
            textAlign: 'center'
          },
          title: 'Add Card'
        }
      },
      Quiz: {
        screen: QuizComponent,
        navigationOptions: {
          headerTintColor: gray,
          headerStyle: {
            backgroundColor: white
          }
        }
      }
    },
    {headerLayoutPreset: 'center'}
);

export default MainNavigator;


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import QuizAndroidComponent from './QuizAndroidComponent';
import QuiziOSComponent from './QuiziOSComponent';
import {setLocalNotification, clearLocalNotification} from '../utils/NotificationUtils';

// Decide between Android and iOS component
export class QuizComponent extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    };
    static navigationOptions = ({navigation}) => {
        const title = navigation.getParam('title', '');
        return {
            title: `${title} Quiz`
        };
    };

    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
    }

    render() {
        const {navigation} = this.props;
        const title = navigation.getParam('title', '');

        if (Constants.platform.android) {
            return <QuizAndroidComponent title={title}/>;
        }
        return <QuiziOSComponent title={title}/>;
    }
}

export default QuizComponent;

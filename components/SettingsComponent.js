import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import {gray, white, red, textGray, green} from '../utils/ColorsUtil';
import TouchButtonComponent from './TouchButtonComponent';
import {resetDecks} from '../utils/DataApi.js';
import {connect} from 'react-redux';
import {reset} from '../actions/IndexAction';
import * as styles from '../utils/StyleUtil';

export class SettingsComponent extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        reset: PropTypes.func.isRequired
    };
    handleResetDecks = () => {
        const {reset, navigation} = this.props;

        reset();
        resetDecks();
        navigation.goBack();
    };

    render() {
        return (
            <View style={styles.common.container}>
                <Text style={styles.common.title}> Settings </Text>
                <View style={styles.common.block}>
                    <View style={styles.settings.blockContainer}>
                        <Text style={styles.settings.blockText}>
                            This will reset the data back to the original data set.
                        </Text>
                        <View style={{height: 20}}/>
                        <TouchButtonComponent
                            btnStyle={{backgroundColor: red, borderColor: white}}
                            onPress={this.handleResetDecks}
                        >
                            Reset
                        </TouchButtonComponent>
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(
    null,
    {reset}
)(SettingsComponent);

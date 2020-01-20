import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import TouchButtonComponent from './TouchButtonComponent';
import {blue, gray, green, white, textGray} from '../utils/ColorsUtil';
import {connect} from 'react-redux';
import {addDeck} from '../actions/IndexAction';
import {saveDeckTitleAS} from '../utils/DataApi';
import {StackActions, NavigationActions} from 'react-navigation';
import * as styles from '../utils/StyleUtil';

export class AddDeckComponent extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        addDeck: PropTypes.func.isRequired
    };
    state = {
        text: ''
    };
    handleChange = text => {
        this.setState({text});
    };
    handleSubmit = () => {
        const {addDeck, navigation} = this.props;
        const {text} = this.state;

        addDeck(text);
        saveDeckTitleAS(text);

        const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName: 'Home'}),
                NavigationActions.navigate({
                    routeName: 'DeckDetail',
                    params: {title: text}
                })
            ]
        });
        navigation.dispatch(resetAction);

        this.setState(() => ({text: ''}));
    };

    render() {
        return (
            <View style={styles.common.container}>
                <View style={{height: 60}}/>
                <View style={styles.common.block}>
                    <Text style={styles.common.title}>Please enter title of your new deck</Text>
                </View>
                <View style={[styles.common.block]}>
                    <TextInput
                        style={styles.common.input}
                        value={this.state.text}
                        onChangeText={this.handleChange}
                        placeholder="Deck Name"
                        autoFocus={true}
                        returnKeyType="done"
                        onSubmitEditing={this.handleSubmit}
                    />
                </View>
                <TouchButtonComponent
                    btnStyle={{backgroundColor: green, borderColor: '#fff'}}
                    onPress={this.handleSubmit}
                    disabled={this.state.text === ''}
                >
                    Create Deck
                </TouchButtonComponent>
            </View>
        );
    }
}


export default connect(
    null,
    {addDeck}
)(AddDeckComponent);

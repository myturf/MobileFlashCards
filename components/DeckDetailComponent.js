import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import DeckComponent from './DeckComponent';
import TouchButtonComponent from './TouchButtonComponent';
import TextButtonComponent from './TextButtonComponent';
import {purple, gray, textGray, green, white, red} from '../utils/ColorsUtil';
import {connect} from 'react-redux';
import {removeDeck} from '../actions/IndexAction';
import {removeDeckAS} from '../utils/DataApi';
import {NavigationActions} from 'react-navigation';
import * as styles from '../utils/StyleUtil';

export class DeckDetailComponent extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        removeDeck: PropTypes.func.isRequired,
        deck: PropTypes.object
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.deck !== undefined;
    }

    handleDelete = id => {
        const {removeDeck, navigation} = this.props;
        removeDeck(id);
        removeDeckAS(id);

        navigation.goBack();
    };

    render() {
        const {deck} = this.props;

        return (
            <View style={styles.deckDetail.container}>
                <DeckComponent id={deck.title}/>
                <View>
                    <TouchButtonComponent
                        btnStyle={{backgroundColor: white, borderColor: textGray}}
                        txtStyle={{color: textGray}}
                        onPress={() =>
                            this.props.navigation.navigate('AddCard', {title: deck.title})
                        }
                    >
                        Add Card
                    </TouchButtonComponent>
                    <TouchButtonComponent
                        btnStyle={{backgroundColor: textGray, borderColor: white}}
                        txtStyle={{color: white}}
                        onPress={() =>
                            this.props.navigation.navigate('Quiz', {title: deck.title})
                        }
                    >
                        Start Quiz
                    </TouchButtonComponent>
                </View>
                <TextButtonComponent
                    txtStyle={{color: red}}
                    onPress={() => this.handleDelete(deck.title)}
                >
                    Delete Deck
                </TextButtonComponent>
            </View>
        );
    }
}

const mapStateToProps = (state, {navigation}) => {
    const title = navigation.getParam('title', 'undefined');
    const deck = state[title];

    return {
        deck
    };
};

export default connect(
    mapStateToProps,
    {removeDeck}
)(DeckDetailComponent);

import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {white, textGray} from '../utils/ColorsUtil';
import {connect} from 'react-redux';
import * as styles from '../utils/StyleUtil';

const DeckComponent = props => {
    const {deck} = props;

    if (deck === undefined) {
        return <View style={styles.deck.container}/>;
    }
    return (
        <View style={styles.deck.container}>
            <View>
                <Text style={styles.deck.text}>{deck.title}</Text>
            </View>
            <View>
                <Text style={styles.deck.cardText}>{deck.questions.length} cards</Text>
            </View>
        </View>
    );
};
DeckComponent.propTypes = {
    deck: PropTypes.object
};



const mapStateToProps = (state, {id}) => {
    const deck = state[id];

    return {
        deck
    };
};

export default connect(mapStateToProps)(DeckComponent);

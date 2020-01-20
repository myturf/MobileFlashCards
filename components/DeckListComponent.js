import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Deck from './DeckComponent';
import {textGray, darkGray, gray, green} from '../utils/ColorsUtil';
import {dispatchInitialData} from '../actions/IndexAction';
import * as styles from '../utils/StyleUtil';

export class DeckListComponent extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        dispatchInitialData: PropTypes.func.isRequired,
        decks: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.dispatchInitialData();
    }

    render() {
        const {decks, navigation} = this.props;

        return (
            <ScrollView style={styles.deckDetail.container}>
                <Text style={styles.common.title24}>Flashcards</Text>
                {Object.values(decks).map(deck => {
                    return (
                        <TouchableOpacity
                            key={deck.title}
                            onPress={() =>
                                navigation.navigate('DeckDetail', {title: deck.title})
                            }
                        >
                            <Deck id={deck.title}/>
                        </TouchableOpacity>
                    );
                })}
                <View style={{marginBottom: 20}}/>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({decks: state});

export default connect(
    mapStateToProps,
    {dispatchInitialData}
)(DeckListComponent);

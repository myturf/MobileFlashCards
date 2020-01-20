import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import TouchButtonComponent from './TouchButtonComponent';
import {gray, green} from '../utils/ColorsUtil';
import {connect} from 'react-redux';
import {addCardToDeck} from '../actions/IndexAction';
import {addCardToDeckAS} from '../utils/DataApi';
import * as styles from '../utils/StyleUtil';

export class AddCardComponent extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    addCardToDeck: PropTypes.func.isRequired
  };
  state = {
    question: '',
    answer: ''
  };
  handleQuestionChange = question => {
    this.setState({question});
  };
  handleAnswerChange = answer => {
    this.setState({answer});
  };
  handleSubmit = () => {
    const {addCardToDeck, title, navigation} = this.props;
    const card = {
      question: this.state.question,
      answer: this.state.answer
    };

    addCardToDeck(title, card);
    addCardToDeckAS(title, card);

    this.setState({question: '', answer: ''});
    navigation.goBack();
  };

  render() {
    return (
        <View style={styles.common.container}>
          <View>
            <View style={styles.common.block}>
              <Text style={styles.common.title}>Add a question</Text>
            </View>
            <View style={[styles.common.block]}>
              <TextInput
                  style={styles.common.input}
                  value={this.state.question}
                  onChangeText={this.handleQuestionChange}
                  placeholder="Question"
                  autoFocus={true}
                  returnKeyType="next"
                  onSubmitEditing={() => this.answerTextInput.focus()}
                  blurOnSubmit={false}
              />
            </View>
            <View style={[styles.common.block]}>
              <TextInput
                  style={styles.common.input}
                  value={this.state.answer}
                  onChangeText={this.handleAnswerChange}
                  placeholder="Answer"
                  ref={input => {
                    this.answerTextInput = input;
                  }}
                  returnKeyType="done"
                  onSubmitEditing={this.handleSubmit}
              />
            </View>
            <TouchButtonComponent
                btnStyle={{backgroundColor: green, borderColor: '#fff'}}
                onPress={this.handleSubmit}
                disabled={this.state.question === '' || this.state.answer === ''}
            >
              Submit
            </TouchButtonComponent>
          </View>
          <View style={{height: '30%'}}/>
        </View>
    );
  }
}


const mapStateToProps = (state, {navigation}) => {
  const title = navigation.getParam('title', 'undefined');

  return {
    title
  };
};

export default connect(
    mapStateToProps,
    {addCardToDeck}
)(AddCardComponent);

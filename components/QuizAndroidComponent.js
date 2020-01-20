import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
//import { ViewPagerAndroid } from 'react-native-viewpager';
import {ViewPagerAndroid} from 'react-native';
import TextButtonComponent from './TextButtonComponent';
import TouchButtonComponent from './TouchButtonComponent';
import {blue, gray, green, red, textGray, darkGray, white} from '../utils/ColorsUtil';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {YellowBox} from "react-native"
import * as styles from '../utils/StyleUtil';

const screen = {
  QUESTION: 'question',
  ANSWER: 'answer',
  RESULT: 'result'
};
const answer = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};


YellowBox.ignoreWarnings([
  "Warning: ViewPagerAndroid has been extracted",
])

export class QuizAndroidComponent extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired
  };
  state = {
    show: screen.QUESTION,
    correct: 0,
    incorrect: 0,
    questionCount: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0)
  };
  handlePageChange = evt => {
    // console.log('evt.nativeEvent.position', evt.nativeEvent.position);
    this.setState({
      show: screen.QUESTION
    });
  };
  handleAnswer = (response, page) => {
    if (response === answer.CORRECT) {
      this.setState(prevState => ({correct: prevState.correct + 1}));
    } else {
      this.setState(prevState => ({incorrect: prevState.incorrect + 1}));
    }
    this.setState(
        prevState => ({
          answered: prevState.answered.map((val, idx) => (page === idx ? 1 : val))
        }),
        () => {
          // console.log(' Answered : ', this.state.answered);
          const {correct, incorrect, questionCount} = this.state;

          if (questionCount === correct + incorrect) {
            this.setState({show: screen.RESULT});
          } else {
            this.viewPager.setPage(page + 1);
            this.setState(prevState => ({
              show: screen.QUESTION
            }));
          }
        }
    );
  };
  handleReset = () => {
    this.setState(prevState => ({
      show: screen.QUESTION,
      correct: 0,
      incorrect: 0,
      answered: Array(prevState.questionCount).fill(0)
    }));
  };

  render() {
    const {questions} = this.props.deck;
    const {show} = this.state;

    if (questions.length === 0) {
      return (
          <View style={styles.quizAndroid.pageStyle}>
            <View style={styles.quizAndroid.block}>
              <Text style={[styles.quizAndroid.count, {textAlign: 'center'}]}>
                There are no cards in the deck,You cannot take a quiz. Please add some cards first
              </Text>
              <Text style={[styles.quizAndroid.count, {textAlign: 'center'}]}>
                Please add some cards and try again.
              </Text>
            </View>
          </View>
      );
    }

    if (this.state.show === screen.RESULT) {
      const {correct, questionCount} = this.state;
      const percent = ((correct / questionCount) * 100).toFixed(0);
      const resultStyle =
          percent >= 70 ? styles.quizAndroid.resultTextGood : styles.quizAndroid.resultTextBad;

      return (
          <View style={styles.quizAndroid.pageStyle}>
            <View style={styles.quizAndroid.block}>
              <Text style={[styles.quizAndroid.count, {textAlign: 'center'}]}>
                Quiz Complete!
              </Text>
              <Text style={resultStyle}>
                {correct} / {questionCount} correct
              </Text>
            </View>
            <View style={styles.quizAndroid.block}>
              <Text style={[styles.quizAndroid.count, {textAlign: 'center'}]}>
                Percentage correct
              </Text>
              <Text style={resultStyle}>{percent}%</Text>
            </View>
            <View>
              <TouchButtonComponent
                  btnStyle={{backgroundColor: blue, borderColor: white}}
                  onPress={this.handleReset}
              >
                Restart Quiz
              </TouchButtonComponent>
              <TouchButtonComponent
                  btnStyle={{backgroundColor: gray, borderColor: textGray}}
                  txtStyle={{color: textGray}}
                  onPress={() => {
                    this.handleReset();
                    this.props.navigation.goBack();
                  }}
              >
                Back To Deck
              </TouchButtonComponent>
              <TouchButtonComponent
                  btnStyle={{backgroundColor: gray, borderColor: textGray}}
                  txtStyle={{color: textGray}}
                  onPress={() => {
                    this.handleReset();
                    this.props.navigation.navigate('Home');
                  }}
              >
                Home
              </TouchButtonComponent>
            </View>
          </View>
      );
    }

    return (
        <ViewPagerAndroid
            style={styles.quizAndroid.container}
            scrollEnabled={true}
            onPageSelected={this.handlePageChange}
            ref={viewPager => {
              this.viewPager = viewPager;
            }}
        >
          {questions.map((question, idx) => (
              <View style={styles.quizAndroid.pageStyle} key={idx}>
                <View style={styles.quizAndroid.block}>
                  <Text style={styles.quizAndroid.count}>
                    {idx + 1} / {questions.length}
                  </Text>
                </View>
                <View style={[styles.quizAndroid.block, styles.quizAndroid.questionContainer]}>
                  <Text style={styles.quizAndroid.questionText}>
                    {show === screen.QUESTION ? 'Question' : 'Answer'}
                  </Text>
                  <View style={styles.quizAndroid.questionWrapper}>
                    <Text style={styles.quizAndroid.title}>
                      {show === screen.QUESTION
                          ? question.question
                          : question.answer}
                    </Text>
                  </View>
                </View>
                {show === screen.QUESTION ? (
                    <TextButtonComponent
                        txtStyle={{color: red}}
                        onPress={() => this.setState({show: screen.ANSWER})}
                    >
                      Show Answer
                    </TextButtonComponent>
                ) : (
                    <TextButtonComponent
                        txtStyle={{color: red}}
                        onPress={() => this.setState({show: screen.QUESTION})}
                    >
                      Show Question
                    </TextButtonComponent>
                )}
                <View>
                  <TouchButtonComponent
                      btnStyle={{backgroundColor: green, borderColor: white}}
                      onPress={() => this.handleAnswer(answer.CORRECT, idx)}
                      disabled={this.state.answered[idx] === 1}
                  >
                    Correct
                  </TouchButtonComponent>
                  <TouchButtonComponent
                      btnStyle={{backgroundColor: red, borderColor: white}}
                      onPress={() => this.handleAnswer(answer.INCORRECT, idx)}
                      disabled={this.state.answered[idx] === 1}
                  >
                    Incorrect
                  </TouchButtonComponent>
                </View>
              </View>
          ))}
        </ViewPagerAndroid>
    );
  }
}


const mapStateToProps = (state, {title}) => {
  const deck = state[title];

  return {
    deck
  };
};

export default withNavigation(connect(mapStateToProps)(QuizAndroidComponent));

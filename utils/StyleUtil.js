import {Dimensions, StyleSheet} from "react-native";

import {blue, gray, green, white, textGray, darkGray, red} from '../utils/ColorsUtil';

const SCREEN_WIDTH = Dimensions.get('window').width;


export const common = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: gray,
        justifyContent: 'space-around'
    },
    block: {
        marginBottom: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 26
    },
    title24: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 12,
        color: textGray
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        fontSize: 20,
        height: 40
    },
    greenbutton: {
        backgroundColor: green,
        borderColor: '#fff'
    },

    btnContainer: {
        alignItems: 'center',
        marginBottom: 20
    },

    redbtn: {
        width: 200,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: `center`,
        alignItems: `center`,
        borderWidth: 1,
        borderColor: '#999'
    },
    btnDisabled: {
        backgroundColor: gray,
        borderColor: darkGray
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: white
    },
    btnTextDisabled: {
        color: darkGray
    }
});

export const deck = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexBasis: 120,
        minHeight: 80,
        borderWidth: 1,
        borderColor: '#aaa',
        backgroundColor: white,
        borderRadius: 5,
        marginBottom: 10
    },
    text: {
        fontSize: 24
    },
    cardText: {
        fontSize: 18,
        color: textGray
    }
});

export const deckDetail = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'space-around',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: gray
    }
});

export const quizAndroid = StyleSheet.create({
    container: {
        flex: 1
    },
    pageStyle: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: gray,
        justifyContent: 'space-around'
    },
    block: {
        marginBottom: 20
    },
    count: {
        fontSize: 24
    },
    title: {
        fontSize: 28,
        textAlign: 'center'
    },
    questionContainer: {
        borderWidth: 1,
        borderColor: darkGray,
        backgroundColor: white,
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 16,
        paddingRight: 16,
        flexGrow: 1
    },
    questionWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    questionText: {
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontSize: 20
    },
    resultTextGood: {
        color: green,
        fontSize: 36,
        textAlign: 'center'
    },
    resultTextBad: {
        color: red,
        fontSize: 36,
        textAlign: 'center'
    }
});

export const quizIos = StyleSheet.create({
    container: {
        flex: 1
    },
    pageStyle: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: gray,
        justifyContent: 'space-around',
        width: SCREEN_WIDTH
    },
    block: {
        marginBottom: 20
    },
    count: {
        fontSize: 24
    },
    title: {
        fontSize: 32,
        textAlign: 'center'
    },
    questionContainer: {
        borderWidth: 1,
        borderColor: darkGray,
        backgroundColor: white,
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 16,
        paddingRight: 16,
        flexGrow: 1
    },
    questionWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    questionText: {
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontSize: 20
    },
    resultTextGood: {
        color: green,
        fontSize: 46,
        textAlign: 'center'
    },
    resultTextBad: {
        color: red,
        fontSize: 46,
        textAlign: 'center'
    }
});


export const settings = StyleSheet.create({
     blockContainer: {
        borderWidth: 1,
        borderColor: '#aaa',
        backgroundColor: white,
        borderRadius: 5,
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20
    },
    blockText: {
        fontSize: 18,
        color: textGray
    }
});

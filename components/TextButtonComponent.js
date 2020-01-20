import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import * as styles from '../utils/StyleUtil';

export default function TextButtonComponent({children, onPress, txtStyle = {}}) {
    return (
        <View style={styles.common.btnContainer}>
            <TouchableOpacity onPress={onPress}>
                <Text style={[styles.common.btnText, txtStyle]}>{children}</Text>
            </TouchableOpacity>
        </View>
    );
}

TextButtonComponent.propTypes = {
    children: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    txtStyle: PropTypes.object
};

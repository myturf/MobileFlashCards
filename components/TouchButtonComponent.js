import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {textGray, white, darkGray, gray} from '../utils/ColorsUtil';
import * as styles from '../utils/StyleUtil';

export default function TouchButtonComponent({
                                                 children,
                                                 onPress,
                                                 btnStyle = {},
                                                 txtStyle = {},
                                                 disabled = false
                                             }) {
    const disabledButton = disabled ? styles.common.btnDisabled : {};
    const disabledButtonText = disabled ? styles.common.btnTextDisabled : {};
    return (
        <View style={styles.common.btnContainer}>
            <TouchableOpacity
                style={[styles.common.redbtn, btnStyle, disabledButton]}
                onPress={onPress}
                disabled={disabled}
            >
                <Text
                    style={[
                        styles.common.btnText,
                        txtStyle,
                        disabledButtonText
                    ]}
                >
                    {children}
                </Text>
            </TouchableOpacity>
        </View>
    );
}


TouchButtonComponent.propTypes = {
    children: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    btnStyle: PropTypes.object,
    txtStyle: PropTypes.object,
    disabled: PropTypes.bool
};

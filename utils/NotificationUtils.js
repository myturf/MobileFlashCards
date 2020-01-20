import React from 'react';
// react native and expo are not always in sync
//import AsyncStorage from '@react-native-community/async-storage';
import {AsyncStorage} from 'react-native';

import {Notifications} from 'expo';

import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'mfc:notifications';
const CHANNEL_ID = 'DailyReminder';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

function createNotification() {
    return {
        title: 'Flashcards Reminder',
        body: "Hello, Don't forget to study for today! 👋 ",
        ios: {
            sound: true
        },
        android: {
            channelId: CHANNEL_ID,
            sticky: false,
            color: 'red'
        }
    };
}

function createChannel() {
    return {
        name: 'Daily Reminder',
        description: 'This is a daily reminder for you to study.',
        sound: true,
        priority: 'high'
    };
}


export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {

            if (data === null) {


                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
                    // if permissions are granted
                    if (status === 'granted') {
                        Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
                            .then(val => console.log('createChannelAndroidAsync return:', val))
                            .then(() => {
                                Notifications.cancelAllScheduledNotificationsAsync();

                                const nextOne = new Date();

                                nextOne.setDate(nextOne.getDate() + 1);
                                nextOne.setHours(20);
                                nextOne.setMinutes(0);

                                Notifications.scheduleLocalNotificationAsync(
                                    createNotification(),
                                    {
                                        time: nextOne,
                                        repeat: 'day'
                                    }
                                );

                                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                            })
                            .catch(err => {
                                console.log('error :', err);
                            });
                    }
                });
            }
        });
}

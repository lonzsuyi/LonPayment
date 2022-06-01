import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import dayjs from 'dayjs';

import { Text, View } from './Themed';

type CountDownProps = {
    date: Date,
    timeInterval: number,
    onRefresh?: () => void;
    containerStyle?: object,
    textStyle?: object
};

export default function ({ date, timeInterval, onRefresh, containerStyle, textStyle }: CountDownProps) {
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [second, setSecond] = useState('');

    useEffect(() => {
        let second = dayjs(date).unix();
        const interval = setInterval(() => {
            if (second > timeInterval) {
                second -= timeInterval;
                setDay(Math.floor(second / 1000 / 3600 / 24).toString());
                setHour(Math.floor((second / 1000 / 3600) % 24).toString());
                setMinute(Math.floor((second / 1000 / 60) % 60).toString());
                setSecond(Math.floor((second / 1000) % 60).toString());
            } else {
                onRefresh && onRefresh();
                clearInterval(interval);
            }
        }, timeInterval);
    }, [date])

    return (
        <View style={[styles.countDownPanel, containerStyle]}>
            <Text style={textStyle}>{day}D:</Text>
            <Text style={textStyle}>{hour}H:</Text>
            <Text style={textStyle}>{minute}M:</Text>
            <Text style={textStyle}>{second}S</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    countDownPanel: {
        flexDirection: 'row'
    }
})
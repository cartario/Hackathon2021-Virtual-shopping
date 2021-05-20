import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Trash from '../assets/img/trash.png'

const TrashButton = (props) => {
    const {onPress} = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <Image style={{width: 25, height: 28}} source={Trash}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {

    },
});

export default TrashButton

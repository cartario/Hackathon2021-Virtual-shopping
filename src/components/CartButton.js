import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Logo2 from '../assets/img/logo2.png'
import {NAVIGATOR_TYPES} from '../utils'

const BackButton = ({navigateTo}) => {
    return (
        <TouchableOpacity
        onPress={()=>navigateTo(NAVIGATOR_TYPES.cart)}
        >
            <Image style={{width: 42, height: 30}} source={Logo2}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {

    },
});

export default BackButton

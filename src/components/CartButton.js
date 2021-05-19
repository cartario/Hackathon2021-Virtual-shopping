import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Logo2 from '../assets/img/logo2.png'

const BackButton = () => {
    return (
        <TouchableOpacity>
            <Image source={Logo2}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {

    },
});

export default BackButton

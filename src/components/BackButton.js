import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Logo2 from '../assets/img/logo2.png'
import Back from '../assets/img/back.png'
import {NAVIGATOR_TYPES} from '../utils'

const BackButton = (props) => {
    const {text, navigateTo} = props;
    const {container, title} = styles;

    let target;

    if(text==='Меню'){
        target = NAVIGATOR_TYPES.login
    }

    else{
        target = NAVIGATOR_TYPES.menu
    }

    return (
        <TouchableOpacity style={container}
        onPress={()=>navigateTo(target)}
        >
            <Image style={{width: 20, height: 11}} source={Back}/>
            <Text style={title}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems: 'center'
    },
    title: {
        // fontFamily: 'Roboto',
        fontSize: 24,
        color: '#0A5CBF',
        marginLeft: 10
    }
});

export default BackButton

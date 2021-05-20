import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Trash from '../assets/img/trash.png'

import {useDispatch} from 'react-redux'
import {cleanCart} from '../redux/cartReducer'

const TrashButton = () => {
    const dispatch = useDispatch();  
    return (
        <TouchableOpacity
        onPress={()=>dispatch(cleanCart())}
        >
            <Image style={{width: 25, height: 28}} source={Trash}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {

    },
});

export default TrashButton

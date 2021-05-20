import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Trash from '../assets/img/trash.png'

import {useDispatch, useSelector} from 'react-redux'
import {removeItemById} from '../redux/cartReducer'

const TrashButton = () => {
    const {currentSelectedIdInCart} = useSelector(({test})=>test)
    const dispatch = useDispatch();  
    return (
        <TouchableOpacity
        onPress={()=>{
            dispatch(removeItemById(currentSelectedIdInCart))
        }}
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

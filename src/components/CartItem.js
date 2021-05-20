import React, { useEffect } from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Item1 from '../assets/img/item1.png'
import Checked from '../assets/img/checked.png'

const CartItem = (props) => {
    const {item, onAmountChange, onChecked, onUnchecked} = props;
    const {container, elevation} = styles;
    const [selected, setSelected] = React.useState(false)
    const [amount, setAmount] = React.useState(1)

    onSelect = () => {
        setSelected(prev => {
            if(prev) onUnchecked()
            else onChecked()
            return !prev
        })
    }

    onPlus = () => {
        setAmount(prev => prev+1)
    }

    onMinus = () => {
        setAmount(prev => prev > 1 ? prev-1:1)
    }

    useEffect(() => {
        onAmountChange(item.id, amount)
    }, [amount])

    return (
        <View style={[container, elevation]}>
            <View style={{height: '100%', paddingLeft: 20, alignItems: 'center', justifyContent: 'center'}} >
                <Image resizeMode='contain' style={{height: 60, width: 40}} source={{uri: item?.picture}}></Image>
            </View>
            <View style={{flex: 1, padding: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text numberOfLines={1} style={{fontSize: 18, fontWeight: '500', color: '#616161'}}>{item?.title}</Text>
                        <Text style={{fontSize: 9, fontWeight: '300', color: '#616161'}}>{item?.description}</Text>
                    </View>
                    <Text style={{fontSize: 20, fontWeight: '500', color: '#616161', marginRight: 20}}>{item?.price}<Text style={{fontSize: 12, fontWeight: '500', color: '#616161', opacity: 0.5}}>  руб</Text></Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <ItemAmount value={amount} onPlus={onPlus} onMinus={onMinus}/>
                    <Checkbox checked={selected} onPress={onSelect}/>
                </View>
            </View>
        </View>
    )
}

const ItemAmount = (props) => {
    const {value, onPlus, onMinus} = props;

    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={onMinus}>
                <Text style={{ color: '#B0B0B0', fontSize: 40}}>-</Text>
            </TouchableOpacity>
            <Text style={{ color: '#616161', fontSize: 20, marginLeft: 10, marginRight: 10}}>{value}</Text>
            <TouchableOpacity onPress={onPlus}>
                <Text style={{ color: '#B0B0B0', fontSize: 25}}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const Checkbox = (props) => {
    const {checked, onPress} = props;

    return (
        <TouchableOpacity onPress={onPress} style={{alignItems: 'center', justifyContent: 'center', height: 28, width: 28, borderRadius: 14, borderWidth: checked?0:2, borderColor: '#CDCDCD', backgroundColor: checked?'#0A5CBF':'white'}}>
            {checked && <Image style={{width: 11, height: 6.5}} source={Checked}></Image>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: 110,
        backgroundColor: 'white',
        borderRadius: 17,
        flexDirection: 'row',
        marginVertical: 8,
    },
    elevation: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    }
});

export default CartItem

import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Item1 from '../assets/img/item1.png'
import Checked from '../assets/img/checked.png'
import useHttp from '../hooks/useHttp'
import {plusById, minusById, cleanCart} from '../redux/cartReducer'
import {useDispatch, useSelector} from 'react-redux'

const PRODUCTS_URL =
  'https://virtual-shoping-b52fd-default-rtdb.europe-west1.firebasedatabase.app/products';

const CartItem = ({productId}) => {
    const {container, elevation} = styles;
    const [selected, setSelected] = React.useState(false);
    const [data, setData] = React.useState(null)
    const {request} = useHttp();


    onSelect = () => {
        setSelected(prev => !prev)
    }

    React.useEffect(()=>{
        const fetchProduct = async () => {
            const response = await request(`${PRODUCTS_URL}/${productId}.json`);
            setData(response);
        }

        fetchProduct()
    }, [])

    if(!data){
        return null;
    }

    const { description, price, rating, title } = data;

    return (
        <View style={[container, elevation]}>
            <View style={{height: '100%', paddingLeft: 20,alignItems: 'center', justifyContent: 'center'}} >
                <Image style={{height: 60, width: 40}} source={Item1}></Image>
            </View>
            <View style={{flex: 1, padding: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 18, fontWeight: '500', color: '#616161'}}>{title}</Text>
                        <Text style={{fontSize: 9, fontWeight: '300', color: '#616161'}}>{description}</Text>
                    </View>
                    <Text style={{fontSize: 20, fontWeight: '500', color: '#616161', marginRight: 20}}>{price} <Text style={{fontSize: 12, fontWeight: '500', color: '#616161', opacity: 0.5}}>  руб</Text></Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <ItemAmount productId={productId}/>
                    <Checkbox checked={selected} onPress={onSelect}/>
                </View>
            </View>
        </View>
    )
}

const ItemAmount = ({productId}) => {
    const dispatch = useDispatch();
    const {items} = useSelector(({cart})=>cart);

    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={()=>dispatch(minusById(productId))}>
                <Text style={{ color: '#B0B0B0', fontSize: 40}}>-</Text>
            </TouchableOpacity>
            <Text style={{ color: '#616161', fontSize: 20, marginLeft: 10, marginRight: 10}}>{items[productId].length}</Text>
            <TouchableOpacity onPress={()=>dispatch(plusById(productId))}>
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
        height: 106,
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

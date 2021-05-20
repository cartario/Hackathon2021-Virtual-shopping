import React, { useEffect } from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import useHttp from '../hooks/useHttp';

import Arrowdown from '../assets/img/arrowdown.png'

import {BackButton, TrashButton, CartItem} from '../components'
import {NAVIGATOR_TYPES} from '../utils'
import { useSelector, useDispatch } from 'react-redux';
import {setCart, addToCart, removeItemById, plusById, minusById, } from '../redux/cartReducer';

const PRODUCTS_URL = 'https://virtual-shoping-b52fd-default-rtdb.europe-west1.firebasedatabase.app/products.json';

function CartScreen(props) {
  const { navigateTo } = props;
  const {container, header, bottomButton, bottomPanel} = styles;
  const [cartItems, setCartItems] = React.useState([])
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [trash, setTrash] = React.useState(new Set())

  const { request, loading } = useHttp();
  const {items} = useSelector(({cart})=> cart);
  const dispatch = useDispatch();  

  const loadProducts = async () => {
    const data = await request(PRODUCTS_URL);
    let result = []
    let itemsID = Object.values(items).map((item) => item.id)
    for(let id in data){
        if(true || itemsID.includes(id)){
            result.push({...data[id], id, amount: 1})
        }
    }
    setCartItems(result)
  }

  const getTotalPrice = () => {
        let result = 0;
        for(let item of cartItems){
            result += item.price * item.amount
        }

        return result;
  }

  const changeItemAmount = (id, amount) => {
    setCartItems(arr => 
        arr.map((item) => {
            if(id === item.id) return {...item, amount}
            else return item
        })
    )
  }

  const addToTrash = (id) => {
    setTrash(prev => prev.add(id))
  }

  const deleteFromTrash = (id) => {
    setTrash(prev => prev.delete(id))
  }

  const removeItemsFromCart = () => {
    setCartItems(items => items.filter((item) => !trash.has(item.id)))
    setTrash(new Set())
  }

  const onPay = () => {
    dispatch(setCart({ 
      items: cartItems,
      totalPrice
    }))
    navigateTo(NAVIGATOR_TYPES.payment)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    setTotalPrice(getTotalPrice())
  }, [cartItems])

  return (
    <View style={container}>
        <View style={header}> 
            <BackButton text={'Корзина'} navigateTo={navigateTo}/>
            <TrashButton onPress={removeItemsFromCart}/>
        </View>
        <FlatList 
            data={cartItems}
            renderItem={({ item }) => (
                <CartItem item={item} onAmountChange={changeItemAmount} onChecked={() => addToTrash(item.id)} onUnchecked={() => deleteFromTrash(item.id)}/>
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{padding: 20, paddingTop: 30}}>
        </FlatList>
        <View style={bottomPanel}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <View style={{flex: 1, justifyContent: 'flex-end', padding: 15}}>
                    <Text style={{fontSize: 18, color: '#616161'}}>Адрес<Image source={Arrowdown}></Image></Text>
                    <Text style={{fontSize: 12, color: '#616161'}}>Цветной бульвар, 15</Text>
                </View>
                <View style={{height: 30, width: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)'}}/>
                <View style={{justifyContent: 'flex-end', padding: 15}}>
                    <Text style={{fontSize: 36, color: '#616161'}}>5<Text style={{fontSize: 12}}>  баллов</Text></Text>
                </View>
            </View>
            <TouchableOpacity style={bottomButton} onPress={onPay}>
                <Text style={{ color: 'white', fontSize: 18}}>{`Оплатить ${totalPrice} руб`}</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        padding: 20,
        paddingBottom: 10,
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomPanel: {
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor:'#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bottomButton: {
        width: '100%',
        height: 54,
        borderRadius: 17,
        backgroundColor: '#09A134',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CartScreen

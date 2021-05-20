import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import Arrowdown from '../assets/img/arrowdown.png'

import {BackButton, TrashButton, CartItem} from '../components'
import {NAVIGATOR_TYPES} from '../utils'
import {useSelector} from 'react-redux'


// const totalPrice = 140

function CartScreen(props) {
  const { navigateTo } = props;
  const {container, header, bottomButton, bottomPanel} = styles;

  const {items, totalPrice} = useSelector(({cart})=>cart);
  const {currentSelectedIdInCart} = useSelector(({test})=>test);
  
  
  return (
    <View style={container}>
        <View style={header}> 
            <BackButton text={'Корзина'} navigateTo={navigateTo}/>
            <TrashButton />
        </View>
        <FlatList 
            data={Object.keys(items)}
            renderItem={({ item }) => {
                
                return (<CartItem productId={item} />)
            }}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{alignItems: 'center', padding: 20, paddingTop: 30}}>
        </FlatList>
        <View style={bottomPanel}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <View style={{flex: 1, justifyContent: 'flex-end', padding: 15}}>
                    <Text style={{fontSize: 18, color: '#616161'}}>Адрес {currentSelectedIdInCart}<Image source={Arrowdown}></Image></Text>
                    <Text style={{fontSize: 12, color: '#616161'}}>Цветной бульвар, 15</Text>
                </View>
                <View style={{height: 30, width: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)'}}/>
                <View style={{justifyContent: 'flex-end', padding: 15}}>
                    <Text style={{fontSize: 36, color: '#616161'}}>5<Text style={{fontSize: 12}}>  баллов</Text></Text>
                </View>
            </View>
            <TouchableOpacity style={bottomButton} onPress={() => navigateTo(NAVIGATOR_TYPES.payment)}>
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

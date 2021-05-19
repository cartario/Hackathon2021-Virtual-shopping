import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import Avatar from '../assets/img/avatar.png'

import {BackButton, CartButton} from '../components'

function MenuScreen(props) {
  const { goBack } = props;
  const {container, header, loginButton, changeUserButton} = styles;

  const [email, setEmail] = React.useState('');

  const onNameChange = (value) => {
    setEmail(value)
  }

  // const {hello} = useSelector(({test})=>test);
  // const dispatch = useDispatch();  

  return (
    <View style={container}>
        <View style={header}> 
            <BackButton text={'Меню'}/>
            <CartButton/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems: 'center', paddingTop: 30}}>
            <View style={{width: 150, height: 150, borderRadius: 75, overflow: 'hidden'}}>
                <Image source={Avatar}></Image>
            </View>
            <Text style={{fontSize: 24, color: '#616161', marginTop: 10}}>Вылерия</Text>
            <Text style={{fontSize: 18, fontWeight: '300', color: '#616161', marginTop: 10}}>+7 (900) 852-32-85</Text>
            <TouchableOpacity style={changeUserButton}>
                <Text style={{ color: '#FF0000', fontSize: 11, padding: 30}}>Сменить пользователя</Text>
            </TouchableOpacity>
            <View style={{width: '100%', borderBottomWidth: 0.5, borderBottomColor: 'rgba(0, 0, 0, 0.15)'}}/>
            <View style={{padding: 30}}>
                <MenuButton text={'Мои покупки'}/>
                <MenuButton text={'Мои адреса'}/>
                <MenuButton text={'Служба поддержки'}/>
                <MenuButton text={'Информация'}/>
            </View>
        </ScrollView>

        <TouchableOpacity style={loginButton}>
            <Text style={{ color: 'white', fontSize: 18}}>Начать покупки</Text>
        </TouchableOpacity>
    </View>
  );
}

const MenuButton = (props) => {
    const {text} = props;
    const {menuButton} = styles;

    return (
        <TouchableOpacity style={menuButton}>
            <Text style={{ color: '#616161', fontSize: 17, padding: 10}}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        paddingBottom: 10,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    loginButton: {
        width: '100%',
        height: 54,
        borderRadius: 17,
        backgroundColor: '#0936A1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    changeUserButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuButton: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MenuScreen

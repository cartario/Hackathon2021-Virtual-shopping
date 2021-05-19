import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Logo from '../assets/img/logo.png'

function LoginScreen(props) {
  const { goBack } = props;
  const {container, textInput, loginButton} = styles;

  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const onNameChange = (value) => {
    setEmail(value)
  }

  const onPhoneChange = (value) => {
    setPhone(value)
  }

  return (
    <View style={container}>
        <CircleLogo/>
        <Text style={{color: '#0936A1', fontSize: 40, fontWeight: 'bold'}}>Виртуальный шоппинг</Text>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          style={textInput}
          placeholder="Введите имя"
          placeholderTextColor="gray"
          onChangeText={onNameChange}
        />
        <TextInput
          style={textInput}
          placeholder="Введите номер телефона"
          keyboardType='number-pad'
          placeholderTextColor="gray"

          onChangeText={onPhoneChange}
        />
      </View>
      <TouchableOpacity style={loginButton}>
        <Text style={{ color: 'white', fontSize: 18}}>Далее</Text>
      </TouchableOpacity>
    </View>
  );
}

const CircleLogo = () => (
  <View style={{height: 60, width: 60, backgroundColor: '#0936A1', borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
    <Image  source={Logo}/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
    backgroundColor: 'white',
  },
  textInput: {
    margin: 10,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor:'#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  loginButton: {
    width: '100%',
    height: 54,
    borderRadius: 17,
    backgroundColor: '#0936A1',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LoginScreen

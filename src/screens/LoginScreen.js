import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Logo from '../assets/img/logo.png'

function LoginScreen(props) {
  const { goBack } = props;
  const {textInput, loginButton} = styles;

  const [email, setEmail] = React.useState('');

  const onNameChange = (value) => {
    setEmail(value)
  }

  // const {hello} = useSelector(({test})=>test);
  // const dispatch = useDispatch();  

  return (
    <View style={styles.container}>
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

          onChangeText={onNameChange}
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
    margin: 10,
    width: '100%',
    height: 54,
    borderRadius: 17,
    backgroundColor: '#0936A1',
    alignItems: 'center',
    justifyContent: 'center'
  }
  // logo: {
  //   fontWeight: 'bold',
  //   fontSize: 50,
  //   color: '#fb5b5a',
  //   marginBottom: 40,
  // },
  // inputView: {
  //   width: '80%',
  //   backgroundColor: '#465881',
  //   borderRadius: 25,
  //   height: 50,
  //   marginBottom: 20,
  //   justifyContent: 'center',
  //   padding: 20,
  // },
  // inputText: {
  //   height: 50,
  //   color: 'white',
  // },
  // forgot: {
  //   color: 'white',
  //   fontSize: 11,
  // },
  // loginBtn: {
  //   width: '80%',
  //   backgroundColor: '#fb5b5a',
  //   borderRadius: 25,
  //   height: 50,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: 40,
  //   marginBottom: 10,
  // },
  // loginText: {
  //   color: 'white',
  // },
  // goBack: {
  //   color: '#fff',
  // },
});

export default LoginScreen

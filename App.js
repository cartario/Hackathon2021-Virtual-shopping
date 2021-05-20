import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';

import { Provider } from 'react-redux';
import store from './src/redux';
import { NAVIGATOR_TYPES } from './src/utils';

import { LoginScreen, WelcomeScreen, MenuScreen, CartScreen, PaymentScreen } from './src/screens';

import { SweetScene, VegetablesScene, DrinksScene, GroceryScene, ProductInfoScene} from './src/scenes';

function App() {
  const [navigatorType, setNavigatorType] = React.useState(NAVIGATOR_TYPES.cart);  

  const _navigateTo = (navigatorType) => {
    setNavigatorType(navigatorType);
  };

  const _getHome = () => {
    setNavigatorType(null);
  };

  const getScreen = () => {
    switch (navigatorType) {
      case NAVIGATOR_TYPES.screen1:
        return (
          <ViroARSceneNavigator
            initialScene={{ scene: VegetablesScene }}
            viroAppProps={{ navigateTo: _navigateTo}}
          />
        );
      case NAVIGATOR_TYPES.screen2:
        return (
          <ViroARSceneNavigator
            initialScene={{ scene: SweetScene }}
            viroAppProps={{ navigateTo: _navigateTo }}
          />
        );
      case NAVIGATOR_TYPES.screen3:
        return (
          <ViroARSceneNavigator
            initialScene={{ scene: DrinksScene }}
            viroAppProps={{ navigateTo: _navigateTo }}
          />
        );
      case NAVIGATOR_TYPES.screen4:
        return (
          <ViroARSceneNavigator
            initialScene={{ scene: GroceryScene }}
            viroAppProps={{ navigateTo: _navigateTo }}
          />
        );
      case NAVIGATOR_TYPES.arProductInfo:
        return (
          <ViroARSceneNavigator
            initialScene={{ scene: ProductInfoScene }}
            viroAppProps={{ navigateTo: _navigateTo}}
          />
        );
      case NAVIGATOR_TYPES.login:
        return <LoginScreen navigateTo={_navigateTo}/>;
      case NAVIGATOR_TYPES.menu:
          return <MenuScreen navigateTo={_navigateTo}/>
      case NAVIGATOR_TYPES.cart:
          return <CartScreen navigateTo={_navigateTo}/>
      case NAVIGATOR_TYPES.payment:
          return <PaymentScreen navigateTo={_navigateTo}/>
      default:
        return <WelcomeScreen navigateTo={_navigateTo} />;
    }
  }

  return(
      <Provider store={store}>
        {getScreen()}
      </Provider>
  )

}

export default App

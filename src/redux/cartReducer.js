import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
  totalCount: 0,
  totalPrice: 0,
}

const getTotalPrice = (arr) => {
  return Object.values(arr).reduce((acc, item) => {
    const totalPriceItem = item.reduce((subAcc, subItem) => subItem.price + subAcc, 0);
    return totalPriceItem + acc;
  }, 0);
};

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action)=>{     
      const { payload } = action; //в пейлоуде передаем  обьект {id: , price: }

      return {
        ...state,
        ...payload
      };
    },
    addToCart: (state, action)=>{     
      const { payload } = action; //в пейлоуде передаем  обьект {id: , price: }

      const items = {
        ...state.items,
        [payload.id]: !state.items[payload.id] ? [payload] : [...state.items[payload.id], payload],
      };

      const totalCount = Object.values(items).reduce((acc, item) => item.length + acc, 0);
      const totalPrice = getTotalPrice(items);

      return {
        ...state,
        items,
        totalCount,
        totalPrice,
      };
    },

    cleanCart: (state) => {
      return { ...state, ...initialState };
    },

    removeItemById: (state, action) => {
      const {payload} = action; //в пейлоуде передаем  id

      const newItems = { ...state.items };
      delete newItems[payload];

      return {
        ...state,
        items: newItems,
        totalPrice: getTotalPrice(newItems),
        totalCount: Object.values(newItems).reduce((acc, item) => item.length + acc, 0),
      };
    },

    plusById: (state, action) => {
      const {payload} = action; //в пейлоуде передаем  id

      return {
        ...state,
        items: { ...state.items, [payload]: [...state.items[payload], state.items[payload][0]] },
        totalPrice: state.totalPrice + state.items[payload][0].price,
        totalCount: state.totalCount + 1,
      };
    },

    minusById: (state, action) => {
      const {payload} = action; //в пейлоуде передаем  id

      return {
        ...state,
        items: {
          ...state.items,
          [payload]:
            state.items[payload].length > 1
              ? [...state.items[payload]].slice(1)
              : state.items[payload],
        },
        totalPrice:
          state.items[payload].length > 1
            ? state.totalPrice - state.items[payload][0].price
            : state.totalPrice,
        totalCount: state.items[payload].length > 1 ? state.totalCount - 1 : state.totalCount,
      };
    }
  }  
});

export const {setCart, addToCart, cleanCart, removeItemById, plusById, minusById} = slice.actions;

export default slice.reducer;
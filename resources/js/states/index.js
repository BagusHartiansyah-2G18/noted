import { configureStore } from '@reduxjs/toolkit';
import htmlReducer from './sf/html/reducer';

const store = configureStore({
    reducer: {
      _html:htmlReducer,
    },
});

export default store;

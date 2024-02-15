import { configureStore } from '@reduxjs/toolkit';
import htmlReducer from './sf/html/reducer';
import notedReducer from './noted/reducer';

const store = configureStore({
    reducer: {
      _html:htmlReducer,
      dnote:notedReducer,
    },
});

export default store;

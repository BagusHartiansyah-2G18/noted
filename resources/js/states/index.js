import { configureStore } from '@reduxjs/toolkit';
import htmlReducer from './sf/html/reducer';
import notedReducer from './noted/reducer';
import fentriReducer from './formEntri/reducer';
import { dfEntri } from '../utils/dataFormEntri';
import publikasiReducer from './publikasi/reducer';

// reducer  0
const store = configureStore({
    reducer: {
      _html:htmlReducer,
      dnote:notedReducer,
      dfEntri0:fentriReducer,
      pubN:publikasiReducer,
    },
});

export default store;

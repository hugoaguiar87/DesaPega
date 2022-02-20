import { configureStore } from '@reduxjs/toolkit';

import statesReducer from './reducers/statesReducer';

export const store = configureStore({
    reducer: {
        statesList: statesReducer
    }
});


import { configureStore } from '@reduxjs/toolkit';
import { PERSIST, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { authReducer } from './slices/authSlice';
import { usersReducer } from './slices/usersSlice';

const persistConfig = {
  key: 'ReactApp',
  version: 1,
  storage,
};

const authPersistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    users: usersReducer,
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

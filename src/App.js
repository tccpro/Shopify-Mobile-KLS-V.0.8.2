import React, { useState, useEffect, createRef } from 'react';
import MainNavigation from './navigation/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './stores';

const App = () => {
   return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigation />
        </PersistGate>
      </Provider>
  )
}

export default App
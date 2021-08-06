import React from "react";
import { Provider } from 'react-redux';
// import { connect } from 'react-redux';

import { store } from './components/store/store';

import ConnectedApp from './components/ConnectedApp';
import './App.scss';

// const WrappedApp = connect(mapStateToProps)(ConnectedApp);

// function mapStateToProps(state) {
//   return {
//     countries: state.countries,
//     active: state.active
//   };
// }

function App() {
  return (
    <div>
      <Provider store={store}>
        {/* <WrappedApp /> */}
        <ConnectedApp />
      </Provider>
    </div>
  );
}

export default App;

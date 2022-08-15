 import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes} from 'react-router-dom' 
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login.tsx';
import Navbar from './components/Navbar/Navbar';
import { withRouter } from './components/Profile/withRouter';
import UsersContainer from './components/Users/UsersContainer.tsx';
import store from './redux/redux-store.ts';
import {initializeApp } from './redux/app-reducer.ts';
import { Suspense } from 'react';


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {

  catchAllUnhandledErrors = (promiseRejectionEvent) =>{
    alert(promiseRejectionEvent);
    console.error(promiseRejectionEvent);
  }


  componentDidMount() {
    this.props.initializeApp();

    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  render() {

    if(this.props.initialized){
      <Preloader />
      }

    return (
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <div className='app-wrapper-content'>
          <Suspense fallback={<p> Loading...</p>}>
            <Routes>
              <Route path='/dialogs/*' element={ <DialogsContainer />}/>
              <Route path="/" element={<Navigate to="/profile/23861" />} />
              <Route  path='/profile/:userId' element={ <ProfileContainer  /> }/>
              <Route  path='/users' element={ <UsersContainer pageTitle={'Samurai'} /> }/>
              <Route  path='/login' element={ <Login  /> }/>
              <Route  path='*' element={ <div>404 NOT FOUND</div> }/>
            </Routes>
            </Suspense>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
   initialized: state.app.initialized,
})


let AppContainer = compose(
  connect(mapStateToProps, {initializeApp}),
  withRouter,  )(App);

  const SamuraiJSApp = (props) =>{
    
    return <Provider store={store}>
        
      <HashRouter>
        <AppContainer />
      </HashRouter>
    </Provider>
  }

  export default SamuraiJSApp;
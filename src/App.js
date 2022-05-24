 import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom' 
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { withRouter } from './components/Profile/withRouter';
import UsersContainer from './components/Users/UsersContainer';
import store from './redux/redux-store';
import {initializeApp } from './redux/app-reducer';
import { Suspense } from 'react';


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {

  componentDidMount() {
    this.props.initializeApp();
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
              <Route  path='/profile/*' element={ <ProfileContainer  /> }/>
              <Route  path='/users' element={ <UsersContainer  /> }/>
              <Route  path='/login' element={ <Login  /> }/>
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
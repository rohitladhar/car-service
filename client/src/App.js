import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom'
import Home from './components/home'
import Header from './components/header'
import SignIn from './components/signin'
import Register from './components/register'
import {AuthProvider} from './context/AuthContext'
import CreateService from './components/booking/createService'
import Error from './components/error'
import StatusView from './components/booking/statusview'
import CreateBooking from './components/booking/createBooking'
import GetStatus from './components/booking/getStatus'
import EmailProvider from './components/booking/email'
import ForgetPassword from './components/booking/forgetpassword'

function App(props) {


  return (
    <>
    <AuthProvider>
    <Router>
      <Header/>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path='/signin' component={SignIn}/>
      <Route exact path ='/register' component = {Register}/>
      <Route exact path='/bookservice' component= {CreateService}/>
      <Route exact path='/statusview' component= {StatusView}/>
      <Route exact path ='/createbooking' component={ CreateBooking}/>
      <Route exact path='/getstatus' component={GetStatus}/>
      <Route exact path='/email' component={EmailProvider}/>
      <Route exact path='/forgetpassword/:token'  render={props => <ForgetPassword {...props} />} />
      <Route component={Error} />
      </Switch>
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;

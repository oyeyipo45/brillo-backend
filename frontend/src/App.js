import React, { Suspense } from 'react';
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



const Header = React.lazy(() => import('./components/Header'));
const Footer = React.lazy(() => import('./components/Footer'));
const RegisterScreen = React.lazy(() => import('./screens/RegisterScreen'));
const LoginScreen = React.lazy(() => import('./screens/LoginScreen'));
const ProfileScreen = React.lazy(() => import('./screens/ProfileScreen'));
const NotFound = React.lazy(() => import('./screens/NotFound'));
const ConfirmationScreen = React.lazy(() => import('./screens/ConfirmationScreen'));
const ForgetPasswordScreen = React.lazy(() => import('./screens/ForgetPasswordScreen'));



const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div className='main-body'>
          <Header />
          <main className='main-section'>
            <Switch>
              <Route path='/profile/:id' component={ProfileScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/' exact component={HomeScreen} />
              <Route path='/confirmation' exact component={ConfirmationScreen} />
              <Route path='/forgot-password' exact component={ForgetPasswordScreen} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
};

export default App;

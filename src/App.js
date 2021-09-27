import './App.css';
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setUser } from "./actions/actions";
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import FormUsers from './components/FormUsers/FormUsers.jsx';
import FormPromoter from './components/FormPromoter/FormPromoter.jsx';
import EventDetailsUsario from './components/Details/EventDetailsUsario/EventDetailsUsario';
import EventsDetailsPromoter from './components/EventDetailsPromotor/EventsDetailsPromoter'
import FormEvent from './components/FormEvent/FormEvent';
import Comments from './components/Comments/CreateComment/CreateComment.jsx'
import Registration from './components/Registration/Registration';
import UserPorfile from './components/UserPorfile/UserPorfile';
import { Redirect } from 'react-router-dom';
import Modal from './components/Modal/Modal';
import LoginContainer from './components/LoginContainer/LoginContainer';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import PromotorePorfile from './components/PromotorePorfile/PromotoreProfile';
import PromoterProfileUser from './components/PromotorePorfile/PerfilPromoterUsuario'


function App({ setUser, user, modal }) {
  console.log(user)

  // Usuario en local storage
  let loginUser = JSON.parse(localStorage.getItem('User'))
  console.log(loginUser)
  useEffect(() => {
    if (loginUser) {
      console.log('ENTREEE EL IF', user)
      setUser(loginUser)
    } else
    console.log('ENTREEE EL ELSE')
      setUser({})
  }, [setUser]) 

  return (
    <>

      <NavBar />
       
       



      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/login'>
        <LoginContainer />
      </Route>

      <Route exact path='/registration'>
        <Registration />
      </Route>

      <Route path='/formUser' >
        <FormUsers />
      </Route>

      <Route path='/formPromoter' >
        <FormPromoter />
      </Route>

      <Route path='/eventDetailsUsuario/:id' >
        <EventDetailsUsario />
      </Route>

      <Route path='/FormEvent' >
        {user.msg? user.type === 'user'?<Home />:<FormEvent promoterId={user.id}/>: <Redirect to='/login'/>}
      </Route>

      <Route path='/EventsDetailsPromoter/:id' >
        <EventsDetailsPromoter />
      </Route>

      <Route path='/perfil' >
        {user.msg? user.type === 'user' ?<UserPorfile/> : <PromotorePorfile userData={user}/> : <Redirect to='/login'/>}
      </Route>


      <Route path='/nuevoComentario'>
        <Comments />
      </Route>

      {/* <Route path='/perfilPromotor'>
        <PromotorePorfile />
      </Route> */}

      <Route path='/shoppingCart'>
        <ShoppingCart />
      </Route>
      
      <Route path='/PromoterPorfileUser'>
        <PromoterProfileUser  userData={user} />
      </Route>


      <Footer />
      {modal.render ? <Modal message={modal.message} type={modal.type} /> : null}
    </>
  );
}


function mapStateToProps(state) {
  return {
    user: state.userState,
    modal: state.modal
  };
}
export default connect(mapStateToProps, { setUser })(App);
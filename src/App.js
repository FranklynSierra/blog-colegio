
import './App.css';
import { useState,useEffect } from 'react';
import Home from './pages/Home';
import {Navigate, Routes,Route, useNavigate} from 'react-router-dom';
import Detail from './pages/Detail';
import AddEditBlog from './pages/AddEditBlog';

import NotFound from './pages/NotFound';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./style.scss"
import "./media-query.css"
import Header from './components/Header.jsx';
import Auth from './pages/Auth';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
function App() {
  const [active, setActive] = useState('home');
  const [user,setUser]=useState(null)
  const navigate=useNavigate()
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser)
      }else{
        setUser(null)
      }
    })
  },[])
  const handleLogout=()=>{
    signOut(auth).then(()=>{
      setUser(null)
      setActive('login')
      navigate('/auth')
    })
  }
  return (
    <div className="App">
   <Header handleLogout={handleLogout} user={user} setActive={setActive} active={active}></Header>
   <ToastContainer  position='top-center'/>
     <Routes>
        <Route path='/' element={<Home setActive={setActive}user={user}></Home>}></Route>
        <Route path='/detail/:id' element={<Detail setActive={setActive}></Detail>}></Route>
        <Route path='/create' element={user?.uid ? <AddEditBlog  user={user}/>:<Navigate to='/'/>}></Route>
       <Route path='/update/:id'element={user?.uid ? (<AddEditBlog  user={user}setActive={setActive}/>):(<Navigate to='/'/>)}></Route>
      
        <Route path='/auth' element={<Auth setActive={setActive}setUser={setUser}></Auth>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
        
        </Routes>
   
    </div>
  );
}

export default App;

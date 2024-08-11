import React from 'react'
import { useEffect} from 'react'
import { useNavigate } from 'react-router';
import Navbar from './Navbar';

const Home = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const loginKey=localStorage.getItem('loginKey');
        if(!loginKey){
          navigate('/login');
        }
      },[])
  return (
    <div className='box-container'>
      <Navbar/>
      Home
    </div>
  )
}

export default Home

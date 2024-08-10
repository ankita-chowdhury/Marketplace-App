import React from 'react'
import { useEffect} from 'react'
import { useNavigate } from 'react-router';

const Home = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const loginKey=localStorage.getItem('loginKey');
        if(!loginKey){
          navigate('/login');
        }
      },[])
  return (
    <div>
      Home
    </div>
  )
}

export default Home

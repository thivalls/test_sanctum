import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

const Login = () => {
  const history = useHistory();

  const [user, setUser] = useState(null);

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value })
  }
  
  // useEffect(() => {
  //   if(localStorage.getItem('laravel_session_app')) {
  //     history.push('/dashboard');
  //     return;
  //   }
  // }, []);

  // useEffect(() => {
  //   const token = '7|hBYzbzasbyM5HWBqt0Q8Liv43Vy8jElTqBF3O9kVxQ5FY05vC85C72iPds7mWXOLjHa3cs28T1pT4NQV';
  //   const config = {
  //       headers: { Authorization: `Bearer ${token}` }
  //   };
  //   const requestTest = api.get('/api/user', config).then(response => {
  //     console.log(response.data);
  //   });

  //   console.log(requestTest.headers)
  // }, []);

  const handleLogin = e => {
    e.preventDefault();

    api.get('sanctum/csrf-cookie').then(response => {
      api.post('login', data).then(res => {
        //localStorage.setItem('laravel_session_app', 'logado');
        // history.push('/dashboard');
      });
    });
  }

  const getUser = () => {
    api.get('api/user').then((response) => {
      setUser(response.data);
    });
  }

  useEffect(() => {
    api.get('api/user').then((response) => {
      setUser(response.data);
    })
  }, []);

  return (
    <>
      <form onSubmit={handleLogin}>
        <input type="text" name='email' onChange={handleInputChange}/>
        <input type="text" name='password' onChange={handleInputChange}/>
        <button type="submit">Login</button>
      </form>

      <div>{user}</div>

      <button onClick={getUser}>Buscar usuário</button>
    </>

  )
}
  

export default Login;
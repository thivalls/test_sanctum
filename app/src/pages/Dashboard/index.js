import React, { useEffect, useState } from 'react';

import api from '../../services/api';

const Login = () => {

  const [user, setUser] = useState([]);

  useEffect(() => {
    api.get('api/user').then((response) => {
      setUser(response.data);
    })
  }, []);

  return (
    <>
      <h1>Bem vindo ao dashboard!!!</h1>
      <p>Usuário logado: {user.name}</p>
    </>
  )
}
  

export default Login;
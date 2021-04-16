import React, { useContext } from "react";
import UserContext from '../../contexts/UserContext'


function Cadastro() {
  const { userInfo } = useContext(UserContext);
  const view = userInfo.type === 'ong'? (<OngForm/>) : (<UsuarioForm/>) 

  return (view);
}

function OngForm() {
  return(<h1>ONG FORM</h1>)
}

function UsuarioForm() {
  return(<h1>USUARIO FORM</h1>)  
}

export default Cadastro;
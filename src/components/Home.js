import React, { useContext } from "react";
import "../css/Home.css";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import {Card, Button, Container} from 'react-bootstrap'

function Home() {
  const { setOng, setUsuario } = useContext(UserContext);

  return (
    <div className="home">
        Home
    </div>
  );
}

export default Home;

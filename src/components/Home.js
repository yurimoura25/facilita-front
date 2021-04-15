import React, { useContext } from 'react';
import '../css/Home.css'
import {Link} from 'react-router-dom'
import UserContext from '../contexts/UserContext'

function Home() {
    const { setOng, setUsuario } = useContext(UserContext);

    return(
        <div className="home">
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">Usuário</h5>
                <p className="card-text">
                    Cadastra-se e ajude a facilitar a vida de pessoas.
                </p>
                <div className="buttons">
                <Link to="/entrar" >
                    <button className="btn btn-primary" onClick= {() => setUsuario()}>
                    Entrar
                    </button>
                </Link>
                <Link to="/cadastrar" >
                    <button className="btn btn-primary" onClick={() => setUsuario()}>
                    Cadastrar
                    </button>
                </Link>
                </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">ONG</h5>
                <p className="card-text">
                    Cadastra-se e ajude a facilitar a vida de pessoas.
                </p>
                <div className="buttons">
                <Link to="/entrar" >
                    <button className="btn btn-primary"onClick={() => setOng()} >
                    Entrar
                    </button>
                </Link>
                <Link to="/cadastrar" >
                    <button className="btn btn-primary" onClick={() => setOng()} >
                    Cadastrar
                    </button>
                </Link>
                </div>
                </div>
            </div>
        </div>)
}

export default Home;
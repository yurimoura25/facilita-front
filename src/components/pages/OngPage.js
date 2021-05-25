import { useEffect } from "react";
import ongFilter from "../../redux/filters/OngFilter"; 

import { useParams } from "react-router-dom"

import {connect} from "react-redux";

import  {buscarOng} from "../../redux/actions/OngAction";

import {Container, Row, Col} from "react-bootstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

function OngPage(props) {
    const { id } = useParams();
    useEffect(() => {
        if(!props.ongItem) {
            props.buscarOng(id)
        }
    }, [])

    return(
    <Container>
        <Row>
            <Col>Foto de perfil: {id} </Col>
            <Col>Nome: </Col>
        </Row>
        <Row>Endereco</Row>
    </Container>)
}

export default connect(ongFilter, {buscarOng}) (OngPage); 
import React from "react";
import "../css/Home.css";
import Carousel from 'react-bootstrap/Carousel'

function Home() {

  return (
    <div className="home">
      
        Home
        <Carousel> 
          <Carousel.Item>
          <img className="d-block w=100%"src='../img/ban01.png' alt="Primeira imagem"/>
          <Carousel.Caption>
            <h3>Primeira imagem</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
          <img className="d-block w=100%" src='../../src/img/ban02.png ' alt="Segunda imagem"/>
          <Carousel.Caption>
           <h3>Segundo imagem</h3>
           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        
    </div>
  );
}

export default Home;

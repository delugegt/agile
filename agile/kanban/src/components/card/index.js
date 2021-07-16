import React from 'react';
//aki
import { useDrag  } from 'react-dnd';

import Header from '../header';

import { Container, Label } from './styles';


//vi na documentação 
export default function Card({ data }) {
  const [{ isDragging }, dragRef]= useDrag(() => ({
    type: "CARD",
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));


  //após configurar o dragref vai dar erro...é normal pois na linha 11 precisa de um tipo 
  return (
    <Container ref={dragRef} isDragging={isDragging}> 
      <header>
        {data.labels.map( label => <Label key={label} color={label} />)}
        <Label color="#7159c1" />
      </header>
      <p>{data.content}</p>
      <img src="" alt="Seu avatar" /> 
    </Container>
  )
}
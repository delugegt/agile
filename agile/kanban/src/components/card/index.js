import React, { useRef } from 'react';
//aki
//aqui 2 import useref 
import { useDrag, useDrop  } from 'react-dnd';

import { Container, Label } from './styles';

//vi na documentação 
//usedrag
//index
export default function Card({ data, index }) {
  const ref = useRef();

  const [{ isDragging }, dragRef]= useDrag(() => ({
    type: 'CARD', index, 
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

    //configurar o "drop"
    //usedrop
    //41:00
    //quero somente a referencia, por isso a primeira propr é vazia 
    //accept: quais itens eu aceito o dropref?
    //hover: dispara qual o card que está por baixo (item / monitor : infos) 
    const [, dropRef] = useDrop({
      accept: 'CARD',
      hover(type, monitor) {
        console.log(type.index);
      //quer pegar o id do card? se liga
        console.log(data.index);
      }
    })
    //juntando a referencia do dragref e drop ref em ref
    dragRef(dropRef(ref));

  //após configurar o dragref vai dar erro...é normal pois na linha 11 precisa de um tipo 
  //pós linha 35, usar só o ref na ref{}
  return (
    <Container ref={ref} isDragging={isDragging}> 
      <header>
        {data.labels.map( label => <Label key={label} color={label} />)}
        <Label color="#7159c1" />
      </header>
      <p>{data.content}</p>
      <img src="" alt="Seu avatar" /> 
    </Container>
  );
}
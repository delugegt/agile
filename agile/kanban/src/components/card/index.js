import React, { useRef, useContext } from 'react';
//aki
//hook useContext
import BoardContext from '../board/context';

//aqui 2 import useref 
import { useDrag, useDrop  } from 'react-dnd';
import { Container, Label } from './styles';

//vi na documentação 
//usedrag
//index
export default function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);
  
  const [{ isDragging }, dragRef]= useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

    //configurar o "drop"
    //usedrop
    //41:00
    //quero somente a referencia, por isso a primeira propr é vazia 
    //accept: quais itens eu aceito o dropref?
    //hover: dispara qual o card que está por baixo (item / monitor : infos) 

    const [, dropRef]= useDrop({
      accept: 'CARD',
      hover(item, monitor) {
        //console.log(item.index, index);
        const draggedIndex = item.index;
        const targetIndex = index;

        const draggedListIndex = item.listIndex;
        const targetListIndex = listIndex;

        if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
          return;

        }
        //console.log('ok');
        const targetSize = ref.current.getBoundingClientRect();
        //console.log(targetSize);
        const targetCenter = (targetSize.bottom - targetSize.top) / 2;

        //console.log(targetCenter);
        const draggedOffset = monitor.getClientOffset();

        //console.log(draggedOffset);

        const draggedTop = draggedOffset.y - targetSize.top;

        //console.log(draggedTop, targetCenter); 'comparar'

        if (draggedIndex < targetIndex && draggedTop < targetCenter) {
          return;
        }
        //console.log('teste');
        if (draggedIndex > targetIndex && draggedTop > targetCenter) {
          return;
        }
        //console.log('teste');
      //quer pegar o id do card? se liga
      //ainda undefined
      //consegui atualizar a versão do DND com ''npm i react-dnd@11.1.3
        move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
      
        item.index = targetIndex;
        item.listIndex = targetListIndex;
        //serve para parar o bug, definir o target
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
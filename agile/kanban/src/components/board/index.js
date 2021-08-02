import React, { useState } from 'react';
import { loadLists  } from '../../services/api';
import BoardContext from './context';
import List from '../list';

import { Container } from './styles';
import produce from 'immer';
//54:00
const data = loadLists();

export default function Board() {

  const [lists, setLists] = useState(data);

  function move (fromList, toList, from, to) {
    //console.log(fromList);
    //console.log(from, to);
    //listas do react são imutaveis, então use uma biblioteca separada, chamada immer
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }))
  }
//crie o contexto
//criando prop 
  return (
  <BoardContext.Provider value={{ lists, move }}>
    <Container >
      {lists.map((list, index) =>
         <List 
         key={list.title} 
         index={index} 
         data={list} 
         />)}
    </Container>
  </BoardContext.Provider>
  )
}
//ESTÁ TROCANDOOOOOOO

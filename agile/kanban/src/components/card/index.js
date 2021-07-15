import React from 'react';

import Header from '../header';

import { Container, Label } from './styles';

export default function Card() {
  return (
    <Container>
      <header>
        <Label color="#7159c1" />
      </header>
      <p>Varrer a casa</p>
      <img src="" alt="Seu avatar" /> 
    </Container>
  )
}
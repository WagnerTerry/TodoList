import React from 'react'

import './styles'
import { Container, Title, SafeArea, Input } from './styles'

export const Task = () => {

  return (
    <SafeArea>
      <Container>
        <Title>Lista de Tarefas</Title>
        <Input placeholder='Nova Tarefa' placeholderTextColor={'#555'} />
      </Container>
    </SafeArea>
  )

}

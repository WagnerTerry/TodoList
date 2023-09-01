import React, { useState, useEffect } from 'react'

import {
  Container,
  Title,
  SafeArea,
  Input,
  AddButton,
  Span,
  ContainerDiv,
  AddServerTask
}
  from './styles'
import { TaskList } from '../../components/TaskList';
import { useTaskList } from '../../context/TaskContext';

import './styles'
import { Alert } from 'react-native';
import { fetchTask } from '../../services/TaskService';

export const Task = () => {
  const [newTask, setNewTasks] = useState('')
  const [serverTask, setServerTask] = useState('')

  const { addTask } = useTaskList()

  const handleAddNewTask = () => {
    if (newTask.trim() === '') {
      Alert.alert("Tarefa em branco", "Por favor, adicione uma tarefa")
      return;
    }
    const data = {
      id: String(new Date().getTime()),
      title: newTask,
      completed: false
    }

    addTask(data)
    setNewTasks('')
  }

  const handleAddServerTask = async () => {
    const serverTask = await fetchTask()
    const data = {
      id: String(new Date().getTime()),
      title: serverTask[0].title,
      completed: serverTask[0].completed
    }
    console.log("aaa", data)

    addTask(data)
  }

  return (
    <SafeArea>
      <Container>
        <Title>Lista de Tarefas</Title>
        <Input
          placeholder='Nova Tarefa'
          placeholderTextColor={'#555555'}
          onChangeText={setNewTasks}
          value={newTask}
        />
        <ContainerDiv>
          <AddButton
            onPress={handleAddNewTask}
            activeOpacity={0.7}
          >
            <Span>Adicionar</Span>
          </AddButton>
          <AddServerTask
            onPress={handleAddServerTask}
            activeOpacity={0.7}
          >
            <Span>Tarefa server</Span>
          </AddServerTask>
        </ContainerDiv>
        <TaskList />
      </Container>
    </SafeArea>
  )

}

import React, { useState, useEffect } from 'react'

import { Container, Title, SafeArea, Input, AddButton, Span } from './styles'
import { TaskList } from '../../components/TaskList';
import { useTaskList } from '../../context/TaskContext';

import './styles'
import { Alert } from 'react-native';

export const Task = () => {
  const [newTask, setNewTasks] = useState('')
  const { tasks, addTask } = useTaskList()
  const [task, setTask] = useState(tasks)


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

  return (
    <SafeArea>
      <Container>
        <Title>Lista de Tarefas</Title>
        <Input
          placeholder='Nova Tarefa'
          placeholderTextColor={'#555'}
          onChangeText={setNewTasks}
          value={newTask}
        />
        <AddButton
          onPress={handleAddNewTask}
          activeOpacity={0.7}
        >
          <Span>Adicionar</Span>
        </AddButton>
        <TaskList />
      </Container>
    </SafeArea>
  )

}

import React, { useState } from 'react'

import {
  Container,
  Title,
  SafeArea,
  Input,
  AddButton,
  Span,
  ContainerDiv,
  AddServerTask,
  Header
}
  from './styles'
import { TaskList } from '../../components/TaskList';
import { useTaskList } from '../../context/TaskContext';
import { Alert } from 'react-native';
import { fetchTask } from '../../services/TaskService';
import { ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export const Task = () => {
  const [newTask, setNewTasks] = useState('')
  const [loading, setLoading] = useState(false);
  const [errorAPI] = useState(null)

  const { addTask, removeAllTasks } = useTaskList()

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
    handleShowToast("Tarefa adicionada")
  }

  const handleAddServerTask = async () => {
    try {
      setLoading(true)
      const serverTask = await fetchTask()
      const data = {
        id: String(new Date().getTime()),
        title: serverTask[0].title,
        completed: serverTask[0].completed
      }
      addTask(data)
      setLoading(false);
      handleShowToast("Tarefa do servidor adicionada")

    } catch (error) {
      console.log("error fetching task data", error)
      setLoading(false);
      handleShowToast("Erro ao buscar tarefas, verifique sua internet, ou tente novamente mais tarde")

    }
  }

  const handleShowToast = (message: string) => {
    // Exibe uma mensagem de sucesso temporária
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG, // Duração da mensagem (LONG ou SHORT)
      ToastAndroid.BOTTOM, // Posição (TOP, BOTTOM, CENTER)
      25, // Deslocamento vertical em pixels
      50 // Deslocamento horizontal em pixels
    );
  }

  const clearTodoList = () => {
    Alert.alert('Apagar lista', "Tem certeza de que deseja apagar a lista de tarefas?", [
      {
        text: "Cancelar",
        onPress: () => { }
      }, {
        text: 'Excluir',
        onPress: () => removeAllTasks()
      }
    ])
  }

  return (
    <SafeArea>
      <Container>
        <Header>
          <Title>Lista de Tarefas</Title>
          <Icon
            name='delete'
            size={30}
            color="#eb1c1c"
            onPress={clearTodoList}
          />
        </Header>
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
            disabled={loading}
          >
            <Span>Adicionar</Span>
          </AddButton>
          <AddServerTask
            onPress={handleAddServerTask}
            activeOpacity={0.7}
            disabled={loading}

          >
            <Span>Tarefa server</Span>
          </AddServerTask>
        </ContainerDiv>
        {loading ? (
          <Span>Carregando Tarefa...</Span>
        ) : (
          <>
            {errorAPI ? (
              <Span>Erro ao buscar dados. Por favor, tente novamente mais tarde.</Span>
            ) : (
              <TaskList />
            )}
          </>
        )}
      </Container>
    </SafeArea>
  )
}

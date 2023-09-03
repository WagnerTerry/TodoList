import React, { useState, useEffect } from 'react'
import { FlatList, Alert } from 'react-native';
import { ITask, useTaskList } from '../../context/TaskContext';
import { TaskButton, TaskComplete, TaskTitle } from '../../views/Task/styles';

import AsyncStorage from "@react-native-async-storage/async-storage";

export const TaskList = () => {
  const { tasks, removeTask, completeTask } = useTaskList()

  const [data, setData] = useState<ITask[]>([])

  const tasksData = '@MyTasks'

  useEffect(() => {
    async function loadTasks() {
      const taskList = await AsyncStorage.getItem(tasksData)

      if (taskList) {
        setData(JSON.parse(taskList))
      }
    }
    loadTasks()
  }, [tasks])

  const handleRemoveTask = (id: string) => {
    Alert.alert('Tem certeza?', 'Deseja realmente excluir a tarefa', [
      {
        text: "Cancelar",
        onPress: () => { }
      },
      {
        text: "Excluir",
        onPress: () => removeTask(id)
      }
    ])
  }

  return (
    <FlatList
      data={data as unknown as ITask[]}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TaskButton
          onPress={() => completeTask(item.id)}
          onLongPress={() => handleRemoveTask(item.id)}
          activeOpacity={0.7}
          style={item.completed ? { backgroundColor: '#079b07' } : { backgroundColor: '#ff9100' }}
        >
          {
            item.completed ? (
              <TaskTitle numberOfLines={1} ellipsizeMode='tail'>
                {item.title}
              </TaskTitle>
            ) : (
              <TaskComplete numberOfLines={1} ellipsizeMode='tail'>
                {item.title}
              </TaskComplete>
            )
          }

        </TaskButton >
      )}
    />
  )
}

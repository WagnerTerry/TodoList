import React from 'react'
import { FlatList, Alert } from 'react-native';
import { ITask, useTaskList } from '../../context/TaskContext';
import { TaskButton, TaskTitle } from '../../views/Task/styles';

export const TaskList = () => {
  const { tasks, removeTask } = useTaskList()

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
      data={tasks as unknown as ITask[]}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TaskButton
          onPress={() => handleRemoveTask(item.id)}
          activeOpacity={0.7}
        >
          <TaskTitle>
            {item.title}
          </TaskTitle>
        </TaskButton>
      )}
    />
  )
}

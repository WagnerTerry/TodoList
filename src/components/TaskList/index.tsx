import React, { useState } from 'react'
import { FlatList, Alert } from 'react-native';
import { ITask, useTaskList } from '../../context/TaskContext';
import { TaskButton, TaskComplete, TaskTitle } from '../../views/Task/styles';

export const TaskList = () => {
  //const { tasks, removeTask } = useTaskList()

  const [tasks, setTasks] = useState([
    { id: "1", title: 'Tarefa 1', completed: false },
    // { id: "2", title: 'Tarefa 2', completed: false },

  ]);

  const handleRemoveTask = (id: string) => {
    Alert.alert('Tem certeza?', 'Deseja realmente excluir a tarefa', [
      {
        text: "Cancelar",
        onPress: () => { }
      }
      // {
      //   text: "Excluir",
      //   onPress: () => removeTask(id)
      // }
    ])
  }

  const handleLongPress = () => {
    console.log("yes")
  }

  const completeTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    console.log("task", updatedTasks)
    setTasks(updatedTasks);
  };

  return (
    <FlatList
      data={tasks as unknown as ITask[]}
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
              <TaskTitle>
                {item.title}
              </TaskTitle>
            ) : (
              <TaskComplete>
                {item.title}
              </TaskComplete>
            )
          }

        </TaskButton >
      )}
    />
  )
}

import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IProps {
  children: React.ReactElement
}

export interface ITask {
  id: string;
  title: string
}

export interface ITaskContext {
  tasks: ITask[];
  addTask(task: ITask): void
  removeTask(id: string): void;

}

const tasksData = '@MyTasks'

export const TasksContext = React.createContext<ITaskContext>({} as ITaskContext)

export const TasksProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [data, setData] = useState<ITask[]>([])

  useEffect(() => {
    async function loadTasks() {
      const taskList = await AsyncStorage.getItem(tasksData)

      if (taskList) {
        setData(JSON.parse(taskList))
      }
    }
    loadTasks()
  }, [])

  const addTask = async (task: ITask) => {
    try {
      const newTaskList = [...data, task]
      setData(newTaskList)
      await AsyncStorage.setItem(tasksData, JSON.stringify(newTaskList))
    } catch (error) {
      console.log("error saving task", error as string)
      throw new Error("An error occurred while saving task")
    }

  }

  const removeTask = async (id: string) => {
    const newTaskList = data.filter((task) => task.id !== id)
    setData(newTaskList)
    await AsyncStorage.setItem(tasksData, JSON.stringify(newTaskList))
  }

  return (
    <TasksContext.Provider value={{
      tasks: data, addTask, removeTask
    }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export function useTaskList(): ITaskContext {
  const context = useContext(TasksContext)

  if (!context) {
    console.log("error: useTaskList must be used in a TasksProvider")
    throw new Error("useTaskList must be used in a TasksProvider")
  }

  return context
}


import React from 'react';
import { Task } from './src/views/Task';
import { TasksProvider } from './src/context/TaskContext';


const App = () => {

  return (
    <TasksProvider>
      <Task />
    </TasksProvider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });
  const [selectedTask, setSelectedTask] = useState(null);
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Error fetching tasks:', response.status);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  const createTask = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        fetchTasks();
        setNewTask({ title: '', description: '', completed: false });
      } else {
        console.error('Error creating task:', response.status);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async () => {
    if (!selectedTask) return;
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${selectedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedTask),
      });
      if (response.ok) {
        fetchTasks();
        setSelectedTask(null);
      } else {
        console.error('Error updating task:', response.status);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTasks();
      } else {
        console.error('Error deleting task:', response.status);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const showAllTasks = () => {
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>

      <h2>Create Task</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={createTask}>Create</button>
      </div>

      <h2>All Tasks</h2>
      <button onClick={showAllTasks}>Show All</button>
      <ul>
        {Object.values(tasks).map((task) => (
          <li key={task._id}>
            {task.title} - {task.description}
            <button onClick={() => setSelectedTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedTask && (
        <div>
          <h2>Edit Task</h2>
          <input
            type="text"
            value={selectedTask.title}
            onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
          />
          <input
            type="text"
            value={selectedTask.description}
            onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
          />
          <button onClick={updateTask}>Save</button>
        </div>
      )}
    </div>
  );
}

export default App;

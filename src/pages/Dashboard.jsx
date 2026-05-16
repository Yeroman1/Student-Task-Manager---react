import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import TaskList from '../components/TaskList';
import Footer from '../components/Footer';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Empty tasks for initial state
const initialTasks = [];

export default function Dashboard() {
  const [tasks, setTasks] = useLocalStorage('taskflow-tasks', initialTasks);
  const [isDarkMode, setIsDarkMode] = useLocalStorage('taskflow-theme', false);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleAddTask = (newTask) => {
    const task = {
      ...newTask,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([task, ...tasks]);
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id, updatedFields) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedFields } : task
    ));
  };

  // Derived state
  const completedTasksCount = tasks.filter(t => t.completed).length;
  
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // 1. Apply Search
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!matchesSearch) return false;

      // 2. Apply Filter
      if (filter === 'Active') return !task.completed;
      if (filter === 'Completed') return task.completed;
      return true; // 'All'
    });
  }, [tasks, filter, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBar total={tasks.length} completed={completedTasksCount} />
        
        <TaskForm onAddTask={handleAddTask} />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <FilterBar filter={filter} setFilter={setFilter} />
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <TaskList 
          tasks={filteredTasks} 
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </main>
      
      <Footer />
    </div>
  );
}

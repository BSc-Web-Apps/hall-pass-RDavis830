import { View, Text, TouchableOpacity, ActivityIndicator, Pressable, Modal, TextInput } from "react-native";
import { Checkbox } from '~/components/ui/checkbox';
import React, { useEffect, useState } from "react";
import { CircleX, Edit } from 'lucide-react-native';
import { Button } from "~/components/ui/button";
import { CirclePlus } from 'lucide-react-native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditPage from "./EditPage";

interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
  onDelete: () => void;
  onUpdate: (id: string, updates: { title: string; category: string }) => void;
  id: string;
}

interface Task {
  id: string;
  title: string;
  category: string;
  isChecked: boolean;
}

function Task({ title, category, isChecked, onDelete, onUpdate, id }: TaskProps) {
  const [checked, setChecked] = React.useState(isChecked);
  const [modalVisible, setModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editCategory, setEditCategory] = useState(category);
  const router = useRouter();

  const handleEdit = () => {
    router.push({
      pathname: "/EditPage",
      params: { id }
    });
  };

  const handleSave = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        const updatedTasks = tasks.map((task: Task) => 
          task.id === id ? { ...task, title: editTitle, category: editCategory } : task
        );
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        onUpdate(id, { title: editTitle, category: editCategory });
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <>
      <View className="h-20 w-4/5 mx-auto flex-row border-b-2 my-2 border-gray-700">
        <View className="flex w-24 h-full border-2 items-center justify-center">             
          <Checkbox checked={checked} onCheckedChange={setChecked} className="bg-red-500" />
        </View>
        <TouchableOpacity 
          onPress={handleEdit} 
          onLongPress={() => setModalVisible(true)}
          className="flex-1"
        >
          <View className="flex flex-1 h-full border-2 flex-row items-center">
            <View className="flex-1">
              <Text className={`w-3/5 text-foreground text-red-500 text-xl ${checked ? 'line-through' : ''}`}>{title}</Text>
              <Text className="w-3/5 text-foreground-transparent text-lg text-red-500">{category}</Text>
            </View>
            {checked && <CircleX size={20} color="red" className="w-1/5" onPress={onDelete} />}
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-4/5 bg-background p-4 rounded-lg border-2 border-gray-700">
            <Text className="text-foreground text-xl mb-4">Edit Task</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-foreground text-lg mb-2">Title</Text>
                <TextInput
                  className="border-2 border-gray-700 p-2 rounded text-foreground"
                  value={editTitle}
                  onChangeText={setEditTitle}
                  placeholder="Enter task title"
                />
              </View>
              <View>
                <Text className="text-foreground text-lg mb-2">Category</Text>
                <TextInput
                  className="border-2 border-gray-700 p-2 rounded text-foreground"
                  value={editCategory}
                  onChangeText={setEditCategory}
                  placeholder="Enter category"
                />
              </View>
              <View className="flex-row space-x-2">
                <Button 
                  onPress={handleSave}
                  className="flex-1"
                >
                  <Text className="text-foreground">Save</Text>
                </Button>
                <Button 
                  onPress={() => {
                    onDelete();
                    setModalVisible(false);
                  }}
                  variant="destructive"
                  className="flex-1"
                >
                  <Text className="text-foreground">Delete</Text>
                </Button>
              </View>
              <Button 
                onPress={() => setModalVisible(false)}
                variant="outline"
                className="w-full"
              >
                <Text className="text-foreground">Cancel</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default function HomeScreen() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load tasks from storage on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveTasks();
    }
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks([
          { id: "0",
            title: "Enter title",
            category: "Enter category",
            isChecked: false,
          },
        ]);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: "New Task",
      category: "General",
      isChecked: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdate = (taskId: string, updates: { title: string; category: string }) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View className="flex flex-1 py-32 bg-background">
      <View className="w-4/5 mx-auto mb-4">
      </View>
      {tasks.map((task) => (
        <Task 
          key={task.id} 
          id={task.id}
          title={task.title} 
          category={task.category} 
          isChecked={task.isChecked} 
          onDelete={() => handleDelete(task.id)}
          onUpdate={handleUpdate}
        />
      ))}
      <View className="absolute bottom-8 left-0 right-0 items-center">
        <CirclePlus onPress={handleAddTask} size={96} color="red" />
      </View>
    </View>
  );
}
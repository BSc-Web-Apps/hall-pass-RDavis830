import { View, Text, TouchableOpacity } from "react-native";
import { Checkbox } from '~/components/ui/checkbox';
import React from "react";
import { CircleX } from 'lucide-react-native';
import { Button } from "~/components/ui/button";
import { CirclePlus } from 'lucide-react-native';
import { useRouter } from "expo-router";

interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
  onDelete: () => void;
  id: string;
}

function Task({ title, category, isChecked, onDelete, id }: TaskProps) {
  const [checked, setChecked] = React.useState(isChecked);
  const router = useRouter();
  
  const onPress = () => {
    router.push(`/EditPage?id=${id}`);
  };

  return (
    <View className="h-20 w-4/5 mx-auto flex-row border-b-2 my-2 border-gray-700">
      <View className="flex w-24 h-full border-2 items-center justify-center ">             
        <Checkbox checked={checked} onCheckedChange={setChecked} />
      </View>
      <TouchableOpacity onPress={onPress} className="flex-1">
        <View className="flex flex-1 h-full border-2 flex-row items-center">
          <View className="flex-1">
            <Text className={`w-3/5 text-foreground text-xl ${checked ? 'line-through' : ''}`}>{title}</Text>
            <Text className="w-3/5 text-foreground-transparent text-lg">{category}</Text>
          </View>
          {checked && <CircleX size={20} color="white" className="w-1/5" onPress={onDelete} />}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen() {
  const [tasks, setTasks] = React.useState([
    { id: "0",
      title: "feed the cat",
      category: "food",
      isChecked: true,
    },
    { id: "1",
      title: "feed the dog",
      category: "shopping",
      isChecked: false,
    }
  ]);

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
        />
      ))}
      <View className="absolute bottom-8 left-0 right-0 items-center">
        <CirclePlus onPress={handleAddTask} size={96} color="white" />
      </View>
    </View>
  );
}
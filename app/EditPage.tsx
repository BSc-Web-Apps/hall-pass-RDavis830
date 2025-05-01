import { View, Text, TextInput } from "react-native";
import React, { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button } from "~/components/ui/button";
import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function EditPage() {
//   const router = useRouter();
//   const { id } = useLocalSearchParams();
//   const [title, setTitle] = React.useState("");
//   const [category, setCategory] = React.useState("");

//   useEffect(() => {
//     loadTask();
//   }, [id]);

//   const loadTask = async () => {
//     try {
//       const storedTasks = await AsyncStorage.getItem('tasks');
//       if (storedTasks) {
//         const tasks = JSON.parse(storedTasks);
//         const task = tasks.find((t: any) => t.id === id);
//         if (task) {
//           setTitle(task.title);
//           setCategory(task.category);
//         }
//       }
//     } catch (error) {
//       console.error('Error loading task:', error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const storedTasks = await AsyncStorage.getItem('tasks');
//       if (storedTasks) {
//         const tasks = JSON.parse(storedTasks);
//         const updatedTasks = tasks.map((task: any) => 
//           task.id === id ? { ...task, title, category } : task
//         );
//         await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
//       }
//     } catch (error) {
//       console.error('Error saving task:', error);
//     }
//     router.back();
//   };

//   return (
//     <View className="flex-1 p-4 bg-background">
//       <View className="mb-4">
//         <Text className="text-foreground text-lg mb-2">Title</Text>
//         <TextInput
//           className="border-2 border-gray-700 p-2 rounded text-foreground"
//           value={title}
//           onChangeText={setTitle}
//           placeholder="Enter task title"
//         />
//       </View>
//       <View className="mb-4">
//         <Text className="text-foreground text-lg mb-2">Category</Text>
//         <TextInput
//           className="border-2 border-gray-700 p-2 rounded text-foreground"
//           value={category}
//           onChangeText={setCategory}
//           placeholder="Enter category"
//         />
//       </View>
//       <Button onPress={handleSave}>Save Changes</Button>
//     </View>
//   );
// } 
export default function EditPage() {
  return (
    <Text className="text-white">Edit page</Text>
  )
}
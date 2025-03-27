import { View, Text } from "react-native";
import { Checkbox } from '~/components/ui/checkbox';
import React from "react";
import { ExitButton } from '~/assets/images/svg/ExitButton';
interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
}

function Task({ title, category, isChecked }: TaskProps) {
  const [checked, setChecked] = React.useState(isChecked);
  return (
    <View className="h-20 w-4/5 mx-auto flex-row border-b-2 my-2 border-gray-700">
          <View className="flex w-24 h-full border-2 items-center justify-center ">             
            <Checkbox checked={checked} onCheckedChange={setChecked} />
          </View>
          <View className="flex flex-1 h-full border-2">
          <Text className={`w-3/5 text-foreground text-xl ${checked ? 'line-through' : ''}`}>{title}</Text>
          <Text className={`w-3/5 text-foreground-transparent text-lg ${checked ? 'line-through' : ''}`}>{category}</Text>
          <ExitButton alt="Exit button" />
</View>
  </View>
  )
}

export default function HomeScreen() {
  const tasks = [
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
  ]
  return (
    <View className="flex flex-1 py-32 bg-background">
      {tasks.map((task) => ( 
        <Task key={task.id} title={task.title} category={task.category} isChecked={task.isChecked} />
      ))}
    </View>
  );
}
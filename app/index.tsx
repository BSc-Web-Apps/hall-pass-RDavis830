import { View, Text } from "react-native";
import { Checkbox } from '~/components/ui/checkbox';
import React from "react";

export default function HomeScreen() {
  const [checked, setChecked] = React.useState(false);
  return (

    <View className="flex flex-1 py-32 bg-background">
      <View className="h-20 w-full flex-row border-2">
            <View className="flex w-24 h-full border-2 items-center justify-center ">             
              <Checkbox checked={checked} onCheckedChange={setChecked} />
            </View>
            <View className="flex flex-1 h-full border-2">
            <Text className="text-foreground text-xl">Feed the cat</Text>
            <Text className="text-foreground-transparent text-lg">Due in 3 days</Text>
            
</View>
    </View>
    </View>
  );
}
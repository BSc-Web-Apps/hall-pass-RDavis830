import { View, Text, TextInput } from "react-native";
import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button } from "~/components/ui/button";

export default function EditPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");

  const handleSave = () => {
    // TODO: Implement save functionality
    router.back();
  };

  return (
    <View className="flex-1 p-4 bg-background">
      <View className="mb-4">
        <Text className="text-foreground text-lg mb-2">Title</Text>
        <TextInput
          className="border-2 border-gray-700 p-2 rounded text-foreground"
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
        />
      </View>
      <View className="mb-4">
        <Text className="text-foreground text-lg mb-2">Category</Text>
        <TextInput
          className="border-2 border-gray-700 p-2 rounded text-foreground"
          value={category}
          onChangeText={setCategory}
          placeholder="Enter category"
        />
      </View>
      <Button onPress={handleSave}>Save Changes</Button>
    </View>
  );
} 
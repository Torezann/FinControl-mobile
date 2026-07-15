import { useState } from 'react';
import { FlatList, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { insertItem, useItems } from '@/hooks/useItems';

export default function HomeScreen() {
  const { items } = useItems();
  const [name, setName] = useState('');

  async function handleAdd() {
    const trimmed = name.trim();
    if (!trimmed) return;
    await insertItem(trimmed);
    setName('');
  }

  return (
    <View className="flex-1 bg-background px-4 pt-16">
      <Text variant="h1" className="mb-6 text-left text-2xl">
        FinControl
      </Text>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>New item</CardTitle>
        </CardHeader>
        <CardContent className="flex-row gap-2">
          <Input
            className="flex-1"
            placeholder="Item name"
            value={name}
            onChangeText={setName}
            onSubmitEditing={handleAdd}
            returnKeyType="done"
          />
          <Button onPress={handleAdd}>
            <Text>Add</Text>
          </Button>
        </CardContent>
      </Card>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card className="mb-2">
            <CardContent className="py-0">
              <Text>{item.name}</Text>
              <Text className="text-muted-foreground text-xs">{item.createdAt}</Text>
            </CardContent>
          </Card>
        )}
        ListEmptyComponent={
          <Text className="text-muted-foreground mt-8 text-center">No items yet.</Text>
        }
      />
    </View>
  );
}

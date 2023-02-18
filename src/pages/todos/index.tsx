import { useState } from "react";
import { Flex, Box, Input, Button, List, ListItem } from "@chakra-ui/react";
import { api } from "@utils/api";

const Todos = () => {
  const [description, setDescription] = useState("");
  const { data: todoItems, refetch } = api.todo.findAll.useQuery();
  const addTodoMutation = api.todo.addTodo.useMutation({ onSuccess: () => refetch() });

  return (
    <Flex gap={1} width="100%" p={5}>
      <Box flex={1}>
        <List>
          {todoItems?.map((todoItem) => (
            <ListItem key={todoItem.id}>{todoItem.description}</ListItem>
          ))}
        </List>
      </Box>
      <Flex flex={1} gap={1}>
        <Input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Button onClick={() => addTodoMutation.mutate({ description })}>
          Add Todo
        </Button>
      </Flex>
    </Flex>
  );
};
Todos.requireAuth = true;

export default Todos;

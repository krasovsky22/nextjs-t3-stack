import { api } from "@utils/api";
import { useState } from "react";
import {
  Flex,
  Box,
  Input,
  Button,
  List,
  ListItem,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";

const Todos = () => {
  const [description, setDescription] = useState("");
  const { data: todoItems, refetch } = api.todo.findAll.useQuery();
  const addTodoMutation = api.todo.addTodo.useMutation({
    onSuccess: () => refetch(),
  });

  const removeTodoMutation = api.todo.removeTodo.useMutation({
    onSuccess: () => refetch(),
  });

  return (
    <Flex gap={1} width="100%" p={5}>
      <Box flex={1}>
        <List>
          {todoItems?.map((todoItem) => (
            <ListItem
              key={todoItem.id}
              as={Flex}
              justifyContent="space-between"
              mx={2}
            >
              <Box>{todoItem.description}</Box>
              <Box>
                <CheckboxGroup>
                  <Checkbox
                    onChange={() =>
                      removeTodoMutation.mutate({ id: todoItem.id })
                    }
                  >
                    Complete
                  </Checkbox>
                </CheckboxGroup>
              </Box>
            </ListItem>
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

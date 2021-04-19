import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as types from "../types";

type AddBudgetItemFormProps = {
  onSubmit: SubmitHandler<types.BudgetItem>;
};

export const AddBudgetItemForm: React.FunctionComponent<AddBudgetItemFormProps> = (
  props
) => {
  const onSubmit: SubmitHandler<types.BudgetItem> = (data, e) => {
    if (e) e.target.reset();
    props.onSubmit(data, e);
  };
  const { handleSubmit, register } = useForm<types.BudgetItem>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={3} alignItems="start">
        <Heading size="lg">Add an Item</Heading>
        <HStack spacing={3}>
          <FormControl id="name">
            <FormLabel htmlFor="name">Name of Item</FormLabel>
            <Input {...register("name")} isRequired={true} />
          </FormControl>
          <FormControl id="amount">
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <Input
              {...register("amount", {
                valueAsNumber: true,
                min: 0,
                max: 100000,
                required: true,
              })}
              type="number"
              step="0.01"
              placeholder="7500.00"
            />
          </FormControl>
        </HStack>
        <Button mt={4} colorScheme="teal" type="submit">
          Add
        </Button>
      </VStack>
    </form>
  );
};

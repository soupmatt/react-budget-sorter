import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

interface TotalFormProps {
  onSubmit: (values: any) => any;
}

export const TotalForm: React.FunctionComponent<TotalFormProps> = ({
  onSubmit,
}) => {
  const { handleSubmit, register } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={3} alignItems="start">
        <Heading size="lg">Set Amount Available</Heading>
        <FormControl id="totalAmount">
          <FormLabel htmlFor="totalAmount">Amount</FormLabel>
          <Input
            {...register("totalAmount", {
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
        <Button mt={4} colorScheme="teal" type="submit">
          Apply
        </Button>
      </VStack>
    </form>
  );
};

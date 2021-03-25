import React from "react";
import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

interface TotalFormProps {
  onSubmit: (values: any) => any;
}

export const TotalForm: React.FunctionComponent<TotalFormProps> = ({
  onSubmit,
}) => {
  const { handleSubmit, register } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="totalAmount">
        <FormLabel htmlFor="totalAmount">Set Total Amount Available</FormLabel>
        <Input
          name="totalAmount"
          type="number"
          max="100000"
          step="0.01"
          placeholder="7500.00"
          ref={register()}
          isRequired={true}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        Apply
      </Button>
    </form>
  );
};

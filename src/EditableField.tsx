import * as React from "react";
import { Input } from "@chakra-ui/react";

type EditableFieldProps = {
  initialValue: number;
  onSave: (value: number) => void;
  onShow: (value: number) => JSX.Element;
};

export const EditableField: React.FunctionComponent<EditableFieldProps> = ({
  initialValue,
  onSave,
  onShow,
}) => {
  const [state, setState] = React.useState({
    previousValue: initialValue,
    value: initialValue,
    editMode: false,
  });

  const handleClick: React.MouseEventHandler = React.useCallback(
    (event) => {
      event.preventDefault();
      setState({ ...state, editMode: true });
    },
    [state]
  );

  const handleCancel = React.useCallback(() => {
    setState({ ...state, value: state.previousValue, editMode: false });
  }, [state]);

  const handleSave = React.useCallback(
    (event) => {
      setState({
        previousValue: state.value,
        value: event.target.valueAsNumber,
        editMode: false,
      });
      onSave(state.value);
    },
    [state, onSave]
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    (event) => {
      setState({ ...state, value: event.target.valueAsNumber });
    },
    [state]
  );

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = React.useCallback(
    (e) => {
      handleSave(e);
    },
    [handleSave]
  );

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(
    (event: React.KeyboardEvent) => {
      const eventKey = event.key;

      const keyMap: Record<string, React.KeyboardEventHandler> = {
        Escape: handleCancel,
        Enter: (event) => {
          if (!event.shiftKey && !event.metaKey) {
            handleSave(event);
          }
        },
      };

      const action = keyMap[eventKey];

      if (action) {
        event.preventDefault();
        action(event);
      }
    },
    [handleCancel, handleSave]
  );

  let elements;
  if (state.editMode) {
    elements = (
      <Input
        name="amount"
        type="number"
        max="100000"
        step="0.01"
        placeholder="7500.00"
        isRequired={true}
        value={state.value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    );
  } else {
    elements = <div onClick={handleClick}>{onShow(state.value)}</div>;
  }

  return elements;
};

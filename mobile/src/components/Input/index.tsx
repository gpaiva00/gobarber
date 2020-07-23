import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  RefForwardingComponent,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueProps {
  value: string;
}

interface InputRefProps {
  focus(): void;
}

// esse tipo de componente serve para usarmos as refs no functional component.
const Input: RefForwardingComponent<InputRefProps, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const { defaultValue = '', registerField, error, fieldName } = useField(name);
  const inputElementRef = useRef<any>(null);
  const inputValueRef = useRef<InputValueProps>({ value: defaultValue });

  // componente interno tenta modificar o componente pai através da ref
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />

      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);

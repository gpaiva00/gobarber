import React, {
  FC,
  InputHTMLAttributes,
  ComponentType,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string; // torna a prop name obrigatória para o nosso input
  icon: ComponentType<IconBaseProps>;
}

const Input: FC<InputProps> = ({ name, icon: Icon, ...props }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnBlur = useCallback(() => {
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value', // valor do input
    });
  }, [fieldName, registerField]);

  return (
    <Container hasError={!!error} isFilled={isFilled}>
      {Icon && <Icon size={20} />}

      <input
        onBlur={handleOnBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...props}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;

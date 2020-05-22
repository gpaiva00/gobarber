import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string; // quer dizer que o object terá uma chave qualquer do tipo string
}

export default function validationErrors(error: ValidationError): Errors {
  const validations: Errors = {};

  error.inner.forEach(errorItem => {
    validations[errorItem.path] = errorItem.message;
  });

  return validations;
}

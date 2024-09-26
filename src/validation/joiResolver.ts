import { Resolver } from "react-hook-form";
import Joi from "joi";

type ValidationError = {
  [key: string]: {
    message: string;
  };
};

const joiResolver = (schema: Joi.ObjectSchema): Resolver<any> => {
  return async (values) => {
    try {
      await schema.validateAsync(values, { abortEarly: false });
      return { values, errors: {} };
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        const errors: ValidationError = err.details.reduce((acc, error) => {
          const { path, message } = error;
          acc[path[0] as string] = { message };
          return acc;
        }, {} as ValidationError);
        return { values: {}, errors };
      }
      return { values: {}, errors: {} };
    }
  };
};

export default joiResolver;

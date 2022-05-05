import { object } from 'yup';

/**
 * Creates validator schema.
 *
 * @param entries Object with field name and validator pairs.
 * @return validator schema.
 */
export const createValidator = (entries) => object(Object.fromEntries(entries));

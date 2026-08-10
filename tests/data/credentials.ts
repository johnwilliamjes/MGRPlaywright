import { env } from '../helpers/env';

export function adminCredentials() {
  return {
    username: env.username(),
    password: env.password(),
  };
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required. Copy .env.example to .env and set values.`);
  }
  return value;
}

export const env = {
  baseUrl: () => required('BASE_URL'),
  username: () => required('ORANGEHRM_USERNAME'),
  password: () => required('ORANGEHRM_PASSWORD'),
};

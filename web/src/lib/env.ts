function required(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }
  return value.replace(/\/$/, "");
}

export const env = {
  frontendUrl: required("VITE_FRONTEND_URL"),
  backendUrl: required("VITE_BACKEND_URL"),
};

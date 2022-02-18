export const PasswordRegex = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
);

export const UsernameRegex = new RegExp(
  "^((?=.*[a-z])|(?=.*[A-Z]))(?=.{4,24})"
);

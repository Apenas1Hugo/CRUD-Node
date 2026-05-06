export interface UserDTO {
  id: number;
  name: string;
  email: string;
}

export const toUserDTO = (user: any): UserDTO => {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
};
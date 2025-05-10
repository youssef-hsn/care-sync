export type Client = {
  clientID: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  address?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const fullName = (client: Client) => {
  return `${client.firstName} ${client.lastName}`;
}

export const userGlass = (client: Client) => {
  return `https://api.dicebear.com/9.x/glass/svg?seed=${client.firstName}`
}

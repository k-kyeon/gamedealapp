import { Account, Client, Databases } from 'appwrite';

export const appwriteConfig = {
  endpointUrl: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_PUBLIC_APPWRITE_PROJECT,
  databaseId: import.meta.env.VITE_PUBLIC_APPWRITE_DATABASE,
  usersCollectionId: import.meta.env.VITE_PUBLIC_APPWRITE_USERS_COLLECTION,
  ordersCollectionId: import.meta.env.VITE_PUBLIC_APPWRITE_ORDERS_COLLECTION,
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);

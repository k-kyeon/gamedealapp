// import { Account, Client, Databases, ID } from "appwrite"
// import { appwriteConfig } from "./config"

// export const createSessionClient = async () => {
//     const client = new Client().setEndpoint(appwriteConfig.endpointUrl).setProject(appwriteConfig.projectId)
//     const database = new Databases(client)
//     const account =new Account(client);
//     try {
//         const result = await account.create(ID.unique(), email, name)
//         console.log("User created: ", result)
//     } catch (error) {
//         console.error("Signup error:", error);
//     }
// }

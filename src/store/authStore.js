import { account, appwriteConfig, databases } from '@/lib/appwrite/config';
import { Query } from 'appwrite';
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  loading: true,
  isAuthenticated: false,
  setUser: (user) => set({ user }),

  // Fetch user and role
  fetchUser: async () => {
    try {
      const user = await account.get();

      const userDocs = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal('accountId', user.$id)]
      );

      const userDoc = userDocs.documents[0];

      if (!userDoc) throw new Error('User document not found');

      // check if approved
      if (userDoc.status !== 'approved') {
        set({
          user: null,
          role: null,
          isAuthenticated: false,
          loading: false,
        });
        return;
      }
      set({
        user: user,
        role: userDoc.role,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      console.error('fetchUser error:', err.message);
      set({
        user: null,
        role: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },

  logout: async () => {
    try {
      await account.deleteSession('current');
      set({
        user: null,
        role: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
  },
}));

export default useAuthStore;

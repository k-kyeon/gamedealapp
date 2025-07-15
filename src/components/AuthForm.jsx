'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { CircleLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { account, appwriteConfig, databases } from '@/lib/appwrite/config';
import { ID, Query } from 'appwrite';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signUpSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

const AuthForm = ({ type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const formSchema = type === 'sign-in' ? signInSchema : signUpSchema;

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage('');

    if (type === 'sign-in') {
      try {
        try {
          await account.deleteSession('current');
        } catch (error) {
          // No active session, continue
          setErrorMessage(error.message);
        }

        // Create session
        await account.createEmailPasswordSession(values.email, values.password);

        // Get the logged-in user's account ID
        const user = await account.get();

        // Fetch the user's document from Appwrite database
        const userDoc = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          [Query.equal('accountId', user.$id)]
        );

        const userData = userDoc.documents[0];

        if (!userData) {
          setErrorMessage('User not found. Please contact support.');
          return;
        }

        if (userData.status !== 'approved') {
          setErrorMessage('Account not yet approved by admin.');
          await account.deleteSession('current');
          return;
        }

        // Redirect based on role
        if (userData.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      } catch (error) {
        setErrorMessage(error.message || 'Login failed');
      } finally {
        setIsLoading(false);
      }
    }

    if (type === 'sign-up') {
      try {
        // Create account
        const newUser = await account.create(
          ID.unique(),
          values.email,
          values.password,
          values.name
        );

        // Add to 'users' collection
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          ID.unique(),
          {
            accountId: newUser.$id,
            email: values.email,
            name: values.name,
            role: 'customer',
            status: 'pending',
            password: values.password,
          }
        );

        setSuccessMessage('Account created. Waiting for admin approval.');
        navigate('/sign-in');
      } catch (error) {
        setErrorMessage(error.message || 'Sign up failed');
      } finally {
        setIsLoading(false);
      }
    }

    // TODO: Send email to admin about new signup
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full min-h-screen bg-blue-100 justify-center items-center border-2 border-red-600"
        >
          <div className="md:w-2/3 lg:w-2/5 bg-white p-20 rounded-4xl">
            <div className="flex flex-col space-y-8 ">
              <h1 className="font-bold">{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</h1>

              {type === 'sign-up' && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormDescription>This is the name you will be displayed as.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    <FormDescription>This is the email you will log in with.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col items-center">
              <Button type="submit" className="mt-7 w-3/4" disabled={isLoading}>
                {isLoading ? (
                  <CircleLoader color="#ffffff" size={20} />
                ) : type === 'sign-in' ? (
                  'Sign In'
                ) : (
                  'Sign Up'
                )}
              </Button>

              {errorMessage && <p className="text-red-600">{errorMessage}</p>}
              {successMessage && <p className="text-green-600">{successMessage}</p>}

              <div className="flex justify-center mt-5">
                <p className="text-gray-800">
                  {type === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}
                </p>
                <Link to={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="ml-1">
                  {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;

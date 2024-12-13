import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import Layout from '@/components/Layout';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Index = () => {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push('/'); // Redirect to the homepage or another appropriate page
    }
  }, [token, router]);

 
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );

};


export default Index;

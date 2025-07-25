import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { t } from '@/lib/i18n';
import { v4 as uuidv4 } from 'uuid/dist/esm-browser';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!name || !email || !password || !dob) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    const scriptUrl = 'https://script.google.com/macros/s/1zzdmjE-UwAK3alCOe4ImnDT15eDd9pko4StmxYx7vxk/exec';
    const checkEmailUrl = `${scriptUrl}?action=checkEmail&email=${encodeURIComponent(email)}`;

    try {
      const checkEmailResponse = await fetch(checkEmailUrl);
      const checkEmailData = await checkEmailResponse.json();

      if (checkEmailData.status === 'exists') {
        setError('This email is already registered.');
        setIsLoading(false);
        return;
      }

      const id = uuidv4();
      const signUpData = { id, name, email, password, dob };
      const loginData = { id, email, password };

      const signUpResponse = await fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify({ action: 'signUp', data: signUpData }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const loginResponse = await fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify({ action: 'addLogin', data: loginData }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const signUpResult = await signUpResponse.json();
      const loginResult = await loginResponse.json();

      if (signUpResult.status === 'success' && loginResult.status === 'success') {
        setSuccess('Sign up successful!');
      } else {
        setError('An error occurred during sign up. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-8">{t('auth.signup')}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="signup-name">{t('auth.name')}</Label>
            <Input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">{t('auth.email')}</Label>
            <Input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">{t('auth.password')}</Label>
            <Input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-dob">{t('auth.dateOfBirth')}</Label>
            <Input
              id="signup-dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing up...' : t('auth.signup')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

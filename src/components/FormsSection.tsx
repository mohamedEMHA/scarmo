import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const FormsSection = () => {
  const { toast } = useToast();
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [signupDate, setSignupDate] = useState<Date>();

  const handleSubmit = async (
    formData: FormData,
    type: 'Login' | 'SignUp' | 'Newsletter',
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('id', Date.now().toString()); // Auto-increment using timestamp
      
      // Add type-specific parameters
      if (type === 'Login') {
        params.append('email', formData.get('email') as string);
        params.append('password', formData.get('password') as string);
        params.append('type', 'Login');
      } else if (type === 'SignUp') {
        params.append('name', formData.get('name') as string);
        params.append('email', formData.get('email') as string);
        params.append('password', formData.get('password') as string);
        params.append('dob', formData.get('dob') as string);
        params.append('type', 'SignUp');
      } else if (type === 'Newsletter') {
        params.append('email', formData.get('email') as string);
        params.append('type', 'Newsletter');
      }

      const response = await fetch(
        'https://script.google.com/macros/s/1zzdmjE-UwAK3alCOe4ImnDT15eDd9pko4StmxYx7vxk/exec',
        {
          method: 'POST',
          body: params,
        }
      );

      if (response.ok) {
        toast({
          title: 'Success!',
          description: `${type} submitted successfully.`,
        });
        // Reset form
        const form = document.querySelector(`[data-form="${type}"]`) as HTMLFormElement;
        if (form) form.reset();
        if (type === 'SignUp') setSignupDate(undefined);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to submit ${type}. Please try again.`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (type: 'Login' | 'SignUp' | 'Newsletter') => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Add date of birth to form data if it's signup
    if (type === 'SignUp' && signupDate) {
      formData.append('dob', format(signupDate, 'yyyy-MM-dd'));
    }
    
    const setLoading = type === 'Login' ? setLoginLoading : 
                     type === 'SignUp' ? setSignupLoading : 
                     setNewsletterLoading;
    
    handleSubmit(formData, type, setLoading);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Login Form */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Login</h2>
            <form data-form="Login" onSubmit={handleFormSubmit('Login')} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  required
                  className="w-full"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  required
                  className="w-full"
                  placeholder="Enter your password"
                />
              </div>
              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {loginLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </div>

          {/* Sign Up Form */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Sign Up</h2>
            <form data-form="SignUp" onSubmit={handleFormSubmit('SignUp')} className="space-y-4">
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="signup-name"
                  name="name"
                  type="text"
                  required
                  className="w-full"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  required
                  className="w-full"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  required
                  className="w-full"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date of Birth
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !signupDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {signupDate ? format(signupDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={signupDate}
                      onSelect={setSignupDate}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button
                type="submit"
                disabled={signupLoading || !signupDate}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {signupLoading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </form>
          </div>

          {/* Newsletter Form */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Newsletter</h2>
            <div className="mb-4">
              <p className="text-muted-foreground text-center">
                Stay updated with our latest collections and exclusive offers.
              </p>
            </div>
            <form data-form="Newsletter" onSubmit={handleFormSubmit('Newsletter')} className="space-y-4">
              <div>
                <label htmlFor="newsletter-email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  className="w-full"
                  placeholder="Enter your email"
                />
              </div>
              <Button
                type="submit"
                disabled={newsletterLoading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormsSection;
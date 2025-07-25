import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Lock, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/contexts/AuthContext';
import { t } from '@/lib/i18n';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import FocusTrap from 'focus-trap-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  dateOfBirth?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { login, signup } = useAuth();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [dateOfBirth, setDateOfBirth] = useState<Date>();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setLoginForm({ email: '', password: '' });
      setSignupForm({ name: '', email: '', password: '', confirmPassword: '' });
      setDateOfBirth(undefined);
      setErrors({});
      setActiveTab(initialTab);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Unlock body scroll
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialTab]);

  // Focus trap - basic implementation
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (type: 'login' | 'signup') => {
    const newErrors: FormErrors = {};

    if (type === 'login') {
      if (!loginForm.email) newErrors.email = 'Email is required';
      else if (!validateEmail(loginForm.email)) newErrors.email = 'Please enter a valid email';
      if (!loginForm.password) newErrors.password = 'Password is required';
    } else {
      if (!signupForm.name) newErrors.name = 'Name is required';
      if (!signupForm.email) newErrors.email = 'Email is required';
      else if (!validateEmail(signupForm.email)) newErrors.email = 'Please enter a valid email';
      if (!signupForm.password) newErrors.password = 'Password is required';
      else if (signupForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (signupForm.password !== signupForm.confirmPassword) {
        newErrors.confirmPassword = 'Passwords must match';
      }
      if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      else {
        const age = new Date().getFullYear() - dateOfBirth.getFullYear();
        if (age < 18) newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('login')) return;

    setIsLoading(true);
    try {
      const success = await login(loginForm.email, loginForm.password);
      if (success) {
        onClose();
      } else {
        setErrors({ email: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ email: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('signup')) return;

    setIsLoading(true);
    try {
      const success = await signup(signupForm.name, signupForm.email, signupForm.password, dateOfBirth);
      if (success) {
        onClose();
      } else {
        setErrors({ email: 'Signup failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ email: 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <FocusTrap>
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

      {/* Modal */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] mx-4 bg-background border border-border rounded-2xl shadow-luxury max-h-[80vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 id="auth-modal-title" className="text-xl font-semibold">
            {activeTab === 'login' ? t('auth.login') : t('auth.signup')}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors focus-luxury ${
              activeTab === 'login'
                ? 'bg-accent text-accent-foreground border-b-2 border-accent'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('login')}
            aria-pressed={activeTab === 'login'}
          >
            {t('auth.login')}
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors focus-luxury ${
              activeTab === 'signup'
                ? 'bg-accent text-accent-foreground border-b-2 border-accent'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('signup')}
            aria-pressed={activeTab === 'signup'}
          >
            {t('auth.signup')}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.form
                key="login"
                onSubmit={handleLogin}
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">
                    {t('auth.email')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      className="pl-10 focus-luxury"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "login-email-error" : undefined}
                      required
                    />
                  </div>
                  {errors.email && (
                    <span id="login-email-error" className="text-sm text-destructive">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm font-medium">
                    {t('auth.password')}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter your password"
                      className="pl-10 focus-luxury"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "login-password-error" : undefined}
                      required
                    />
                  </div>
                  {errors.password && (
                    <span id="login-password-error" className="text-sm text-destructive">
                      {errors.password}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 focus-luxury"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : t('auth.login')}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                onSubmit={handleSignup}
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium">
                    {t('auth.name')}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="pl-10 focus-luxury"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "signup-name-error" : undefined}
                      required
                    />
                  </div>
                  {errors.name && (
                    <span id="signup-name-error" className="text-sm text-destructive">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">
                    {t('auth.email')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      className="pl-10 focus-luxury"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "signup-email-error" : undefined}
                      required
                    />
                  </div>
                  {errors.email && (
                    <span id="signup-email-error" className="text-sm text-destructive">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">
                    {t('auth.password')}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Create a password"
                      className="pl-10 focus-luxury"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "signup-password-error" : undefined}
                      required
                    />
                  </div>
                  {errors.password && (
                    <span id="signup-password-error" className="text-sm text-destructive">
                      {errors.password}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password" className="text-sm font-medium">
                    {t('auth.confirmPassword')}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm your password"
                      className="pl-10 focus-luxury"
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={errors.confirmPassword ? "signup-confirm-password-error" : undefined}
                      required
                    />
                  </div>
                  {errors.confirmPassword && (
                    <span id="signup-confirm-password-error" className="text-sm text-destructive">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-dob" className="text-sm font-medium">
                    {t('auth.dateOfBirth')}
                  </Label>
                  <div className="relative">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal pl-10",
                            !dateOfBirth && "text-muted-foreground"
                          )}
                          aria-invalid={!!errors.dateOfBirth}
                          aria-describedby={errors.dateOfBirth ? "signup-dob-error" : undefined}
                        >
                          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick your date of birth</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateOfBirth}
                          onSelect={setDateOfBirth}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {errors.dateOfBirth && (
                    <span id="signup-dob-error" className="text-sm text-destructive">
                      {errors.dateOfBirth}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 focus-luxury"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : t('auth.signup')}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
    </FocusTrap>
  );
};

export default AuthModal;
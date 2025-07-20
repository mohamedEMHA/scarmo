import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { t, getCurrentLanguage, setLanguageCookie, languages, isRTL } from '@/lib/i18n';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownLanguagePrompt, setHasShownLanguagePrompt] = useState(false);
  const [isSelectingLanguage, setIsSelectingLanguage] = useState(false);
  const [customLanguage, setCustomLanguage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const currentLang = getCurrentLanguage();
  const isRtl = isRTL();

  // Initialize chat and check for language selection
  useEffect(() => {
    const hasSeenLanguagePrompt = localStorage.getItem('scarmo_language_prompted');
    if (!hasSeenLanguagePrompt) {
      setIsSelectingLanguage(true);
      setMessages([
        {
          id: 'greeting',
          text: t('chat.greeting'),
          isBot: true,
          timestamp: new Date(),
        }
      ]);
    } else {
      setMessages([
        {
          id: 'greeting',
          text: t('chat.greeting'),
          isBot: true,
          timestamp: new Date(),
        }
      ]);
    }
  }, []);

  const addMessage = (text: string, isBot: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleLanguageSelect = (langCode: string) => {
    setLanguageCookie(langCode);
    localStorage.setItem('scarmo_language_prompted', 'true');
    setIsSelectingLanguage(false);
    
    // Reload page with language parameter and set document attributes
    const url = new URL(window.location.href);
    url.searchParams.set('lang', langCode);
    window.location.href = url.toString();
  };

  const handleCustomLanguage = () => {
    if (customLanguage.trim()) {
      setLanguageCookie('custom');
      localStorage.setItem('scarmo_language_prompted', 'true');
      localStorage.setItem('scarmo_custom_language', customLanguage);
      setIsSelectingLanguage(false);
      addMessage(`Language set to: ${customLanguage}`, true);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isSelectingLanguage) return;

    addMessage(inputValue, false);
    const userMessage = inputValue.toLowerCase();
    setInputValue('');

    // Simulate AI responses
    setTimeout(() => {
      if (userMessage.includes('cart') || userMessage.includes('buy')) {
        addMessage("I'd be happy to help you with your cart! You can click the cart icon in the navigation to view your items. What would you like to add?", true);
      } else if (userMessage.includes('size')) {
        addMessage("Our pieces are true to size. We offer S, M, L, XL, and XXL. Would you like specific measurements for any item?", true);
      } else if (userMessage.includes('shipping')) {
        addMessage("We offer free shipping on orders over $150. Standard delivery takes 3-5 business days, express delivery 1-2 days.", true);
      } else {
        addMessage("Thank you for your message! I'm here to help you with our luxury menswear collection. Feel free to ask about products, sizing, shipping, or anything else!", true);
      }
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground rounded-full shadow-luxury flex items-center justify-center hover:shadow-xl transition-all duration-300 focus-luxury"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute bottom-16 right-0 w-80 h-96 bg-background border border-border rounded-2xl shadow-luxury overflow-hidden ${
              isRtl ? 'rtl' : 'ltr'
            }`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
              <h3 className="font-semibold">SCARMO Assistant</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 h-64 overflow-y-auto">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.isBot
                        ? 'bg-muted text-foreground'
                        : 'bg-gradient-to-r from-accent to-accent/80 text-accent-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              
              {/* Language Selection */}
              {isSelectingLanguage && (
                <motion.div
                  className="bg-muted p-4 rounded-2xl space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm font-medium">{t('chat.languagePrompt')}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <Button
                        key={lang.code}
                        variant="outline"
                        size="sm"
                        onClick={() => handleLanguageSelect(lang.code)}
                        className="text-xs h-8"
                      >
                        {lang.nativeName}
                      </Button>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={customLanguage}
                      onChange={(e) => setCustomLanguage(e.target.value)}
                      placeholder={t('chat.languageOther')}
                      className="flex-1 h-8 text-xs"
                    />
                    <Button
                      onClick={handleCustomLanguage}
                      size="sm"
                      className="h-8 text-xs"
                    >
                      Set
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('chat.placeholder')}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                  disabled={isSelectingLanguage}
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
                  disabled={isSelectingLanguage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
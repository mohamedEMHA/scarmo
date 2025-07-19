import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Globe } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [customLanguage, setCustomLanguage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('scarmo-chat-visited');
    const savedLanguage = localStorage.getItem('scarmo-language');
    
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }

    if (!hasVisited) {
      // Show welcome message after a short delay
      setTimeout(() => {
        if (!isOpen) {
          setIsOpen(true);
          setShowLanguageSelection(true);
          addBotMessage('Welcome to Scarmo! 👋 Please choose your preferred language to get started.');
        }
      }, 3000);
      localStorage.setItem('scarmo-chat-visited', 'true');
    }
  }, [isOpen]);

  const addBotMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleLanguageSelect = (langCode: string, langName: string) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('scarmo-language', langCode);
    setShowLanguageSelection(false);
    
    addUserMessage(`Selected language: ${langName}`);
    addBotMessage(`Perfect! I'll assist you in ${langName}. How can I help you find the perfect Scarmo piece today? I can help you with product recommendations, sizing, or answer any questions about our collection.`);
    
    // Simulate page reload with language parameter (in a real app, this would actually reload)
    const url = new URL(window.location.href);
    url.searchParams.set('lang', langCode);
    window.history.pushState({}, '', url.toString());
  };

  const handleCustomLanguage = () => {
    if (customLanguage.trim()) {
      handleLanguageSelect('custom', customLanguage);
      setCustomLanguage('');
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addUserMessage(userMessage);
    setInputValue('');

    // Simulate AI responses
    setTimeout(() => {
      if (userMessage.toLowerCase().includes('add to cart') || userMessage.toLowerCase().includes('buy')) {
        addBotMessage('I\'d be happy to help you add items to your cart! Could you tell me which specific product caught your eye? I can provide more details about sizing, colors, and help you complete your purchase.');
      } else if (userMessage.toLowerCase().includes('size') || userMessage.toLowerCase().includes('sizing')) {
        addBotMessage('For sizing guidance, our pieces generally run true to size. We offer sizes from S to XXL. Would you like me to recommend a size based on your measurements, or do you have a specific product in mind?');
      } else if (userMessage.toLowerCase().includes('shirt') || userMessage.toLowerCase().includes('polo') || userMessage.toLowerCase().includes('sweater') || userMessage.toLowerCase().includes('tshirt')) {
        addBotMessage('Excellent choice! Our premium collection features the finest materials and craftsmanship. Based on your interest, I recommend checking out our featured pieces in that category. Would you like me to suggest some specific items?');
      } else if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('cost')) {
        addBotMessage('Our pieces range from $89 for premium t-shirts to $299 for luxury sweaters. We believe in transparent pricing that reflects the quality of materials and craftsmanship. Is there a specific budget range you\'re working with?');
      } else {
        addBotMessage('Thank you for your message! I\'m here to help you discover the perfect Scarmo pieces. Feel free to ask about our products, sizing, materials, or anything else you\'d like to know about our luxury menswear collection.');
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 focus-luxury"
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
            className="w-80 sm:w-96 h-96 bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-accent to-accent/90 text-accent-foreground p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-foreground/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">S</span>
                </div>
                <div>
                  <h3 className="font-semibold">Scarmo Assistant</h3>
                  <p className="text-xs opacity-90">Online • Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-accent-foreground/20 rounded-lg transition-colors duration-200 focus-luxury"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.isUser
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Language Selection */}
              {showLanguageSelection && (
                <motion.div
                  className="bg-muted/50 rounded-lg p-4 border border-border"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Select Language</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code, lang.native)}
                        className="text-left p-2 text-sm rounded-lg hover:bg-accent/10 transition-colors duration-200 focus-luxury"
                      >
                        {lang.native}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customLanguage}
                      onChange={(e) => setCustomLanguage(e.target.value)}
                      placeholder="Other language..."
                      className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-background focus-luxury"
                      onKeyPress={(e) => e.key === 'Enter' && handleCustomLanguage()}
                    />
                    <button
                      onClick={handleCustomLanguage}
                      className="px-3 py-2 bg-accent text-accent-foreground text-sm rounded-lg hover:bg-accent/90 transition-colors duration-200 focus-luxury"
                    >
                      OK
                    </button>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus-luxury"
                  disabled={showLanguageSelection}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || showLanguageSelection}
                  className="p-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-luxury"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
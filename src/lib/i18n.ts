export interface Translations {
  [key: string]: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.collection': 'Collection',
    'nav.tshirts': 'T-Shirts',
    'nav.sweaters': 'Sweaters',
    'nav.belts': 'Belts',
    'nav.neckties': 'Neckties',
    'nav.longSleeves': 'Long-Sleeves',
    'nav.shoes': 'Shoes',
    'nav.backpacks': 'Backpacks',
    'nav.underwear': 'Underwear',
    'nav.viewAll': 'View All',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    // Authentication
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.name': 'Full Name',
    'auth.dateOfBirth': 'Date of Birth',
    
    // Hero
    'hero.title': 'SCARMO',
    'hero.subtitle': 'Luxury Men\'s Fashion',
    'hero.cta': 'Shop Collection',
    'hero.premiumTshirts': 'Premium T-Shirts',
    'hero.elegantPolos': 'Elegant Polos',
    'hero.luxurySweaters': 'Luxury Sweaters',
    'hero.dressShirts': 'Dress Shirts',
    'hero.finestCotton': 'Crafted from the finest cotton',
    'hero.sophisticatedStyle': 'Sophisticated style for every occasion',
    'hero.warmthStyle': 'Warmth meets uncompromising style',
    'hero.impeccableTailoring': 'Impeccable tailoring for the modern gentleman',
    'hero.shopTshirts': 'Shop T-Shirts',
    'hero.shopPolos': 'Shop Polos',
    'hero.shopSweaters': 'Shop Sweaters',
    'hero.shopShirts': 'Shop Shirts',
    'hero.ourStory': 'Our Story',
    
    // Products
    'products.title': 'Our Collection',
    'products.subtitle': 'Discover our carefully curated selection of premium menswear, crafted with attention to detail and uncompromising quality.',
    'products.all': 'All',
    'products.addToCart': 'Add to Cart',
    'products.viewDetails': 'View Details',
    'products.viewAllProducts': 'View All Products',
    'products.filters': 'Filters',
    'products.priceRange': 'Price Range',
    'products.closeFilters': 'Close filters',
    'products.clearFilters': 'Clear Filters',
    'products.noProducts': 'No products found matching your criteria.',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyDesc': 'Start shopping to add items to your cart',
    'cart.total': 'Total:',
    'cart.checkout': 'Proceed to Checkout',
    'cart.remove': 'Remove',
    'cart.quantity': 'Quantity',
    
    // About
    'about.title': 'About SCARMO',
    'about.heading': 'Crafting Excellence Since 2019',
    'about.description': 'At SCARMO, we believe that true luxury lies in the details. Every piece in our collection is meticulously crafted using the finest materials and time-honored techniques passed down through generations of master tailors.',
    'about.heritage': 'Our Heritage',
    'about.heritageText': 'Founded by a team of fashion enthusiasts who shared a vision of creating timeless, sophisticated menswear that transcends trends.',
    'about.quality': 'Uncompromising Quality',
    'about.qualityText': 'From premium fabrics sourced from the world\'s finest mills to hand-finished details, every SCARMO piece represents our commitment to excellence.',
    'about.sustainability': 'Sustainable Fashion',
    'about.sustainabilityText': 'We believe in responsible fashion. Our sustainable practices ensure that luxury and environmental consciousness go hand in hand.',
    
    // Testimonials
    'testimonials.title': 'What Our Customers Say',
    
    // Footer
    'footer.newsletter': 'Subscribe to our newsletter',
    'footer.email': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.social': 'Follow Us',
    'footer.copyright': '© 2024 SCARMO. All rights reserved.',
    
    // Chat
    'chat.greeting': 'Welcome to SCARMO! How can I help you today?',
    'chat.languagePrompt': 'Please select your preferred language:',
    'chat.languageOther': 'Other (type your language)',
    'chat.placeholder': 'Type your message...',
    'chat.send': 'Send',
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.collection': 'Colección',
    'nav.tshirts': 'Camisetas',
    'nav.polos': 'Polos',
    'nav.sweaters': 'Suéteres',
    'nav.shirts': 'Camisas',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',

    // Authentication
    'auth.login': 'Iniciar Sesión',
    'auth.signup': 'Registrarse',
    'auth.logout': 'Cerrar Sesión',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.confirmPassword': 'Confirmar Contraseña',
    'auth.name': 'Nombre Completo',
    
    // Hero
    'hero.title': 'SCARMO',
    'hero.subtitle': 'Moda Masculina de Lujo',
    'hero.cta': 'Ver Colección',
    
    // Products
    'products.title': 'Nuestra Colección',
    'products.all': 'Todos',
    'products.addToCart': 'Añadir al Carrito',
    'products.viewDetails': 'Ver Detalles',
    
    // Cart
    'cart.title': 'Carrito de Compras',
    'cart.empty': 'Tu carrito está vacío',
    'cart.emptyDesc': 'Comienza a comprar para añadir artículos a tu carrito',
    'cart.total': 'Total:',
    'cart.checkout': 'Proceder al Pago',
    'cart.remove': 'Eliminar',
    'cart.quantity': 'Cantidad',
    
    // About
    'about.title': 'Acerca de SCARMO',
    'about.description': 'Creando ropa masculina excepcional desde 1995. Nuestro compromiso con la calidad, el estilo y la innovación nos ha convertido en líderes en moda de lujo.',
    
    // Testimonials
    'testimonials.title': 'Lo que Dicen Nuestros Clientes',
    
    // Footer
    'footer.newsletter': 'Suscríbete a nuestro boletín',
    'footer.email': 'Ingresa tu email',
    'footer.subscribe': 'Suscribirse',
    'footer.social': 'Síguenos',
    'footer.copyright': '© 2024 SCARMO. Todos los derechos reservados.',
    
    // Chat
    'chat.greeting': '¡Bienvenido a SCARMO! ¿Cómo puedo ayudarte hoy?',
    'chat.languagePrompt': 'Por favor selecciona tu idioma preferido:',
    'chat.languageOther': 'Otro (escribe tu idioma)',
    'chat.placeholder': 'Escribe tu mensaje...',
    'chat.send': 'Enviar',
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.collection': 'Collection',
    'nav.tshirts': 'T-Shirts',
    'nav.polos': 'Polos',
    'nav.sweaters': 'Pulls',
    'nav.shirts': 'Chemises',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',

    // Authentication
    'auth.login': 'Connexion',
    'auth.signup': 'S\'inscrire',
    'auth.logout': 'Déconnexion',
    'auth.email': 'Email',
    'auth.password': 'Mot de Passe',
    'auth.confirmPassword': 'Confirmer le Mot de Passe',
    'auth.name': 'Nom Complet',
    
    // Hero
    'hero.title': 'SCARMO',
    'hero.subtitle': 'Mode Masculine de Luxe',
    'hero.cta': 'Voir la Collection',
    
    // Products
    'products.title': 'Notre Collection',
    'products.all': 'Tous',
    'products.addToCart': 'Ajouter au Panier',
    'products.viewDetails': 'Voir les Détails',
    
    // Cart
    'cart.title': 'Panier d\'Achat',
    'cart.empty': 'Votre panier est vide',
    'cart.emptyDesc': 'Commencez vos achats pour ajouter des articles à votre panier',
    'cart.total': 'Total:',
    'cart.checkout': 'Procéder au Paiement',
    'cart.remove': 'Supprimer',
    'cart.quantity': 'Quantité',
    
    // About
    'about.title': 'À Propos de SCARMO',
    'about.description': 'Créant des vêtements masculins exceptionnels depuis 1995. Notre engagement envers la qualité, le style et l\'innovation nous a rendus leaders de la mode de luxe.',
    
    // Testimonials
    'testimonials.title': 'Ce que Disent Nos Clients',
    
    // Footer
    'footer.newsletter': 'Abonnez-vous à notre newsletter',
    'footer.email': 'Entrez votre email',
    'footer.subscribe': 'S\'abonner',
    'footer.social': 'Suivez-nous',
    'footer.copyright': '© 2024 SCARMO. Tous droits réservés.',
    
    // Chat
    'chat.greeting': 'Bienvenue chez SCARMO ! Comment puis-je vous aider aujourd\'hui ?',
    'chat.languagePrompt': 'Veuillez sélectionner votre langue préférée :',
    'chat.languageOther': 'Autre (tapez votre langue)',
    'chat.placeholder': 'Tapez votre message...',
    'chat.send': 'Envoyer',
  },
  
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.collection': 'Kollektion',
    'nav.tshirts': 'T-Shirts',
    'nav.polos': 'Polos',
    'nav.sweaters': 'Pullover',
    'nav.shirts': 'Hemden',
    'nav.about': 'Über Uns',
    'nav.contact': 'Kontakt',

    // Authentication
    'auth.login': 'Anmelden',
    'auth.signup': 'Registrieren',
    'auth.logout': 'Abmelden',
    'auth.email': 'E-Mail',
    'auth.password': 'Passwort',
    'auth.confirmPassword': 'Passwort Bestätigen',
    'auth.name': 'Vollständiger Name',
    
    // Hero
    'hero.title': 'SCARMO',
    'hero.subtitle': 'Luxuriöse Herrenmode',
    'hero.cta': 'Kollektion Ansehen',
    
    // Products
    'products.title': 'Unsere Kollektion',
    'products.all': 'Alle',
    'products.addToCart': 'In den Warenkorb',
    'products.viewDetails': 'Details Ansehen',
    
    // Cart
    'cart.title': 'Warenkorb',
    'cart.empty': 'Ihr Warenkorb ist leer',
    'cart.emptyDesc': 'Beginnen Sie mit dem Einkaufen, um Artikel in Ihren Warenkorb zu legen',
    'cart.total': 'Gesamt:',
    'cart.checkout': 'Zur Kasse',
    'cart.remove': 'Entfernen',
    'cart.quantity': 'Menge',
    
    // About
    'about.title': 'Über SCARMO',
    'about.description': 'Seit 1995 kreieren wir außergewöhnliche Herrenbekleidung. Unser Engagement für Qualität, Stil und Innovation hat uns zu einem Marktführer in der Luxusmode gemacht.',
    
    // Testimonials
    'testimonials.title': 'Was Unsere Kunden Sagen',
    
    // Footer
    'footer.newsletter': 'Abonnieren Sie unseren Newsletter',
    'footer.email': 'E-Mail eingeben',
    'footer.subscribe': 'Abonnieren',
    'footer.social': 'Folgen Sie Uns',
    'footer.copyright': '© 2024 SCARMO. Alle Rechte vorbehalten.',
    
    // Chat
    'chat.greeting': 'Willkommen bei SCARMO! Wie kann ich Ihnen heute helfen?',
    'chat.languagePrompt': 'Bitte wählen Sie Ihre bevorzugte Sprache:',
    'chat.languageOther': 'Andere (geben Sie Ihre Sprache ein)',
    'chat.placeholder': 'Nachricht eingeben...',
    'chat.send': 'Senden',
  },
  
  el: {
    // Navigation
    'nav.home': 'Αρχική',
    'nav.collection': 'Συλλογή',
    'nav.tshirts': 'T-Shirts',
    'nav.polos': 'Πόλο',
    'nav.sweaters': 'Πουλόβερ',
    'nav.shirts': 'Πουκάμισα',
    'nav.about': 'Σχετικά',
    'nav.contact': 'Επικοινωνία',

    // Authentication
    'auth.login': 'Σύνδεση',
    'auth.signup': 'Εγγραφή',
    'auth.logout': 'Αποσύνδεση',
    'auth.email': 'Email',
    'auth.password': 'Κωδικός',
    'auth.confirmPassword': 'Επιβεβαίωση Κωδικού',
    'auth.name': 'Πλήρες Όνομα',
    
    // Hero
    'hero.title': 'SCARMO',
    'hero.subtitle': 'Πολυτελής Ανδρική Μόδα',
    'hero.cta': 'Δείτε τη Συλλογή',
    
    // Products
    'products.title': 'Η Συλλογή μας',
    'products.all': 'Όλα',
    'products.addToCart': 'Προσθήκη στο Καλάθι',
    'products.viewDetails': 'Δείτε Λεπτομέρειες',
    
    // Cart
    'cart.title': 'Καλάθι Αγορών',
    'cart.empty': 'Το καλάθι σας είναι άδειο',
    'cart.emptyDesc': 'Ξεκινήστε τις αγορές για να προσθέσετε προϊόντα στο καλάθι σας',
    'cart.total': 'Σύνολο:',
    'cart.checkout': 'Προχωρήστε στην Πληρωμή',
    'cart.remove': 'Αφαίρεση',
    'cart.quantity': 'Ποσότητα',
    
    // About
    'about.title': 'Σχετικά με το SCARMO',
    'about.description': 'Δημιουργούμε εξαιρετικά ανδρικά ρούχα από το 1995. Η δέσμευσή μας στην ποιότητα, το στυλ και την καινοτομία μας έχει καταστήσει ηγέτες στη μόδα πολυτελείας.',
    
    // Testimonials
    'testimonials.title': 'Τι Λένε οι Πελάτες μας',
    
    // Footer
    'footer.newsletter': 'Εγγραφείτε στο newsletter μας',
    'footer.email': 'Εισάγετε το email σας',
    'footer.subscribe': 'Εγγραφή',
    'footer.social': 'Ακολουθήστε μας',
    'footer.copyright': '© 2024 SCARMO. Όλα τα δικαιώματα διατηρούνται.',
    
    // Chat
    'chat.greeting': 'Καλώς ήρθατε στο SCARMO! Πώς μπορώ να σας βοηθήσω σήμερα;',
    'chat.languagePrompt': 'Παρακαλώ επιλέξτε την προτιμώμενη γλώσσα σας:',
    'chat.languageOther': 'Άλλη (πληκτρολογήστε τη γλώσσα σας)',
    'chat.placeholder': 'Πληκτρολογήστε το μήνυμά σας...',
    'chat.send': 'Αποστολή',
  },
  
  it: {
    // Navigation
    'nav.home': 'Home',
    'nav.collection': 'Collezione',
    'nav.tshirts': 'T-Shirt',
    'nav.sweaters': 'Maglioni',
    'nav.belts': 'Cinture',
    'nav.neckties': 'Cravatte',
    'nav.longSleeves': 'Manica Lunga',
    'nav.shoes': 'Scarpe',
    'nav.backpacks': 'Zaini',
    'nav.underwear': 'Intimo',
    'nav.viewAll': 'Vedi Tutto',
    'nav.about': 'Chi Siamo',
    'nav.contact': 'Contatti',

    // Authentication
    'auth.login': 'Accedi',
    'auth.signup': 'Registrati',
    'auth.logout': 'Esci',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Conferma Password',
    'auth.name': 'Nome Completo',
    'auth.dateOfBirth': 'Data di Nascita',
    
    // Hero
    'hero.title': 'SCARMO',
    'hero.subtitle': 'Moda Maschile di Lusso',
    'hero.cta': 'Vedi Collezione',
    'hero.premiumTshirts': 'T-Shirt Premium',
    'hero.elegantPolos': 'Polo Eleganti',
    'hero.luxurySweaters': 'Maglioni di Lusso',
    'hero.dressShirts': 'Camicie Eleganti',
    'hero.finestCotton': 'Realizzato con il cotone più pregiato',
    'hero.sophisticatedStyle': 'Stile sofisticato per ogni occasione',
    'hero.warmthStyle': 'Il calore incontra lo stile senza compromessi',
    'hero.impeccableTailoring': 'Sartoria impeccabile per il gentleman moderno',
    'hero.shopTshirts': 'Acquista T-Shirt',
    'hero.shopPolos': 'Acquista Polo',
    'hero.shopSweaters': 'Acquista Maglioni',
    'hero.shopShirts': 'Acquista Camicie',
    'hero.ourStory': 'La Nostra Storia',
    
    // Products
    'products.title': 'La Nostra Collezione',
    'products.subtitle': 'Scopri la nostra selezione accuratamente curata di abbigliamento maschile premium, realizzato con attenzione ai dettagli e qualità senza compromessi.',
    'products.all': 'Tutti',
    'products.addToCart': 'Aggiungi al Carrello',
    'products.viewDetails': 'Vedi Dettagli',
    'products.viewAllProducts': 'Vedi Tutti i Prodotti',
    'products.filters': 'Filtri',
    'products.priceRange': 'Fascia di Prezzo',
    'products.closeFilters': 'Chiudi filtri',
    'products.clearFilters': 'Cancella Filtri',
    'products.noProducts': 'Nessun prodotto trovato che corrisponda ai tuoi criteri.',
    
    // Cart
    'cart.title': 'Carrello',
    'cart.empty': 'Il tuo carrello è vuoto',
    'cart.emptyDesc': 'Inizia a fare shopping per aggiungere articoli al tuo carrello',
    'cart.total': 'Totale:',
    'cart.checkout': 'Procedi al Checkout',
    'cart.remove': 'Rimuovi',
    'cart.quantity': 'Quantità',
    
    // About
    'about.title': 'Chi è SCARMO',
    'about.heading': 'Creando Eccellenza dal 2019',
    'about.description': 'In SCARMO, crediamo che il vero lusso risieda nei dettagli. Ogni pezzo della nostra collezione è meticolosamente realizzato utilizzando i migliori materiali e tecniche tradizionali tramandate attraverso generazioni di maestri sarti.',
    'about.heritage': 'Il Nostro Patrimonio',
    'about.heritageText': 'Fondato da un team di appassionati di moda che condividevano una visione di creare abbigliamento maschile senza tempo e sofisticato che trascende le tendenze.',
    'about.quality': 'Qualità Senza Compromessi',
    'about.qualityText': 'Dai tessuti premium provenienti dalle migliori manifatture del mondo ai dettagli rifiniti a mano, ogni pezzo SCARMO rappresenta il nostro impegno per l\'eccellenza.',
    'about.sustainability': 'Moda Sostenibile',
    'about.sustainabilityText': 'Crediamo nella moda responsabile. Le nostre pratiche sostenibili assicurano che lusso e coscienza ambientale vadano di pari passo.',
    
    // Testimonials
    'testimonials.title': 'Cosa Dicono i Nostri Clienti',
    
    // Footer
    'footer.newsletter': 'Iscriviti alla nostra newsletter',
    'footer.email': 'Inserisci la tua email',
    'footer.subscribe': 'Iscriviti',
    'footer.social': 'Seguici',
    'footer.copyright': '© 2024 SCARMO. Tutti i diritti riservati.',
    
    // Chat
    'chat.greeting': 'Benvenuto in SCARMO! Come posso aiutarti oggi?',
    'chat.languagePrompt': 'Per favore seleziona la tua lingua preferita:',
    'chat.languageOther': 'Altro (scrivi la tua lingua)',
    'chat.placeholder': 'Scrivi il tuo messaggio...',
    'chat.send': 'Invia',
  },
  
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.collection': 'المجموعة',
    'nav.tshirts': 'تي شيرت',
    'nav.polos': 'بولو',
    'nav.sweaters': 'سترات',
    'nav.shirts': 'قمصان',
    'nav.about': 'عن الشركة',
    'nav.contact': 'اتصل بنا',

    // Authentication
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.logout': 'تسجيل الخروج',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.name': 'الاسم الكامل',
    
    // Hero
    'hero.title': 'سكارمو',
    'hero.subtitle': 'أزياء رجالية فاخرة',
    'hero.cta': 'تصفح المجموعة',
    
    // Products
    'products.title': 'مجموعتنا',
    'products.all': 'الكل',
    'products.addToCart': 'أضف للسلة',
    'products.viewDetails': 'عرض التفاصيل',
    
    // Cart
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلة التسوق فارغة',
    'cart.emptyDesc': 'ابدأ بالتسوق لإضافة المنتجات إلى سلتك',
    'cart.total': 'المجموع:',
    'cart.checkout': 'إتمام الشراء',
    'cart.remove': 'إزالة',
    'cart.quantity': 'الكمية',
    
    // About
    'about.title': 'عن سكارمو',
    'about.description': 'نصنع ملابس رجالية استثنائية منذ عام 1995. التزامنا بالجودة والأناقة والابتكار جعلنا رواداً في عالم الأزياء الفاخرة.',
    
    // Testimonials
    'testimonials.title': 'ما يقوله عملاؤنا',
    
    // Footer
    'footer.newsletter': 'اشترك في نشرتنا الإخبارية',
    'footer.email': 'أدخل بريدك الإلكتروني',
    'footer.subscribe': 'اشتراك',
    'footer.social': 'تابعنا',
    'footer.copyright': '© 2024 سكارمو. جميع الحقوق محفوظة.',
    
    // Chat
    'chat.greeting': 'مرحباً بك في سكارمو! كيف يمكنني مساعدتك اليوم؟',
    'chat.languagePrompt': 'يرجى اختيار لغتك المفضلة:',
    'chat.languageOther': 'أخرى (اكتب لغتك)',
    'chat.placeholder': 'اكتب رسالتك...',
    'chat.send': 'إرسال',
  },
};

export const languages = [
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
];

export const rtlLanguages = ['ar'];

export const getLanguageFromUrl = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('lang') || 'en';
};

export const getCurrentLanguage = (): string => {
  // Check URL first, then cookie, then default to English
  const urlLang = getLanguageFromUrl();
  if (urlLang && translations[urlLang]) {
    return urlLang;
  }
  
  const cookieLang = document.cookie
    .split('; ')
    .find(row => row.startsWith('scarmo_lang='))
    ?.split('=')[1];
    
  if (cookieLang && translations[cookieLang]) {
    return cookieLang;
  }
  
  return 'en';
};

export const setLanguageCookie = (lang: string) => {
  document.cookie = `scarmo_lang=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year
};

export const t = (key: string, lang?: string): string => {
  const currentLang = lang || getCurrentLanguage();
  return translations[currentLang]?.[key] || translations.en[key] || key;
};

export const isRTL = (lang?: string): boolean => {
  const currentLang = lang || getCurrentLanguage();
  return rtlLanguages.includes(currentLang);
};

export const setDocumentLanguage = (lang: string) => {
  const selectedLang = languages.find(l => l.code === lang);
  if (selectedLang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = selectedLang.dir;
  }
};
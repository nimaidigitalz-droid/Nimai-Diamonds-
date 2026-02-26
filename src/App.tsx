import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingBag, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Instagram, 
  Facebook, 
  Sparkles,
  Camera,
  MessageSquare,
  X,
  Award,
  Box,
  MapPin,
  Download,
  Truck,
  Shield
} from 'lucide-react';
import { DIAMONDS, IMAGES, Diamond } from './constants';
import { getStyleRecommendations } from './services/geminiService';
import Counter from './components/Counter';
import Galaxy from './components/Galaxy';

type View = 'home' | 'shop' | 'about' | 'contact' | 'product';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond | null>(null);
  const [isAiStylistOpen, setIsAiStylistOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const navigateTo = (view: View, diamond?: Diamond) => {
    if (diamond) setSelectedDiamond(diamond);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleAiStylist = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    const response = await getStyleRecommendations(aiPrompt);
    setAiResponse(response || '');
    setIsAiLoading(false);
  };

  return (
    <div className="min-h-screen font-serif text-stone-200 bg-bg-dark selection:bg-primary selection:text-black">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-bg-dark/80 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigateTo('home')}>
            <h1 className="font-display text-2xl tracking-[0.2em] text-primary">NIMAI DIAMONDS</h1>
          </div>
          <div className="hidden md:flex items-center space-x-10 text-[10px] uppercase tracking-[0.25em] font-sans">
            <button onClick={() => navigateTo('home')} className={`hover:text-primary transition-colors ${currentView === 'home' ? 'text-primary' : ''}`}>Home</button>
            <button onClick={() => navigateTo('shop')} className={`hover:text-primary transition-colors ${currentView === 'shop' ? 'text-primary' : ''}`}>Shop</button>
            <button onClick={() => navigateTo('about')} className={`hover:text-primary transition-colors ${currentView === 'about' ? 'text-primary' : ''}`}>About Us</button>
            <button onClick={() => navigateTo('contact')} className={`hover:text-primary transition-colors ${currentView === 'contact' ? 'text-primary' : ''}`}>Contact</button>
          </div>
          <div className="flex items-center space-x-6">
            <button className="p-2 hover:text-primary transition-colors"><Search size={20} /></button>
            <button className="p-2 hover:text-primary transition-colors"><ShoppingBag size={20} /></button>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomeView onExplore={() => navigateTo('shop')} onProductSelect={(d) => navigateTo('product', d)} />
          </motion.div>
        )}
        {currentView === 'shop' && (
          <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ShopView onProductSelect={(d) => navigateTo('product', d)} />
          </motion.div>
        )}
        {currentView === 'product' && selectedDiamond && (
          <motion.div key="product" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProductDetailView diamond={selectedDiamond} />
          </motion.div>
        )}
        {currentView === 'about' && (
          <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AboutView />
          </motion.div>
        )}
        {currentView === 'contact' && (
          <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ContactView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Stylist Trigger */}
      <button 
        onClick={() => setIsAiStylistOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-primary text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 font-sans text-xs font-bold tracking-widest uppercase"
      >
        <Sparkles size={20} />
        <span className="hidden md:inline">AI Stylist</span>
      </button>

      {/* AI Stylist Modal */}
      <AnimatePresence>
        {isAiStylistOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <div className="bg-accent-dark border border-stone-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-stone-800 flex justify-between items-center">
                <h3 className="font-display text-xl tracking-widest text-primary flex items-center gap-2">
                  <Sparkles size={20} /> STYLE DNA STYLIST
                </h3>
                <button onClick={() => setIsAiStylistOpen(false)} className="text-stone-500 hover:text-white"><X size={24} /></button>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-stone-400 text-sm italic">"Describe your style or an occasion, and I will curate the perfect diamond for you."</p>
                <textarea 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g., I'm looking for a bespoke engagement ring that feels modern yet timeless for a Mumbai sunset proposal..."
                  className="w-full bg-bg-dark border border-stone-800 rounded-xl p-4 text-sm font-sans focus:border-primary focus:ring-0 min-h-[120px]"
                />
                {aiResponse && (
                  <div className="bg-bg-dark/50 border border-primary/20 p-4 rounded-xl text-sm leading-relaxed text-stone-300 font-serif italic">
                    {aiResponse}
                  </div>
                )}
                <button 
                  onClick={handleAiStylist}
                  disabled={isAiLoading}
                  className="w-full bg-primary text-black font-sans text-xs font-bold tracking-[0.2em] uppercase py-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50"
                >
                  {isAiLoading ? 'Consulting the stars...' : 'Get Recommendation'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-bg-dark py-20 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1">
              <h4 className="font-display text-xl tracking-[0.2em] text-primary mb-6">NIMAI</h4>
              <p className="font-sans text-[10px] text-stone-500 leading-loose tracking-wider uppercase">
                The pinnacle of high jewelry and ethical diamond sourcing. London | New York | Hong Kong | Mumbai
              </p>
            </div>
            <div>
              <h5 className="font-sans text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-6">Explore</h5>
              <ul className="font-sans text-[10px] space-y-4 tracking-widest uppercase text-stone-500">
                <li><button onClick={() => navigateTo('shop')} className="hover:text-primary">Collections</button></li>
                <li><button className="hover:text-primary">Raw Gems</button></li>
                <li><button className="hover:text-primary">Engagement</button></li>
                <li><button className="hover:text-primary">Bespoke Service</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-sans text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-6">Client Care</h5>
              <ul className="font-sans text-[10px] space-y-4 tracking-widest uppercase text-stone-500">
                <li><button className="hover:text-primary">Shipping</button></li>
                <li><button className="hover:text-primary">Returns</button></li>
                <li><button className="hover:text-primary">Ethics & Sourcing</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-primary">Contact</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-sans text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-6">Newsletter</h5>
              <p className="font-sans text-[10px] tracking-widest uppercase text-stone-500 mb-4">Receive updates on our rarest acquisitions.</p>
              <div className="flex border-b border-stone-800 pb-2">
                <input className="bg-transparent border-none focus:ring-0 text-[10px] w-full font-sans tracking-[0.2em] text-stone-300" placeholder="EMAIL ADDRESS" type="email" />
                <button className="text-stone-400 hover:text-primary transition-colors"><ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-sans text-[9px] tracking-[0.4em] text-stone-500 uppercase">
              © 2024 NIMAI DIAMONDS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex space-x-8">
              <button className="text-stone-400 hover:text-primary transition-colors"><Facebook size={18} /></button>
              <button className="text-stone-400 hover:text-primary transition-colors"><Instagram size={18} /></button>
              <button className="text-stone-400 hover:text-primary transition-colors"><Globe size={18} /></button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomeView({ onExplore, onProductSelect }: { onExplore: () => void, onProductSelect: (d: Diamond) => void }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.RAW_GEM_HERO} 
            alt="Raw Diamond" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-6xl text-white mb-8 tracking-widest leading-tight"
          >
            THE ESSENCE OF <br /><span className="text-primary italic">UNTOUCHED</span> BRILLIANCE
          </motion.h2>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-sans text-stone-300 text-sm md:text-base tracking-widest uppercase mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the primal beauty of stones crafted by nature, curated for the extraordinary.
          </motion.p>
          <motion.button 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={onExplore}
            className="inline-block border border-primary px-10 py-4 text-xs font-sans tracking-[0.3em] uppercase text-white hover:bg-primary hover:text-black transition-all duration-500"
          >
            Explore Raw Gems
          </motion.button>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-primary" />
        </div>
      </section>

      {/* Featured Collection */}
      <section className="relative py-32 bg-bg-dark overflow-hidden">
        <img src={IMAGES.HERALDIC_SEAL} className="watermark-bg top-20 -left-20 w-[600px] h-[600px]" alt="" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-primary font-sans text-xs tracking-[0.5em] uppercase block mb-4">Curated Selections</span>
            <h2 className="font-display text-3xl md:text-5xl tracking-widest">MASTERPIECES OF LIGHT</h2>
            <div className="w-12 h-px bg-primary mx-auto mt-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="relative group overflow-hidden bg-accent-dark">
              <img 
                src={DIAMONDS[0].image} 
                alt={DIAMONDS[0].name} 
                className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
            </div>
            <div className="space-y-8 md:pl-12">
              <h3 className="font-display text-2xl tracking-widest">{DIAMONDS[0].name}</h3>
              <p className="text-stone-500 leading-relaxed text-lg italic">
                "{DIAMONDS[0].description}"
              </p>
              <ul className="font-sans text-xs tracking-[0.2em] space-y-4 uppercase text-stone-600">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span> {DIAMONDS[0].carat} Carat {DIAMONDS[0].cut}</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span> {DIAMONDS[0].clarity} Clarity Grade</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span> Platinum Mounting</li>
              </ul>
              <button 
                onClick={() => onProductSelect(DIAMONDS[0])}
                className="text-xs font-sans tracking-[0.3em] uppercase border-b border-primary pb-2 hover:text-primary transition-colors"
              >
                View Details
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {DIAMONDS.slice(1).map((diamond) => (
              <div key={diamond.id} className="diamond-card group relative bg-accent-dark p-1">
                <div className="overflow-hidden aspect-square">
                  <img src={diamond.image} alt={diamond.name} className="diamond-image w-full h-full object-cover" />
                </div>
                <div className="p-8 text-center bg-bg-dark">
                  <h4 className="font-display text-lg tracking-widest mb-2 uppercase">{diamond.name}</h4>
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4">Rare Selection</p>
                  <button 
                    onClick={() => onProductSelect(diamond)}
                    className="text-[10px] font-sans tracking-[0.2em] uppercase text-primary border border-primary/30 px-6 py-2 hover:bg-primary hover:text-black transition-all"
                  >
                    Acquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Quote */}
      <section className="py-24 bg-accent-dark border-y border-stone-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <img src={IMAGES.LOGO_ICON} className="w-24 h-24 mx-auto mb-10 opacity-60 invert" alt="" />
          <h3 className="font-display text-2xl tracking-[0.3em] mb-8 uppercase">Fortiter et Fideliter</h3>
          <p className="text-xl md:text-2xl font-serif italic text-stone-400 leading-relaxed mb-16">
            "We do not merely sell diamonds; we curate the most profound expressions of nature's legacy. Each stone in our vault is selected for its soul, its fire, and its eternal promise of brilliance."
          </p>
          
          <div className="pt-12 border-t border-stone-800">
            <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-primary block mb-8">Global Legacy</span>
            <Counter
              value={75.4}
              places={[100, 10, 1]}
              fontSize={80}
              padding={5}
              gap={10}
              textColor="white"
              fontWeight={900}
              digitPlaceHolders
            />
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 mt-8">Diamonds Sold So Far (Millions)</p>
          </div>
        </div>
      </section>
    </>
  );
}

function ShopView({ onProductSelect }: { onProductSelect: (d: Diamond) => void }) {
  return (
    <>
      {/* Shop Hero Section with Galaxy */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Galaxy 
            mouseRepulsion
            mouseInteraction
            density={1}
            glowIntensity={0.3}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.5}
            speed={1}
          />
        </div>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-primary font-sans text-xs tracking-[0.5em] uppercase block mb-4">The Vault</span>
            <h1 className="font-display text-5xl md:text-7xl tracking-[0.2em] uppercase text-white">The Collection</h1>
            <div className="w-24 h-px bg-primary mx-auto mt-12"></div>
          </motion.div>
        </div>
      </section>

      <div className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-primary font-sans text-xs tracking-[0.5em] uppercase block mb-4">Curated Selection</span>
          <h2 className="font-display text-4xl tracking-widest uppercase">Exquisite Treasures</h2>
          <div className="w-12 h-px bg-primary mx-auto mt-8"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DIAMONDS.map((diamond) => (
            <div key={diamond.id} className="diamond-card group relative bg-accent-dark p-1">
              <div className="overflow-hidden aspect-[4/5]">
                <img src={diamond.image} alt={diamond.name} className="diamond-image w-full h-full object-cover" />
              </div>
              <div className="p-8 text-center bg-bg-dark">
                <h4 className="font-display text-lg tracking-widest mb-2 uppercase">{diamond.name}</h4>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4">₹{diamond.price.toLocaleString()}</p>
                <button 
                  onClick={() => onProductSelect(diamond)}
                  className="w-full text-[10px] font-sans tracking-[0.2em] uppercase text-primary border border-primary/30 px-6 py-3 hover:bg-primary hover:text-black transition-all"
                >
                  View Piece
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ProductDetailView({ diamond }: { diamond: Diamond }) {
  const [config, setConfig] = useState({ metal: 'Platinum', engraving: '' });
  const [mainImage, setMainImage] = useState(diamond.image);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[4/5] bg-accent-dark overflow-hidden group relative">
            <img src={mainImage} alt={diamond.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute top-6 right-6">
              <button className="bg-black/40 backdrop-blur-md p-3 rounded-full hover:bg-primary hover:text-black transition-colors">
                <Camera size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {diamond.gallery.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setMainImage(img)}
                className={`aspect-square bg-accent-dark overflow-hidden cursor-pointer border transition-colors ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
              >
                <img src={img} className="w-full h-full object-cover opacity-80" alt="" />
              </div>
            ))}
            <div className="aspect-square bg-accent-dark overflow-hidden cursor-pointer border border-transparent hover:border-primary transition-colors flex items-center justify-center">
              <Sparkles className="text-primary/40" size={32} />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-5 space-y-10">
          <section>
            <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-primary block mb-4">Signature Collection</span>
            <h2 className="font-display text-4xl tracking-widest leading-tight mb-4 uppercase">{diamond.name}</h2>
            <p className="font-serif italic text-2xl text-stone-400 mb-8">₹{diamond.price.toLocaleString()}</p>
            <div className="h-px w-full bg-gradient-to-r from-primary/40 to-transparent mb-8"></div>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 block mb-1">Carat Weight</span>
                <span className="text-lg tracking-wide">{diamond.carat} CT</span>
              </div>
              <div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 block mb-1">Color Grade</span>
                <span className="text-lg tracking-wide">{diamond.color}</span>
              </div>
              <div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 block mb-1">Clarity</span>
                <span className="text-lg tracking-wide">{diamond.clarity}</span>
              </div>
              <div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500 block mb-1">Cut Grade</span>
                <span className="text-lg tracking-wide">{diamond.cut}</span>
              </div>
            </div>
          </section>

          {/* Luxury Features Tabs */}
          <section className="space-y-8">
            <div className="flex border-b border-stone-800">
              <button className="px-6 py-3 font-sans text-[10px] tracking-[0.3em] uppercase text-primary border-b-2 border-primary">Exclusives</button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-start gap-4 p-4 bg-accent-dark/20 border border-stone-800/50 rounded-lg">
                <Award className="text-primary shrink-0" size={20} />
                <div>
                  <h5 className="font-display text-xs tracking-widest uppercase mb-1">Digital Passport</h5>
                  <p className="text-[10px] text-stone-500 font-sans tracking-wide">Blockchain-verified ownership and origin history accessible via NFC.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-accent-dark/20 border border-stone-800/50 rounded-lg">
                <Box className="text-primary shrink-0" size={20} />
                <div>
                  <h5 className="font-display text-xs tracking-widest uppercase mb-1">Bespoke Packaging</h5>
                  <p className="text-[10px] text-stone-500 font-sans tracking-wide">Hand-crafted Italian leather vault case with climate control.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-accent-dark/20 border border-stone-800/50 rounded-lg">
                <MapPin className="text-primary shrink-0" size={20} />
                <div>
                  <h5 className="font-display text-xs tracking-widest uppercase mb-1">Conflict-Free Origin</h5>
                  <p className="text-[10px] text-stone-500 font-sans tracking-wide">Sourced from the Argyle mine with 100% traceability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-accent-dark/20 border border-stone-800/50 rounded-lg">
                <Shield className="text-primary shrink-0" size={20} />
                <div>
                  <h5 className="font-display text-xs tracking-widest uppercase mb-1">Lifetime Warranty</h5>
                  <p className="text-[10px] text-stone-500 font-sans tracking-wide">Complimentary cleaning, inspection, and repair for life.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-accent-dark/20 border border-stone-800/50 rounded-lg">
                <Truck className="text-primary shrink-0" size={20} />
                <div>
                  <h5 className="font-display text-xs tracking-widest uppercase mb-1">Insured Shipping</h5>
                  <p className="text-[10px] text-stone-500 font-sans tracking-wide">Fully insured global delivery via our secure white-glove service.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3D Configurator Simulation */}
          <section className="space-y-6 p-6 border border-stone-800 bg-accent-dark/30">
            <h4 className="font-display text-xs tracking-widest uppercase text-primary">Bespoke Configuration</h4>
            <div className="space-y-4">
              <label className="block font-sans text-[10px] tracking-widest uppercase text-stone-500">Select Metal</label>
              <div className="flex gap-4">
                {['Platinum', '18K Gold', 'Rose Gold'].map((metal) => (
                  <button 
                    key={metal}
                    onClick={() => setConfig({ ...config, metal })}
                    className={`px-4 py-2 text-[10px] font-sans tracking-widest uppercase border transition-all ${config.metal === metal ? 'border-primary text-primary' : 'border-stone-800 text-stone-500'}`}
                  >
                    {metal}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <label className="block font-sans text-[10px] tracking-widest uppercase text-stone-500">Engraving</label>
              <input 
                type="text" 
                placeholder="Enter message..."
                className="w-full bg-transparent border-b border-stone-800 py-2 text-sm font-sans focus:border-primary focus:ring-0"
              />
            </div>
          </section>

          <div className="space-y-4">
            <button className="w-full bg-primary text-black font-sans text-xs tracking-[0.3em] uppercase py-5 hover:bg-white transition-colors duration-500">
              Acquire Piece
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button className="border border-stone-700 text-white font-sans text-[10px] tracking-[0.2em] uppercase py-4 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                <Download size={14} /> GIA Report
              </button>
              <button className="border border-stone-700 text-white font-sans text-[10px] tracking-[0.2em] uppercase py-4 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                <MessageSquare size={14} /> Consult
              </button>
            </div>
          </div>

          <section className="p-8 border border-stone-800 bg-accent-dark/30">
            <h3 className="font-display text-lg tracking-[0.2em] mb-6 flex items-center">
              <ShieldCheck className="text-primary mr-3" /> THE NIMAI PROMISE
            </h3>
            <div className="space-y-4 text-sm text-stone-400 leading-relaxed font-serif italic">
              <p>"Every stone we present is a testament to ethical mastery. GIA certified and conflict-free, sourced through our direct heritage channels."</p>
              <ul className="font-sans text-[10px] tracking-widest uppercase space-y-2 pt-2">
                <li className="flex items-center"><span className="w-1 h-1 bg-primary mr-3"></span> GIA & IGI Certified</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-primary mr-3"></span> Ethically Sourced</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-primary mr-3"></span> Digital Passport (Blockchain)</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function AboutView() {
  return (
    <>
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.RAW_GEM_HERO} className="w-full h-full object-cover opacity-40 grayscale" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-dark"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="text-primary font-sans text-xs tracking-[0.6em] uppercase block mb-6">Our Legacy</span>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-8 tracking-[0.15em] leading-tight uppercase">CRAFTING <span className="italic text-primary">ETERNITY</span></h2>
          <div className="w-16 h-px bg-primary mx-auto"></div>
        </div>
      </section>

      <section className="py-32 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5">
              <div className="relative p-1 bg-stone-800">
                <img src={DIAMONDS[0].image} className="w-full h-[600px] object-cover" alt="" />
              </div>
            </div>
            <div className="md:col-span-7 space-y-10 md:pl-12">
              <h3 className="font-display text-3xl tracking-[0.2em] uppercase">Our Heritage</h3>
              <p className="text-stone-400 text-lg leading-relaxed font-serif italic">
                "Since 1924, Nimai Diamonds has been defined by a singular pursuit: the discovery of light in its purest form. What began in a small workshop in Antwerp has evolved into a global symbol of diamond excellence."
              </p>
              <div className="space-y-6 text-stone-300 font-sans text-sm leading-loose tracking-wide max-w-xl">
                <p>Founded by Elias Nimai, our house was built on the philosophy that a diamond is not merely a stone, but a fragment of time itself. We have spent a century perfecting the art of the cut, ensuring that every facet tells a story of precision and passion.</p>
                <p>Today, we remain a family-owned legacy, personally overseeing the journey of every rare gem from the earth's depths to the final, breathtaking setting.</p>
              </div>
              <div className="pt-6">
                <span className="font-display text-primary text-xl tracking-widest uppercase italic">— The Nimai Legacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactView() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <span className="text-primary font-sans text-xs tracking-[0.5em] uppercase block mb-4">Personal Consultation</span>
        <h2 className="font-display text-4xl md:text-5xl tracking-widest uppercase">Contact & Appointments</h2>
        <div className="w-12 h-px bg-primary mx-auto mt-8"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-24">
        <div className="space-y-12">
          <div>
            <h3 className="font-display text-2xl tracking-widest mb-6 uppercase">Inquiries</h3>
            <p className="text-stone-400 font-serif italic text-lg leading-relaxed max-w-md">
              Whether you are seeking a rare loose stone or a bespoke commission, our specialists are available for a private consultation in Mumbai or via video.
            </p>
          </div>
          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <input className="w-full bg-transparent border-0 border-b border-stone-800 py-4 px-0 focus:ring-0 focus:border-primary transition-colors text-stone-200 placeholder:text-stone-600 font-sans text-sm tracking-widest uppercase" placeholder="First Name" type="text" />
              <input className="w-full bg-transparent border-0 border-b border-stone-800 py-4 px-0 focus:ring-0 focus:border-primary transition-colors text-stone-200 placeholder:text-stone-600 font-sans text-sm tracking-widest uppercase" placeholder="Last Name" type="text" />
            </div>
            <input className="w-full bg-transparent border-0 border-b border-stone-800 py-4 px-0 focus:ring-0 focus:border-primary transition-colors text-stone-200 placeholder:text-stone-600 font-sans text-sm tracking-widest uppercase" placeholder="Email Address" type="email" />
            <select defaultValue="" className="w-full bg-transparent border-0 border-b border-stone-800 py-4 px-0 focus:ring-0 focus:border-primary transition-colors text-stone-200 placeholder:text-stone-600 font-sans text-sm tracking-widest uppercase">
              <option disabled value="">Nature of Inquiry</option>
              <option value="bespoke">Bespoke Design</option>
              <option value="collection">Collection Inquiry</option>
              <option value="appointment">Showroom Appointment</option>
            </select>
            <textarea className="w-full bg-transparent border-0 border-b border-stone-800 py-4 px-0 focus:ring-0 focus:border-primary transition-colors text-stone-200 placeholder:text-stone-600 font-sans text-sm tracking-widest uppercase resize-none" placeholder="Your Message" rows={4}></textarea>
            <button className="inline-block border border-primary px-12 py-4 text-xs font-sans tracking-[0.3em] uppercase text-white hover:bg-primary hover:text-black transition-all duration-500">
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-accent-dark/50 p-10 border border-stone-900 backdrop-blur-sm">
          <h3 className="font-display text-2xl tracking-widest mb-12 uppercase">Private Showrooms</h3>
          <div className="space-y-16">
            {[
              { city: 'Mumbai', address: 'Bandra Kurla Complex, Mumbai 400051', phone: '+91 22 6655 0000' },
              { city: 'London', address: '45 Old Bond Street, Mayfair, London W1S 4QT', phone: '+44 (0) 20 7493 0000' },
              { city: 'New York', address: '711 Fifth Avenue, New York, NY 10022', phone: '+1 212 555 0198' }
            ].map((loc) => (
              <div key={loc.city} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-40 h-24 bg-stone-900 border border-stone-800 flex items-center justify-center grayscale opacity-60 hover:opacity-100 transition-opacity">
                  <Globe className="text-primary/20" size={32} />
                </div>
                <div>
                  <h4 className="font-sans text-xs tracking-[0.4em] uppercase text-primary mb-3">{loc.city}</h4>
                  <p className="text-stone-400 text-sm leading-relaxed font-sans tracking-wide">
                    {loc.address}<br />
                    <span className="text-stone-500 mt-2 block">{loc.phone}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

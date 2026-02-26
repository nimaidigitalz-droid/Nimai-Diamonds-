import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Search, Sparkles, Loader2 } from 'lucide-react';
import { findSimilarDiamonds } from '../services/geminiService';
import { Diamond, DIAMONDS } from '../constants';

interface VisualSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onProductSelect: (d: Diamond) => void;
}

const VisualSearch: React.FC<VisualSearchProps> = ({ isOpen, onClose, onProductSelect }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Diamond[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzeImage(reader.result as string, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64: string, mimeType: string) => {
    setIsAnalyzing(true);
    setResults([]);
    
    // Remove data:image/...;base64, prefix
    const base64Data = base64.split(',')[1];
    
    const similarIds = await findSimilarDiamonds(base64Data, mimeType);
    const matchedDiamonds = DIAMONDS.filter(d => similarIds.includes(d.id));
    
    setResults(matchedDiamonds);
    setIsAnalyzing(false);
  };

  const reset = () => {
    setImage(null);
    setResults([]);
    setIsAnalyzing(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-accent-dark border border-stone-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <Search className="text-primary" size={20} />
                <h3 className="font-display text-lg tracking-widest uppercase">Visual Search</h3>
              </div>
              <button onClick={onClose} className="text-stone-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              {!image ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-video border-2 border-dashed border-stone-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-16 h-16 rounded-full bg-stone-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="text-stone-500 group-hover:text-primary" size={32} />
                  </div>
                  <p className="font-display text-sm tracking-widest uppercase mb-2">Upload Inspiration</p>
                  <p className="font-sans text-xs text-stone-500">Drag and drop or click to browse</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-stone-800">
                      <img src={image} alt="Inspiration" className="w-full h-full object-cover" />
                      <button 
                        onClick={reset}
                        className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="p-4 bg-stone-900/50 rounded-lg border border-stone-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="text-primary" size={16} />
                        <span className="font-display text-[10px] tracking-widest uppercase">AI Analysis</span>
                      </div>
                      <p className="text-xs text-stone-400 font-sans leading-relaxed">
                        Our AI is analyzing the cut, brilliance, and setting of your inspiration to find matching masterpieces from our vault.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-display text-sm tracking-widest uppercase border-b border-stone-800 pb-4">
                      {isAnalyzing ? 'Searching the Vault...' : 'Similar Masterpieces'}
                    </h4>
                    
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {isAnalyzing ? (
                        <div className="flex flex-col items-center justify-center py-20">
                          <Loader2 className="text-primary animate-spin mb-4" size={32} />
                          <p className="font-sans text-xs text-stone-500 uppercase tracking-widest">Consulting the archives...</p>
                        </div>
                      ) : results.length > 0 ? (
                        results.map((diamond) => (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={diamond.id}
                            onClick={() => {
                              onProductSelect(diamond);
                              onClose();
                            }}
                            className="flex gap-4 p-3 bg-stone-900/30 border border-stone-800 rounded-lg hover:border-primary/50 transition-all cursor-pointer group"
                          >
                            <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
                              <img src={diamond.image} alt={diamond.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h5 className="font-display text-xs tracking-widest uppercase mb-1">{diamond.name}</h5>
                              <p className="font-sans text-[10px] text-stone-500 uppercase tracking-wider mb-2">
                                {diamond.carat}ct • {diamond.cut} • {diamond.color}
                              </p>
                              <span className="text-primary text-[10px] font-sans tracking-widest uppercase">₹{diamond.price.toLocaleString()}</span>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-20">
                          <p className="font-sans text-xs text-stone-500 uppercase tracking-widest">No direct matches found. Try another image.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VisualSearch;

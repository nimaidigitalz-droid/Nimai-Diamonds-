import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CounterProps {
  value: number;
  places: number[];
  fontSize?: number;
  padding?: number;
  gap?: number;
  textColor?: string;
  fontWeight?: number;
  digitPlaceHolders?: boolean;
}

interface DigitColumnProps {
  digit: string;
  index: number;
  fontSize: number;
  fontWeight: number;
  textColor: string;
  gap: number;
  digitPlaceHolders: boolean;
}

const DigitColumn: React.FC<DigitColumnProps> = ({
  digit,
  index,
  fontSize,
  fontWeight,
  textColor,
  gap,
  digitPlaceHolders,
}) => {
  const isNumber = !isNaN(parseInt(digit));
  
  if (!isNumber) {
    return (
      <div style={{ fontSize, fontWeight, color: textColor, padding: 5, margin: `0 ${gap / 2}px` }} className="font-display">
        {digit}
      </div>
    );
  }

  const currentDigit = parseInt(digit);
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div 
      className="relative overflow-hidden flex flex-col items-center" 
      style={{ 
        height: fontSize * 1.1, 
        width: fontSize * 0.65, 
        margin: `0 ${gap / 2}px`,
        backgroundColor: digitPlaceHolders ? 'rgba(255,255,255,0.03)' : 'transparent',
        borderRadius: '4px'
      }}
    >
      <motion.div
        initial={false}
        animate={{ y: -currentDigit * fontSize * 1.1 }}
        transition={{ type: 'spring', stiffness: 40, damping: 12 }}
        className="flex flex-col items-center"
      >
        {digits.map((d) => (
          <div
            key={d}
            className="font-display"
            style={{
              fontSize,
              fontWeight,
              color: textColor,
              height: fontSize * 1.1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1
            }}
          >
            {d}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Counter: React.FC<CounterProps> = ({
  value,
  places,
  fontSize = 80,
  padding = 5,
  gap = 10,
  textColor = 'white',
  fontWeight = 900,
  digitPlaceHolders = false,
}) => {
  const formatValue = (val: number) => {
    const s = val.toString();
    if (!digitPlaceHolders) return s;
    
    const [int, dec] = s.split('.');
    const paddedInt = int.padStart(3, '0');
    return dec ? `${paddedInt}.${dec}` : paddedInt;
  };

  const displayStr = formatValue(value);

  return (
    <div className="flex items-center justify-center tabular-nums">
      {displayStr.split('').map((char, idx) => (
        <DigitColumn 
          key={idx} 
          digit={char} 
          index={idx} 
          fontSize={fontSize}
          fontWeight={fontWeight}
          textColor={textColor}
          gap={gap}
          digitPlaceHolders={digitPlaceHolders}
        />
      ))}
    </div>
  );
};

export default Counter;

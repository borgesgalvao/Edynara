import React from 'react';

interface FloralBrandProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  subtitle?: string;
  className?: string;
  align?: 'center' | 'left';
  subtitleClassName?: string;
  titleClassName?: string;
  subtitleStyle?: React.CSSProperties;
}

export const FloralBrand: React.FC<FloralBrandProps> = ({
  size = 'md',
  subtitle = 'Estética de Unhas por Elydnara',
  className = '',
  align = 'center',
  subtitleClassName = '',
  titleClassName = '',
  subtitleStyle,
}) => {
  const isCenter = align === 'center';

  const sizeClasses = {
    sm: 'text-3xl sm:text-4xl',
    md: 'text-4xl sm:text-5xl md:text-6xl',
    lg: 'text-5xl sm:text-6xl md:text-7xl',
    xl: 'text-6xl sm:text-7xl md:text-8xl',
  };

  const flowerSize = {
    sm: 24,
    md: 36,
    lg: 48,
    xl: 60,
  };

  const fSize = flowerSize[size];

  return (
    <div
      id="brand-elydnara"
      className={`relative inline-flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      {/* Decorative floral garland / flowers around the cursive text */}
      <div className="relative flex items-center justify-center gap-2 sm:gap-4 select-none">
        {/* Left Rose & Floral Accent */}
        <div className="flex items-center gap-1.5 text-[#F4A6B8] flex-shrink-0">
          <span className="text-xl sm:text-2xl text-pink-300 select-none animate-pulse">✿</span>
          <svg
            width={fSize}
            height={fSize}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-sm hidden sm:block"
          >
            {/* Vine stem */}
            <path
              d="M10 65 C 30 75, 50 60, 75 40"
              stroke="#8EA785"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Botanical leaves */}
            <path
              d="M25 65 C 20 50, 35 48, 38 60 C 32 68, 26 68, 25 65 Z"
              fill="#A2BA99"
              stroke="#6B8861"
              strokeWidth="1.5"
            />
            <path
              d="M48 56 C 55 42, 68 45, 62 55 C 56 61, 50 60, 48 56 Z"
              fill="#8EA785"
              stroke="#6B8861"
              strokeWidth="1.5"
            />
            {/* Rose blossom */}
            <g transform="translate(60, 20)">
              <path
                d="M18 10 C 28 2, 38 10, 34 22 C 30 30, 16 34, 10 24 C 6 16, 10 12, 18 10 Z"
                fill="#FAD2DC"
                stroke="#D64D6E"
                strokeWidth="1.5"
              />
              <path
                d="M8 18 C 0 25, 6 36, 18 36 C 26 36, 32 28, 28 20 C 24 12, 12 12, 8 18 Z"
                fill="#F7B2C2"
                stroke="#D64D6E"
                strokeWidth="1.5"
              />
              <path
                d="M16 16 C 14 10, 24 10, 22 18 C 20 22, 14 22, 16 16 Z"
                fill="#D64D6E"
              />
            </g>
            <circle cx="20" cy="40" r="3.5" fill="#F49EB0" />
            <circle cx="85" cy="65" r="2.5" fill="#D64D6E" />
          </svg>
        </div>

        {/* Cursive Name "Elydnara" */}
        <div className="relative py-1 px-1 sm:px-2">
          <span
            className={`font-cursive font-bold text-[#D64D6E] ${titleClassName || sizeClasses[size]} drop-shadow-sm leading-none block`}
            style={{
              textShadow: '0 2px 8px rgba(214, 77, 110, 0.2)',
            }}
          >
            Elydnara
          </span>
          {/* Floral flourish underline */}
          <div className="absolute -bottom-1 left-0 right-0 flex items-center justify-center opacity-80">
            <svg
              className="w-full h-2.5 max-w-[170px]"
              viewBox="0 0 200 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 8 Q 50 14, 100 8 Q 150 2, 195 8"
                stroke="#D64D6E"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="100" cy="8" r="3.5" fill="#D64D6E" />
              <circle cx="88" cy="8" r="2" fill="#FAD2DC" />
              <circle cx="112" cy="8" r="2" fill="#FAD2DC" />
            </svg>
          </div>
        </div>

        {/* Right Rose & Floral Accent */}
        <div className="flex items-center gap-1.5 text-[#F4A6B8] flex-shrink-0">
          <svg
            width={fSize}
            height={fSize}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-sm -scale-x-100 hidden sm:block"
          >
            <path
              d="M10 65 C 30 75, 50 60, 75 40"
              stroke="#8EA785"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M25 65 C 20 50, 35 48, 38 60 C 32 68, 26 68, 25 65 Z"
              fill="#A2BA99"
              stroke="#6B8861"
              strokeWidth="1.5"
            />
            <path
              d="M48 56 C 55 42, 68 45, 62 55 C 56 61, 50 60, 48 56 Z"
              fill="#8EA785"
              stroke="#6B8861"
              strokeWidth="1.5"
            />
            <g transform="translate(60, 20)">
              <path
                d="M18 10 C 28 2, 38 10, 34 22 C 30 30, 16 34, 10 24 C 6 16, 10 12, 18 10 Z"
                fill="#FAD2DC"
                stroke="#D64D6E"
                strokeWidth="1.5"
              />
              <path
                d="M8 18 C 0 25, 6 36, 18 36 C 26 36, 32 28, 28 20 C 24 12, 12 12, 8 18 Z"
                fill="#F7B2C2"
                stroke="#D64D6E"
                strokeWidth="1.5"
              />
              <path
                d="M16 16 C 14 10, 24 10, 22 18 C 20 22, 14 22, 16 16 Z"
                fill="#D64D6E"
              />
            </g>
            <circle cx="20" cy="40" r="3.5" fill="#F49EB0" />
            <circle cx="85" cy="65" r="2.5" fill="#D64D6E" />
          </svg>
          <span className="text-xl sm:text-2xl text-pink-300 select-none animate-pulse">✿</span>
        </div>
      </div>

      {subtitle && (
        <span
          className={`mt-1 uppercase tracking-[0.3em] font-semibold ${subtitleClassName ? subtitleClassName : 'text-xs text-[#7ca685]'}`}
          style={subtitleStyle}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
};

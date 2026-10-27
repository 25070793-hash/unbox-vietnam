import React, { useState } from 'react';
import { CharacterId } from '../../types';
import { CHARACTER_IMAGES } from '../../data/characters';

interface CharacterArtProps {
  id: CharacterId;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alt?: string;
}

export const CharacterArt: React.FC<CharacterArtProps> = ({
  id,
  className = '',
  size = 'md',
  alt,
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-48 h-48 md:w-56 md:h-56',
    lg: 'w-64 h-64 md:w-80 md:h-80',
    xl: 'w-80 h-80 md:w-96 md:h-96',
  }[size];

  const imageSrc = CHARACTER_IMAGES[id] || `/images/${id}.jpg`;

  if (!hasError && imageSrc) {
    return (
      <div
        className={`relative flex items-center justify-center rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF6F0] p-1.5 shadow-md border border-[#B45309]/20 group-hover:border-[#B45309]/50 transition-all ${sizeClasses} ${className}`}
      >
        <img
          src={imageSrc}
          alt={alt || id}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-105"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Graceful SVG Fallback when 3D raster image fails to load
  return <SvgFallbackArt id={id} sizeClasses={sizeClasses} className={className} />;
};

const SvgFallbackArt: React.FC<{
  id: CharacterId;
  sizeClasses: string;
  className?: string;
}> = ({ id, sizeClasses, className = '' }) => {
  switch (id) {
    case 'crybaby-co-tam':
      return (
        <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-[#FFF1F2] to-[#FECDD3] p-4 shadow-inner border border-[#FDA4AF]/40 ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
            <ellipse cx="120" cy="205" rx="80" ry="16" fill="#991B1B" fillOpacity="0.12" />
            <circle cx="120" cy="108" r="44" fill="#FED7AA" stroke="#BE123C" strokeWidth="2.5" />
            <path d="M78 95 C88 66, 120 60, 120 72 C120 60, 152 66, 162 95 Z" fill="#1C1917" />
            <circle cx="102" cy="108" r="7.5" fill="#1E293B" />
            <circle cx="138" cy="108" r="7.5" fill="#1E293B" />
            <path d="M102 116 C95 125, 96 136, 102 140 C108 136, 109 125, 102 116 Z" fill="#38BDF8" />
            <path d="M138 116 C131 125, 132 136, 138 140 C144 136, 145 125, 138 116 Z" fill="#38BDF8" />
          </svg>
        </div>
      );
    case 'hirono-tra-da':
      return (
        <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-[#F0FDFA] to-[#99F6E4] p-4 shadow-inner border border-[#5EEAD4]/40 ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
            <ellipse cx="120" cy="210" rx="85" ry="15" fill="#134E4A" fillOpacity="0.14" />
            <circle cx="110" cy="102" r="42" fill="#FDE68A" stroke="#B45309" strokeWidth="2.2" />
            <ellipse cx="94" cy="104" rx="6" ry="7" fill="#0F172A" />
            <ellipse cx="126" cy="104" rx="6" ry="7" fill="#0F172A" />
          </svg>
        </div>
      );
    case 'labubu-chu-teu':
      return (
        <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-[#FEF2F2] to-[#FECACA] p-4 shadow-inner border border-[#F87171]/40 ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
            <ellipse cx="120" cy="208" rx="88" ry="14" fill="#0284C7" fillOpacity="0.22" />
            <circle cx="120" cy="105" r="46" fill="#FFF7ED" stroke="#991B1B" strokeWidth="2.5" />
            <path d="M88 118 Q120 145 152 118 Z" fill="#991B1B" />
          </svg>
        </div>
      );
    case 'sweetbean-to-he':
      return (
        <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-[#FFF7ED] to-[#FED7AA] p-4 shadow-inner border border-[#FB923C]/40 ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
            <circle cx="120" cy="102" r="44" fill="#FFFBEB" stroke="#EA580C" strokeWidth="2.5" />
          </svg>
        </div>
      );
    case 'hacipupu-si-tu':
      return (
        <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-[#FEFCE8] to-[#FEF08A] p-4 shadow-inner border border-[#EAB308]/40 ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
            <circle cx="120" cy="110" r="42" fill="#FEF3C7" stroke="#A16207" strokeWidth="2.2" />
          </svg>
        </div>
      );
    case 'skullpanda-nhat-binh':
      return (
        <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-[#FAF5FF] to-[#E9D5FF] p-4 shadow-inner border border-[#C084FC]/40 ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
            <circle cx="120" cy="100" r="42" fill="#FAF5FF" stroke="#6B21A8" strokeWidth="2" />
          </svg>
        </div>
      );
    case 'pucky-ca-chep':
      return (
        <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-[#FFFBEB] to-[#FDE68A] p-4 shadow-inner border border-[#F59E0B]/40 ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
            <circle cx="120" cy="80" r="70" fill="#FEF08A" fillOpacity="0.45" />
            <ellipse cx="120" cy="104" rx="34" ry="32" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
          </svg>
        </div>
      );
  }
};

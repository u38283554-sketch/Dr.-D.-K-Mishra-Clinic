import React from 'react';
import { Stethoscope } from 'lucide-react';

interface DoctorPhotoPlaceholderProps {
  photoUrl?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export const DoctorPhotoPlaceholder: React.FC<DoctorPhotoPlaceholderProps> = ({
  photoUrl,
  name,
  size = 'lg',
  className = '',
  showBadge = true
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16 text-xs',
    md: 'w-24 h-24 text-sm',
    lg: 'w-48 h-48 md:w-56 md:h-56 text-base',
    xl: 'w-64 h-64 md:w-72 md:h-72 text-lg'
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 48,
    xl: 60
  };

  if (photoUrl) {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 ${sizeClasses[size]} ${className}`}>
        <img
          src={photoUrl}
          alt={`Doctor photograph of ${name}`}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
        />
        {showBadge && (
          <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded tracking-wide">
            Verified Photo
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100/90 text-slate-400 select-none shadow-xs ${sizeClasses[size]} ${className}`}
      aria-label={`Profile placeholder for ${name}`}
    >
      <div className="flex flex-col items-center text-center p-4">
        <div className="w-16 h-16 rounded-full bg-slate-200/70 border border-slate-300/60 flex items-center justify-center text-slate-600 mb-3">
          <Stethoscope size={iconSizes[size] > 40 ? 32 : 24} className="stroke-[1.5]" />
        </div>
        <span className="font-semibold text-slate-700 text-xs tracking-tight">{name}</span>
        <span className="text-[11px] text-slate-400 mt-1 font-normal leading-tight">Official Photo Pending</span>
      </div>
    </div>
  );
};

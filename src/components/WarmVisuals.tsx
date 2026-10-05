import React from 'react';
import {
  DIMENSIONS,
  DIMENSION_LIST,
  DimensionKey
} from '../data/assessmentData';

interface WarmRadarChartProps {
  scores: Record<DimensionKey, number>;
  selectedDim: DimensionKey;
  onSelectDim: (dim: DimensionKey) => void;
  isGlowActive?: boolean;
  glowKey?: number;
}

export const WarmRadarChart: React.FC<WarmRadarChartProps> = ({
  scores,
  selectedDim,
  onSelectDim,
  isGlowActive = false,
  glowKey = 0
}) => {
  const size = 320;
  const center = size / 2;
  const maxRadius = 84;
  const levels = [0.25, 0.5, 0.75, 1];
  const activeColor = DIMENSIONS[selectedDim]?.color || '#D95D39';

  const getCoordinates = (index: number, ratio: number) => {
    const angle = (Math.PI * 2 * index) / DIMENSION_LIST.length - Math.PI / 2;
    const r = maxRadius * ratio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const buildLevelPolygon = (ratio: number) => {
    return DIMENSION_LIST.map((_, i) => {
      const { x, y } = getCoordinates(i, ratio);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const dataPoints = DIMENSION_LIST.map((dim, i) => {
    const val = Math.max(25, Math.min(100, scores[dim.key] || 60));
    const ratio = val / 100;
    return {
      ...getCoordinates(i, ratio),
      dim,
      val
    };
  });

  const dataPolygon = dataPoints
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[290px] h-auto select-none overflow-visible"
        role="img"
        aria-label="六维能力雷达图，轻触顶点可查看详情"
      >
        <defs>
          <linearGradient id="warmRadarFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D95D39" stopOpacity="0.34" />
            <stop offset="50%" stopColor="#E69A28" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#7A8B68" stopOpacity="0.24" />
          </linearGradient>
          <radialGradient id={`dimHalo-${selectedDim}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={activeColor} stopOpacity={isGlowActive ? "0.45" : "0.28"} />
            <stop offset="55%" stopColor={activeColor} stopOpacity={isGlowActive ? "0.22" : "0.10"} />
            <stop offset="100%" stopColor="#FFFDF9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="epicShockwave" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={activeColor} stopOpacity="0.35" />
            <stop offset="70%" stopColor={activeColor} stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="warmGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#D95D39" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* Ambient Transient Radiant Wave on Selected Dimension */}
        <circle
          key={`halo-${selectedDim}-${glowKey}`}
          cx={center}
          cy={center}
          r={isGlowActive ? "105" : "88"}
          fill={`url(#dimHalo-${selectedDim})`}
          className="transition-all duration-500 ease-out pointer-events-none"
        />

        {/* Dynamic Expanding Shockwave Ring on Tap */}
        {isGlowActive && (
          <circle
            key={`pulse-wave-${glowKey}`}
            cx={center}
            cy={center}
            r="120"
            fill="none"
            stroke={activeColor}
            strokeWidth="2.5"
            strokeOpacity="0.4"
            className="animate-ping pointer-events-none"
          />
        )}

        {levels.map((levelRatio, idx) => (
          <polygon
            key={idx}
            points={buildLevelPolygon(levelRatio)}
            fill={idx === levels.length - 1 ? '#FBF8F3' : 'none'}
            fillOpacity={idx === levels.length - 1 ? 0.6 : 0}
            stroke="#E5DACB"
            strokeWidth={idx === levels.length - 1 ? 1.5 : 1}
            strokeDasharray={idx < levels.length - 1 ? '3 3' : undefined}
          />
        ))}

        {DIMENSION_LIST.map((_, i) => {
          const end = getCoordinates(i, 1);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="#E5DACB"
              strokeWidth="1"
            />
          );
        })}

        <polygon
          points={dataPolygon}
          fill="url(#warmRadarFill)"
          stroke="#D95D39"
          strokeWidth="2.5"
          strokeLinejoin="round"
          filter="url(#warmGlow)"
          className="transition-all duration-300 ease-out"
        />

        {dataPoints.map((pt, i) => {
          const labelPos = getCoordinates(i, 1.34);
          const isSelected = selectedDim === pt.dim.key;

          return (
            <g
              key={pt.dim.key}
              onClick={() => onSelectDim(pt.dim.key)}
              className="cursor-pointer group"
            >
              {/* Generous touch hitbox >= 44x44px for thumb tap */}
              <circle
                cx={labelPos.x}
                cy={labelPos.y}
                r="24"
                fill="transparent"
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r="20"
                fill="transparent"
              />

              {isSelected && (
                <>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="15"
                    fill={pt.dim.color}
                    fillOpacity="0.25"
                    className="animate-ping pointer-events-none"
                  />
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="10"
                    fill={pt.dim.color}
                    fillOpacity="0.3"
                  />
                </>
              )}

              <circle
                cx={pt.x}
                cy={pt.y}
                r={isSelected ? 5 : 3.5}
                fill={isSelected ? pt.dim.color : '#FFFDF9'}
                stroke={pt.dim.color}
                strokeWidth="2"
              />

              <text
                x={labelPos.x}
                y={labelPos.y - 5}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[11px] transition-colors ${
                  isSelected
                    ? 'font-bold fill-[#D95D39]'
                    : 'font-medium fill-[#4A3F37]'
                }`}
              >
                {pt.dim.shortName}
              </text>
              <text
                x={labelPos.x}
                y={labelPos.y + 9}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[10px] tabular-nums ${
                  isSelected
                    ? 'font-bold fill-[#D95D39]'
                    : 'fill-[#8A7D73]'
                }`}
              >
                {pt.val}分
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

interface VisualSceneIllustrationProps {
  type: 'garden' | 'workshop' | 'library' | 'campfire';
  selected: boolean;
}

export const VisualSceneIllustration: React.FC<VisualSceneIllustrationProps> = ({
  type,
  selected
}) => {
  const strokeColor = selected ? '#D95D39' : '#8C7A6B';
  const accentFill = selected ? '#FCE8DF' : '#F4ECE1';

  switch (type) {
    case 'garden':
      return (
        <svg viewBox="0 0 80 56" className="w-16 h-12 shrink-0" aria-hidden="true">
          <rect x="4" y="6" width="72" height="44" rx="10" fill={accentFill} />
          <circle cx="24" cy="22" r="7" fill="#E69A28" fillOpacity="0.35" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M18 42 C24 30, 36 30, 42 42" stroke={strokeColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M46 18 L62 18 L58 38 L42 38 Z" fill="#FFFDF9" stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="52" cy="27" r="3" fill="#D95D39" />
        </svg>
      );
    case 'workshop':
      return (
        <svg viewBox="0 0 80 56" className="w-16 h-12 shrink-0" aria-hidden="true">
          <rect x="4" y="6" width="72" height="44" rx="10" fill={accentFill} />
          <path d="M22 16 L36 16 L40 26 L18 26 Z" fill="#FFFDF9" stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="29" y1="26" x2="29" y2="38" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="16" y1="38" x2="64" y2="38" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
          <rect x="46" y="24" width="12" height="14" rx="2" fill="#E69A28" fillOpacity="0.3" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );
    case 'library':
      return (
        <svg viewBox="0 0 80 56" className="w-16 h-12 shrink-0" aria-hidden="true">
          <rect x="4" y="6" width="72" height="44" rx="10" fill={accentFill} />
          <rect x="16" y="14" width="48" height="28" rx="4" fill="#FFFDF9" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="28" cy="28" r="4" fill="#D95D39" fillOpacity="0.3" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="50" cy="22" r="4" fill="#E69A28" fillOpacity="0.3" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="52" cy="34" r="4" fill="#7A8B68" fillOpacity="0.3" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="32" y1="26" x2="46" y2="23" stroke={strokeColor} strokeWidth="1.4" />
          <line x1="32" y1="30" x2="48" y2="33" stroke={strokeColor} strokeWidth="1.4" />
        </svg>
      );
    case 'campfire':
      return (
        <svg viewBox="0 0 80 56" className="w-16 h-12 shrink-0" aria-hidden="true">
          <rect x="4" y="6" width="72" height="44" rx="10" fill={accentFill} />
          <path d="M40 15 C46 23, 49 29, 40 37 C31 29, 34 23, 40 15 Z" fill="#D95D39" fillOpacity="0.3" stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M22 36 C22 30, 30 30, 30 36" stroke={strokeColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M50 36 C50 30, 58 30, 58 36" stroke={strokeColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <line x1="30" y1="40" x2="50" y2="40" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
};

export const WarmSunIllustration: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="sunWarmth" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F5B041" stopOpacity="0.45" />
        <stop offset="65%" stopColor="#E57348" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#FBF8F3" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="60" cy="60" r="54" fill="url(#sunWarmth)" />
    <circle cx="60" cy="60" r="26" fill="#FFFDF9" stroke="#D95D39" strokeWidth="2" />
    <circle cx="60" cy="60" r="16" fill="#D95D39" fillOpacity="0.18" />
    <path
      d="M60 20 L60 28 M60 92 L60 100 M20 60 L28 60 M92 60 L100 60 M32 32 L38 38 M82 82 L88 88 M88 32 L82 38 M38 82 L32 88"
      stroke="#D95D39"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// ==================== BESPOKE PERFUME BOTTLE VISUALS (6 DISTINCT HAUTE PARFUMS) ====================
export interface BespokePerfumeBottleProps {
  dimension: DimensionKey;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BespokePerfumeBottle: React.FC<BespokePerfumeBottleProps> = ({
  dimension,
  className = '',
  size = 'md'
}) => {
  const pixelSize = size === 'sm' ? 44 : size === 'lg' ? 88 : 56;

  switch (dimension) {
    case 'creative':
      // French Vintage Cut-Crystal Flacon with Silk Atomizer Bulb & Rose-Gold Filigree
      return (
        <svg
          viewBox="0 0 64 64"
          width={pixelSize}
          height={pixelSize}
          className={`shrink-0 ${className}`}
          aria-label="晨曦浮光 · 极光水晶刻花喷雾瓶"
        >
          <defs>
            <linearGradient id="creativeLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAD0C4" />
              <stop offset="60%" stopColor="#FFD1FF" />
              <stop offset="100%" stopColor="#FBC2EB" />
            </linearGradient>
            <linearGradient id="goldCap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F6D365" />
              <stop offset="100%" stopColor="#FDA085" />
            </linearGradient>
          </defs>
          {/* Bulb Atomizer on side */}
          <path d="M12 28 C8 24 8 18 14 18 C19 18 20 22 17 26 Z" fill="url(#goldCap)" stroke="#C88257" strokeWidth="1" />
          <path d="M16 22 Q24 20 28 23" fill="none" stroke="#C88257" strokeWidth="1.5" strokeDasharray="1.5 1" />
          {/* Vintage Crystal Cap */}
          <path d="M27 18 L37 18 L35 24 L29 24 Z" fill="url(#goldCap)" stroke="#B87333" strokeWidth="1" />
          <rect x="30" y="14" width="4" height="4" rx="1" fill="#E67E22" />
          {/* Crystal Bottle Body */}
          <path
            d="M23 26 C21 34 18 48 23 54 C26 57 38 57 41 54 C46 48 43 34 41 26 Z"
            fill="url(#creativeLiquid)"
            stroke="#D98880"
            strokeWidth="1.5"
          />
          {/* Crystal Facet Cut Lines */}
          <path d="M28 26 L27 54 M36 26 L37 54 M23 40 L41 40" stroke="#FFF" strokeWidth="1.2" strokeOpacity="0.8" />
          {/* Spray fine droplets */}
          <circle cx="39" cy="12" r="1" fill="#E07A5F" opacity="0.9" />
          <circle cx="43" cy="14" r="1.2" fill="#E07A5F" opacity="0.8" />
          <circle cx="46" cy="11" r="0.8" fill="#E07A5F" opacity="0.7" />
          <circle cx="40" cy="8" r="0.9" fill="#E07A5F" opacity="0.6" />
        </svg>
      );

    case 'logical':
      // Nordic Geometric Octagonal Iceberg Crystal Flask with Silver Cap & Cool Pine Tea Fluid
      return (
        <svg
          viewBox="0 0 64 64"
          width={pixelSize}
          height={pixelSize}
          className={`shrink-0 ${className}`}
          aria-label="星图冷杉 · 几何棱镜极简冷冽方瓶"
        >
          <defs>
            <linearGradient id="logicalLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A8DADC" />
              <stop offset="60%" stopColor="#457B9D" />
              <stop offset="100%" stopColor="#1D3557" />
            </linearGradient>
            <linearGradient id="silverCap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          {/* Magnetic Silver Block Cap */}
          <rect x="25" y="12" width="14" height="12" rx="1.5" fill="url(#silverCap)" stroke="#334155" strokeWidth="1" />
          <line x1="25" y1="18" x2="39" y2="18" stroke="#CBD5E1" strokeWidth="0.8" />
          {/* Octagonal Heavy Crystal Flacon */}
          <polygon
            points="22,26 42,26 48,32 48,50 42,56 22,56 16,50 16,32"
            fill="url(#logicalLiquid)"
            stroke="#2B4C6F"
            strokeWidth="1.5"
          />
          {/* Inner Facet Reflection Lines */}
          <polygon
            points="24,29 40,29 45,34 45,47 40,53 24,53 19,47 19,34"
            fill="none"
            stroke="#E0F2FE"
            strokeWidth="1"
            strokeOpacity="0.75"
          />
          <line x1="32" y1="26" x2="32" y2="56" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" />
        </svg>
      );

    case 'empathy':
      // Oriental Smooth Porcelain Pebble Flacon with Rose Silk Ribbon Bow
      return (
        <svg
          viewBox="0 0 64 64"
          width={pixelSize}
          height={pixelSize}
          className={`shrink-0 ${className}`}
          aria-label="春水初生 · 白瓷描金温润鹅卵石香氛瓶"
        >
          <defs>
            <linearGradient id="empathyLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="50%" stopColor="#FFE5D9" />
              <stop offset="100%" stopColor="#FFCAD4" />
            </linearGradient>
            <linearGradient id="roseRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E07A5F" />
              <stop offset="100%" stopColor="#D95D39" />
            </linearGradient>
          </defs>
          {/* Porcelain Stopper */}
          <circle cx="32" cy="16" r="6" fill="#FFFDF9" stroke="#E2B183" strokeWidth="1.2" />
          <circle cx="32" cy="16" r="2.5" fill="#E2B183" />
          {/* Silk Ribbon Bow */}
          <path d="M26 23 C22 20 21 26 28 24 Z" fill="url(#roseRibbon)" />
          <path d="M38 23 C42 20 43 26 36 24 Z" fill="url(#roseRibbon)" />
          <circle cx="32" cy="23.5" r="2.2" fill="#C84B31" />
          {/* Soft Organic Pebble Porcelain Body */}
          <path
            d="M32 25 C18 25 15 36 17 48 C19 55 25 58 32 58 C39 58 45 55 47 48 C49 36 46 25 32 25 Z"
            fill="url(#empathyLiquid)"
            stroke="#E2B183"
            strokeWidth="1.5"
          />
          {/* Golden Contour Brushwork line */}
          <path d="M22 36 Q32 30 42 36" fill="none" stroke="#E5A93C" strokeWidth="1.2" strokeOpacity="0.8" />
          {/* Heart Motif on Bottle */}
          <path d="M32 44 C30 40 26 40 26 43 C26 47 32 50 32 50 C32 50 38 47 38 43 C38 40 34 40 32 44 Z" fill="#F4A261" fillOpacity="0.45" />
        </svg>
      );

    case 'execution':
      // Modern Slender Metallic Cylinder Wand Flacon with Rose Gold Exoskeleton
      return (
        <svg
          viewBox="0 0 64 64"
          width={pixelSize}
          height={pixelSize}
          className={`shrink-0 ${className}`}
          aria-label="晨曦燧火 · 鎏金流光细颈细管香水权杖"
        >
          <defs>
            <linearGradient id="executionLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9D423" />
              <stop offset="50%" stopColor="#FF4E50" />
              <stop offset="100%" stopColor="#E65C00" />
            </linearGradient>
            <linearGradient id="goldScepter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7971E" />
              <stop offset="100%" stopColor="#FFD200" />
            </linearGradient>
          </defs>
          {/* Sprayer Pump Button */}
          <rect x="29" y="10" width="6" height="5" rx="1" fill="#D35400" />
          <path d="M26 15 L38 15 L37 22 L27 22 Z" fill="url(#goldScepter)" stroke="#BA4A00" strokeWidth="1" />
          {/* Slender Sleek Flacon Cylinder */}
          <rect x="25" y="22" width="14" height="34" rx="7" fill="url(#executionLiquid)" stroke="#C0392B" strokeWidth="1.5" />
          {/* Rose Gold Vertical Spine & Graduation Marks */}
          <line x1="32" y1="23" x2="32" y2="55" stroke="#FFF" strokeWidth="1.2" strokeOpacity="0.8" />
          <line x1="28" y1="30" x2="31" y2="30" stroke="#FFF" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="28" y1="38" x2="31" y2="38" stroke="#FFF" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="28" y1="46" x2="31" y2="46" stroke="#FFF" strokeWidth="1" strokeOpacity="0.8" />
          {/* Energetic High-Speed Particle Sparks */}
          <circle cx="43" cy="18" r="1.5" fill="#F39C12" />
          <path d="M42 22 L45 25" stroke="#E67E22" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'exploration':
      // Astrolabe Teardrop Flask with Brass Compass Neck & Azure Sea Fluid
      return (
        <svg
          viewBox="0 0 64 64"
          width={pixelSize}
          height={pixelSize}
          className={`shrink-0 ${className}`}
          aria-label="星海深蓝 · 悬浮星河水滴罗盘香水瓶"
        >
          <defs>
            <linearGradient id="oceanLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#48CAE4" />
              <stop offset="60%" stopColor="#0077B6" />
              <stop offset="100%" stopColor="#03045E" />
            </linearGradient>
            <linearGradient id="brassGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="100%" stopColor="#D4A373" />
            </linearGradient>
          </defs>
          {/* Brass Astrolabe Compass Ring Stopper */}
          <circle cx="32" cy="15" r="5" fill="none" stroke="url(#brassGold)" strokeWidth="1.5" />
          <circle cx="32" cy="15" r="1.5" fill="#D4A373" />
          <line x1="32" y1="9" x2="32" y2="21" stroke="#D4A373" strokeWidth="1" />
          <line x1="26" y1="15" x2="38" y2="15" stroke="#D4A373" strokeWidth="1" />
          {/* Teardrop Glass Flacon */}
          <path
            d="M32 23 C30 23 20 34 20 44 C20 52 25 57 32 57 C39 57 44 52 44 44 C44 34 34 23 32 23 Z"
            fill="url(#oceanLiquid)"
            stroke="#0096C7"
            strokeWidth="1.5"
          />
          {/* Inner Floating Shimmer Waves & Stars */}
          <path d="M23 44 Q32 38 41 44" fill="none" stroke="#90E0EF" strokeWidth="1.2" strokeOpacity="0.8" />
          <circle cx="28" cy="40" r="1" fill="#FFF" />
          <circle cx="35" cy="48" r="1.2" fill="#FFF" />
          <circle cx="31" cy="51" r="0.8" fill="#FFF" />
        </svg>
      );

    case 'craft':
      // Deep Jade Frosted Square Apothecary Dropper Flacon with Pipette & Wax Stamp
      return (
        <svg
          viewBox="0 0 64 64"
          width={pixelSize}
          height={pixelSize}
          className={`shrink-0 ${className}`}
          aria-label="月映竹溪 · 墨玉磨砂圆润静心香精油滴瓶"
        >
          <defs>
            <linearGradient id="craftLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#52B788" />
              <stop offset="50%" stopColor="#2D6A4F" />
              <stop offset="100%" stopColor="#081C15" />
            </linearGradient>
            <linearGradient id="rubberBulb" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A5568" />
              <stop offset="100%" stopColor="#1A202C" />
            </linearGradient>
          </defs>
          {/* Black Rubber Pipette Squeeze Bulb */}
          <path d="M29 8 C29 5 35 5 35 8 L34 14 L30 14 Z" fill="url(#rubberBulb)" stroke="#1A202C" strokeWidth="1" />
          {/* Golden Collar with Glass Pipette Tube */}
          <rect x="27" y="14" width="10" height="4" rx="1" fill="#D4AF37" stroke="#996515" strokeWidth="1" />
          {/* Heavy Jade Glass Flacon */}
          <rect x="21" y="20" width="22" height="36" rx="4" fill="url(#craftLiquid)" stroke="#1B4332" strokeWidth="1.5" />
          {/* Frosted Inner Glass Tube */}
          <line x1="32" y1="18" x2="32" y2="48" stroke="#D8F3DC" strokeWidth="1.2" strokeOpacity="0.75" />
          {/* Cinnabar Wax Seal Stamp on Bottle Face */}
          <circle cx="32" cy="38" r="5" fill="#9B2226" stroke="#660708" strokeWidth="1" />
          <path d="M30 36 L34 40 M34 36 L30 40" stroke="#FFF" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
  }
};

// ==================== BESPOKE MANOR ARCHITECTURAL VISUALS (6 DISTINCT SANCTUARY DESIGNS) ====================
export interface BespokeManorSanctuaryProps {
  dimension: DimensionKey;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BespokeManorSanctuary: React.FC<BespokeManorSanctuaryProps> = ({
  dimension,
  className = '',
  size = 'md'
}) => {
  const pixelSize = size === 'sm' ? 52 : size === 'lg' ? 96 : 64;

  switch (dimension) {
    case 'creative':
      // French Glass Conservatory: Arched Wrought-Iron Glass Dome, Rose Trellis & Lake Water
      return (
        <svg
          viewBox="0 0 64 64"
          width={pixelSize}
          height={pixelSize}
          className={`shrink-0 ${className}`}
          aria-label="晨曦湖畔 · 挑高玫瑰玻璃穹顶温室花房庄园"
        >
          <defs>
            <linearGradient id="manorSky1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE2E4" />
              <stop offset="100%" stopColor="#E2ECE9" />
            </linearGradient>
            <linearGradient id="glassDome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#BEE1E6" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {/* Background Aura */}
          <rect width="64" height="64" rx="16" fill="url(#manorSky1)" />
          {/* Lake water ripple */}
          <path d="M6 56 Q32 52 58 56" stroke="#90E0EF" strokeWidth="2" fill="none" strokeOpacity="0.8" />
          {/* Conservatory Main Glass Greenhouse Body */}
          <rect x="14" y="28" width="36" height="24" rx="2" fill="url(#glassDome)" stroke="#8C6246" strokeWidth="1.2" />
          {/* Glass Dome Roof */}
          <path d="M14 28 C14 12 50 12 50 28 Z" fill="url(#glassDome)" stroke="#8C6246" strokeWidth="1.2" />
          {/* Wrought Iron Arches & Glass Panes */}
          <path d="M32 14 L32 52 M14 28 L50 28 M14 40 L50 40 M23 20 L23 52 M41 20 L41 52" stroke="#8C6246" strokeWidth="0.8" strokeOpacity="0.6" />
          {/* Double French Wood Entry Door */}
          <rect x="27" y="38" width="10" height="14" rx="2" fill="#E8B4B8" stroke="#8C6246" strokeWidth="1" />
          <line x1="32" y1="38" x2="32" y2="52" stroke="#8C6246" strokeWidth="0.8" />
          {/* Climbing Austin Roses on Edges */}
          <circle cx="12" cy="34" r="2.5" fill="#E07A5F" />
          <circle cx="15" cy="44" r="3" fill="#D95D39" />
          <circle cx="51" cy="36" r="2.8" fill="#E07A5F" />
          <circle cx="49" cy="46" r="3" fill="#D95D39" />
          {/* Floating Starlight Sparkle */}
          <circle cx="20" cy="12" r="1.2" fill="#FFF" />
          <circle cx="44" cy="10" r="1.5" fill="#FFF" />
        </svg>
      );

    case 'logical':
      // Mountain Cliff Observatory & Towering Walnut Library with Brass Starlight Telescope
      return (
        <svg
          viewBox="0 0 64 64"
          width={pixelSize}
          height={pixelSize}
          className={`shrink-0 ${className}`}
          aria-label="群山之巅 · 银河悬崖观星露台图书馆"
        >
          <defs>
            <linearGradient id="manorSky2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="100%" stopColor="#1C2541" />
            </linearGradient>
            <linearGradient id="domeBrass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0AAFF" />
              <stop offset="100%" stopColor="#7B2CBF" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#manorSky2)" />
          {/* Distant Snow Mountain Peaks */}
          <polygon points="6,56 22,36 34,56" fill="#3A506B" />
          <polygon points="26,56 46,30 60,56" fill="#475569" />
          {/* Mountain Peak Observatory Tower Base */}
          <rect x="22" y="32" width="20" height="24" rx="2" fill="#243447" stroke="#64748B" strokeWidth="1" />
          {/* Multi-story Library Windows glowing with warm amber light */}
          <rect x="25" y="36" width="5" height="7" rx="1" fill="#FEF08A" opacity="0.9" />
          <rect x="34" y="36" width="5" height="7" rx="1" fill="#FEF08A" opacity="0.9" />
          <rect x="25" y="46" width="5" height="7" rx="1" fill="#FDE047" opacity="0.85" />
          <rect x="34" y="46" width="5" height="7" rx="1" fill="#FDE047" opacity="0.85" />
          {/* Revolving Celestial Observatory Dome */}
          <path d="M20 32 C20 18 44 18 44 32 Z" fill="url(#domeBrass)" stroke="#C084FC" strokeWidth="1.2" />
          {/* Slit opening on Dome with Brass Astronomical Telescope pointing up */}
          <line x1="32" y1="20" x2="32" y2="32" stroke="#0B132B" strokeWidth="2.5" />
          <line x1="30" y1="26" x2="42" y2="14" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          {/* Constellation stars */}
          <circle cx="14" cy="14" r="1" fill="#FFF" />
          <circle cx="20" cy="10" r="1.5" fill="#FDE047" />
          <circle cx="48" cy="12" r="1.2" fill="#FFF" />
          <circle cx="54" cy="22" r="1" fill="#FDE047" />
        </svg>
      );

    case 'empathy':
      // Spring Tea Cottage Courtyard: Wooden Pergola Tea House, Hydrangeas & Steaming Kettle
      return (
        <svg
          viewBox="0 0 64 64"
          width={pixelSize}
          height={pixelSize}
          className={`shrink-0 ${className}`}
          aria-label="暖阳茶舍 · 春水绣球花温室小院"
        >
          <defs>
            <linearGradient id="manorSky3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#DCFCE7" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#manorSky3)" />
          {/* Warm Sun in corner */}
          <circle cx="52" cy="14" r="6" fill="#F59E0B" fillOpacity="0.4" />
          {/* Wooden Tea Cottage Eaves / Slanted Pagoda Roof */}
          <polygon points="12,28 32,16 52,28" fill="#B45309" stroke="#78350F" strokeWidth="1.2" />
          <path d="M10 28 L54 28" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          {/* Cottage Wooden Wall & Windows */}
          <rect x="18" y="29" width="28" height="23" rx="1" fill="#FFFDF9" stroke="#78350F" strokeWidth="1" />
          {/* Japanese-style grid window with warm tea lantern glow */}
          <rect x="23" y="34" width="8" height="10" rx="1" fill="#FDE68A" stroke="#B45309" strokeWidth="0.8" />
          <line x1="27" y1="34" x2="27" y2="44" stroke="#B45309" strokeWidth="0.6" />
          <line x1="23" y1="39" x2="31" y2="39" stroke="#B45309" strokeWidth="0.6" />
          {/* Sliding Door */}
          <rect x="34" y="34" width="8" height="18" rx="1" fill="#FEE2E2" stroke="#B45309" strokeWidth="0.8" />
          {/* Steaming Cast-Iron Tea Kettle on Veranda */}
          <ellipse cx="14" cy="48" rx="3" ry="2" fill="#374151" />
          <path d="M14 46 Q13 42 15 39" fill="none" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="1 1" />
          {/* Lush Hydrangea Bushes (Pink & Lavender) */}
          <circle cx="12" cy="52" r="4.5" fill="#F472B6" />
          <circle cx="16" cy="54" r="3.5" fill="#C084FC" />
          <circle cx="48" cy="52" r="4.5" fill="#818CF8" />
          <circle cx="52" cy="54" r="3.5" fill="#F472B6" />
        </svg>
      );

    case 'execution':
      // Sunrise Orchard Modern Villa: Cantilevered Mountain Deck, Golden Sun & Orange Trees
      return (
        <svg
          viewBox="0 0 64 64"
          width={pixelSize}
          height={pixelSize}
          className={`shrink-0 ${className}`}
          aria-label="云端露台 · 日出果园与从容庄园"
        >
          <defs>
            <linearGradient id="manorSky4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="60%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#BBF7D0" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#manorSky4)" />
          {/* Radiant Giant Sunrise rising above horizon */}
          <circle cx="32" cy="28" r="12" fill="#EA580C" fillOpacity="0.85" />
          <circle cx="32" cy="28" r="8" fill="#FBBF24" />
          {/* Rolling Golden Mountain Hills */}
          <path d="M0 48 Q20 38 42 46 T64 42 L64 64 L0 64 Z" fill="#15803D" />
          <path d="M0 54 Q32 46 64 54 L64 64 L0 64 Z" fill="#166534" />
          {/* Cantilevered Modern Glass & Timber Villa on the Ridge */}
          <polygon points="20,38 44,38 40,48 16,48" fill="#FFFDF9" stroke="#9A3412" strokeWidth="1" />
          {/* Large Floor-to-ceiling panoramic glass windows */}
          <rect x="22" y="40" width="16" height="6" fill="#38BDF8" fillOpacity="0.75" />
          {/* Wooden Overhanging Deck */}
          <line x1="14" y1="48" x2="44" y2="48" stroke="#78350F" strokeWidth="2" />
          {/* Golden Citrus / Sweet Orange Fruit Trees */}
          <circle cx="10" cy="46" r="3.5" fill="#22C55E" />
          <circle cx="9" cy="45" r="1.2" fill="#F97316" />
          <circle cx="11" cy="47" r="1.2" fill="#F97316" />
          <circle cx="54" cy="44" r="4.5" fill="#22C55E" />
          <circle cx="53" cy="43" r="1.4" fill="#F97316" />
          <circle cx="56" cy="45" r="1.4" fill="#F97316" />
        </svg>
      );

    case 'exploration':
      // Ocean Cape Lighthouse & Sea Cliff Cabin: Spiraling Light Beam, Blue Waves & Starry Haven
      return (
        <svg
          viewBox="0 0 64 64"
          width={pixelSize}
          height={pixelSize}
          className={`shrink-0 ${className}`}
          aria-label="孤岛灯塔 · 听涛星光海岛营地"
        >
          <defs>
            <linearGradient id="manorSky5" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="60%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="lightBeam" x1="0%" y1="50%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#manorSky5)" />
          {/* Ocean Waves */}
          <path d="M0 50 Q16 46 32 50 T64 50 L64 64 L0 64 Z" fill="#0369A1" />
          <path d="M0 56 Q20 52 40 56 T64 56 L64 64 L0 64 Z" fill="#0C4A6E" />
          {/* Rocky Ocean Cliff on left */}
          <polygon points="6,60 14,38 28,44 26,60" fill="#334155" stroke="#1E293B" strokeWidth="1" />
          {/* Lighthouse Tower standing tall */}
          <polygon points="18,42 24,42 23,20 19,20" fill="#FFFDF9" stroke="#0F172A" strokeWidth="1" />
          {/* Red Stripes on Lighthouse */}
          <polygon points="18.5,34 23.5,34 23.2,30 18.8,30" fill="#EF4444" />
          <polygon points="19,26 23,26 22.8,22 19.2,22" fill="#EF4444" />
          {/* Lighthouse Lantern Room & Roof */}
          <rect x="18" y="17" width="6" height="3" fill="#FEF08A" stroke="#0F172A" strokeWidth="0.8" />
          <polygon points="17,17 21,12 25,17" fill="#1E293B" />
          {/* Light Beam shining across night ocean */}
          <polygon points="24,18 64,8 64,28" fill="url(#lightBeam)" />
          {/* Modern Expedition Tent / Cliff Cabin beside lighthouse */}
          <polygon points="28,48 38,40 44,48" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
          <polygon points="38,40 44,48 48,46 42,39" fill="#D97706" />
        </svg>
      );

    case 'craft':
      // Deep Bamboo Spring Pavilion: Serene Water Pavilion, Bamboo Forest & Stone Lantern
      return (
        <svg
          viewBox="0 0 64 64"
          width={pixelSize}
          height={pixelSize}
          className={`shrink-0 ${className}`}
          aria-label="竹林深处 · 水榭月影手作工坊"
        >
          <defs>
            <linearGradient id="manorSky6" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2ECE9" />
              <stop offset="60%" stopColor="#D8F3DC" />
              <stop offset="100%" stopColor="#B7E4C7" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#manorSky6)" />
          {/* Crescent Moon in Night/Dusk Sky */}
          <path d="M46 10 A7 7 0 0 0 54 18 A9 9 0 0 1 46 10 Z" fill="#FBBF24" />
          {/* Tall Bamboo Culms in background */}
          <line x1="8" y1="8" x2="8" y2="56" stroke="#2D6A4F" strokeWidth="1.8" />
          <line x1="14" y1="12" x2="14" y2="56" stroke="#40916C" strokeWidth="1.5" />
          <line x1="52" y1="6" x2="52" y2="56" stroke="#2D6A4F" strokeWidth="1.8" />
          <line x1="58" y1="14" x2="58" y2="56" stroke="#40916C" strokeWidth="1.5" />
          {/* Bamboo Leaves */}
          <path d="M8 20 L2 22 M8 28 L14 30 M14 24 L20 26 M52 18 L46 20 M52 30 L58 32" stroke="#52B788" strokeWidth="1.5" strokeLinecap="round" />
          {/* Clear Brook Riverbank */}
          <path d="M0 50 Q32 46 64 52 L64 64 L0 64 Z" fill="#74C69D" />
          {/* Water Pavilion Eaves & Raised Stilt Platform */}
          <polygon points="18,28 32,20 46,28" fill="#582F0E" stroke="#331A04" strokeWidth="1.2" />
          <path d="M16 28 L48 28" stroke="#331A04" strokeWidth="1.8" strokeLinecap="round" />
          {/* Workshop Room with Paper Shoji Screen */}
          <rect x="22" y="29" width="20" height="17" rx="1" fill="#FFFDF9" stroke="#582F0E" strokeWidth="1" />
          <line x1="32" y1="29" x2="32" y2="46" stroke="#7F4F24" strokeWidth="0.8" />
          <line x1="22" y1="37" x2="42" y2="37" stroke="#7F4F24" strokeWidth="0.8" />
          {/* Wooden Stilts over Water */}
          <line x1="24" y1="46" x2="24" y2="56" stroke="#582F0E" strokeWidth="1.5" />
          <line x1="40" y1="46" x2="40" y2="56" stroke="#582F0E" strokeWidth="1.5" />
          {/* Glowing Japanese Stone Lantern on Bank */}
          <rect x="47" y="46" width="5" height="6" rx="1" fill="#FEF08A" stroke="#4B5563" strokeWidth="0.8" />
          <polygon points="45,46 49.5,43 54,46" fill="#4B5563" />
        </svg>
      );
  }
};

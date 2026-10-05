import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  RotateCcw,
  Share2,
  SlidersHorizontal,
  Check,
  ChevronDown,
  BookmarkCheck,
  Volume2,
  VolumeX,
  Sparkles,
  Palette,
  Home,
  FileQuestion,
  Award,
  X,
  ShieldCheck,
  Zap,
  TrendingUp,
  BatteryCharging,
  AlertTriangle,
  Lock,
  Unlock,
  CheckCircle2,
  BookOpen,
  Heart,
  Mail,
  Coffee,
  Feather,
  Flame,
  ShieldAlert,
  CheckSquare,
  Square,
  Crown,
  Gift,
  Swords,
  Coins,
  Sun,
  Wand2,
  Droplets,
  Copy,
  Search
} from 'lucide-react';
import {
  DIMENSIONS,
  DIMENSION_LIST,
  DimensionKey,
  CareerRole,
  ARCHETYPES,
  CAREER_DATABASE,
  ARTWORK_IMAGES,
  THEORY_FRAMEWORKS
} from './data/assessmentData';
import {
  ASSESSMENT_TIERS,
  TIER_1_QUESTIONS,
  TIER_2_QUESTIONS,
  TIER_3_QUESTIONS,
  AssessmentQuestion,
  QuestionOption
} from './data/tierQuestions';
import { generateTierAnalysis, TierAnalysisContent } from './data/tierAnalysis';
import { SOUL_IDENTITIES, SoulIdentityData } from './data/soulIdentity';
import {
  WarmRadarChart,
  VisualSceneIllustration,
  BespokePerfumeBottle,
  BespokeManorSanctuary
} from './components/WarmVisuals';

type AppView = 'home' | 'quiz' | 'results' | 'explore';
type TierLevel = 1 | 2 | 3;

// Musical pitches for 6 dimensions (Pentatonic Chimes for high feedback dopamine)
const DIMENSION_CHIME_PITCH: Record<DimensionKey, number> = {
  creative: 1.0,     // 523Hz C5 (Clear bell)
  logical: 1.12,     // 587Hz D5 (Crisp crystal)
  empathy: 1.26,     // 659Hz E5 (Warm resonance)
  execution: 1.41,   // 740Hz F#5 (Solid metallic)
  exploration: 1.58, // 830Hz G#5 (Astral chime)
  craft: 1.78        // 932Hz Bb5 (Pure obsidian)
};

// Multi-sensory Web Audio API tactile feedback
function playWarmTapSound(
  enabled: boolean,
  pitchMultiplier = 1,
  type: 'tap' | 'glow' | 'fanfare' | 'mist' | 'haven' = 'tap'
) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'mist') {
      // Gentle airy perfume mist spray with soft crystalline shimmers
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880 * pitchMultiplier, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400 * pitchMultiplier, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'haven') {
      // Peaceful warm arpeggio chords for sanctuary illuminate
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const startT = ctx.currentTime + idx * 0.08;
        osc.frequency.setValueAtTime(freq * pitchMultiplier, startT);
        gain.gain.setValueAtTime(0.05, startT);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startT);
        osc.stop(startT + 0.62);
      });
    } else if (type === 'glow') {
      // Ethereal crystalline dual-harmonic chime for dimension highlight
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      const baseFreq = 480 * pitchMultiplier;
      osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.12);

      osc2.frequency.setValueAtTime(baseFreq * 2, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2.5, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.38);
      osc2.stop(ctx.currentTime + 0.38);
    } else if (type === 'fanfare') {
      // Harmonic power chord burst for SSR / UR / SP unlocking
      [1, 1.25, 1.5, 2].forEach((interval, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const startT = ctx.currentTime + idx * 0.04;
        osc.frequency.setValueAtTime(440 * pitchMultiplier * interval, startT);
        gain.gain.setValueAtTime(0.06, startT);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startT);
        osc.stop(startT + 0.46);
      });
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(430 * pitchMultiplier, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(590 * pitchMultiplier, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.11);
    }

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 550);
  } catch {
    // Ignore audio context errors
  }
}

const DEFAULT_BASE_SCORES: Record<DimensionKey, number> = {
  creative: 46,
  logical: 46,
  empathy: 46,
  execution: 46,
  exploration: 46,
  craft: 46
};

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [userName, setUserName] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Active assessment tier
  const [currentTier, setCurrentTier] = useState<TierLevel>(1);
  const [reportActiveTier, setReportActiveTier] = useState<TierLevel>(1);

  // Quiz answers separated by tier
  const [tierAnswers, setTierAnswers] = useState<Record<TierLevel, Record<number, QuestionOption>>>({
    1: {},
    2: {},
    3: {}
  });
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [liveFeedback, setLiveFeedback] = useState<string | null>(null);

  // Milestone Celebration Modal State
  const [completedMilestoneTier, setCompletedMilestoneTier] = useState<TierLevel | null>(null);

  // Results & Sandbox state
  const [manualOffsets, setManualOffsets] = useState<Record<DimensionKey, number>>({
    creative: 0,
    logical: 0,
    empathy: 0,
    execution: 0,
    exploration: 0,
    craft: 0
  });
  const [showSandbox, setShowSandbox] = useState<boolean>(false);
  const [selectedDim, setSelectedDim] = useState<DimensionKey>('creative');
  const [expandedCareerId, setExpandedCareerId] = useState<string | null>(null);
  const [savedCareerIds, setSavedCareerIds] = useState<string[]>([]);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [showPosterSheet, setShowPosterSheet] = useState<boolean>(false);
  const [posterTab, setPosterTab] = useState<'rewards' | 'dominion' | 'grandmaster' | 'career' | 'manual'>('rewards');
  const [resonatedMoments, setResonatedMoments] = useState<Record<string, boolean>>({});
  const [activeShields, setActiveShields] = useState<Record<string, boolean>>({});
  const [dopamineBoost, setDopamineBoost] = useState<{ text: string; score: number } | null>(null);
  const [unboxedMilestones, setUnboxedMilestones] = useState<Record<number, boolean>>({});
  const [radarGlowActive, setRadarGlowActive] = useState<boolean>(false);
  const [radarGlowKey, setRadarGlowKey] = useState<number>(0);
  const [sealedGrandmaster, setSealedGrandmaster] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [perfumeSprayed, setPerfumeSprayed] = useState<boolean>(false);
  const [manorIlluminated, setManorIlluminated] = useState<boolean>(false);

  // Micro-interaction: Dimension selection with dynamic background ambient glow & sound
  const handleSelectDimension = (dim: DimensionKey) => {
    const pitch = DIMENSION_CHIME_PITCH[dim] || 1.1;
    playWarmTapSound(soundEnabled, pitch, 'glow');
    setSelectedDim(dim);
    setRadarGlowActive(true);
    setRadarGlowKey((prev) => prev + 1);
    setTimeout(() => {
      setRadarGlowActive(false);
    }, 850);
  };

  // Explorer filter & search
  const [exploreFilterDim, setExploreFilterDim] = useState<DimensionKey | 'all'>('all');
  const [exploreSearchKeyword, setExploreSearchKeyword] = useState<string>('');

  // Gated Progression Checks
  const tier1Completed = Object.keys(tierAnswers[1]).length >= TIER_1_QUESTIONS.length;
  const tier2Completed = Object.keys(tierAnswers[2]).length >= TIER_2_QUESTIONS.length;
  const tier3Completed = Object.keys(tierAnswers[3]).length >= TIER_3_QUESTIONS.length;

  // Active question set for current quiz tier
  const currentQuestions: AssessmentQuestion[] = useMemo(() => {
    if (currentTier === 2) return TIER_2_QUESTIONS;
    if (currentTier === 3) return TIER_3_QUESTIONS;
    return TIER_1_QUESTIONS;
  }, [currentTier]);

  const activeAnswers = tierAnswers[currentTier] || {};
  const currentQuestion = currentQuestions[currentQIndex];
  const selectedOptionForCurrent = currentQuestion ? activeAnswers[currentQuestion.id] : undefined;
  const currentTierAnsweredCount = Object.keys(activeAnswers).length;

  // Compute scores combining answered tiers
  const computedScores = useMemo(() => {
    const raw: Record<DimensionKey, number> = { ...DEFAULT_BASE_SCORES };

    ([1, 2, 3] as TierLevel[]).forEach((t) => {
      Object.values(tierAnswers[t] || {}).forEach((opt) => {
        (Object.keys(opt.scores) as DimensionKey[]).forEach((k) => {
          raw[k] += opt.scores[k] || 0;
        });
      });
    });

    const finalScores: Record<DimensionKey, number> = { ...raw };
    (Object.keys(finalScores) as DimensionKey[]).forEach((k) => {
      const adjusted = finalScores[k] + (manualOffsets[k] || 0);
      finalScores[k] = Math.min(99, Math.max(38, Math.round(adjusted)));
    });
    return finalScores;
  }, [tierAnswers, manualOffsets]);

  const rankedDimensions = useMemo(() => {
    return [...DIMENSION_LIST].sort(
      (a, b) => computedScores[b.key] - computedScores[a.key]
    );
  }, [computedScores]);

  const topDimension = rankedDimensions[0];
  const secondDimension = rankedDimensions[1];
  const currentArchetype = ARCHETYPES[topDimension.key];

  useEffect(() => {
    if (view === 'results') {
      setSelectedDim(topDimension.key);
    }
  }, [view, topDimension.key]);

  const matchedCareers = useMemo(() => {
    return CAREER_DATABASE.map((career) => {
      const [d1, d2] = career.primaryDims;
      const s1 = computedScores[d1];
      const s2 = computedScores[d2];
      const affinity = Math.round(s1 * 0.58 + s2 * 0.42);
      const matchScore = Math.min(99, Math.max(76, Math.round(68 + (affinity - 45) * 0.58)));
      return {
        ...career,
        matchScore
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [computedScores]);

  const tierAnalysis: TierAnalysisContent = useMemo(() => {
    return generateTierAnalysis(reportActiveTier, topDimension.key, secondDimension.key, computedScores);
  }, [reportActiveTier, topDimension.key, secondDimension.key, computedScores]);

  const handleSelectOption = (questionId: number, option: QuestionOption) => {
    playWarmTapSound(soundEnabled, 1.1 + (currentQIndex % 4) * 0.08);
    setTierAnswers((prev) => ({
      ...prev,
      [currentTier]: {
        ...prev[currentTier],
        [questionId]: option
      }
    }));
    setLiveFeedback(option.feedbackText);

    const boostOptions = [
      '⚡ 直觉潜能暴击 +18！',
      '🎯 击中高光天赋密码！',
      '✨ 稀缺度持续飙升！',
      '🔥 核心特质觉醒中！',
      '🌟 洞察力拉满，天选之子！'
    ];
    setDopamineBoost({
      text: boostOptions[currentQIndex % boostOptions.length],
      score: 12 + ((currentQIndex * 4) % 18)
    });
  };

  const handleNextQuestion = () => {
    playWarmTapSound(soundEnabled, 1.15);
    setLiveFeedback(null);
    setDopamineBoost(null);
    if (currentQIndex < currentQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed this tier!
      const finishedTier = currentTier;
      setCompletedMilestoneTier(finishedTier);
      setReportActiveTier(finishedTier);
    }
  };

  const handlePrevQuestion = () => {
    playWarmTapSound(soundEnabled, 0.9);
    setLiveFeedback(null);
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const startTierQuiz = (tier: TierLevel) => {
    playWarmTapSound(soundEnabled, 1.1);
    setCurrentTier(tier);
    // Continue from next unanswered question or start from 0
    const answeredCount = Object.keys(tierAnswers[tier] || {}).length;
    setCurrentQIndex(Math.min(answeredCount, (tier === 1 ? TIER_1_QUESTIONS : tier === 2 ? TIER_2_QUESTIONS : TIER_3_QUESTIONS).length - 1));
    setLiveFeedback(null);
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSaveCareer = (id: string) => {
    playWarmTapSound(soundEnabled, 1.2);
    setSavedCareerIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleActionStep = (stepKey: string) => {
    playWarmTapSound(soundEnabled, 1.25);
    setCheckedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  const handleCopySummary = () => {
    if (posterTab === 'dominion' || (posterTab === 'rewards' && reportActiveTier === 2)) {
      const soul = tierAnalysis.soulIdentity;
      const tags = soul.tier2Dominion.workplaceSuperTags.map((t) => '#' + t).join(' ');
      const notes = soul.tier2Dominion.perfumeNotes
        ? `\n💐 三段香调配方：\n🌿 前调：${soul.tier2Dominion.perfumeNotes.top}\n🌸 中调：${soul.tier2Dominion.perfumeNotes.middle}\n🪵 后调：${soul.tier2Dominion.perfumeNotes.base}\n`
        : '';
      const textToCopy = `【${userName.trim() || '我'} 的 SSR+ 专属职场特调香水瓶】\n🍾 专属特调：${soul.tier2Dominion.dominionTitle}\n✨ 香调品级：${soul.tier2Dominion.dominionRank}（${soul.tier2Dominion.rarityPercent}）\n🏷️ 灵气标签：${tags}${notes}\n✨ 气场加持与喷洒法则：\n${soul.tier2Dominion.powerAura}\n\n🌸 防内耗喷雾：${soul.tier2Dominion.fatalMove}\n🍵 溢价调香法：${soul.tier2Dominion.wealthMultiplier}\n🎀 边界感结界：${soul.tier2Dominion.immunityDecree}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2500);
        });
      }
      return;
    }

    if (posterTab === 'grandmaster' || (posterTab === 'rewards' && reportActiveTier === 3)) {
      const soul = tierAnalysis.soulIdentity;
      const tags = soul.tier3Grandmaster.grandmasterTags.map((t) => '#' + t).join(' ');
      const sealStatus = sealedGrandmaster ? '【已亲手盖下星光小印 · 允许自己做舒服的自己】' : '【星愿已生效】';
      const textToCopy = `【${userName.trim() || '我'} 的 SP 专属终身秘密庄园认证】\n🏡 传世庄园：${soul.tier3Grandmaster.grandmasterTitle}\n✨ 庄园位格：${soul.tier3Grandmaster.apexRank}（${soul.tier3Grandmaster.rarityPercent}）\n📜 许可状态：${sealStatus}\n🏷️ 自洽标签：${tags}\n\n🌸 庄园全景沉浸：\n${soul.tier3Grandmaster.manorAtmosphere}\n\n🏰 心安秘密花园：${soul.tier3Grandmaster.uncopyableMoat}\n💖 终身热爱飞轮：${soul.tier3Grandmaster.passiveEngine}\n\n💌 三十年给自己的情书：\n${soul.tier3Grandmaster.destinyDecree}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2500);
        });
      }
      return;
    }

    if (posterTab === 'rewards') {
      const soul = tierAnalysis.soulIdentity;
      const tags = soul.rewards.powerTags.map((t) => '#' + t).join(' ');
      const textToCopy = `【${userName.trim() || '我'} 的 SSR 级天赋萌宠初醒卡】\n👑 全网稀缺度：${soul.rewards.rarityPercent}（${soul.rewards.rarityTier}）\n🐾 专属守护灵兽：${soul.rewards.spiritAnimal.emoji} ${soul.rewards.spiritAnimal.name}（${soul.rewards.spiritAnimal.trait}）\n🏷️ 天生闪光标签：${tags}\n\n🎁 成长与破局锦囊：\n💰 搞钱主线：${soul.rewards.careerCheatsheet.moneyEngine}\n✨ 闪光高光点：${soul.rewards.careerCheatsheet.killerWeapon}\n🛡️ 灵气护身符：${soul.rewards.careerCheatsheet.immunityCard}\n\n🔮 今日神谕上上签：${soul.rewards.luckyCharm.oracleWord}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2500);
        });
      }
      return;
    }

    if (posterTab === 'manual') {
      const soul = tierAnalysis.soulIdentity;
      const textToCopy = `【${userName.trim() || '寻光者'} 的专属职场与人际使用说明书】\n灵魂图腾：${soul.totemName}（${soul.totemKicker}）\n\n🚀 如何激发出我 120% 战斗力的状态：\n${soul.userManual.bestWorkingState}\n\n⚠️ 触碰就会让我瞬间关上心门的绝对雷区：\n${soul.userManual.tabooBehavior}\n\n🔕 当我感到无声透支时的呼救暗号：\n${soul.userManual.silentDistressSignal}\n\n🍵 身边人如何温柔地拉我一把：\n${soul.userManual.gentleRescueWay}\n\n🌟 灵魂深层确认：\n“${soul.innerMonologue.validationWord}”`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2500);
        });
      }
      return;
    }

    const tierName = ASSESSMENT_TIERS.find((t) => t.tier === reportActiveTier)?.name || '综合报告';
    const topCareersText = matchedCareers
      .slice(0, 3)
      .map((c) => `${c.title} (${c.matchScore}%契合)`)
      .join(' / ');
    const textToCopy = `【CareerCompass 暖光寻径 · ${tierName}】\n昵称：${
      userName.trim() || '寻光旅人'
    }\n核心画像：${currentArchetype.name} (${currentArchetype.englishSubtitle})\n灵魂图腾：${tierAnalysis.soulIdentity.totemName}（${tierAnalysis.soulIdentity.totemKicker}）\n第一优势：${
      topDimension.name
    } (${computedScores[topDimension.key]}分)\n第二优势：${secondDimension.name} (${
      computedScores[secondDimension.key]
    }分)\n契合职业推荐：${topCareersText}\n“${currentArchetype.quote}”`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2500);
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FBF8F3] flex justify-center">
      {/* Mobile-First Frame: Max-w-md, 100% responsive on phones */}
      <div className="w-full max-w-[480px] min-h-screen bg-[#FFFDF9] flex flex-col relative pb-20 shadow-none sm:shadow-lg sm:border-x sm:border-[#E8DFD3]">
        {/* Mobile Top App Bar */}
        <header className="sticky top-0 z-40 h-[52px] bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E8DFD3] px-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {view !== 'home' ? (
              <button
                onClick={() => {
                  playWarmTapSound(soundEnabled, 0.9);
                  if (view === 'quiz' && currentQIndex > 0) {
                    setCurrentQIndex((prev) => prev - 1);
                  } else {
                    setView('home');
                  }
                }}
                className="w-9 h-9 -ml-1 rounded-xl flex items-center justify-center text-[#5C5046] active:bg-[#F3ECE2] transition-colors cursor-pointer"
                aria-label="返回"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : null}
            <button
              onClick={() => setView('home')}
              className="text-base font-bold tracking-tight text-[#29221E] font-serif-title flex items-center gap-1.5 cursor-pointer"
            >
              <span>CareerCompass</span>
              <span className="text-[10px] font-normal text-[#D95D39] bg-[#FDF1EC] px-1.5 py-0.5 rounded-md">
                暖光寻径
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSoundEnabled((prev) => !prev)}
              aria-label={soundEnabled ? '音效开启' : '音效静音'}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#6B5E54] active:bg-[#F3ECE2] transition-colors cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#D95D39]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#A89C91]" />
              )}
            </button>
            {tier1Completed && (
              <button
                onClick={() => {
                  playWarmTapSound(soundEnabled, 1.05);
                  setView('results');
                }}
                className={`h-8 px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 active:scale-95 transition-transform cursor-pointer ${
                  view === 'results' ? 'bg-[#D95D39] text-white shadow-xs' : 'bg-[#F4ECE1] text-[#4A3F37]'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>我的报告</span>
              </button>
            )}
          </div>
        </header>

        {/* ==================== VIEW 1: HOME (CLEAR, FOCUSED ENTRY) ==================== */}
        {view === 'home' && (
          <div className="flex-1 px-4 py-4 space-y-4">
            {/* Illustrated Hero Card */}
            <div className="rounded-3xl border border-[#E8DFD3] overflow-hidden bg-[#FBF8F3] shadow-xs">
              <div className="w-full aspect-[16/9] max-h-56 relative overflow-hidden bg-[#EDE4D7]">
                <img
                  src={ARTWORK_IMAGES.heroBanner}
                  alt="温暖寻径画卷"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {/* Refined subtle warm vignette and airy editorial badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2219]/35 via-transparent to-transparent flex items-end justify-between p-3.5">
                  <div className="bg-white/90 backdrop-blur-md text-[#5C4533] px-3 py-1 rounded-full text-[11px] font-medium border border-white/80 shadow-xs flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#D95D39]" />
                    <span>温感手绘图卷 · 循序渐进先测后看</span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="text-xs text-[#8A7D73] flex items-center gap-1.5">
                  <span className="text-[#D95D39] font-semibold">第一阶段 · 天赋初探 (9题)</span>
                  <span aria-hidden="true">·</span>
                  <span>约2分钟</span>
                </div>

                <h1 className="text-xl font-bold text-[#29221E] font-serif-title leading-snug">
                  发现你的闪光天赋，<br />
                  找到真正属于你的职业方向
                </h1>

                <p className="text-xs text-[#5C5046] leading-relaxed">
                  请跟随直觉完成测评。每通关一层，为你逐步揭晓专属画像、职场风格与长期生涯路线图。
                </p>

                {/* Nickname Input */}
                <div className="bg-[#FFFDF9] border border-[#E8DFD3] rounded-2xl p-3">
                  <label
                    htmlFor="clean-nickname-input"
                    className="block text-[11px] font-medium text-[#6B5E54] mb-1"
                  >
                    写下你的昵称（用于印制你的专属潜能报告卡）
                  </label>
                  <input
                    id="clean-nickname-input"
                    type="text"
                    maxLength={10}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="例如：小林 / 寻光旅人"
                    className="w-full h-9 px-3 rounded-xl bg-[#FBF8F3] border border-[#E2D6C5] text-xs text-[#29221E] placeholder:text-[#B0A398] focus:outline-none focus:border-[#D95D39]"
                  />
                </div>

                {/* Single Primary Action Button: Enter Tier 1 */}
                <button
                  onClick={() => startTierQuiz(1)}
                  className="w-full min-h-[48px] py-3 rounded-2xl bg-[#D95D39] active:bg-[#C24D2C] active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-transform cursor-pointer shadow-sm"
                >
                  <span>
                    {tier1Completed
                      ? '重温第一层测评 (9题已通关)'
                      : Object.keys(tierAnswers[1]).length > 0
                      ? `继续第一层测评 (已答 ${Object.keys(tierAnswers[1]).length}/9)`
                      : '立即开启第一层 · 天赋初探 (9题)'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progressive Unlock Roadmap */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#29221E] font-serif-title flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D95D39]" />
                  三阶渐进式解锁路线图
                </span>
                <span className="text-[10px] text-[#8A7D73]">完成前序层级后解锁</span>
              </div>

              {/* Tier 1 Card */}
              <div
                className={`rounded-2xl border p-3.5 transition-all overflow-hidden relative ${
                  tier1Completed
                    ? 'bg-[#F2F5EF] border-[#7A8B68]/40'
                    : 'bg-[#FFFDF9] border-[#D95D39] shadow-xs'
                }`}
              >
                <div className="flex gap-3.5 items-center">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-[#E8DFD3] relative bg-[#EDE4D7] shadow-xs">
                    <img
                      src={ARTWORK_IMAGES.creativeVision}
                      alt="天赋初探"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-[#FFF9EE]/95 backdrop-blur-xs text-[9px] font-bold text-[#A0522D] px-1.5 py-0.5 rounded-md border border-[#F4CD96]/70 shadow-2xs">
                      灵兽初醒
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#29221E]">第一层 · 天赋初探</span>
                        <span className="text-[10px] text-[#D95D39] bg-[#FDF1EC] px-1.5 py-0.5 rounded font-medium">
                          9 道题
                        </span>
                      </div>
                      {tier1Completed ? (
                        <span className="text-[11px] font-semibold text-[#7A8B68] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          已通关
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#D95D39]">
                          进行中 ({Object.keys(tierAnswers[1]).length}/9)
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#5C5046] leading-relaxed">
                      生活化切片探索，解锁你的【核心能力原型画像】与【专属守护灵兽】。
                    </div>
                  </div>
                </div>
                {tier1Completed && (
                  <div className="mt-2.5 pt-2 border-t border-[#DCE4D6] flex justify-end">
                    <button
                      onClick={() => {
                        setReportActiveTier(1);
                        setView('results');
                      }}
                      className="text-xs font-semibold text-[#7A8B68] hover:underline cursor-pointer"
                    >
                      查看第一层报告解答 →
                    </button>
                  </div>
                )}
              </div>

              {/* Tier 2 Card */}
              <div
                className={`rounded-2xl border p-3.5 transition-all overflow-hidden relative ${
                  !tier1Completed
                    ? 'bg-[#F9F6F0] border-[#E8DFD3] opacity-75'
                    : tier2Completed
                    ? 'bg-[#F2F5EF] border-[#7A8B68]/40'
                    : 'bg-[#FFFDF9] border-[#D95D39] shadow-xs'
                }`}
              >
                <div className="flex gap-3.5 items-center">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-[#E8DFD3] relative bg-[#EDE4D7] shadow-xs">
                    <img
                      src={ARTWORK_IMAGES.peopleConnect}
                      alt="职场实战"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-[#F2F7F0]/95 backdrop-blur-xs text-[9px] font-bold text-[#3D6338] px-1.5 py-0.5 rounded-md border border-[#B5D7AF]/70 shadow-2xs">
                      高定香氛
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#29221E]">第二层 · 职场实战</span>
                        <span className="text-[10px] text-[#5C5046] bg-[#F4ECE1] px-1.5 py-0.5 rounded font-medium">
                          12 道题
                        </span>
                      </div>
                      {!tier1Completed ? (
                        <span className="text-[11px] text-[#8A7D73] flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          待解锁
                        </span>
                      ) : tier2Completed ? (
                        <span className="text-[11px] font-semibold text-[#7A8B68] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          已通关
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#D95D39] flex items-center gap-1">
                          <Unlock className="w-3 h-3" />
                          待挑战
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#5C5046] leading-relaxed">
                      还原高频职场场景，解锁【气味通感香氛瓶】、【能量损耗雷区】与【高情商防御脚本】。
                    </div>
                  </div>
                </div>
                {tier1Completed && (
                  <div className="mt-2.5 pt-2 border-t border-[#EFE7DC] flex justify-end">
                    <button
                      onClick={() => startTierQuiz(2)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#D95D39] text-white text-xs font-semibold flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
                    >
                      <span>{tier2Completed ? '重测第二层' : '进入第二层测评'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Tier 3 Card */}
              <div
                className={`rounded-2xl border p-3.5 transition-all overflow-hidden relative ${
                  !tier2Completed
                    ? 'bg-[#F9F6F0] border-[#E8DFD3] opacity-75'
                    : tier3Completed
                    ? 'bg-[#F2F5EF] border-[#7A8B68]/40'
                    : 'bg-[#FFFDF9] border-[#D95D39] shadow-xs'
                }`}
              >
                <div className="flex gap-3.5 items-center">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-[#E8DFD3] relative bg-[#EDE4D7] shadow-xs">
                    <img
                      src={ARTWORK_IMAGES.logicStrategy}
                      alt="大师战略"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-[#F9F3FC]/95 backdrop-blur-xs text-[9px] font-bold text-[#6A4182] px-1.5 py-0.5 rounded-md border border-[#D9BBE5]/70 shadow-2xs">
                      私享庄园
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#29221E]">第三层 · 大师战略</span>
                        <span className="text-[10px] text-[#5C5046] bg-[#F4ECE1] px-1.5 py-0.5 rounded font-medium">
                          15 道题
                        </span>
                      </div>
                      {!tier2Completed ? (
                        <span className="text-[11px] text-[#8A7D73] flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          待解锁
                        </span>
                      ) : tier3Completed ? (
                        <span className="text-[11px] font-semibold text-[#7A8B68] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          已通关
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#D95D39] flex items-center gap-1">
                          <Unlock className="w-3 h-3" />
                          待挑战
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#5C5046] leading-relaxed">
                      洞悉长期商业护城河，叩开【专属梦幻私享庄园】与《永远做自己 · 自在人生许可证》。
                    </div>
                  </div>
                </div>
                {tier2Completed && (
                  <div className="mt-2.5 pt-2 border-t border-[#EFE7DC] flex justify-end">
                    <button
                      onClick={() => startTierQuiz(3)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#D95D39] text-white text-xs font-semibold flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
                    >
                      <span>{tier3Completed ? '重测第三层' : '进入第三层测评'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Gentle Healing Note Card for Women */}
              <div className="rounded-2xl border border-[#F4CD96] bg-gradient-to-r from-[#FFF9EE] via-[#FFFDF9] to-[#FEF3ED] p-3 flex items-center gap-3.5 shadow-2xs">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-[#F4CD96] relative bg-[#EDE4D7] shadow-xs">
                  <img
                    src={ARTWORK_IMAGES.peopleConnect}
                    alt="温柔对话"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-[#A0522D] flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-[#D95D39] fill-[#D95D39]" />
                    <span>给每一个认真生活的你 · 温暖致意</span>
                  </div>
                  <p className="text-[11px] text-[#6B5E54] mt-0.5 leading-snug">
                    你不必成为流水线上的标准答案。这一趟探索，只为帮你找回骨子里的闪光灵气与自在从容。
                  </p>
                </div>
              </div>

              {/* Scientific Theoretical Foundation */}
              <div className="bg-[#FBF8F3] border border-[#E8DFD3] rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#29221E]">
                  <span className="flex items-center gap-1.5 font-serif-title">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D95D39]" />
                    科学理论底层架构与心理学溯源
                  </span>
                  <span className="text-[10px] text-[#8A7D73] font-normal">多维实证融合</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#EFE7DC]">
                    <div className="font-bold text-[#29221E] text-[10px] text-[#D95D39] mb-0.5">
                      霍兰德 RIASEC 模型
                    </div>
                    <div className="text-[10px] text-[#6B5E54]">
                      兴趣代码测定与职业环境匹配度
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#EFE7DC]">
                    <div className="font-bold text-[#29221E] text-[10px] text-[#D48C2A] mb-0.5">
                      施恩职业锚理论 (Schein)
                    </div>
                    <div className="text-[10px] text-[#6B5E54]">
                      深层职业价值观与不可妥协底线
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#EFE7DC]">
                    <div className="font-bold text-[#29221E] text-[10px] text-[#7A8B68] mb-0.5">
                      大五人格 (OCEAN)
                    </div>
                    <div className="text-[10px] text-[#6B5E54]">
                      体验开放性、尽责性与行为天性
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#EFE7DC]">
                    <div className="font-bold text-[#29221E] text-[10px] text-[#C86D51] mb-0.5">
                      积极心理学优势才干
                    </div>
                    <div className="text-[10px] text-[#6B5E54]">
                      聚焦发挥天赋长板而非无谓补短
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== VIEW 2: QUIZ ==================== */}
        {view === 'quiz' && currentQuestion && (
          <div className="flex-1 px-4 py-3 flex flex-col justify-between">
            <div>
              {/* Question Header & Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-[#6B5E54] mb-1.5">
                  <span className="font-semibold text-[#D95D39] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    第 {currentTier} 层测评 ({currentTier === 1 ? '初探 9题' : currentTier === 2 ? '实战 12题' : '战略 15题'})
                  </span>
                  <span className="tabular-nums font-bold text-[#D95D39]">
                    {currentQIndex + 1} / {currentQuestions.length}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#EDE4D7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D95D39] rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${((currentQIndex + 1) / currentQuestions.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-4">
                {/* Soft Atmospheric Visual Strip */}
                <div className="mb-3.5 rounded-2xl overflow-hidden relative border border-[#E8DFD3] shadow-xs h-20 bg-[#EDE4D7]">
                  <img
                    src={
                      currentTier === 1
                        ? ARTWORK_IMAGES.creativeVision
                        : currentTier === 2
                        ? ARTWORK_IMAGES.peopleConnect
                        : ARTWORK_IMAGES.logicStrategy
                    }
                    alt="答题氛围"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201811]/45 via-transparent to-transparent flex items-end p-2.5">
                    <div className="bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[#4A3828] text-xs font-semibold flex items-center gap-1.5 shadow-2xs border border-white/70">
                      <Sparkles className="w-3.5 h-3.5 text-[#D95D39] shrink-0" />
                      <span className="truncate">
                        {currentTier === 1
                          ? '🌿 唤醒天命直觉 · 凭第一感受选择'
                          : currentTier === 2
                          ? '☕ 还原高频职场 · 探寻不内耗节拍'
                          : '✨ 终局生涯图景 · 勾勒专属从容自在'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-[#8A7D73] mb-1">{currentQuestion.chapter}</div>
                <h2 className="text-lg font-bold text-[#29221E] font-serif-title leading-snug">
                  {currentQuestion.title}
                </h2>
                <p className="text-xs text-[#8A7D73] mt-1">{currentQuestion.subtitle}</p>
              </div>

              {/* Dual Slider Balance Layout */}
              {currentQuestion.type === 'dual_slider' && (
                <div className="mb-4 bg-[#FBF8F3] border border-[#E8DFD3] rounded-2xl p-3 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5C5046]">
                    <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#EFE7DC]">
                      <div className="font-bold text-[#29221E] text-[10px] text-[#D95D39] mb-0.5">
                        天平左端
                      </div>
                      {currentQuestion.leftPoleLabel}
                    </div>
                    <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#EFE7DC]">
                      <div className="font-bold text-[#29221E] text-[10px] text-[#D48C2A] mb-0.5">
                        天平右端
                      </div>
                      {currentQuestion.rightPoleLabel}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    {currentQuestion.options.map((opt, idx) => {
                      const isPicked = selectedOptionForCurrent?.id === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(currentQuestion.id, opt)}
                          className={`min-h-[44px] py-2 px-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                            isPicked
                              ? 'bg-[#D95D39] text-white shadow-xs font-bold'
                              : 'bg-[#FFFDF9] border border-[#E8DFD3] text-[#5C5046]'
                          }`}
                        >
                          刻度 {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Options Stack */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, index) => {
                  const isSelected = selectedOptionForCurrent?.id === opt.id;
                  const optionLetter = ['A', 'B', 'C', 'D'][index] || '';

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQuestion.id, opt)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 min-h-[56px] active:scale-[0.99] ${
                        isSelected
                          ? 'bg-[#FDF3EC] border-[#D95D39] shadow-xs'
                          : 'bg-[#FBF8F3] border-[#E8DFD3] hover:border-[#D6C7B5]'
                      }`}
                    >
                      {opt.visualType ? (
                        <VisualSceneIllustration
                          type={opt.visualType}
                          selected={isSelected}
                        />
                      ) : (
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-[#D95D39] text-white'
                              : 'bg-[#EDE4D7] text-[#5C5046]'
                          }`}
                        >
                          {optionLetter}
                        </span>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-semibold text-[#29221E] leading-snug">
                          {opt.label}
                        </div>
                        {opt.sublabel && (
                          <div className="text-[11px] text-[#6B5E54] mt-1 leading-relaxed">
                            {opt.sublabel}
                          </div>
                        )}
                      </div>

                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#D95D39] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dopamine Reward Instant Feedback */}
              {dopamineBoost && selectedOptionForCurrent && (
                <div className="mt-3 px-3 py-2 rounded-2xl bg-gradient-to-r from-[#FFF6EC] via-[#FDF0DE] to-[#FFF9F2] border border-[#F4CD96] flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-bottom-1 duration-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#D95D39]">
                    <Sparkles className="w-4 h-4 text-[#E67E22] animate-bounce" />
                    <span>{dopamineBoost.text}</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#C0392B] bg-[#FFFDF9] px-2 py-0.5 rounded-full border border-[#FADBD8] shadow-xs">
                    +{dopamineBoost.score} 觉醒能量
                  </span>
                </div>
              )}

              {/* Micro Feedback */}
              {selectedOptionForCurrent && (
                <div className="mt-2.5 p-3 rounded-2xl bg-[#FDF6EA] border border-[#F0DEC2] text-xs text-[#6E4F28] leading-relaxed">
                  <span className="font-semibold text-[#D48C2A] mr-1">小洞察 ·</span>
                  {liveFeedback || selectedOptionForCurrent.feedbackText}
                </div>
              )}

              {/* Gentle Serene Reassurance Vignette for Women */}
              {!selectedOptionForCurrent && (
                <div className="mt-3 p-2 rounded-xl bg-[#FFFDF9] border border-[#EFE7DC] flex items-center gap-2.5 text-[11px] text-[#8A7D73] shadow-2xs">
                  <div className="w-6 h-6 rounded-lg overflow-hidden shrink-0 border border-[#E8DFD3] relative bg-[#EDE4D7]">
                    <img
                      src={
                        currentTier === 1
                          ? ARTWORK_IMAGES.creativeVision
                          : currentTier === 2
                          ? ARTWORK_IMAGES.peopleConnect
                          : ARTWORK_IMAGES.logicStrategy
                      }
                      alt="暖心直觉"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="truncate">
                    {currentTier === 1
                      ? '🌸 遵从第一直觉，没有错题，只有最本真的你。'
                      : currentTier === 2
                      ? '☕ 想象最自洽的职场状态，不必勉强迎合他人。'
                      : '✨ 勾勒真正向往的安宁生活，愿你的每一步都走得心安。'}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="mt-6 pt-3 border-t border-[#EFE7DC] flex items-center justify-between gap-3">
              <button
                onClick={handlePrevQuestion}
                className="min-h-[44px] px-3.5 rounded-xl bg-[#F3ECE2] text-[#4A3F37] text-xs font-medium flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>上一题</span>
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={!selectedOptionForCurrent}
                className={`flex-1 min-h-[44px] px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  selectedOptionForCurrent
                    ? 'bg-[#D95D39] text-white shadow-xs active:bg-[#C24D2C]'
                    : 'bg-[#E8DFD3] text-[#9E9085] cursor-not-allowed'
                }`}
              >
                <span>
                  {currentQIndex === currentQuestions.length - 1
                    ? `完成第 ${currentTier} 层 · 生成解答报告`
                    : '下一题'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== VIEW 3: RESULTS (UNLOCKED STEP BY STEP) ==================== */}
        {view === 'results' && (
          <div className="flex-1 px-4 py-4 space-y-4">
            {/* If user hasn't finished Tier 1 yet */}
            {!tier1Completed ? (
              <div className="p-6 rounded-3xl bg-[#FBF8F3] border border-[#E8DFD3] text-center space-y-3 my-8">
                <div className="w-12 h-12 rounded-full bg-[#FDF1EC] text-[#D95D39] flex items-center justify-center mx-auto">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-base font-bold text-[#29221E] font-serif-title">
                  潜能报告尚未生成
                </h2>
                <p className="text-xs text-[#5C5046] leading-relaxed">
                  请先完成第一层「天赋初探 (9题)」，完成后将在此为你逐步揭晓专属能力画像与职业建议。
                </p>
                <button
                  onClick={() => startTierQuiz(1)}
                  className="px-5 py-2.5 rounded-2xl bg-[#D95D39] text-white text-xs font-semibold shadow-xs inline-flex items-center gap-1.5"
                >
                  <span>立即开启第一层测评</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                {/* Tier Switcher for Unlocked Tiers */}
                <div className="space-y-1">
                  <div className="text-[11px] text-[#8A7D73] px-1 font-medium">
                    已解锁的测评解答：
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4ECE1] rounded-2xl">
                    <button
                      onClick={() => {
                        playWarmTapSound(soundEnabled, 1);
                        setReportActiveTier(1);
                      }}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        reportActiveTier === 1
                          ? 'bg-[#FFFDF9] text-[#D95D39] shadow-xs'
                          : 'text-[#6B5E54] hover:text-[#29221E]'
                      }`}
                    >
                      第1层·初探
                    </button>

                    <button
                      onClick={() => {
                        if (tier2Completed) {
                          playWarmTapSound(soundEnabled, 1.05);
                          setReportActiveTier(2);
                        } else {
                          startTierQuiz(2);
                        }
                      }}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        reportActiveTier === 2
                          ? 'bg-[#FFFDF9] text-[#D95D39] shadow-xs'
                          : tier2Completed
                          ? 'text-[#6B5E54]'
                          : 'text-[#9E9085]'
                      }`}
                    >
                      {!tier2Completed && <Lock className="w-3 h-3" />}
                      <span>第2层·实战</span>
                    </button>

                    <button
                      onClick={() => {
                        if (tier3Completed) {
                          playWarmTapSound(soundEnabled, 1.1);
                          setReportActiveTier(3);
                        } else if (tier2Completed) {
                          startTierQuiz(3);
                        }
                      }}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        reportActiveTier === 3
                          ? 'bg-[#FFFDF9] text-[#D95D39] shadow-xs'
                          : tier3Completed
                          ? 'text-[#6B5E54]'
                          : 'text-[#9E9085]'
                      }`}
                    >
                      {!tier3Completed && <Lock className="w-3 h-3" />}
                      <span>第3层·大师</span>
                    </button>
                  </div>
                </div>

                {/* ================= SSR / UR / SP TIER-ADAPTIVE HERO REWARD MATRIX ================= */}
                {reportActiveTier === 1 && (
                  <div className="rounded-3xl border-2 border-[#E5B573] bg-gradient-to-b from-[#FFF9EE] via-[#FFFDF9] to-[#FDF6E8] p-4.5 space-y-3.5 shadow-md relative overflow-hidden">
                    {/* Decorative golden rays backdrop glow */}
                    <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#F8DCB0]/40 rounded-full blur-2xl pointer-events-none" />

                    {/* Top Crown & Rarity Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E67E22] to-[#D35400] text-white flex items-center justify-center shadow-xs">
                          <Crown className="w-3.5 h-3.5 fill-white" />
                        </span>
                        <span className="text-xs font-black text-[#A0522D] tracking-wide font-serif-title">
                          {tierAnalysis.soulIdentity.rewards.rarityTier}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-gradient-to-r from-[#D95D39] to-[#E67E22] text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-xs">
                        <Sparkles className="w-3 h-3 fill-white" />
                        <span>稀缺度 · {tierAnalysis.soulIdentity.rewards.rarityPercent}</span>
                      </div>
                    </div>

                    {/* Atmospheric Artwork Strip */}
                    <div className="w-full h-24 rounded-2xl overflow-hidden relative border border-[#F4CD96]/80 shadow-xs">
                      <img
                        src={ARTWORK_IMAGES.creativeVision}
                        alt="灵兽灵境画卷"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#201811]/45 via-transparent to-transparent flex items-end p-2.5">
                        <div className="bg-white/85 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[#5B3E1F] text-[11px] font-bold flex items-center gap-1.5 shadow-2xs border border-white/60">
                          <Sparkles className="w-3 h-3 text-[#D95D39]" />
                          <span>天命苏醒 · 遇见属于你的职场守护灵兽</span>
                        </div>
                      </div>
                    </div>

                    {/* Guardian Spirit Animal Emblem */}
                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9]/90 border border-[#EBD5B3] flex items-center gap-3 shadow-xs">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#FEF5E7] to-[#FADBD8] border border-[#F5CBA7] flex items-center justify-center text-2xl shrink-0 shadow-inner">
                        {tierAnalysis.soulIdentity.rewards.spiritAnimal.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-[#A0522D] font-bold flex items-center gap-1">
                          <span>专属天命守护灵兽</span>
                          <span className="text-[10px] text-[#D95D39] bg-[#FDF1EC] px-1.5 py-0.2 rounded font-extrabold">已觉醒</span>
                        </div>
                        <div className="text-sm font-bold text-[#29221E] font-serif-title mt-0.5 truncate">
                          {tierAnalysis.soulIdentity.rewards.spiritAnimal.name}
                        </div>
                        <div className="text-[10px] text-[#6B5E54] mt-0.5 leading-snug">
                          {tierAnalysis.soulIdentity.rewards.spiritAnimal.trait}
                        </div>
                      </div>
                    </div>

                    {/* Power Tags (4 High-Gloss Badges) */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-[#8C6246] flex items-center justify-between">
                        <span>天生闪光标签</span>
                        <span className="text-[10px] font-normal text-[#A89C91]">自带天然灵气</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tierAnalysis.soulIdentity.rewards.powerTags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-[#FFF5E6] to-[#FDF0DE] border border-[#F4CD96] text-[#A0522D] shadow-2xs flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3 text-[#D95D39]" />
                            <span>#{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Career Cheatsheet (搞钱主线 + 闪光高光点 + 灵气护身符) */}
                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#EBD5B3] space-y-2.5 text-xs shadow-2xs">
                      <div className="text-[11px] font-bold text-[#8C6246] flex items-center justify-between border-b border-[#F4E8D7] pb-1.5">
                        <span className="flex items-center gap-1 text-[#29221E]">
                          <Gift className="w-3.5 h-3.5 text-[#D95D39]" />
                          <span>专属搞钱与成长灵动锦囊</span>
                        </span>
                        <span className="text-[10px] font-bold text-[#D95D39] bg-[#FDF1EC] px-1.5 py-0.5 rounded">
                          独家灵感
                        </span>
                      </div>

                      <div className="space-y-2 pt-0.5">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-lg bg-[#FEF5E7] text-[#D95D39] flex items-center justify-center shrink-0 mt-0.5">
                            <Coins className="w-3 h-3" />
                          </span>
                          <div className="flex-1">
                            <div className="text-[11px] font-bold text-[#29221E]">搞钱核心主线</div>
                            <div className="text-[11px] text-[#5C5046] leading-relaxed mt-0.5">
                              {tierAnalysis.soulIdentity.rewards.careerCheatsheet.moneyEngine}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-lg bg-[#FEF5E7] text-[#D95D39] flex items-center justify-center shrink-0 mt-0.5">
                            <Sparkles className="w-3 h-3" />
                          </span>
                          <div className="flex-1">
                            <div className="text-[11px] font-bold text-[#29221E]">职场闪光高光点</div>
                            <div className="text-[11px] text-[#5C5046] leading-relaxed mt-0.5">
                              {tierAnalysis.soulIdentity.rewards.careerCheatsheet.killerWeapon}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-lg bg-[#FEF5E7] text-[#D95D39] flex items-center justify-center shrink-0 mt-0.5">
                            <ShieldCheck className="w-3 h-3" />
                          </span>
                          <div className="flex-1">
                            <div className="text-[11px] font-bold text-[#29221E]">灵气护身符</div>
                            <div className="text-[11px] text-[#5C5046] leading-relaxed mt-0.5">
                              {tierAnalysis.soulIdentity.rewards.careerCheatsheet.immunityCard}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lucky Charm & Today Oracle Word */}
                    <div className="p-3 rounded-2xl bg-[#FFF9EE] border border-[#F4CD96] flex items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border border-white shadow-xs shrink-0"
                          style={{ backgroundColor: tierAnalysis.soulIdentity.rewards.luckyCharm.colorHex }}
                        />
                        <div>
                          <div className="text-[10px] text-[#8C6246]">
                            今日幸运色 · {tierAnalysis.soulIdentity.rewards.luckyCharm.colorName}
                          </div>
                          <div className="text-[9px] text-[#A89C91]">
                            {tierAnalysis.soulIdentity.rewards.luckyCharm.energyFreq}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setPosterTab('rewards');
                          setShowPosterSheet(true);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-[#D95D39] text-white text-[11px] font-bold shadow-xs cursor-pointer flex items-center gap-1 shrink-0"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>生成萌宠初醒卡</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TIER 2 SPECIAL: SSR+ 专属高定特调香水瓶 */}
                {reportActiveTier === 2 && (
                  <div className="rounded-3xl border-2 border-[#A7CCA2] bg-gradient-to-b from-[#F9FBF8] via-[#FFFDF9] to-[#EFF6EE] text-[#293828] p-4.5 space-y-3.5 shadow-md relative overflow-hidden">
                    {/* Gentle Mint & Meadow Ambient Glow */}
                    <div className="absolute -top-14 -right-14 w-40 h-40 bg-[#A7CCA2]/25 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#E2B183]/15 rounded-full blur-2xl pointer-events-none" />

                    {/* Top Perfume Header */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#76A870] to-[#5C8E56] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                          SSR+
                        </span>
                        <span className="text-xs font-bold text-[#4B7346] tracking-wide font-serif-title">
                          {tierAnalysis.soulIdentity.tier2Dominion.dominionRank}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-gradient-to-r from-[#76A870] to-[#D48C2A] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        <Sparkles className="w-3 h-3 fill-white" />
                        <span>{tierAnalysis.soulIdentity.tier2Dominion.rarityPercent}</span>
                      </div>
                    </div>

                    {/* Atmospheric Fragrance Atelier Artwork Strip */}
                    <div className="w-full h-24 rounded-2xl overflow-hidden relative border border-[#CFE3CB] shadow-xs z-10">
                      <img
                        src={ARTWORK_IMAGES.peopleConnect}
                        alt="沙龙调香室"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C261B]/45 via-transparent to-transparent flex items-end p-2.5">
                        <div className="bg-white/85 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[#2D5028] text-[11px] font-bold flex items-center gap-1.5 shadow-2xs border border-white/60">
                          <Droplets className="w-3 h-3 text-[#5C8E56]" />
                          <span>情绪沙龙 · 专为你调制的治愈香调与防内耗结界</span>
                        </div>
                      </div>
                    </div>

                    {/* Crystal Perfume Bottle Avatar Card */}
                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9]/95 border border-[#CFE3CB] relative z-10 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <div className="w-15 h-15 rounded-2xl bg-gradient-to-br from-[#EAF5E8] to-[#D5E8D2] border border-[#BBDCB6] flex items-center justify-center shadow-inner shrink-0 relative overflow-hidden">
                          <BespokePerfumeBottle dimension={topDimension.key} size="md" />
                          <span className="absolute -bottom-1 -right-1 text-[10px] bg-white/90 px-1 py-0.2 rounded-full border border-[#CFE3CB]">
                            {tierAnalysis.soulIdentity.tier2Dominion.bottleEmoji}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] text-[#5C8E56] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#5C8E56]" />
                            <span>高定沙龙特调 · 职场情绪急救瓶</span>
                          </div>
                          <h3 className="text-sm font-bold text-[#202E20] font-serif-title truncate">
                            {tierAnalysis.soulIdentity.tier2Dominion.dominionTitle}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-[#7E967B]">
                            <span className="bg-[#F0F7EE] px-1.5 py-0.2 rounded border border-[#D5E8D2]">
                              制式：{tierAnalysis.soulIdentity.tier2Dominion.bottleShape}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#556953] leading-relaxed pt-1 bg-[#F6FAF5] p-2.5 rounded-xl border border-[#E2EFE0]">
                        {tierAnalysis.soulIdentity.tier2Dominion.powerAura}
                      </p>
                    </div>

                    {/* Bespoke Scent Notes (Top, Heart, Base) */}
                    {tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes && (
                      <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#CFE3CB] space-y-1.5 relative z-10 shadow-2xs">
                        <div className="text-[10px] font-bold text-[#4B7346] flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Droplets className="w-3 h-3 text-[#5C8E56]" />
                            <span>专属定制三段香谱</span>
                          </span>
                          <span className="text-[9px] text-[#7E967B]">治愈通感调香</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 text-center pt-0.5">
                          <div className="p-2 rounded-xl bg-[#F6FAF5] border border-[#E2EFE0]">
                            <div className="text-[9px] text-[#7E967B] font-bold">🌿 前调 (初遇)</div>
                            <div className="text-[10px] font-bold text-[#202E20] truncate mt-0.5">
                              {tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes.top}
                            </div>
                          </div>
                          <div className="p-2 rounded-xl bg-[#F6FAF5] border border-[#E2EFE0]">
                            <div className="text-[9px] text-[#7E967B] font-bold">🌸 中调 (相处)</div>
                            <div className="text-[10px] font-bold text-[#202E20] truncate mt-0.5">
                              {tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes.middle}
                            </div>
                          </div>
                          <div className="p-2 rounded-xl bg-[#F6FAF5] border border-[#E2EFE0]">
                            <div className="text-[9px] text-[#7E967B] font-bold">🪵 后调 (自洽)</div>
                            <div className="text-[10px] font-bold text-[#202E20] truncate mt-0.5">
                              {tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes.base}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Micro-interaction: Spray Perfume */}
                    <div className="relative z-10">
                      <button
                        onClick={() => {
                          playWarmTapSound(soundEnabled, 1.15, 'mist');
                          setPerfumeSprayed(true);
                          setTimeout(() => setPerfumeSprayed(false), 3800);
                        }}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 ${
                          perfumeSprayed
                            ? 'bg-[#EAF5E8] border border-[#76A870] text-[#3D6338]'
                            : 'bg-gradient-to-r from-[#76A870] to-[#5C8E56] text-white hover:opacity-95 active:scale-98'
                        }`}
                      >
                        <Droplets className={`w-3.5 h-3.5 ${perfumeSprayed ? 'animate-bounce text-[#5C8E56]' : 'text-white'}`} />
                        <span>{perfumeSprayed ? '🫧 细雾香气正在散开…深呼吸感受松弛' : '🌸 轻轻喷洒香氛 · 驱散职场班味与疲惫'}</span>
                      </button>
                      {perfumeSprayed && (
                        <div className="mt-1.5 p-2 rounded-xl bg-[#F4FAF3] border border-[#BBDCB6] text-center text-[10px] text-[#3D6338] animate-in fade-in slide-in-from-top-1 duration-200">
                          ✨ 空气中弥漫开【{tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes?.top}与{tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes?.middle}】的清灵香调，心头微微一松，工作不过是一场体验。
                        </div>
                      )}
                    </div>

                    {/* 4 Soft & Cute Power Badges */}
                    <div className="space-y-1.5 relative z-10">
                      <div className="text-[11px] font-bold text-[#4B7346] flex items-center justify-between">
                        <span>灵气小特质</span>
                        <span className="text-[10px] font-normal text-[#7E967B]">自带治愈气场</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tierAnalysis.soulIdentity.tier2Dominion.workplaceSuperTags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-xl text-xs font-bold bg-[#FFFDF9] border border-[#CFE3CB] text-[#3D6338] shadow-2xs flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3 text-[#76A870]" />
                            <span>#{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 3 Gentle Workplace Magic Tools */}
                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#CFE3CB] space-y-2.5 text-xs relative z-10 shadow-2xs">
                      <div className="text-[11px] font-bold text-[#3D6338] flex items-center justify-between border-b border-[#EAF2E8] pb-1.5">
                        <span className="flex items-center gap-1">
                          <Gift className="w-3.5 h-3.5 text-[#5C8E56]" />
                          <span>专属职场温柔解忧锦囊</span>
                        </span>
                        <span className="text-[10px] font-bold text-[#4B7346] bg-[#EAF5E8] px-1.5 py-0.5 rounded">
                          治愈特权
                        </span>
                      </div>

                      <div className="space-y-2 pt-0.5">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-lg bg-[#EFF6EE] text-[#5C8E56] flex items-center justify-center shrink-0 mt-0.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </span>
                          <div className="flex-1">
                            <div className="text-[11px] font-bold text-[#202E20]">温柔防内耗结界</div>
                            <div className="text-[11px] text-[#556953] leading-relaxed mt-0.5">
                              {tierAnalysis.soulIdentity.tier2Dominion.fatalMove}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-lg bg-[#EFF6EE] text-[#5C8E56] flex items-center justify-center shrink-0 mt-0.5">
                            <Coins className="w-3 h-3" />
                          </span>
                          <div className="flex-1">
                            <div className="text-[11px] font-bold text-[#202E20]">聪明自洽变现法宝</div>
                            <div className="text-[11px] text-[#556953] leading-relaxed mt-0.5">
                              {tierAnalysis.soulIdentity.tier2Dominion.wealthMultiplier}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-lg bg-[#EFF6EE] text-[#5C8E56] flex items-center justify-center shrink-0 mt-0.5">
                            <Heart className="w-3.5 h-3.5" />
                          </span>
                          <div className="flex-1">
                            <div className="text-[11px] font-bold text-[#202E20]">温柔边界感小心法</div>
                            <div className="text-[11px] text-[#556953] leading-relaxed mt-0.5">
                              {tierAnalysis.soulIdentity.tier2Dominion.immunityDecree}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Share Bar */}
                    <div className="flex items-center justify-between pt-1 relative z-10">
                      <div className="text-[10px] text-[#7E967B]">
                        已锁定第二层高定香氛特调
                      </div>
                      <button
                        onClick={() => {
                          setPosterTab('dominion');
                          setShowPosterSheet(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#76A870] to-[#D48C2A] text-white text-[11px] font-bold shadow-xs cursor-pointer flex items-center gap-1 active:scale-95 transition-transform"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>生成专属香氛卡</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TIER 3 SPECIAL: SP 终身神眷 · 专属秘密庄园 */}
                {reportActiveTier === 3 && (
                  <div className="rounded-3xl border-2 border-[#D9BBE5] bg-gradient-to-b from-[#FCF8FD] via-[#FFFDF9] to-[#F7F1FB] text-[#34243A] p-4.5 space-y-3.5 shadow-md relative overflow-hidden">
                    {/* Soft Lavender & Rose Gold Ambient Glow */}
                    <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#D9BBE5]/25 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#F4A261]/15 rounded-full blur-2xl pointer-events-none" />

                    {/* Top SP Sanctuary Header */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#A569BD] to-[#E07A5F] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                          SP
                        </span>
                        <span className="text-xs font-bold text-[#7D4F91] tracking-wide font-serif-title">
                          {tierAnalysis.soulIdentity.tier3Grandmaster.apexRank}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-gradient-to-r from-[#A569BD] to-[#E07A5F] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        <Sparkles className="w-3 h-3 fill-white" />
                        <span>{tierAnalysis.soulIdentity.tier3Grandmaster.rarityPercent}</span>
                      </div>
                    </div>

                    {/* Atmospheric Secret Manor Sanctuary Artwork Strip */}
                    <div className="w-full h-24 rounded-2xl overflow-hidden relative border border-[#DEC3EB] shadow-xs z-10">
                      <img
                        src={ARTWORK_IMAGES.logicStrategy}
                        alt="私享秘密庄园"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#231A29]/45 via-transparent to-transparent flex items-end p-2.5">
                        <div className="bg-white/85 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[#5B3170] text-[11px] font-bold flex items-center gap-1.5 shadow-2xs border border-white/60">
                          <Crown className="w-3 h-3 text-[#9B51E0]" />
                          <span>私享庄园 · 终身心安栖居地与不可替代的心力护城河</span>
                        </div>
                      </div>
                    </div>

                    {/* Dream Sanctuary Manor Avatar Card */}
                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9]/95 border border-[#E9D5F2] relative z-10 space-y-2 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FAF0FC] to-[#EEDBF6] border border-[#DEC3EB] flex items-center justify-center shadow-inner shrink-0 relative overflow-hidden">
                          <BespokeManorSanctuary dimension={topDimension.key} size="md" />
                          <span className="absolute -bottom-1 -right-1 text-[10px] bg-white/90 px-1 py-0.2 rounded-full border border-[#DEC3EB]">
                            {tierAnalysis.soulIdentity.tier3Grandmaster.manorEmoji}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] text-[#8E44AD] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Crown className="w-3.5 h-3.5 text-[#A569BD]" />
                            <span>终身心安栖息地 · 私享秘密庄园</span>
                          </div>
                          <h3 className="text-sm font-bold text-[#2A1731] font-serif-title truncate">
                            {tierAnalysis.soulIdentity.tier3Grandmaster.grandmasterTitle}
                          </h3>
                          <div className="flex items-center gap-1 mt-0.5 text-[10px] text-[#7D6485]">
                            <span className="bg-[#FAF0FC] px-1.5 py-0.2 rounded border border-[#E9D5F2]">
                              建筑制式：{tierAnalysis.soulIdentity.tier3Grandmaster.architectureStyle}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[11px] text-[#694E73] leading-relaxed pt-1 bg-[#FAF5FC] p-2.5 rounded-xl border border-[#EFE1F4]">
                        <div className="text-[10px] font-bold text-[#8E44AD] mb-0.5 flex items-center gap-1">
                          <span>🏡 庄园微缩景观沉浸：</span>
                        </div>
                        <div>{tierAnalysis.soulIdentity.tier3Grandmaster.manorAtmosphere}</div>
                      </div>
                    </div>

                    {/* Micro-interaction: Light Up Manor */}
                    <div className="relative z-10">
                      <button
                        onClick={() => {
                          playWarmTapSound(soundEnabled, 1.1, 'haven');
                          setManorIlluminated(true);
                          setTimeout(() => setManorIlluminated(false), 4000);
                        }}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 ${
                          manorIlluminated
                            ? 'bg-[#FAF0FC] border border-[#A569BD] text-[#6E3C80]'
                            : 'bg-gradient-to-r from-[#A569BD] via-[#D98880] to-[#E07A5F] text-white hover:opacity-95 active:scale-98'
                        }`}
                      >
                        <Sparkles className={`w-3.5 h-3.5 ${manorIlluminated ? 'animate-spin text-[#A569BD]' : 'text-white'}`} />
                        <span>{manorIlluminated ? '✨ 庄园暖灯已次第点亮…漫天星光落入窗前' : '🕯️ 叩响木门 · 点亮属于你的灵魂避风港'}</span>
                      </button>
                      {manorIlluminated && (
                        <div className="mt-1.5 p-2 rounded-xl bg-[#FAF5FC] border border-[#DEC3EB] text-center text-[10px] text-[#6E3C80] animate-in fade-in slide-in-from-top-1 duration-200">
                          🌟 庄园壁炉与玻璃天窗已为你开启，无论外界风雨多大，这里永远是你不用讨好任何人的安宁小天地。
                        </div>
                      )}
                    </div>

                    {/* 4 Soft Sanctuary Tags */}
                    <div className="space-y-1.5 relative z-10">
                      <div className="text-[11px] font-bold text-[#7D4F91] flex items-center justify-between">
                        <span>自洽心安标签</span>
                        <span className="text-[10px] font-normal text-[#9B7F9F]">不内卷的底气</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tierAnalysis.soulIdentity.tier3Grandmaster.grandmasterTags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-xl text-xs font-bold bg-[#FFFDF9] border border-[#E9D5F2] text-[#6E3C80] shadow-2xs flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3 text-[#A569BD]" />
                            <span>#{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Inner Peace Moat & Lifestyle Garden */}
                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E9D5F2] space-y-2.5 text-xs relative z-10 shadow-2xs">
                      <div className="text-[11px] font-bold text-[#6E3C80] flex items-center justify-between border-b border-[#F4EAF9] pb-1.5">
                        <span className="flex items-center gap-1">
                          <Compass className="w-3.5 h-3.5 text-[#A569BD]" />
                          <span>属于你的心安秘密花园</span>
                        </span>
                        <span className="text-[10px] font-bold text-[#8E44AD] bg-[#F5EAFA] px-1.5 py-0.5 rounded">
                          自洽法则
                        </span>
                      </div>

                      <div className="space-y-2 pt-0.5">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-lg bg-[#FAF0FC] text-[#A569BD] flex items-center justify-center shrink-0 mt-0.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </span>
                          <div className="flex-1">
                            <div className="text-[11px] font-bold text-[#2A1731]">不可替代的心安护城河</div>
                            <div className="text-[11px] text-[#694E73] leading-relaxed mt-0.5">
                              {tierAnalysis.soulIdentity.tier3Grandmaster.uncopyableMoat}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-lg bg-[#FAF0FC] text-[#A569BD] flex items-center justify-center shrink-0 mt-0.5">
                            <Heart className="w-3.5 h-3.5" />
                          </span>
                          <div className="flex-1">
                            <div className="text-[11px] font-bold text-[#2A1731]">滋养一生的热爱飞轮</div>
                            <div className="text-[11px] text-[#694E73] leading-relaxed mt-0.5">
                              {tierAnalysis.soulIdentity.tier3Grandmaster.passiveEngine}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* INTERACTIVE HEALING PERMISSION SEAL CEREMONY */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FAF0FC] to-[#F5EFF9] border border-[#DEC3EB] relative z-10 text-center space-y-2.5">
                      {!sealedGrandmaster ? (
                        <>
                          <div className="text-[11px] text-[#7D4F91] font-bold">
                            🌸 颁发《永远做自己 · 自在人生许可证》
                          </div>
                          <p className="text-[10px] text-[#7D6485] leading-relaxed">
                            点击亲手盖下你的星光小印，把这封许可证存进心底，允许自己慢慢来，允许自己只为热爱发光。
                          </p>
                          <button
                            onClick={() => {
                              playWarmTapSound(soundEnabled, 1.2, 'fanfare');
                              setSealedGrandmaster(true);
                            }}
                            className="w-full min-h-[42px] py-2 rounded-xl bg-gradient-to-r from-[#A569BD] via-[#D98880] to-[#E07A5F] text-white text-xs font-bold shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Heart className="w-4 h-4 fill-white" />
                            <span>🌸 盖下「{userName.trim() || '我'}」的星光小印 · 允许自己做自己</span>
                          </button>
                        </>
                      ) : (
                        <div className="space-y-2 py-1 animate-in zoom-in-95 duration-300">
                          {/* Warm Rose-Gold Imperial Wax Seal Badge */}
                          <div className="inline-block border-2 border-[#D98880] bg-gradient-to-br from-[#E6B0AA] to-[#D98880] text-white p-2.5 rounded-2xl shadow-sm rotate-[-2deg] mx-auto">
                            <div className="border border-dashed border-white/80 px-3 py-1.5 rounded-xl">
                              <div className="text-[9px] font-bold tracking-widest uppercase">
                                PERMISSION TO BE YOURSELF
                              </div>
                              <div className="text-sm font-bold font-serif-title text-white">
                                【永远做自己 · 自在人生许可证】
                              </div>
                              <div className="text-[10px] text-white/95 font-medium mt-0.5">
                                专属持证人：{userName.trim() || '可爱的你'} 亲钤 · 允许自己慢慢发光
                              </div>
                            </div>
                          </div>
                          <div className="text-[11px] font-bold text-[#7D4F91]">
                            ✨ 许可证已生效！在任何时候，你都有权停下来，只做最舒服的自己。
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Share Bar */}
                    <div className="flex items-center justify-between pt-1 relative z-10">
                      <div className="text-[10px] text-[#9B7F9F]">
                        已锁定第三层秘密庄园地契
                      </div>
                      <button
                        onClick={() => {
                          setPosterTab('grandmaster');
                          setShowPosterSheet(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#A569BD] to-[#E07A5F] text-white text-[11px] font-bold shadow-xs cursor-pointer flex items-center gap-1 active:scale-95 transition-transform"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>生成秘密庄园卡</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Archetype Hero Banner Card */}
                <div className={`rounded-3xl border overflow-hidden shadow-xs transition-colors duration-300 ${
                  reportActiveTier === 2
                    ? 'border-[#CFE3CB] bg-[#F9FBF8]'
                    : reportActiveTier === 3
                    ? 'border-[#DEC3EB] bg-[#FCF8FD]'
                    : 'border-[#F4CD96] bg-[#FFFDF9]'
                }`}>
                  <div className="w-full h-36 relative overflow-hidden bg-[#EDE4D7]">
                    <img
                      src={currentArchetype.artImage}
                      alt={currentArchetype.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                      <div className="text-white">
                        <div className={`text-[10px] font-semibold ${
                          reportActiveTier === 2
                            ? 'text-[#A7CCA2]'
                            : reportActiveTier === 3
                            ? 'text-[#D9BBE5]'
                            : 'text-[#F5B041]'
                        }`}>
                          {tierAnalysis.tierBadge} · {currentArchetype.englishSubtitle}
                        </div>
                        <div className="text-lg font-bold font-serif-title">
                          {currentArchetype.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-[#8A7D73]">
                      <span>{userName.trim() ? `${userName.trim()} 的报告` : '综合能力报告'}</span>
                      <div className={`flex items-center gap-1 font-medium ${
                        reportActiveTier === 2
                          ? 'text-[#5C8E56]'
                          : reportActiveTier === 3
                          ? 'text-[#A569BD]'
                          : 'text-[#D95D39]'
                      }`}>
                        <span>{topDimension.name}</span>
                        <span>×</span>
                        <span>{secondDimension.name}</span>
                      </div>
                    </div>

                    <p className={`text-xs font-medium italic p-2.5 rounded-xl border ${
                      reportActiveTier === 2
                        ? 'text-[#3D6338] bg-[#FFFDF9] border-[#E2EFE0]'
                        : reportActiveTier === 3
                        ? 'text-[#6E3C80] bg-[#FFFDF9] border-[#F4EAF9]'
                        : 'text-[#8C6246] bg-[#FFFDF9] border-[#EFE7DC]'
                    }`}>
                      {tierAnalysis.summaryQuote}
                    </p>

                    {/* Scientific Psychological Foundation Diagnosis */}
                    <div className={`p-3 rounded-2xl bg-[#FFFDF9] border space-y-1 ${
                      reportActiveTier === 2
                        ? 'border-[#CFE3CB]'
                        : reportActiveTier === 3
                        ? 'border-[#DEC3EB]'
                        : 'border-[#E8DFD3]'
                    }`}>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-[#6B5E54] flex items-center gap-1">
                          <BookOpen className={`w-3.5 h-3.5 ${
                            reportActiveTier === 2
                              ? 'text-[#5C8E56]'
                              : reportActiveTier === 3
                              ? 'text-[#A569BD]'
                              : 'text-[#D95D39]'
                          }`} />
                          {tierAnalysis.theoryDiagnosis.frameworkName}
                        </span>
                        <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                          reportActiveTier === 2
                            ? 'text-[#4B7346] bg-[#EAF5E8]'
                            : reportActiveTier === 3
                            ? 'text-[#8E44AD] bg-[#FAF0FC]'
                            : 'text-[#D95D39] bg-[#FDF1EC]'
                        }`}>
                          {tierAnalysis.theoryDiagnosis.codeOrAnchor}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5C5046] leading-relaxed pt-0.5">
                        {tierAnalysis.theoryDiagnosis.interpretation}
                      </p>
                    </div>

                    {/* Key Insights for Active Tier */}
                    <div className="space-y-2 pt-1">
                      {tierAnalysis.keyInsights.map((insight, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-2xl bg-[#FFFDF9] border ${
                            reportActiveTier === 2
                              ? 'border-[#E2EFE0]'
                              : reportActiveTier === 3
                              ? 'border-[#F4EAF9]'
                              : 'border-[#EFE7DC]'
                          }`}
                        >
                          <div className={`text-xs font-bold mb-0.5 ${
                            reportActiveTier === 2
                              ? 'text-[#202E20]'
                              : reportActiveTier === 3
                              ? 'text-[#2A1731]'
                              : 'text-[#29221E]'
                          }`}>
                            {insight.title}
                          </div>
                          <p className="text-[11px] text-[#5C5046] leading-relaxed">
                            {insight.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ================= TIER 1 SPECIAL: ANIMAL COMPANION SOUL CONTRACT & MICRO-MOMENTS ================= */}
                {reportActiveTier === 1 && (
                  <div className="space-y-3.5">
                    {/* 专属守护灵兽契约 & 灵魂图腾 */}
                    <div className="bg-[#FFFDF9] border border-[#F4CD96] rounded-3xl p-4.5 space-y-3.5 shadow-xs relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-[#F9EBD6] pb-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#29221E] font-serif-title">
                          <span className="text-sm">🐾</span>
                          <span>专属守护灵兽【{tierAnalysis.soulIdentity.rewards.spiritAnimal.name}】的灵魂契约</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#D95D39] bg-[#FEF5E7] px-2 py-0.5 rounded-full border border-[#F5CBA7]">
                          灵兽印记
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FEF5E7] to-[#FDF0EC] border border-[#F4CD96] flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[10px] font-bold text-[#8C6246] uppercase flex items-center gap-1">
                            <span>{tierAnalysis.soulIdentity.rewards.spiritAnimal.emoji}</span>
                            <span>灵兽共生图腾</span>
                          </div>
                          <div className="text-base font-bold text-[#29221E] font-serif-title mt-0.5">
                            {tierAnalysis.soulIdentity.totemName}
                          </div>
                          <div className="text-xs text-[#8C6246] mt-0.5 font-medium">
                            “{tierAnalysis.soulIdentity.totemKicker}”
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white border border-[#F4CD96] flex items-center justify-center text-2xl shadow-xs shrink-0">
                          {tierAnalysis.soulIdentity.rewards.spiritAnimal.emoji}
                        </div>
                      </div>

                      {/* 灵兽视角的温柔三部曲：外界常误解 ➔ 灵兽守护的隐秘真心 ➔ 给灵魂的深层确认 */}
                      <div className="space-y-2.5 text-xs">
                        <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#EFE7DC] space-y-1.5">
                          <div className="flex items-center gap-1.5 font-bold text-[#946121] text-[11px]">
                            <span className="text-xs">🐾</span>
                            <span>灵兽默默看着：世人常误解你的地方</span>
                          </div>
                          <p className="text-[11px] text-[#5C5046] leading-relaxed">
                            {tierAnalysis.soulIdentity.innerMonologue.misunderstood}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#F8D7DA]/60 space-y-1.5">
                          <div className="flex items-center gap-1.5 font-bold text-[#D95D39] text-[11px]">
                            <Heart className="w-3.5 h-3.5 text-[#D95D39] fill-[#D95D39]/15" />
                            <span>唯有灵兽深知的你：内心深处真实的隐秘温柔</span>
                          </div>
                          <p className="text-[11px] text-[#5C5046] leading-relaxed">
                            {tierAnalysis.soulIdentity.innerMonologue.hiddenTruth}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FEF8F0] to-[#FFFDF9] border border-[#F4CD96] space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-[#8C6246] text-[11px]">
                            <Feather className="w-3.5 h-3.5 text-[#D95D39]" />
                            <span>灵兽伏在耳边的低语 · 给灵魂的深层确认</span>
                          </div>
                          <p className="text-[11px] text-[#4A3F37] leading-relaxed font-serif italic pt-0.5">
                            “{tierAnalysis.soulIdentity.innerMonologue.validationWord}”
                          </p>
                        </div>

                        {/* 灵兽赐予的 3 大专属天生神力 / 直觉长板 */}
                        {tierAnalysis.soulIdentity.rewards.spiritAnimal.superpowers && (
                          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#F4CD96] space-y-2">
                            <div className="flex items-center gap-1.5 font-bold text-[#D95D39] text-[11px]">
                              <Sparkles className="w-3.5 h-3.5 text-[#D95D39]" />
                              <span>灵兽唤醒的 3 大专属直觉杀手锏</span>
                            </div>
                            <div className="space-y-1.5 pt-0.5">
                              {tierAnalysis.soulIdentity.rewards.spiritAnimal.superpowers.map((sp, idx) => (
                                <div key={idx} className="p-2.5 rounded-xl bg-[#FEF8F0] border border-[#F9EBD6] text-[11px]">
                                  <div className="font-bold text-[#8C6246] mb-0.5 flex items-center gap-1">
                                    <span>✨</span>
                                    <span>{sp.title}</span>
                                  </div>
                                  <p className="text-[#5C5046] leading-relaxed">
                                    {sp.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 萌宠灵犀相通仪：“这就是我！” */}
                    <div className="bg-[#FFFDF9] border border-[#F4CD96] rounded-3xl p-4.5 space-y-2.5 shadow-xs">
                      <div className="flex items-center justify-between border-b border-[#F9EBD6] pb-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#29221E] font-serif-title">
                          <Heart className="w-4 h-4 text-[#D95D39]" />
                          <span>萌宠灵犀相通仪 · “这就是我！”微生活切片</span>
                        </div>
                        <span className="text-[10px] text-[#8C6246] bg-[#FEF5E7] px-2 py-0.5 rounded-full">
                          爪印打卡
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B5E54]">
                        守护灵兽捕捉到的生活微瞬间，快来看看击中了你的哪些可爱小习惯：
                      </p>

                      <div className="space-y-2 pt-1">
                        {tierAnalysis.soulIdentity.lifeMicroMoments.map((moment, idx) => {
                          const isResonated = resonatedMoments[`${topDimension.key}-${idx}`];
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                playWarmTapSound(soundEnabled, 1.2);
                                setResonatedMoments((prev) => ({
                                  ...prev,
                                  [`${topDimension.key}-${idx}`]: !prev[`${topDimension.key}-${idx}`]
                                }));
                              }}
                              className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                                isResonated
                                  ? 'bg-[#FEF5E7] border-[#D95D39] text-[#29221E] shadow-2xs'
                                  : 'bg-[#FFFDF9] border-[#EFE7DC] text-[#5C5046]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                  isResonated ? 'bg-[#D95D39] text-white' : 'bg-[#EDE4D7] text-[#8A7D73]'
                                }`}>
                                  <Heart className={`w-3 h-3 ${isResonated ? 'fill-white' : ''}`} />
                                </span>
                                <span className="text-[11px] leading-relaxed">
                                  {moment}
                                </span>
                              </div>
                              <span className={`text-[10px] font-bold shrink-0 px-2 py-0.5 rounded-full ${
                                isResonated ? 'bg-[#D95D39] text-white' : 'bg-[#F4ECE1] text-[#8C6246]'
                              }`}>
                                {isResonated ? '🐾 灵犀共鸣' : '戳我认领'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Chapter 5: 能量充电机与低压急救包 (Energy Recharge SOP) */}
                    {tierAnalysis.soulIdentity.energyRechargeSop && (
                      <div className="bg-[#FFFDF9] border border-[#F4CD96] rounded-3xl p-4.5 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#F9EBD6] pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#29221E] font-serif-title">
                            <BatteryCharging className="w-4 h-4 text-[#D95D39]" />
                            <span>能量充电机 · 低电量 15% 紧急回血 SOP</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#D95D39] bg-[#FDF1EC] px-2 py-0.5 rounded-full border border-[#F4CD96]">
                            立竿见影
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          {/* Trigger signal */}
                          <div className="p-3 rounded-2xl bg-[#FCF6F6] border border-[#F2D7D7] space-y-1">
                            <div className="font-bold text-[#9C3838] text-[11px] flex items-center gap-1">
                              <span>🪫</span>
                              <span>电量濒危警报信号 (身体正在拉响防空警报)：</span>
                            </div>
                            <p className="text-[11px] text-[#7A4545] leading-relaxed">
                              {tierAnalysis.soulIdentity.energyRechargeSop.triggerSignal}
                            </p>
                          </div>

                          {/* 3 Step Rapid Recovery Actions */}
                          <div className="p-3.5 rounded-2xl bg-[#FFF9EE] border border-[#F4CD96] space-y-2">
                            <div className="font-bold text-[#8C6246] text-[11px] flex items-center gap-1.5">
                              <span>⚡</span>
                              <span>3 步物理隔离与即刻复位方案：</span>
                            </div>
                            <div className="space-y-1.5 pt-0.5">
                              {tierAnalysis.soulIdentity.energyRechargeSop.fastActions.map((action, i) => (
                                <div key={i} className="p-2 rounded-xl bg-white/90 border border-[#F9EBD6] text-[11px] text-[#5C5046] leading-relaxed">
                                  {action}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Energy forbidden trap */}
                          <div className="p-2.5 rounded-xl bg-[#FFF5F5] border border-[#FADBD8] text-[11px] text-[#C0392B] flex items-start gap-1.5">
                            <span className="shrink-0 font-bold">🚫 回血禁忌：</span>
                            <span className="leading-relaxed">{tierAnalysis.soulIdentity.energyRechargeSop.energyForbidden}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter 6: 灵性高光时刻触发场域 (Peak State Trigger) */}
                    {tierAnalysis.soulIdentity.peakStateTrigger && (
                      <div className="bg-gradient-to-br from-[#FFF9EE] via-[#FFFDF9] to-[#FDF6EA] border border-[#F4CD96] rounded-3xl p-4.5 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#F4CD96]/60 pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#29221E] font-serif-title">
                            <Sparkles className="w-4 h-4 text-[#D95D39]" />
                            <span>灵性高光时刻 · 天赋成倍爆发的催化场域</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#8C6246] bg-[#FFF5E6] border border-[#F4CD96] px-2 py-0.5 rounded-full">
                            神性时刻
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          <div className="p-3 rounded-2xl bg-white/90 border border-[#F9EBD6] space-y-1">
                            <div className="font-bold text-[#8C6246] text-[11px] flex items-center gap-1">
                              <span>🏡</span>
                              <span>最能激活心流的物理与心理空间：</span>
                            </div>
                            <p className="text-[11px] text-[#5C5046] leading-relaxed">
                              {tierAnalysis.soulIdentity.peakStateTrigger.optimalEnvironment}
                            </p>
                          </div>

                          <div className="p-3 rounded-2xl bg-white/90 border border-[#F9EBD6] space-y-1">
                            <div className="font-bold text-[#D95D39] text-[11px] flex items-center gap-1">
                              <span>🚀</span>
                              <span>才华呈几何级数显化的关键催化剂：</span>
                            </div>
                            <p className="text-[11px] text-[#5C5046] leading-relaxed">
                              {tierAnalysis.soulIdentity.peakStateTrigger.catalystCondition}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ================= TIER 2 SPECIAL: HAUTE PARFUMERIE SALON & SCENT FORMULA GUIDE ================= */}
                {reportActiveTier === 2 && tierAnalysis.workStyleProfile && (
                  <div className="space-y-3.5">
                    {/* Chapter 1: 高定调香手记 · 气味通感与职场心流矩阵 */}
                    <div className="bg-[#F9FBF8] border border-[#CFE3CB] rounded-3xl p-4.5 space-y-3.5 shadow-xs relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-[#E2EFE0] pb-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#202E20] font-serif-title">
                          <Droplets className="w-4 h-4 text-[#5C8E56]" />
                          <span>高定调香手记 · 气味通感与职场心流矩阵</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#4B7346] bg-[#EAF5E8] border border-[#CFE3CB] px-2 py-0.5 rounded-full">
                          沙龙香谱
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E2EFE0]">
                          <div className="font-bold text-[#202E20] mb-1 flex items-center gap-1.5 text-[11px]">
                            <span className="text-sm">🍃</span>
                            <span>前调扩散与人际节奏 (Scent Sillage)</span>
                          </div>
                          <p className="text-[11px] text-[#556953] leading-relaxed">
                            {tierAnalysis.workStyleProfile.collaborationStyle}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E2EFE0]">
                          <div className="font-bold text-[#202E20] mb-1 flex items-center gap-1.5 text-[11px]">
                            <span className="text-sm">🎯</span>
                            <span>决策取舍天平 · 价值天平与直觉定盘星</span>
                          </div>
                          <p className="text-[11px] text-[#556953] leading-relaxed">
                            {tierAnalysis.workStyleProfile.decisionMaking}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E2EFE0]">
                          <div className="font-bold text-[#202E20] mb-1 flex items-center gap-1.5 text-[11px]">
                            <span className="text-sm">⚡</span>
                            <span>香气升华按键 · 心流触发条件</span>
                          </div>
                          <p className="text-[11px] text-[#556953] leading-relaxed">
                            {tierAnalysis.workStyleProfile.flowTrigger}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#FBF7F0] border border-[#EEDFCA]">
                          <div className="font-bold text-[#8C6246] mb-1 flex items-center gap-1.5 text-[11px]">
                            <span className="text-sm">🥀</span>
                            <span>气味浊化雷区 · 职场能量损耗预警</span>
                          </div>
                          <p className="text-[11px] text-[#6B5A4E] leading-relaxed">
                            {tierAnalysis.workStyleProfile.energyDrainAlert}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#F6FAF5] border border-[#CFE3CB]">
                          <div className="font-bold text-[#4B7346] mb-1 flex items-center gap-1.5 text-[11px]">
                            <span className="text-sm">🍵</span>
                            <span>尾调温润回甘 · 专属极速回血充电秘方</span>
                          </div>
                          <p className="text-[11px] text-[#4A5D44] leading-relaxed">
                            {tierAnalysis.workStyleProfile.rechargeMethod}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Chapter 2: 《关于我的专属香调配方与使用手册》 */}
                    <div className="bg-[#FFFDF9] border border-[#CFE3CB] rounded-3xl p-4.5 space-y-3 shadow-xs relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-[#EAF2E8] pb-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#202E20] font-serif-title">
                          <Sparkles className="w-4 h-4 text-[#5C8E56]" />
                          <span>《关于我的专属香调配方与相处手册》</span>
                        </div>
                        <button
                          onClick={() => {
                            setPosterTab('manual');
                            setShowPosterSheet(true);
                          }}
                          className="text-[10px] font-bold text-[#4B7346] bg-[#EAF5E8] border border-[#CFE3CB] px-2.5 py-1 rounded-xl flex items-center gap-1 cursor-pointer hover:bg-[#DDF0DA] transition-colors"
                        >
                          <Share2 className="w-3 h-3" />
                          <span>生成品香卡片</span>
                        </button>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="p-3.5 rounded-2xl bg-[#F6FAF5] border border-[#D5E8D2]">
                          <div className="font-bold text-[#3D6338] mb-1 flex items-center gap-1.5 text-[11px]">
                            <span className="text-xs">✨</span>
                            <span>最佳散香温床 (激发出我 120% 灵感状态)</span>
                          </div>
                          <p className="text-[11px] text-[#4A5D44] leading-relaxed">
                            {tierAnalysis.soulIdentity.userManual.bestWorkingState}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#FCF5F5] border border-[#F2D7D7]">
                          <div className="font-bold text-[#9C3838] mb-1 flex items-center gap-1.5 text-[11px]">
                            <span className="text-xs">🚫</span>
                            <span>气味排异禁忌 (触碰就会瞬间关上心门的雷区)</span>
                          </div>
                          <p className="text-[11px] text-[#7A4545] leading-relaxed">
                            {tierAnalysis.soulIdentity.userManual.tabooBehavior}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#FDF9F2] border border-[#EEDFCA]">
                          <div className="font-bold text-[#8C6246] mb-1 flex items-center gap-1.5 text-[11px]">
                            <span className="text-xs">🫧</span>
                            <span>尾调淡去时的挥发暗号 (当我无声透支时的呼救信号)</span>
                          </div>
                          <p className="text-[11px] text-[#6E502B] leading-relaxed">
                            {tierAnalysis.soulIdentity.userManual.silentDistressSignal}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#F9FBF8] border border-[#E2EFE0]">
                          <div className="font-bold text-[#4B7346] mb-1 flex items-center gap-1.5 text-[11px]">
                            <span className="text-xs">🍵</span>
                            <span>专属解忧调香水 (身边人如何温柔补香拉我一把)</span>
                          </div>
                          <p className="text-[11px] text-[#556953] leading-relaxed">
                            {tierAnalysis.soulIdentity.userManual.gentleRescueWay}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Chapter 3: 职场能量同频雷达 · 灵魂盟友 vs 隐形吸血鬼图鉴 */}
                    {tierAnalysis.soulIdentity.allyAndVampireRadar && (
                      <div className="bg-[#FFFDF9] border border-[#CFE3CB] rounded-3xl p-4.5 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#EAF2E8] pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#202E20] font-serif-title">
                            <Compass className="w-4 h-4 text-[#5C8E56]" />
                            <span>职场能量同频雷达 · 灵魂盟友 vs 隐形吸血鬼</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#4B7346] bg-[#EAF5E8] border border-[#CFE3CB] px-2 py-0.5 rounded-full">
                            知人避坑
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          {/* Soul Ally */}
                          <div className="p-3.5 rounded-2xl bg-[#F6FAF5] border border-[#CFE3CB] space-y-1">
                            <div className="font-bold text-[#3D6338] text-[11px] flex items-center gap-1.5">
                              <span>💖</span>
                              <span>同频滋养神仙盟友画像 (最契合你的职场安全感)：</span>
                            </div>
                            <p className="text-[11px] text-[#4A5D44] leading-relaxed pt-0.5">
                              {tierAnalysis.soulIdentity.allyAndVampireRadar.soulAlly}
                            </p>
                          </div>

                          {/* Energy Vampire */}
                          <div className="p-3.5 rounded-2xl bg-[#FCF6F6] border border-[#F2D7D7] space-y-1">
                            <div className="font-bold text-[#9C3838] text-[11px] flex items-center gap-1.5">
                              <span>🧛</span>
                              <span>隐形能量吸血鬼 (必须警惕、极速耗干你心力的人格)：</span>
                            </div>
                            <p className="text-[11px] text-[#7A4545] leading-relaxed pt-0.5">
                              {tierAnalysis.soulIdentity.allyAndVampireRadar.energyVampire}
                            </p>
                          </div>

                          {/* Protection Shield */}
                          <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#E2EFE0] space-y-0.5">
                            <div className="font-bold text-[#4B7346] text-[10px] flex items-center gap-1">
                              <span>🛡️</span>
                              <span>降维防身护盾法则：</span>
                            </div>
                            <p className="text-[11px] text-[#556953] leading-relaxed">
                              {tierAnalysis.soulIdentity.allyAndVampireRadar.protectionShield}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter 4: 职场高维跃迁心法 · 拒绝过度包揽与向上管理沟通杠杆 */}
                    {tierAnalysis.soulIdentity.workplaceLevers && (
                      <div className="bg-[#F9FBF8] border border-[#CFE3CB] rounded-3xl p-4.5 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#E2EFE0] pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#202E20] font-serif-title">
                            <Sparkles className="w-4 h-4 text-[#5C8E56]" />
                            <span>职场高维跃迁心法 · 拒绝过度包揽与向上管理</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#4B7346] bg-[#EAF5E8] border border-[#CFE3CB] px-2 py-0.5 rounded-full">
                            大女主底气
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E2EFE0] space-y-1">
                            <div className="font-bold text-[#202E20] text-[11px] flex items-center gap-1.5">
                              <span>🎀</span>
                              <span>破解“职场老好人”与过度包揽的降维心法：</span>
                            </div>
                            <p className="text-[11px] text-[#556953] leading-relaxed pt-0.5">
                              {tierAnalysis.soulIdentity.workplaceLevers.antiPeoplePleaserTrap}
                            </p>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E2EFE0] space-y-1">
                            <div className="font-bold text-[#202E20] text-[11px] flex items-center gap-1.5">
                              <span>🚀</span>
                              <span>向上管理与争取独立心流空间的沟通杠杆：</span>
                            </div>
                            <p className="text-[11px] text-[#556953] leading-relaxed pt-0.5">
                              {tierAnalysis.soulIdentity.workplaceLevers.upwardInfluenceSecret}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter 5: 随身香氛结界喷雾 · 3大能量防护实操与高情商处事脚本 */}
                    <div className="bg-[#F9FBF8] border border-[#CFE3CB] rounded-3xl p-4.5 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-[#E2EFE0] pb-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#202E20] font-serif-title">
                          <ShieldCheck className="w-4 h-4 text-[#5C8E56]" />
                          <span>随身香氛结界喷雾 · 3大能量防御实操与高情商处事脚本</span>
                        </div>
                        <span className="text-[10px] text-[#5C8E56] font-medium bg-[#EAF5E8] px-2 py-0.5 rounded-full">
                          轻触喷洒开启
                        </span>
                      </div>
                      <p className="text-[11px] text-[#556953]">
                        在日常职场中，为你量身调配的 3 支防内耗随身“气味结界”（含一键复制高情商回应脚本）：
                      </p>

                      <div className="space-y-2 pt-0.5">
                        {tierAnalysis.soulIdentity.boundaryShields.map((shield, idx) => {
                          const shieldKey = `${topDimension.key}-shield-${idx}`;
                          const isActivated = activeShields[shieldKey];

                          return (
                            <div
                              key={idx}
                              onClick={() => {
                                playWarmTapSound(soundEnabled, 1.2, 'mist');
                                setActiveShields((prev) => ({
                                  ...prev,
                                  [shieldKey]: !prev[shieldKey]
                                }));
                              }}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                                isActivated
                                  ? 'bg-[#EFF8EE] border-[#76A870] shadow-2xs'
                                  : 'bg-[#FFFDF9] border-[#E2EFE0]'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="text-xs font-bold text-[#202E20] flex items-center gap-1.5">
                                  <span className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                                    isActivated ? 'bg-[#5C8E56] text-white' : 'border border-[#BBDCB6]'
                                  }`}>
                                    {isActivated && <Check className="w-3 h-3" />}
                                  </span>
                                  <span>{shield.title}</span>
                                </div>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                                  isActivated ? 'bg-[#5C8E56] text-white' : 'bg-[#EAF5E8] text-[#4B7346]'
                                }`}>
                                  {isActivated ? '🫧 香氛结界生效中' : '点击喷洒'}
                                </span>
                              </div>
                              <div className="text-[10px] text-[#7E967B] mb-1">
                                喷洒情境：{shield.scenario}
                              </div>
                              <p className="text-[11px] text-[#556953] leading-relaxed">
                                {shield.concreteAction}
                              </p>

                              {shield.suggestedScript && (
                                <div className="mt-2.5 p-2.5 rounded-xl bg-[#F6FAF5] border border-[#D5E8D2] flex items-start justify-between gap-2">
                                  <div className="text-[11px] text-[#3D6338] leading-relaxed flex-1">
                                    <span className="font-bold block text-[10px] text-[#4B7346] mb-0.5">💬 建议高情商回复话术：</span>
                                    “{shield.suggestedScript}”
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      playWarmTapSound(soundEnabled, 1.3);
                                      navigator.clipboard?.writeText?.(shield.suggestedScript);
                                      setCopySuccess(true);
                                      setTimeout(() => setCopySuccess(false), 2000);
                                    }}
                                    className="shrink-0 px-2 py-1 rounded-lg bg-white border border-[#CFE3CB] text-[10px] font-medium text-[#4B7346] hover:bg-[#EAF5E8] flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                                  >
                                    <Copy className="w-2.5 h-2.5" />
                                    <span>复制话术</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Chapter 6: 职场心力隐形漏斗诊断与即刻止损法 (Energy Leak Audits) */}
                    {tierAnalysis.soulIdentity.energyLeakAudits && tierAnalysis.soulIdentity.energyLeakAudits.length > 0 && (
                      <div className="bg-[#FFFDF9] border border-[#CFE3CB] rounded-3xl p-4.5 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#EAF2E8] pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#202E20] font-serif-title">
                            <AlertTriangle className="w-4 h-4 text-[#D95D39]" />
                            <span>职场能量暗漏审计 · 偷走你心力的 3 大隐形漏斗</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#D95D39] bg-[#FDF1EC] border border-[#FADBD8] px-2 py-0.5 rounded-full">
                            即刻止损
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          {tierAnalysis.soulIdentity.energyLeakAudits.map((item, idx) => (
                            <div key={idx} className="p-3.5 rounded-2xl bg-[#F9FBF8] border border-[#E2EFE0] space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-[#9C3838] text-[11px] flex items-center gap-1">
                                  <span>⚠️ 漏斗 0{idx + 1}：</span>
                                  <span>{item.drainName}</span>
                                </span>
                              </div>
                              <p className="text-[11px] text-[#7A4545] leading-relaxed bg-[#FCF6F6] p-2 rounded-xl border border-[#F2D7D7]">
                                <span className="font-semibold block mb-0.5 text-[10px] text-[#9C3838]">消耗模式：</span>
                                {item.drainPattern}
                              </p>
                              <div className="text-[11px] text-[#3D6338] leading-relaxed bg-[#F0F7EE] p-2 rounded-xl border border-[#CFE3CB] flex items-start gap-1">
                                <span className="font-bold shrink-0 text-[#4B7346]">💡 即刻止损：</span>
                                <span>{item.instantRelief}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Chapter 7: 关键职场交锋即用高情商脚本库 (Executive Scripts) */}
                    {tierAnalysis.soulIdentity.executiveScripts && tierAnalysis.soulIdentity.executiveScripts.length > 0 && (
                      <div className="bg-gradient-to-br from-[#F9FBF8] via-[#FFFDF9] to-[#EFF6EE] border-2 border-[#A7CCA2] rounded-3xl p-4.5 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#CFE3CB] pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#202E20] font-serif-title">
                            <Swords className="w-4 h-4 text-[#5C8E56]" />
                            <span>关键职场交锋即用脚本 · 体面捍卫边界</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#4B7346] bg-[#EAF5E8] border border-[#BBDCB6] px-2 py-0.5 rounded-full">
                            一键复制
                          </span>
                        </div>

                        <div className="space-y-3 text-xs">
                          {tierAnalysis.soulIdentity.executiveScripts.map((scriptItem, idx) => (
                            <div key={idx} className="p-3.5 rounded-2xl bg-white/95 border border-[#CFE3CB] space-y-2 shadow-2xs">
                              <div className="font-bold text-[#202E20] text-xs flex items-center gap-1.5 border-b border-[#EAF2E8] pb-1.5">
                                <span className="w-5 h-5 rounded-full bg-[#EAF5E8] text-[#4B7346] font-bold text-[10px] flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <span>{scriptItem.scenarioTitle}</span>
                              </div>

                              <div className="text-[10px] text-[#7E967B] bg-[#F6FAF5] p-2 rounded-xl border border-[#E2EFE0]">
                                <span className="font-bold text-[#4B7346] mr-1">破局心法：</span>
                                {scriptItem.mindsetPivot}
                              </div>

                              <div className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#CFE3CB] flex items-start justify-between gap-2">
                                <p className="text-[11px] text-[#3D6338] leading-relaxed flex-1 italic font-serif">
                                  {scriptItem.readyToUseScript}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playWarmTapSound(soundEnabled, 1.3);
                                    navigator.clipboard?.writeText?.(scriptItem.readyToUseScript);
                                    setCopySuccess(true);
                                    setTimeout(() => setCopySuccess(false), 2000);
                                  }}
                                  className="shrink-0 px-2.5 py-1.5 rounded-lg bg-[#EAF5E8] border border-[#BBDCB6] text-[10px] font-bold text-[#3D6338] hover:bg-[#D5E8D2] flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                                >
                                  <Copy className="w-3 h-3" />
                                  <span>复制话术</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ================= TIER 3 SPECIAL: THE DREAM SANCTUARY LIVING BLUEPRINT ================= */}
                {reportActiveTier === 3 && (
                  <div className="space-y-3.5">
                    {/* Chapter 1: 庄园主书房秘匣 · 穿越三十年的时光信笺 */}
                    <div className="bg-[#FCF8FD] border border-[#DEC3EB] rounded-3xl p-4.5 space-y-3.5 shadow-xs relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-[#F4EAF9] pb-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A1731] font-serif-title">
                          <Mail className="w-4 h-4 text-[#A569BD]" />
                          <span>庄园主书房秘匣 · 穿越三十年的时光信笺</span>
                        </div>
                        <span className="text-[10px] font-serif text-[#8E44AD] bg-[#FAF0FC] px-2 py-0.5 rounded-full border border-[#DEC3EB]">
                          金粉火漆
                        </span>
                      </div>

                      <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#DEC3EB] space-y-2 relative shadow-2xs">
                        <div className="text-xs font-bold text-[#7D4F91] font-serif">
                          {tierAnalysis.soulIdentity.futureSelfLetter.salutation}
                        </div>
                        <p className="text-xs text-[#4A3F37] leading-relaxed font-serif pt-1">
                          {tierAnalysis.soulIdentity.futureSelfLetter.body}
                        </p>
                        <div className="text-right text-xs font-bold text-[#A569BD] font-serif pt-1">
                          {tierAnalysis.soulIdentity.futureSelfLetter.blessing}
                        </div>
                      </div>
                    </div>

                    {/* Chapter 2: 庄园四季落成图谱 · 3~5 年生涯与生活漫游路线 */}
                    {tierAnalysis.strategyRoadmap && (
                      <div className="bg-[#FCF8FD] border border-[#DEC3EB] rounded-3xl p-4.5 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#F4EAF9] pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A1731] font-serif-title">
                            <TrendingUp className="w-4 h-4 text-[#A569BD]" />
                            <span>庄园四季落成图谱 · 3~5 年生涯与生活漫游路线</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#8E44AD] bg-[#FAF0FC] px-2 py-0.5 rounded-full">
                            造园路线
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#DEC3EB]">
                            <div className="font-bold text-[#A569BD] text-[11px] mb-1 flex items-center gap-1">
                              <span>🌸 第一季 · 庄园奠基（播种与温室生根）</span>
                              <span className="text-[10px] text-[#7D6485] font-normal">[{tierAnalysis.strategyRoadmap.phase1.timeframe}]</span>
                            </div>
                            <div className="font-bold text-[#2A1731] mb-1">
                              {tierAnalysis.strategyRoadmap.phase1.title}
                            </div>
                            <ul className="list-disc list-inside text-[11px] text-[#694E73] space-y-0.5">
                              {tierAnalysis.strategyRoadmap.phase1.actions.map((act, i) => (
                                <li key={i}>{act}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#DEC3EB]">
                            <div className="font-bold text-[#D48C2A] text-[11px] mb-1 flex items-center gap-1">
                              <span>🌿 第二季 · 庄园繁茂（枝繁叶茂与独家景致）</span>
                              <span className="text-[10px] text-[#7D6485] font-normal">[{tierAnalysis.strategyRoadmap.phase2.timeframe}]</span>
                            </div>
                            <div className="font-bold text-[#2A1731] mb-1">
                              {tierAnalysis.strategyRoadmap.phase2.title}
                            </div>
                            <ul className="list-disc list-inside text-[11px] text-[#694E73] space-y-0.5">
                              {tierAnalysis.strategyRoadmap.phase2.actions.map((act, i) => (
                                <li key={i}>{act}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#DEC3EB]">
                            <div className="font-bold text-[#5C8E56] text-[11px] mb-1 flex items-center gap-1">
                              <span>🍂 第三季 · 庄园圆满（自洽自给与心安丰饶）</span>
                              <span className="text-[10px] text-[#7D6485] font-normal">[{tierAnalysis.strategyRoadmap.phase3.timeframe}]</span>
                            </div>
                            <div className="font-bold text-[#2A1731] mb-1">
                              {tierAnalysis.strategyRoadmap.phase3.title}
                            </div>
                            <ul className="list-disc list-inside text-[11px] text-[#694E73] space-y-0.5">
                              {tierAnalysis.strategyRoadmap.phase3.actions.map((act, i) => (
                                <li key={i}>{act}</li>
                              ))}
                            </ul>
                          </div>

                          {/* 庄园核心商业护城河 & 独家IP延伸罗盘 */}
                          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FAF0FC] to-[#FFFDF9] border border-[#DEC3EB] space-y-2.5">
                            <div>
                              <div className="text-[11px] font-bold text-[#8E44AD] flex items-center gap-1 mb-1">
                                <Sparkles className="w-3.5 h-3.5 text-[#A569BD]" />
                                <span>🏰 庄园核心商业护城河</span>
                              </div>
                              <p className="text-[11px] text-[#4A3F37] leading-relaxed">
                                {tierAnalysis.strategyRoadmap.commercialMoat}
                              </p>
                            </div>
                            <div className="pt-2 border-t border-[#F4EAF9]">
                              <div className="text-[11px] font-bold text-[#7D4F91] flex items-center gap-1 mb-1">
                                <span>🧭</span>
                                <span>独家 IP 延伸罗盘：</span>
                              </div>
                              <p className="text-[11px] text-[#694E73] leading-relaxed">
                                {tierAnalysis.strategyRoadmap.ipExpansionTip}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter 3: 庄园易损角落与防风林 · 心魔与温柔和解密码 */}
                    <div className="bg-[#FFFDF9] border border-[#DEC3EB] rounded-3xl p-4.5 space-y-3 shadow-xs">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A1731] font-serif-title border-b border-[#F4EAF9] pb-2">
                        <Sparkles className="w-4 h-4 text-[#A569BD]" />
                        <span>庄园防风林法则 · 易损角落与温柔和解密码</span>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="p-3.5 rounded-2xl bg-[#FCF5F5] border border-[#F2D7D7]">
                          <div className="font-bold text-[#9C3838] mb-1 flex items-center gap-1.5 text-[11px]">
                            <span>⛈️</span>
                            <span>庄园易受风雨扰动的角落 (心魔)：{tierAnalysis.soulIdentity.achillesHeel.shadowName}</span>
                          </div>
                          <p className="text-[11px] text-[#6E423E] leading-relaxed">
                            {tierAnalysis.soulIdentity.achillesHeel.shadowDescription}
                          </p>
                        </div>

                        {/* 3步具体心理拆弹步骤 */}
                        {tierAnalysis.soulIdentity.achillesHeel.recoverySteps && (
                          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#DEC3EB] space-y-2">
                            <div className="font-bold text-[#7D4F91] flex items-center gap-1.5 text-[11px]">
                              <span>🛠️</span>
                              <span>3 步具体心理拆弹与温柔解围法</span>
                            </div>
                            <div className="space-y-1.5 pt-0.5">
                              {tierAnalysis.soulIdentity.achillesHeel.recoverySteps.map((step, idx) => (
                                <div key={idx} className="p-2 rounded-xl bg-[#FAF0FC]/70 border border-[#F4EAF9] text-[11px] text-[#694E73] leading-relaxed">
                                  {step}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FAF0FC] to-[#FFFDF9] border border-[#DEC3EB]">
                          <div className="font-bold text-[#7D4F91] mb-1 flex items-center gap-1.5 text-[11px]">
                            <span>🔑</span>
                            <span>庄园守护的温柔和解金钥匙</span>
                          </div>
                          <p className="text-[11px] text-[#4A3F37] leading-relaxed font-serif italic">
                            “{tierAnalysis.soulIdentity.achillesHeel.goldenKey}”
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Chapter 4: 属于你的超级个体果园 · 核心资产造血飞轮 */}
                    <div className="bg-[#FCF8FD] border border-[#DEC3EB] rounded-3xl p-4.5 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-[#F4EAF9] pb-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A1731] font-serif-title">
                          <Compass className="w-4 h-4 text-[#A569BD]" />
                          <span>超级个体果园 · 庄园终身心安造血飞轮</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#8E44AD] bg-[#FAF0FC] px-2 py-0.5 rounded-full border border-[#DEC3EB]">
                          私享资产
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#DEC3EB]">
                          <div className="font-bold text-[#2A1731] text-[11px] mb-0.5">
                            🍏 庄园值得培育的首选核心资产原型
                          </div>
                          <div className="font-bold text-[#A569BD] text-xs mb-1">
                            {tierAnalysis.soulIdentity.superIndividualAsset.prototypeName}
                          </div>
                          <p className="text-[11px] text-[#694E73] leading-relaxed">
                            {tierAnalysis.soulIdentity.superIndividualAsset.focusAction}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#DEC3EB]">
                          <div className="font-bold text-[#2A1731] text-[11px] mb-0.5">
                            ⏳ 庄园每周黄金时间投资模型
                          </div>
                          <p className="text-[11px] text-[#694E73] leading-relaxed">
                            {tierAnalysis.soulIdentity.superIndividualAsset.weeklySplit}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Chapter 5: 超级个体 0 到 1 破局执行沙盒 (Super-Individual Launch Sandbox) */}
                    {tierAnalysis.soulIdentity.superIndividualSandbox && (
                      <div className="bg-[#FFFDF9] border-2 border-[#D9BBE5] rounded-3xl p-4.5 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#F4EAF9] pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A1731] font-serif-title">
                            <Zap className="w-4 h-4 text-[#A569BD]" />
                            <span>超级个体 0 到 1 破局沙盒 · 交付与获客路线</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#8E44AD] bg-[#FAF0FC] px-2 py-0.5 rounded-full border border-[#DEC3EB]">
                            闭环落地
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          {/* MVP deliverable */}
                          <div className="p-3 rounded-2xl bg-[#FAF5FC] border border-[#E9D5F2] space-y-1">
                            <div className="font-bold text-[#7D4F91] text-[11px] flex items-center gap-1">
                              <span>📦</span>
                              <span>最小可行性资产 (MVP) 交付形态：</span>
                            </div>
                            <p className="text-[11px] text-[#4A3F37] leading-relaxed">
                              {tierAnalysis.soulIdentity.superIndividualSandbox.mvpDeliverable}
                            </p>
                          </div>

                          {/* First 100 Fans Path */}
                          <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#DEC3EB] space-y-1">
                            <div className="font-bold text-[#8E44AD] text-[11px] flex items-center gap-1">
                              <span>🌱</span>
                              <span>前 100 位核心种子用户的获取路径：</span>
                            </div>
                            <p className="text-[11px] text-[#694E73] leading-relaxed">
                              {tierAnalysis.soulIdentity.superIndividualSandbox.first100FansPath}
                            </p>
                          </div>

                          {/* Flywheel Model */}
                          <div className="p-3 rounded-2xl bg-gradient-to-r from-[#FAF0FC] to-[#F5EFF9] border border-[#D9BBE5] space-y-1">
                            <div className="font-bold text-[#6E3C80] text-[11px] flex items-center gap-1">
                              <span>🔄</span>
                              <span>终生复利自转造血飞轮：</span>
                            </div>
                            <p className="text-[11px] text-[#4A3F37] leading-relaxed">
                              {tierAnalysis.soulIdentity.superIndividualSandbox.flywheelModel}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter 6: 终生自洽减法清单 · 3 大断舍离法则 (Subtraction Manifesto) */}
                    {tierAnalysis.soulIdentity.subtractionManifesto && tierAnalysis.soulIdentity.subtractionManifesto.length > 0 && (
                      <div className="bg-[#FCF8FD] border border-[#DEC3EB] rounded-3xl p-4.5 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#F4EAF9] pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A1731] font-serif-title">
                            <Feather className="w-4 h-4 text-[#A569BD]" />
                            <span>终身自洽减法清单 · 3 大清醒断舍离法则</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#7D4F91] bg-[#FAF0FC] px-2 py-0.5 rounded-full border border-[#DEC3EB]">
                            轻装上阵
                          </span>
                        </div>

                        <div className="space-y-2 text-xs">
                          {tierAnalysis.soulIdentity.subtractionManifesto.map((item, idx) => (
                            <div key={idx} className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#DEC3EB] space-y-1">
                              <div className="font-bold text-[#9C3838] text-[11px] flex items-center gap-1">
                                <span>✂️ 断舍离 0{idx + 1}：</span>
                                <span>{item.abandonTask}</span>
                              </div>
                              <p className="text-[11px] text-[#694E73] leading-relaxed">
                                {item.reasonWhy}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Chapter 7: 专属颁发 · 《永远做自己 · 自在人生许可证》与大女主四舍五入法则 */}
                    {tierAnalysis.soulIdentity.lifestyleDecree && (
                      <div className="bg-gradient-to-br from-[#FAF0FC] via-[#FFFDF9] to-[#F7F1FB] border-2 border-[#D9BBE5] rounded-3xl p-4.5 space-y-3 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between border-b border-[#EBD5F2] pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#7D4F91] font-serif-title">
                            <Crown className="w-4 h-4 text-[#A569BD]" />
                            <span>专属颁发 · 庄园终身心安与自洽许可证</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#8E44AD] bg-[#FAF0FC] px-2 py-0.5 rounded-full border border-[#DEC3EB]">
                            至高特权
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          {/* Formal License Card Box */}
                          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FAF0FC] to-[#F5EFF9] border border-[#D9BBE5] text-center space-y-1.5">
                            <div className="text-[10px] font-bold text-[#8E44AD] tracking-widest uppercase">
                              HER MAJESTY'S LIVING CHARTER
                            </div>
                            <h4 className="text-sm font-bold text-[#2A1731] font-serif-title">
                              {tierAnalysis.soulIdentity.lifestyleDecree.licenseTitle}
                            </h4>
                            <p className="text-[11px] text-[#694E73] leading-relaxed pt-1">
                              {tierAnalysis.soulIdentity.lifestyleDecree.licenseSummary}
                            </p>
                          </div>

                          {/* Freedom Formula */}
                          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#DEC3EB]">
                            <div className="font-bold text-[#7D4F91] text-[11px] mb-1 flex items-center gap-1.5">
                              <span>🌸</span>
                              <span>大女主终生自洽 · 四舍五入法则：</span>
                            </div>
                            <p className="text-[11px] text-[#4A3F37] leading-relaxed font-serif italic">
                              “{tierAnalysis.soulIdentity.lifestyleDecree.freedomFormula}”
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile Radar Chart Container with Lightweight Micro-interactions */}
                <div
                  className={`rounded-3xl p-4 shadow-xs relative overflow-hidden transition-all duration-500 border ${
                    reportActiveTier === 2
                      ? 'border-[#CFE3CB] bg-[#F9FBF8]'
                      : reportActiveTier === 3
                      ? 'border-[#DEC3EB] bg-[#FCF8FD]'
                      : 'border-[#F4CD96] bg-[#FFFDF9]'
                  }`}
                  style={{
                    borderColor: radarGlowActive
                      ? `${DIMENSIONS[selectedDim].color}88`
                      : reportActiveTier === 2
                      ? '#CFE3CB'
                      : reportActiveTier === 3
                      ? '#DEC3EB'
                      : '#F4CD96',
                    boxShadow: radarGlowActive ? `0 0 24px ${DIMENSIONS[selectedDim].color}20` : undefined
                  }}
                >
                  {/* Dynamic Radiant Ambient Aura Feedback on Dimension Click */}
                  {radarGlowActive && (
                    <div
                      key={`glow-bg-${radarGlowKey}`}
                      className="absolute inset-0 pointer-events-none z-0 animate-in fade-in duration-200"
                    >
                      <div
                        className="absolute inset-0 opacity-45 transition-opacity duration-700 ease-out"
                        style={{
                          background: `radial-gradient(circle at 50% 42%, ${DIMENSIONS[selectedDim].color}44 0%, ${DIMENSIONS[selectedDim].color}16 50%, transparent 75%)`
                        }}
                      />
                      <div
                        className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border-2 animate-ping opacity-30"
                        style={{ borderColor: DIMENSIONS[selectedDim].color }}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-1 relative z-10">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm font-bold text-[#29221E] font-serif-title">
                          六维能力图谱
                        </h2>
                        {radarGlowActive && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white animate-in zoom-in-75 duration-200 shadow-xs flex items-center gap-1"
                            style={{ backgroundColor: DIMENSIONS[selectedDim].color }}
                          >
                            <Sparkles className="w-2.5 h-2.5 animate-spin" />
                            <span>灵犀共鸣</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#8A7D73]">轻触图谱顶点或下方标签，探索你的闪光能量</p>
                    </div>
                    <button
                      onClick={() => setShowSandbox((prev) => !prev)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                        showSandbox
                          ? 'bg-[#D95D39] text-white'
                          : 'bg-[#FFFDF9] border border-[#E8DFD3] text-[#4A3F37]'
                      }`}
                    >
                      <SlidersHorizontal className="w-3 h-3" />
                      <span>{showSandbox ? '收起' : '微调器'}</span>
                    </button>
                  </div>

                  {/* 6 Dimension Quick Tap Chips for Instant Tactile Feedback */}
                  <div className="flex items-center gap-1 py-1.5 overflow-x-auto no-scrollbar relative z-10">
                    {DIMENSION_LIST.map((dim) => {
                      const isSel = selectedDim === dim.key;
                      return (
                        <button
                          key={dim.key}
                          onClick={() => handleSelectDimension(dim.key)}
                          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 active:scale-95 ${
                            isSel
                              ? 'text-white shadow-xs scale-105'
                              : 'bg-[#FFFDF9] border border-[#E8DFD3] text-[#5C5046] hover:bg-[#F3ECE2]'
                          }`}
                          style={{
                            backgroundColor: isSel ? dim.color : undefined,
                            borderColor: isSel ? dim.color : undefined
                          }}
                        >
                          {isSel && <Sparkles className="w-2.5 h-2.5" />}
                          <span>{dim.shortName}</span>
                          <span className="text-[9px] opacity-80 tabular-nums">({computedScores[dim.key]})</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="py-1 relative z-10">
                    <WarmRadarChart
                      scores={computedScores}
                      selectedDim={selectedDim}
                      onSelectDim={(dim) => handleSelectDimension(dim)}
                      isGlowActive={radarGlowActive}
                      glowKey={radarGlowKey}
                    />
                  </div>

                  {/* Dimension Detailed Insight Box with Responsive Lighting */}
                  <div
                    className="p-3.5 rounded-2xl bg-[#FFFDF9] border transition-all duration-300 relative z-10 space-y-1"
                    style={{
                      borderColor: radarGlowActive ? DIMENSIONS[selectedDim].color : '#E8DFD3',
                      boxShadow: radarGlowActive ? `0 0 16px ${DIMENSIONS[selectedDim].color}22` : undefined
                    }}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: DIMENSIONS[selectedDim].color }}
                        />
                        <span className="text-xs font-bold text-[#29221E]">
                          {DIMENSIONS[selectedDim].name}
                        </span>
                        <span
                          className="text-[10px] font-medium px-1.5 py-0.2 rounded"
                          style={{
                            backgroundColor: `${DIMENSIONS[selectedDim].color}18`,
                            color: DIMENSIONS[selectedDim].color
                          }}
                        >
                          {DIMENSIONS[selectedDim].subtitle}
                        </span>
                      </div>
                      <span
                        className="text-xs font-black tabular-nums"
                        style={{ color: DIMENSIONS[selectedDim].color }}
                      >
                        {computedScores[selectedDim]} 分
                      </span>
                    </div>

                    <div className="text-[11px] font-semibold text-[#29221E] pt-0.5">
                      {DIMENSIONS[selectedDim].highTrait}
                    </div>

                    <p className="text-[11px] text-[#5C5046] leading-relaxed">
                      {DIMENSIONS[selectedDim].dailyStrength}
                    </p>

                    <div className="pt-2 mt-1 border-t border-[#F2EAE0] flex items-center justify-between text-[10px] text-[#8A7D73]">
                      <span>底层理论：{DIMENSIONS[selectedDim].theory.bigFiveTrait}</span>
                      <span className="font-semibold text-[#D95D39]">
                        {DIMENSIONS[selectedDim].theory.riasecCode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Matched Careers Mobile List */}
                <div className="space-y-3">
                  <div className="px-1 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-[#29221E] font-serif-title">
                        {reportActiveTier === 1
                          ? '当前匹配 · Top 3 启蒙方向'
                          : reportActiveTier === 2
                          ? '实战精进 · Top 6 细分岗位'
                          : '全景深度 · 职业规划图谱'}
                      </h2>
                      <p className="text-[10px] text-[#8A7D73]">
                        轻触卡片展开工作写照与破冰打卡
                      </p>
                    </div>
                    <button
                      onClick={() => setShowPosterSheet(true)}
                      className="text-xs font-semibold text-[#D95D39] flex items-center gap-1"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>生成海报</span>
                    </button>
                  </div>

                  {matchedCareers
                    .slice(0, reportActiveTier === 1 ? 3 : reportActiveTier === 2 ? 6 : 9)
                    .map((career, index) => {
                      const isExpanded =
                        expandedCareerId === career.id || (index === 0 && expandedCareerId === null);
                      const isSaved = savedCareerIds.includes(career.id);

                      return (
                        <div
                          key={career.id}
                          className={`rounded-2xl border transition-all p-3.5 bg-[#FBF8F3] ${
                            isExpanded ? 'border-[#D95D39] shadow-xs' : 'border-[#E8DFD3]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] text-[#8A7D73] mb-1.5">
                            <span className="font-semibold text-[#D95D39]">
                              TOP 0{index + 1} · {career.category}
                            </span>
                            <span className="font-bold text-[#D95D39] tabular-nums">
                              {career.matchScore}% 契合
                            </span>
                          </div>

                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-bold text-[#29221E] leading-snug">
                              {career.title}
                            </h3>
                            <button
                              onClick={() => toggleSaveCareer(career.id)}
                              className={`min-h-[32px] px-2 py-0.5 rounded-lg text-[11px] font-medium flex items-center gap-1 shrink-0 ${
                                isSaved
                                  ? 'bg-[#D95D39] text-white'
                                  : 'bg-[#FFFDF9] border border-[#E8DFD3] text-[#5C5046]'
                              }`}
                            >
                              <BookmarkCheck className="w-3 h-3" />
                              <span>{isSaved ? '已收藏' : '心愿单'}</span>
                            </button>
                          </div>

                          <p className="text-[11px] text-[#5C5046] mt-1 leading-relaxed">
                            {career.tagline}
                          </p>

                          <div className="mt-2 p-2.5 rounded-xl bg-[#FDF6EA] text-[11px] text-[#5C5046] leading-relaxed">
                            <span className="font-semibold text-[#946121]">为什么契合你：</span>
                            {career.whyFit}
                          </div>

                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-[#EFE7DC] space-y-2.5 text-xs">
                              <div>
                                <div className="font-bold text-[#29221E] text-[11px] mb-0.5">
                                  真实工作写照
                                </div>
                                <p className="text-[11px] text-[#5C5046] leading-relaxed">
                                  {career.dailyMoment}
                                </p>
                              </div>

                              <div className="flex justify-between text-[11px] text-[#6B5E54]">
                                <span>工作状态：{career.workStyle}</span>
                                <span className="tabular-nums">参考月薪：{career.salaryRange}</span>
                              </div>

                              {/* Checklist */}
                              <div className="pt-1">
                                <div className="font-bold text-[#D95D39] text-[11px] mb-1.5">
                                  本周行动建议（轻触勾选打卡）：
                                </div>
                                <div className="space-y-1.5">
                                  {career.firstSteps.map((stepText, sIdx) => {
                                    const stepKey = `${career.id}_m_step_${sIdx}`;
                                    const isDone = Boolean(checkedSteps[stepKey]);
                                    return (
                                      <button
                                        key={stepKey}
                                        onClick={() => toggleActionStep(stepKey)}
                                        className={`w-full text-left p-2 rounded-xl border flex items-start gap-2 text-[11px] transition-colors cursor-pointer ${
                                          isDone
                                            ? 'bg-[#F2F5EF] border-[#7A8B68]/40 text-[#49563B]'
                                            : 'bg-[#FFFDF9] border-[#E8DFD3] text-[#4A3F37]'
                                        }`}
                                      >
                                        <span
                                          className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                                            isDone ? 'bg-[#7A8B68] text-white' : 'border border-[#B0A398]'
                                          }`}
                                        >
                                          {isDone && <Check className="w-2.5 h-2.5" />}
                                        </span>
                                        <span className={isDone ? 'line-through opacity-75' : ''}>
                                          {stepText}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() =>
                              setExpandedCareerId(isExpanded ? '__none__' : career.id)
                            }
                            className="mt-3 pt-2 border-t border-[#EFE7DC] w-full flex items-center justify-between text-[11px] font-medium text-[#6B5E54]"
                          >
                            <span>{isExpanded ? '收起职业指南' : '展开真实日常与行动路径'}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}

                  <div className="pt-1.5 text-center">
                    <button
                      onClick={() => {
                        playWarmTapSound(soundEnabled, 1.05);
                        setView('explore');
                      }}
                      className="w-full py-2.5 px-3 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3] text-[#D95D39] text-xs font-semibold hover:border-[#D95D39] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>在「温暖职业图鉴库」探索全部 36 种细分职业与行动路径 →</span>
                    </button>
                  </div>
                </div>

                {/* Progressive Next Tier Promotion Card */}
                {reportActiveTier === 1 && !tier2Completed && (
                  <div className="p-4 rounded-3xl bg-[#FDF6EA] border border-[#F0DEC2] space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#946121]">
                      <Sparkles className="w-4 h-4 text-[#D95D39]" />
                      <span>下一步进阶：第二层 · 职场实战测评 (12题) 已解锁</span>
                    </div>
                    <p className="text-[11px] text-[#5C5046] leading-relaxed">
                      第一层已清晰勾勒出你的天赋画像。继续完成第二层，将解锁你的【职场协作实战风格矩阵】、【心流触发按键】与【防内耗能量雷区】！
                    </p>
                    <button
                      onClick={() => startTierQuiz(2)}
                      className="w-full min-h-[44px] py-2.5 rounded-2xl bg-[#D95D39] text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform cursor-pointer shadow-sm"
                    >
                      <span>开启第二层 · 职场实战测评 (12题)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {reportActiveTier === 2 && !tier3Completed && (
                  <div className="p-4 rounded-3xl bg-[#FDF6EA] border border-[#F0DEC2] space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#946121]">
                      <Sparkles className="w-4 h-4 text-[#D95D39]" />
                      <span>终极进阶：第三层 · 大师战略测评 (15题) 已解锁</span>
                    </div>
                    <p className="text-[11px] text-[#5C5046] leading-relaxed">
                      你已通透掌握职场协作实态。继续挑战第三层，将为你量身定制【未来 3~5 年专属生涯战略路线图】与【商业护城河】！
                    </p>
                    <button
                      onClick={() => startTierQuiz(3)}
                      className="w-full min-h-[44px] py-2.5 rounded-2xl bg-[#D95D39] text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform cursor-pointer shadow-sm"
                    >
                      <span>开启第三层 · 大师战略测评 (15题)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ==================== VIEW 4: CAREER EXPLORER (LOCKED UNTIL TIER 1 FINISHED) ==================== */}
        {view === 'explore' && (
          <div className="flex-1 px-4 py-4 space-y-4">
            {!tier1Completed ? (
              <div className="rounded-3xl bg-[#FBF8F3] border border-[#E8DFD3] text-center my-4 overflow-hidden relative shadow-xs">
                <div className="w-full h-36 relative overflow-hidden bg-[#EDE4D7]">
                  <img
                    src={ARTWORK_IMAGES.heroBanner}
                    alt="等待探索"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-95 filter blur-[0.6px]"
                  />
                  <div className="absolute inset-0 bg-[#29221E]/30 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#D95D39] flex items-center justify-center shadow-md border border-white/80">
                      <Lock className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-4 space-y-3">
                  <h2 className="text-base font-bold text-[#29221E] font-serif-title">
                    职业图鉴暂未解锁
                  </h2>
                  <p className="text-xs text-[#5C5046] leading-relaxed max-w-sm mx-auto">
                    请先完成第一层「天赋初探 (9题)」，测出你的核心优势维度后，即可解锁全部 36 项职业图鉴与契合度匹配。
                  </p>
                  <button
                    onClick={() => startTierQuiz(1)}
                    className="px-5 py-2.5 rounded-2xl bg-[#D95D39] text-white text-xs font-semibold shadow-xs inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
                  >
                    <span>立即开启第一层测评 (9题)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Illustrated Explorer Header Banner */}
                <div className="rounded-3xl border border-[#E8DFD3] overflow-hidden bg-[#FBF8F3] shadow-xs">
                  <div className="w-full aspect-[16/7] min-h-[135px] relative overflow-hidden bg-[#EDE4D7]">
                    <img
                      src={ARTWORK_IMAGES.peopleConnect}
                      alt="温暖职业图鉴"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#201811]/55 via-transparent to-transparent flex items-end p-3.5">
                      <div className="text-white drop-shadow-xs">
                        <div className="text-[10px] text-[#F9E2AF] font-bold flex items-center gap-1 mb-0.5">
                          <Sparkles className="w-3 h-3 text-[#F5B041]" />
                          <span>探索多元自洽的生活可能 · 36 项职业深度图鉴</span>
                        </div>
                        <h1 className="text-base font-bold font-serif-title">
                          温暖职业图鉴库 · 找到热爱的土壤
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 text-[11px] text-[#5C5046] leading-relaxed">
                    不必削足适履，结合你的天性优势维度，发现能让你既能闪光、又能被滋养的 36 项优质职业路径与行动指南。
                  </div>
                </div>

                {/* Search Bar for 36 Careers */}
                <div className="relative">
                  <input
                    type="text"
                    value={exploreSearchKeyword}
                    onChange={(e) => setExploreSearchKeyword(e.target.value)}
                    placeholder="搜索 36 种职业或技能关键词（如设计、策划、心理、运营、独立）…"
                    className="w-full h-10 pl-9 pr-8 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD3] text-xs text-[#29221E] placeholder:text-[#A89C91] focus:outline-none focus:border-[#D95D39] shadow-2xs"
                  />
                  <Search className="w-4 h-4 text-[#8A7D73] absolute left-3 top-3 pointer-events-none" />
                  {exploreSearchKeyword && (
                    <button
                      onClick={() => setExploreSearchKeyword('')}
                      className="absolute right-2.5 top-2.5 w-5 h-5 rounded-full bg-[#EFE7DC] text-[#6B5E54] flex items-center justify-center text-[10px] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Dimension Filter Tabs with Dynamic Counts */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  <button
                    onClick={() => {
                      playWarmTapSound(soundEnabled, 1);
                      setExploreFilterDim('all');
                    }}
                    className={`min-h-[34px] px-3 rounded-xl text-xs font-medium shrink-0 whitespace-nowrap cursor-pointer transition-all ${
                      exploreFilterDim === 'all'
                        ? 'bg-[#D95D39] text-white font-semibold shadow-xs'
                        : 'bg-[#F4ECE1] text-[#5C5046]'
                    }`}
                  >
                    全部 ({matchedCareers.length})
                  </button>
                  {DIMENSION_LIST.map((dim) => {
                    const dimCount = matchedCareers.filter((c) => c.primaryDims.includes(dim.key)).length;
                    return (
                      <button
                        key={dim.key}
                        onClick={() => {
                          playWarmTapSound(soundEnabled, 1.05);
                          setExploreFilterDim(dim.key);
                        }}
                        className={`min-h-[34px] px-3 rounded-xl text-xs font-medium shrink-0 whitespace-nowrap cursor-pointer transition-all ${
                          exploreFilterDim === dim.key
                            ? 'bg-[#D95D39] text-white font-semibold shadow-xs'
                            : 'bg-[#F4ECE1] text-[#5C5046]'
                        }`}
                      >
                        {dim.shortName}型 ({dimCount})
                      </button>
                    );
                  })}
                </div>

                {/* Career List */}
                <div className="space-y-3">
                  {matchedCareers
                    .filter((c) => {
                      const matchesDim =
                        exploreFilterDim === 'all' || c.primaryDims.includes(exploreFilterDim);
                      const q = exploreSearchKeyword.trim().toLowerCase();
                      const matchesKeyword =
                        !q ||
                        c.title.toLowerCase().includes(q) ||
                        c.category.toLowerCase().includes(q) ||
                        c.tagline.toLowerCase().includes(q) ||
                        c.whyFit.toLowerCase().includes(q) ||
                        c.coreSkills.some((s) => s.toLowerCase().includes(q));
                      return matchesDim && matchesKeyword;
                    })
                    .map((career) => {
                      const isSaved = savedCareerIds.includes(career.id);
                      const isExpanded = expandedCareerId === career.id;
                      const d1 = DIMENSIONS[career.primaryDims[0]];
                      const d2 = DIMENSIONS[career.primaryDims[1]];

                      return (
                        <div
                          key={career.id}
                          className={`rounded-2xl border transition-all p-3.5 bg-[#FBF8F3] space-y-2 ${
                            isExpanded ? 'border-[#D95D39] shadow-xs' : 'border-[#E8DFD3]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] text-[#8A7D73]">
                            <span className="font-medium text-[#8C6246]">
                              {career.category} · {d1.shortName} × {d2.shortName}
                            </span>
                            <span className="font-bold text-[#D95D39] tabular-nums">
                              {career.matchScore}% 契合
                            </span>
                          </div>

                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-bold text-[#29221E] leading-snug">
                              {career.title}
                            </h3>
                            <button
                              onClick={() => toggleSaveCareer(career.id)}
                              className={`min-h-[30px] px-2.5 rounded-lg text-[11px] font-medium flex items-center gap-1 shrink-0 cursor-pointer active:scale-95 transition-transform ${
                                isSaved
                                  ? 'bg-[#D95D39] text-white shadow-2xs'
                                  : 'bg-[#FFFDF9] border border-[#E8DFD3] text-[#5C5046]'
                              }`}
                            >
                              <BookmarkCheck className="w-3 h-3" />
                              <span>{isSaved ? '已收藏' : '心愿单'}</span>
                            </button>
                          </div>

                          <p className="text-[11px] text-[#5C5046] leading-relaxed">
                            {career.tagline}
                          </p>

                          {/* Expanded Full Career Details */}
                          {isExpanded && (
                            <div className="space-y-3 pt-2 text-xs border-t border-[#EFE7DC] mt-2 animate-in fade-in duration-200">
                              <div className="p-2.5 rounded-xl bg-[#FDF6EA] text-[11px] text-[#5C5046] leading-relaxed">
                                <span className="font-bold text-[#946121] mr-1">为什么适合你：</span>
                                {career.whyFit}
                              </div>

                              <div className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#EFE7DC] space-y-1">
                                <div className="font-semibold text-[#29221E] text-[11px]">
                                  真实日常切片：
                                </div>
                                <div className="text-[11px] text-[#6B5E54] leading-relaxed">
                                  {career.dailyMoment}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-[11px]">
                                <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#EFE7DC]">
                                  <div className="text-[#8A7D73] text-[10px] mb-0.5">薪资参考</div>
                                  <div className="font-semibold text-[#D95D39]">
                                    {career.salaryRange}
                                  </div>
                                </div>
                                <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#EFE7DC]">
                                  <div className="text-[#8A7D73] text-[10px] mb-0.5">工作风格</div>
                                  <div className="font-medium text-[#29221E]">
                                    {career.workStyle}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="font-semibold text-[#29221E] text-[11px] mb-1.5">
                                  核心能力与技能标签：
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {career.coreSkills.map((skill, sIdx) => (
                                    <span
                                      key={sIdx}
                                      className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-[#FFFDF9] border border-[#E8DFD3] text-[#5C5046]"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <div className="font-semibold text-[#29221E] text-[11px] mb-1.5">
                                  长期成长进阶路径：
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-[#5C5046] overflow-x-auto pb-1 no-scrollbar">
                                  {career.growthPath.map((step, pIdx) => (
                                    <React.Fragment key={pIdx}>
                                      <span className="px-2 py-1 rounded-lg bg-[#F4ECE1] shrink-0 font-medium text-[#4A3F37]">
                                        {step}
                                      </span>
                                      {pIdx < career.growthPath.length - 1 && (
                                        <ArrowRight className="w-3 h-3 text-[#B0A398] shrink-0" />
                                      )}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>

                              <div className="p-3 rounded-2xl bg-[#F6FAF5] border border-[#CFE3CB] space-y-2">
                                <div className="text-[11px] font-bold text-[#3B6E32] flex items-center justify-between">
                                  <span>你可以尝试的微小第一步（微行动）：</span>
                                  <span className="text-[10px] font-normal text-[#5C8E56]">点击打勾践行</span>
                                </div>
                                <div className="space-y-1.5">
                                  {career.firstSteps.map((stepText, stepIdx) => {
                                    const stepKey = `${career.id}_step_${stepIdx}`;
                                    const isDone = !!checkedSteps[stepKey];
                                    return (
                                      <button
                                        key={stepIdx}
                                        onClick={() =>
                                          setCheckedSteps((prev) => ({
                                            ...prev,
                                            [stepKey]: !isDone
                                          }))
                                        }
                                        className={`w-full text-left p-2 rounded-xl border text-[11px] leading-relaxed transition-all cursor-pointer flex items-start gap-2 ${
                                          isDone
                                            ? 'bg-[#F2F5EF] border-[#7A8B68]/40 text-[#49563B]'
                                            : 'bg-[#FFFDF9] border-[#E8DFD3] text-[#4A3F37]'
                                        }`}
                                      >
                                        <span
                                          className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                                            isDone ? 'bg-[#7A8B68] text-white' : 'border border-[#B0A398]'
                                          }`}
                                        >
                                          {isDone && <Check className="w-2.5 h-2.5" />}
                                        </span>
                                        <span className={isDone ? 'line-through opacity-75' : ''}>
                                          {stepText}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() =>
                              setExpandedCareerId(isExpanded ? null : career.id)
                            }
                            className="mt-2 pt-2 border-t border-[#EFE7DC] w-full flex items-center justify-between text-[11px] font-medium text-[#6B5E54] cursor-pointer hover:text-[#29221E]"
                          >
                            <span>{isExpanded ? '收起职业指南' : '展开真实日常与行动路径'}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}

                  {/* Empty Search State */}
                  {matchedCareers.filter((c) => {
                    const matchesDim =
                      exploreFilterDim === 'all' || c.primaryDims.includes(exploreFilterDim);
                    const q = exploreSearchKeyword.trim().toLowerCase();
                    const matchesKeyword =
                      !q ||
                      c.title.toLowerCase().includes(q) ||
                      c.category.toLowerCase().includes(q) ||
                      c.tagline.toLowerCase().includes(q) ||
                      c.whyFit.toLowerCase().includes(q) ||
                      c.coreSkills.some((s) => s.toLowerCase().includes(q));
                    return matchesDim && matchesKeyword;
                  }).length === 0 && (
                    <div className="p-8 rounded-3xl bg-[#FBF8F3] border border-[#E8DFD3] text-center space-y-2.5 my-3">
                      <div className="w-10 h-10 rounded-full bg-[#F4ECE1] text-[#8A7D73] flex items-center justify-center mx-auto">
                        <Search className="w-5 h-5" />
                      </div>
                      <div className="text-sm font-bold text-[#29221E] font-serif-title">
                        未找到与“{exploreSearchKeyword}”匹配的职业
                      </div>
                      <p className="text-xs text-[#8A7D73]">
                        可以尝试搜索其他关键词（如设计、心理、运营、独立）或重置筛选
                      </p>
                      <button
                        onClick={() => {
                          setExploreSearchKeyword('');
                          setExploreFilterDim('all');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#D95D39] text-white text-xs font-semibold shadow-xs cursor-pointer"
                      >
                        清空搜索与筛选条件
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ==================== FIXED MOBILE BOTTOM TAB BAR ==================== */}
        <nav
          aria-label="移动端底部导航"
          className="fixed bottom-0 left-0 right-0 z-40 max-w-[480px] mx-auto h-[54px] bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#E8DFD3] grid grid-cols-4 items-center px-1"
        >
          <button
            onClick={() => {
              playWarmTapSound(soundEnabled, 1);
              setView('home');
            }}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
              view === 'home' ? 'text-[#D95D39] font-bold' : 'text-[#8A7D73]'
            }`}
          >
            <Home className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">首页路线</span>
          </button>

          <button
            onClick={() => {
              playWarmTapSound(soundEnabled, 1.05);
              setView('quiz');
            }}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors cursor-pointer relative ${
              view === 'quiz' ? 'text-[#D95D39] font-bold' : 'text-[#8A7D73]'
            }`}
          >
            <FileQuestion className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">
              第{currentTier}层测评
            </span>
          </button>

          <button
            onClick={() => {
              playWarmTapSound(soundEnabled, 1.1);
              setView('results');
            }}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
              view === 'results' ? 'text-[#D95D39] font-bold' : 'text-[#8A7D73]'
            }`}
          >
            <Award className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">
              {tier1Completed ? '潜能报告' : '🔒潜能报告'}
            </span>
          </button>

          <button
            onClick={() => {
              playWarmTapSound(soundEnabled, 1.15);
              setView('explore');
            }}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors cursor-pointer ${
              view === 'explore' ? 'text-[#D95D39] font-bold' : 'text-[#8A7D73]'
            }`}
          >
            <Compass className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">
              {tier1Completed ? '职业图鉴' : '🔒职业图鉴'}
            </span>
          </button>
        </nav>

        {/* ==================== MILESTONE TIER CELEBRATION MODAL (HIGH DOPAMINE UNBOXING) ==================== */}
        {completedMilestoneTier !== null && (
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
            <div
              className={`rounded-3xl border-2 max-w-[370px] w-full text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden ${
                completedMilestoneTier === 2
                  ? 'bg-gradient-to-b from-[#F9FBF8] via-[#FFFDF9] to-[#EFF6EE] border-[#A7CCA2] text-[#202E20]'
                  : completedMilestoneTier === 3
                  ? 'bg-gradient-to-b from-[#FCF8FD] via-[#FFFDF9] to-[#F7F1FB] border-[#D9BBE5] text-[#2A1731]'
                  : 'bg-[#FFFDF9] border-[#E5B573] text-[#29221E]'
              }`}
            >
              {/* Background ambient aura */}
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none ${
                  completedMilestoneTier === 2
                    ? 'bg-[#A7CCA2]/30'
                    : completedMilestoneTier === 3
                    ? 'bg-[#D9BBE5]/35'
                    : 'bg-[#F8DCB0]/50'
                }`}
              />

              {/* Celebration Artwork Top Strip - Perfectly full-bleed edge-to-edge */}
              <div className="w-full h-28 relative overflow-hidden shrink-0">
                <img
                  src={
                    completedMilestoneTier === 2
                      ? ARTWORK_IMAGES.peopleConnect
                      : completedMilestoneTier === 3
                      ? ARTWORK_IMAGES.logicStrategy
                      : ARTWORK_IMAGES.creativeVision
                  }
                  alt="通关庆典"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#201811]/55 via-transparent to-transparent flex items-end justify-center pb-2.5">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-xs border border-white/80 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D95D39]" />
                    <span className="text-[#3A2A1D]">
                      {completedMilestoneTier === 2
                        ? '🌸 SSR+ 情绪特调 · 高定香氛礼盒'
                        : completedMilestoneTier === 3
                        ? '🏰 SP 终身自洽 · 梦幻私享庄园'
                        : '✨ SSR 天赋初探 · 天命萌宠苏醒'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body with clean padding */}
              <div className="p-5 pt-3 space-y-3.5">
              {!unboxedMilestones[completedMilestoneTier] ? (
                /* STEP 1: UNOPENED GLOWING CHEST */
                <div className="space-y-3.5 py-2">
                  <div className="relative inline-block mx-auto">
                    <div
                      className={`w-18 h-18 rounded-3xl border-2 flex items-center justify-center shadow-lg animate-bounce p-1 ${
                        completedMilestoneTier === 2
                          ? 'bg-gradient-to-br from-[#EAF5E8] to-[#D5E8D2] border-[#A7CCA2] text-[#5C8E56]'
                          : completedMilestoneTier === 3
                          ? 'bg-gradient-to-br from-[#FAF0FC] to-[#EBD5F2] border-[#D9BBE5] text-[#A569BD]'
                          : 'bg-gradient-to-br from-[#FEF5E7] to-[#FADBD8] border-[#E5B573] text-[#D95D39]'
                      }`}
                    >
                      {completedMilestoneTier === 2 ? (
                        <BespokePerfumeBottle dimension={topDimension.key} size="sm" className="drop-shadow-xs" />
                      ) : completedMilestoneTier === 3 ? (
                        <BespokeManorSanctuary dimension={topDimension.key} size="sm" className="drop-shadow-xs" />
                      ) : (
                        <span className="text-3xl">{tierAnalysis.soulIdentity.rewards.spiritAnimal.emoji}</span>
                      )}
                    </div>
                    <span
                      className={`absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[10px] font-black shadow-xs animate-pulse ${
                        completedMilestoneTier === 2
                          ? 'bg-gradient-to-r from-[#76A870] to-[#5C8E56] text-white'
                          : completedMilestoneTier === 3
                          ? 'bg-gradient-to-r from-[#A569BD] to-[#E07A5F] text-white'
                          : 'bg-[#D95D39] text-white'
                      }`}
                    >
                      待启封
                    </span>
                  </div>

                  <div>
                    <div
                      className={`text-[11px] font-extrabold uppercase tracking-wider mb-0.5 ${
                        completedMilestoneTier === 2
                          ? 'text-[#4B7346]'
                          : completedMilestoneTier === 3
                          ? 'text-[#8E44AD]'
                          : 'text-[#D95D39]'
                      }`}
                    >
                      TIER {completedMilestoneTier} · {completedMilestoneTier === 2 ? '情绪特调 · 职场高定香氛礼盒' : completedMilestoneTier === 3 ? '终身栖居 · 梦幻私享秘境地契' : '萌宠初醒 · 天赋守护礼盒'}
                    </div>
                    <h3
                      className={`text-xl font-bold font-serif-title ${
                        completedMilestoneTier === 2 ? 'text-[#202E20]' : completedMilestoneTier === 3 ? 'text-[#2A1731]' : 'text-[#29221E]'
                      }`}
                    >
                      {completedMilestoneTier === 2
                        ? `启封专属【${tierAnalysis.soulIdentity.tier2Dominion.bottleBadgeName || tierAnalysis.soulIdentity.tier2Dominion.dominionTitle}】！`
                        : completedMilestoneTier === 3
                        ? `叩开专属【${tierAnalysis.soulIdentity.tier3Grandmaster.manorBadgeName || tierAnalysis.soulIdentity.tier3Grandmaster.grandmasterTitle}】！`
                        : `你的天命专属【${tierAnalysis.soulIdentity.rewards.spiritAnimal.name}】已苏醒！`}
                    </h3>
                  </div>

                  <p
                    className={`text-xs leading-relaxed px-2 ${
                      completedMilestoneTier === 2 ? 'text-[#556953]' : completedMilestoneTier === 3 ? 'text-[#694E73]' : 'text-[#5C5046]'
                    }`}
                  >
                    {completedMilestoneTier === 2
                      ? '恭喜完成第二层！为你量身调配的专属水晶香氛瓶已封存就绪，内含前中后调香谱与【防内耗喷雾法则】，喷洒属于你的气场香调。'
                      : completedMilestoneTier === 3
                      ? '恭喜通关全部测评！专属为你建造的终身灵魂秘密庄园已静候多时，内含不可替代的【心安护城河】与《永远做自己 · 自在人生许可证》。'
                      : '内含你的天命专属【守护灵兽】、全网前沿稀缺度与【专属成长灵动三锦囊】。'}
                  </p>

                  <button
                    onClick={() => {
                      playWarmTapSound(soundEnabled, 1.5, 'fanfare');
                      setUnboxedMilestones((prev) => ({
                        ...prev,
                        [completedMilestoneTier]: true
                      }));
                    }}
                    className={`w-full min-h-[46px] py-2.5 rounded-2xl text-xs font-bold shadow-md active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-1.5 ${
                      completedMilestoneTier === 2
                        ? 'bg-gradient-to-r from-[#76A870] to-[#5C8E56] text-white'
                        : completedMilestoneTier === 3
                        ? 'bg-gradient-to-r from-[#A569BD] via-[#D98880] to-[#E07A5F] text-white'
                        : 'bg-gradient-to-r from-[#D95D39] to-[#E67E22] text-white'
                    }`}
                  >
                    <Wand2 className="w-4 h-4 animate-spin" />
                    <span>
                      {completedMilestoneTier === 2
                        ? `🌸 点击启封 · 调配【${tierAnalysis.soulIdentity.tier2Dominion.bottleBadgeName || '高定香氛瓶'}】`
                        : completedMilestoneTier === 3
                        ? `🏰 叩响木门 · 点亮【${tierAnalysis.soulIdentity.tier3Grandmaster.manorBadgeName || '私享庄园'}】`
                        : `✨ 点击开箱 · 唤醒我的天命【${tierAnalysis.soulIdentity.rewards.spiritAnimal.name}】`}
                    </span>
                  </button>
                </div>
              ) : (
                /* STEP 2: REVEALED HIGH-GLOSS SSR / UR / SP REWARDS */
                <div className="space-y-3 py-1 animate-in fade-in zoom-in-95 duration-200">
                  {/* TIER 1 UNBOXED */}
                  {completedMilestoneTier === 1 && (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FEF5E7] to-[#FADBD8] border border-[#F5CBA7] flex items-center justify-center text-4xl mx-auto shadow-inner">
                        {tierAnalysis.soulIdentity.rewards.spiritAnimal.emoji}
                      </div>

                      <div>
                        <div className="inline-flex items-center gap-1 bg-[#D95D39] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs mb-1">
                          <Crown className="w-3 h-3 fill-white" />
                          <span>{tierAnalysis.soulIdentity.rewards.rarityTier} · 稀缺度 {tierAnalysis.soulIdentity.rewards.rarityPercent}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#29221E] font-serif-title">
                          守护灵兽【{tierAnalysis.soulIdentity.rewards.spiritAnimal.name}】已苏醒！
                        </h3>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#FFF9EE] border border-[#F4CD96] space-y-1.5 text-left text-xs">
                        <div className="text-[11px] font-bold text-[#8C6246]">天生闪光标签：</div>
                        <div className="flex flex-wrap gap-1">
                          {tierAnalysis.soulIdentity.rewards.powerTags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold text-[#A0522D] bg-[#FFFDF9] border border-[#F4CD96] px-2 py-0.5 rounded-lg">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="text-[11px] font-bold text-[#29221E] pt-1">
                          💰 搞钱主线：
                          <span className="font-normal text-[#5C5046] ml-1">
                            {tierAnalysis.soulIdentity.rewards.careerCheatsheet.moneyEngine}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* TIER 2 UNBOXED: SSR+ CRYSTAL PERFUME BOTTLE */}
                  {completedMilestoneTier === 2 && (
                    <>
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#EAF5E8] to-[#D5E8D2] border border-[#BBDCB6] flex items-center justify-center mx-auto shadow-inner relative overflow-hidden">
                        <BespokePerfumeBottle dimension={topDimension.key} size="lg" />
                        <span className="absolute -bottom-1 -right-1 text-[9px] bg-white/95 px-2 py-0.5 rounded-full border border-[#BBDCB6] font-bold text-[#3D6338] shadow-2xs">
                          {tierAnalysis.soulIdentity.tier2Dominion.bottleBadgeName || '高定香氛'}
                        </span>
                      </div>

                      <div>
                        <div className="inline-flex items-center gap-1 bg-[#5C8E56] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs mb-1">
                          <Droplets className="w-3 h-3 fill-white" />
                          <span>{tierAnalysis.soulIdentity.tier2Dominion.dominionRank} · {tierAnalysis.soulIdentity.tier2Dominion.rarityPercent}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#202E20] font-serif-title">
                          特调：{tierAnalysis.soulIdentity.tier2Dominion.dominionTitle}
                        </h3>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#CFE3CB] space-y-1.5 text-left text-xs">
                        {tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes && (
                          <div className="text-[10px] text-[#4B7346] bg-[#F6FAF5] p-1.5 rounded-lg border border-[#E2EFE0] flex justify-between">
                            <span>🌿 前调：{tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes.top}</span>
                            <span>🌸 中调：{tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes.middle}</span>
                          </div>
                        )}
                        <div className="text-[11px] font-bold text-[#4B7346]">灵气小特质：</div>
                        <div className="flex flex-wrap gap-1">
                          {tierAnalysis.soulIdentity.tier2Dominion.workplaceSuperTags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold text-[#3D6338] bg-[#F6FAF5] border border-[#CFE3CB] px-2 py-0.5 rounded-lg">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="text-[11px] font-bold text-[#202E20] pt-1">
                          🌸 防内耗喷雾法则：
                          <span className="font-normal text-[#556953] ml-1">
                            {tierAnalysis.soulIdentity.tier2Dominion.fatalMove}
                          </span>
                        </div>
                        <div className="text-[11px] font-bold text-[#3D6338]">
                          🍵 自洽变现法宝：
                          <span className="font-normal text-[#556953] ml-1">
                            {tierAnalysis.soulIdentity.tier2Dominion.wealthMultiplier}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* TIER 3 UNBOXED: SP DREAM SANCTUARY MANOR */}
                  {completedMilestoneTier === 3 && (
                    <>
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#FAF0FC] to-[#EEDBF6] border border-[#DEC3EB] flex items-center justify-center mx-auto shadow-inner relative overflow-hidden">
                        <BespokeManorSanctuary dimension={topDimension.key} size="lg" />
                        <span className="absolute -bottom-1 -right-1 text-[9px] bg-white/95 px-2 py-0.5 rounded-full border border-[#DEC3EB] font-bold text-[#6E3C80] shadow-2xs">
                          {tierAnalysis.soulIdentity.tier3Grandmaster.manorBadgeName || '私享庄园'}
                        </span>
                      </div>

                      <div>
                        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-[#A569BD] to-[#E07A5F] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs mb-1">
                          <Crown className="w-3 h-3 fill-white" />
                          <span>{tierAnalysis.soulIdentity.tier3Grandmaster.apexRank} · {tierAnalysis.soulIdentity.tier3Grandmaster.rarityPercent}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#2A1731] font-serif-title">
                          落成：{tierAnalysis.soulIdentity.tier3Grandmaster.grandmasterTitle}
                        </h3>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#E9D5F2] space-y-1.5 text-left text-xs">
                        <div className="text-[11px] font-bold text-[#7D4F91]">自洽心安标签：</div>
                        <div className="flex flex-wrap gap-1">
                          {tierAnalysis.soulIdentity.tier3Grandmaster.grandmasterTags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold text-[#6E3C80] bg-[#FAF5FC] border border-[#DEC3EB] px-2 py-0.5 rounded-lg">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="text-[11px] font-bold text-[#2A1731] pt-1">
                          🏰 心安护城河：
                          <span className="font-normal text-[#694E73] ml-1">
                            {tierAnalysis.soulIdentity.tier3Grandmaster.uncopyableMoat}
                          </span>
                        </div>
                        {tierAnalysis.soulIdentity.tier3Grandmaster.manorPrivileges && (
                          <div className="text-[11px] text-[#6E3C80] bg-[#FAF0FC] p-2 rounded-xl border border-[#DEC3EB] space-y-0.5">
                            <span className="font-bold block text-[10px]">👑 专属庄园无上豁免特权：</span>
                            {tierAnalysis.soulIdentity.tier3Grandmaster.manorPrivileges.map((priv, pIdx) => (
                              <div key={pIdx} className="text-[10px] text-[#4A3F37]">· {priv}</div>
                            ))}
                          </div>
                        )}
                        <div className="text-[11px] font-bold text-[#7D4F91]">
                          💖 热爱自转飞轮：
                          <span className="font-normal text-[#694E73] ml-1">
                            {tierAnalysis.soulIdentity.tier3Grandmaster.passiveEngine}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="pt-1 space-y-2">
                    <button
                      onClick={() => {
                        setReportActiveTier(completedMilestoneTier);
                        setCompletedMilestoneTier(null);
                        setView('results');
                      }}
                      className={`w-full min-h-[44px] py-2.5 rounded-2xl text-xs font-bold shadow-sm active:scale-95 transition-transform cursor-pointer ${
                        completedMilestoneTier === 2
                          ? 'bg-gradient-to-r from-[#76A870] to-[#5C8E56] text-white'
                          : completedMilestoneTier === 3
                          ? 'bg-gradient-to-r from-[#A569BD] to-[#E07A5F] text-white'
                          : 'bg-[#D95D39] text-white'
                      }`}
                    >
                      查看第 {completedMilestoneTier} 层专属解答报告
                    </button>
                    {completedMilestoneTier < 3 && (
                      <button
                        onClick={() => {
                          const next = (completedMilestoneTier + 1) as TierLevel;
                          setCompletedMilestoneTier(null);
                          startTierQuiz(next);
                        }}
                        className={`w-full min-h-[44px] py-2.5 rounded-2xl text-xs font-semibold active:scale-95 transition-transform cursor-pointer ${
                          completedMilestoneTier === 2
                            ? 'bg-[#EAF5E8] border border-[#CFE3CB] text-[#3D6338]'
                            : 'bg-[#F4ECE1] text-[#4A3F37]'
                        }`}
                      >
                        继续点亮第 {completedMilestoneTier + 1} 层 ({completedMilestoneTier === 1 ? '12题' : '15题'})
                      </button>
                    )}
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== MOBILE BOTTOM SHEET: SHAREABLE CARD ==================== */}
        {showPosterSheet && (
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center p-0"
            onClick={() => setShowPosterSheet(false)}
          >
            <div
              className="bg-[#FFFDF9] rounded-t-3xl border-t border-[#E8DFD3] max-w-[480px] w-full p-4 pb-8 max-h-[85vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1.5 bg-[#D4C7B8] rounded-full mx-auto my-1 mb-3" />

              <div className="flex items-center justify-between text-xs text-[#8A7D73] pb-2 border-b border-[#EFE7DC]">
                <span className="flex items-center gap-1 font-semibold text-[#D95D39]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  CareerCompass · {tierAnalysis.tierBadge}
                </span>
                <button
                  onClick={() => setShowPosterSheet(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F3ECE2] text-[#4A3F37] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Segmented Switch for Poster Style (3 Tabs) */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-[#F4ECE1] rounded-2xl mb-3 mt-2">
                <button
                  onClick={() => {
                    playWarmTapSound(soundEnabled, 1.05);
                    setPosterTab('rewards');
                  }}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer truncate ${
                    posterTab === 'rewards' || posterTab === 'dominion' || posterTab === 'grandmaster'
                      ? 'bg-[#FFFDF9] text-[#D95D39] shadow-xs'
                      : 'text-[#6B5E54] hover:text-[#29221E]'
                  }`}
                >
                  {reportActiveTier === 2
                    ? '🍾 灵魂香氛卡'
                    : reportActiveTier === 3
                    ? '🏡 秘密庄园卡'
                    : '👑 萌宠初醒卡'}
                </button>
                <button
                  onClick={() => {
                    playWarmTapSound(soundEnabled, 1.05);
                    setPosterTab('career');
                  }}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    posterTab === 'career'
                      ? 'bg-[#FFFDF9] text-[#D95D39] shadow-xs'
                      : 'text-[#6B5E54] hover:text-[#29221E]'
                  }`}
                >
                  🌟 职业全景
                </button>
                <button
                  onClick={() => {
                    playWarmTapSound(soundEnabled, 1.1);
                    setPosterTab('manual');
                  }}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    posterTab === 'manual'
                      ? 'bg-[#FFFDF9] text-[#D95D39] shadow-xs'
                      : 'text-[#6B5E54] hover:text-[#29221E]'
                  }`}
                >
                  📜 使用说明书
                </button>
              </div>

              {/* TAB 1: TIER-ADAPTIVE HIGH-GLOSS SSR / UR / SP POSTER */}
              {(posterTab === 'rewards' || posterTab === 'dominion' || posterTab === 'grandmaster') && (
                <div className="space-y-3 my-1">
                  {/* TIER 1 POSTER: SSR AWAKENING */}
                  {reportActiveTier === 1 && (
                    <>
                      <div className="rounded-2xl border-2 border-[#E5B573] bg-gradient-to-b from-[#FFF9EE] via-[#FFFDF9] to-[#FDF6E8] text-center relative overflow-hidden shadow-xs">
                        {/* Artwork Banner for Tier 1 Poster - Full bleed edge-to-edge */}
                        <div className="w-full h-28 relative overflow-hidden border-b border-[#F4CD96]/70 shrink-0">
                          <img
                            src={ARTWORK_IMAGES.creativeVision}
                            alt="萌宠灵境"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover brightness-95"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#201811]/45 via-transparent to-transparent flex items-end px-3.5 pb-2">
                            <span className="bg-white/90 backdrop-blur-xs text-[10px] text-[#8C5228] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs border border-white/70">
                              <Sparkles className="w-3 h-3 text-[#D95D39]" />
                              <span>天命守护灵兽 · 觉醒纪念</span>
                            </span>
                          </div>
                        </div>

                        <div className="p-4 pt-3 space-y-2">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-extrabold text-[#D95D39] flex items-center gap-1">
                              <Crown className="w-3.5 h-3.5 fill-[#D95D39]" />
                              {tierAnalysis.soulIdentity.rewards.rarityTier}
                            </span>
                            <span className="font-bold text-[#8C6246] bg-[#FFF5E6] border border-[#F4CD96] px-2 py-0.5 rounded-full text-[10px]">
                              稀缺度 · {tierAnalysis.soulIdentity.rewards.rarityPercent}
                            </span>
                          </div>

                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FEF5E7] to-[#FADBD8] border border-[#F5CBA7] flex items-center justify-center text-3xl mx-auto my-1 shadow-inner">
                            {tierAnalysis.soulIdentity.rewards.spiritAnimal.emoji}
                          </div>

                          <div className="text-base font-bold text-[#29221E] font-serif-title mt-1">
                            {userName.trim() || '寻光者'} · {tierAnalysis.soulIdentity.rewards.spiritAnimal.name}
                          </div>
                          <div className="text-xs text-[#8C6246] font-medium mt-0.5">
                            “{tierAnalysis.soulIdentity.rewards.spiritAnimal.trait}”
                          </div>

                          {/* Power Tags */}
                          <div className="flex flex-wrap justify-center gap-1 mt-2.5">
                            {tierAnalysis.soulIdentity.rewards.powerTags.map((tag, i) => (
                              <span key={i} className="text-[10px] font-bold text-[#A0522D] bg-[#FFFDF9] border border-[#F4CD96] px-2 py-0.5 rounded-lg shadow-2xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Cheatsheet on Card */}
                      <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#EBD5B3] space-y-2 text-xs">
                        <div className="font-bold text-[#29221E] border-b border-[#F4E8D7] pb-1 flex items-center gap-1 text-[11px]">
                          <Gift className="w-3.5 h-3.5 text-[#D95D39]" />
                          <span>成长灵动三锦囊 · 专属特权</span>
                        </div>
                        <div className="space-y-1.5 text-[11px]">
                          <div>
                            <span className="font-bold text-[#D95D39]">💰 搞钱主线：</span>
                            <span className="text-[#5C5046]">{tierAnalysis.soulIdentity.rewards.careerCheatsheet.moneyEngine}</span>
                          </div>
                          <div>
                            <span className="font-bold text-[#D95D39]">✨ 闪光高光：</span>
                            <span className="text-[#5C5046]">{tierAnalysis.soulIdentity.rewards.careerCheatsheet.killerWeapon}</span>
                          </div>
                          <div>
                            <span className="font-bold text-[#D95D39]">🛡️ 灵气护符：</span>
                            <span className="text-[#5C5046]">{tierAnalysis.soulIdentity.rewards.careerCheatsheet.immunityCard}</span>
                          </div>
                        </div>
                      </div>

                      {/* Oracle Sign */}
                      <div className="p-2.5 rounded-xl bg-[#FFF9EE] border border-[#F4CD96] text-center text-xs">
                        <div className="text-[10px] text-[#8C6246] font-bold mb-0.5">今日神谕上上签</div>
                        <p className="text-[11px] text-[#4A3F37] font-serif italic">
                          {tierAnalysis.soulIdentity.rewards.luckyCharm.oracleWord}
                        </p>
                      </div>
                    </>
                  )}

                  {/* TIER 2 POSTER: SSR+ BESPOKE SOUL PERFUME BOTTLE */}
                  {reportActiveTier === 2 && (
                    <>
                      <div className="rounded-2xl border-2 border-[#A7CCA2] bg-gradient-to-b from-[#F9FBF8] via-[#FFFDF9] to-[#EFF6EE] text-[#202E20] text-center relative overflow-hidden shadow-xs">
                        {/* Artwork Banner for Tier 2 Poster - Full bleed edge-to-edge */}
                        <div className="w-full h-28 relative overflow-hidden border-b border-[#A7CCA2]/70 shrink-0">
                          <img
                            src={ARTWORK_IMAGES.peopleConnect}
                            alt="高定香氛"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover brightness-95"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1C261B]/45 via-transparent to-transparent flex items-end px-3.5 pb-2">
                            <span className="bg-white/90 backdrop-blur-xs text-[10px] text-[#3D6338] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs border border-white/70">
                              <Droplets className="w-3 h-3 text-[#5C8E56]" />
                              <span>情绪特调 · 职场急救香氛瓶</span>
                            </span>
                          </div>
                        </div>

                        <div className="p-4 pt-3 space-y-2">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-bold text-[#5C8E56] flex items-center gap-1">
                              <Droplets className="w-3.5 h-3.5 fill-[#5C8E56]" />
                              {tierAnalysis.soulIdentity.tier2Dominion.dominionRank}
                            </span>
                            <span className="font-bold text-[#3D6338] bg-[#EAF5E8] border border-[#CFE3CB] px-2 py-0.5 rounded-full text-[10px]">
                              {tierAnalysis.soulIdentity.tier2Dominion.rarityPercent}
                            </span>
                          </div>

                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EAF5E8] to-[#D5E8D2] border border-[#BBDCB6] flex items-center justify-center mx-auto my-1 shadow-inner relative overflow-hidden">
                            <BespokePerfumeBottle dimension={topDimension.key} size="md" />
                            <span className="absolute -bottom-1 -right-1 text-[10px] bg-white/90 px-1 py-0.2 rounded-full border border-[#BBDCB6]">
                              {tierAnalysis.soulIdentity.tier2Dominion.bottleEmoji}
                            </span>
                          </div>

                          <div className="text-base font-bold text-[#202E20] font-serif-title mt-1">
                            {userName.trim() || '可爱的你'} · {tierAnalysis.soulIdentity.tier2Dominion.dominionTitle}
                          </div>
                          <div className="text-xs text-[#556953] font-medium mt-0.5">
                            “{tierAnalysis.soulIdentity.tier2Dominion.powerAura}”
                          </div>

                          {/* Bespoke Fragrance Notes on Poster */}
                          {tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes && (
                            <div className="mt-2 text-[10px] text-[#3D6338] bg-[#FFFDF9] p-1.5 rounded-xl border border-[#CFE3CB] flex justify-around">
                              <span>🌿 前调：{tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes.top}</span>
                              <span>🌸 中调：{tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes.middle}</span>
                              <span>🪵 后调：{tierAnalysis.soulIdentity.tier2Dominion.perfumeNotes.base}</span>
                            </div>
                          )}

                          {/* Workplace Super Tags */}
                          <div className="flex flex-wrap justify-center gap-1 mt-2.5">
                            {tierAnalysis.soulIdentity.tier2Dominion.workplaceSuperTags.map((tag, i) => (
                              <span key={i} className="text-[10px] font-bold text-[#3D6338] bg-[#F6FAF5] border border-[#CFE3CB] px-2 py-0.5 rounded-lg shadow-2xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 3 Gentle Magic Tools on Poster */}
                      <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#CFE3CB] space-y-2 text-xs text-[#202E20]">
                        <div className="font-bold text-[#3D6338] border-b border-[#EAF2E8] pb-1 flex items-center gap-1 text-[11px]">
                          <Gift className="w-3.5 h-3.5 text-[#5C8E56]" />
                          <span>职场高定特调锦囊 · 治愈特权</span>
                        </div>
                        <div className="space-y-1.5 text-[11px]">
                          <div>
                            <span className="font-bold text-[#5C8E56]">🌸 防内耗喷雾：</span>
                            <span className="text-[#556953]">{tierAnalysis.soulIdentity.tier2Dominion.fatalMove}</span>
                          </div>
                          <div>
                            <span className="font-bold text-[#5C8E56]">🍵 自洽变现法宝：</span>
                            <span className="text-[#556953]">{tierAnalysis.soulIdentity.tier2Dominion.wealthMultiplier}</span>
                          </div>
                          <div>
                            <span className="font-bold text-[#5C8E56]">🎀 边界感小心法：</span>
                            <span className="text-[#556953]">{tierAnalysis.soulIdentity.tier2Dominion.immunityDecree}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* TIER 3 POSTER: SP SANCTUARY PERMISSION POSTER */}
                  {reportActiveTier === 3 && (
                    <>
                      <div className="rounded-2xl border-2 border-[#D9BBE5] bg-gradient-to-b from-[#FCF8FD] via-[#FFFDF9] to-[#F7F1FB] text-[#2A1731] text-center relative overflow-hidden shadow-xs">
                        {/* Artwork Banner for Tier 3 Poster - Full bleed edge-to-edge */}
                        <div className="w-full h-28 relative overflow-hidden border-b border-[#D9BBE5]/70 shrink-0">
                          <img
                            src={ARTWORK_IMAGES.logicStrategy}
                            alt="私享庄园"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover brightness-95"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#231A29]/45 via-transparent to-transparent flex items-end px-3.5 pb-2">
                            <span className="bg-white/90 backdrop-blur-xs text-[10px] text-[#6E3C80] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs border border-white/70">
                              <Crown className="w-3 h-3 text-[#9B51E0]" />
                              <span>终身私享庄园 · 心安地契</span>
                            </span>
                          </div>
                        </div>

                        <div className="p-4 pt-3 space-y-2">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-bold text-[#7D4F91] flex items-center gap-1">
                              <Crown className="w-3.5 h-3.5 text-[#A569BD]" />
                              {tierAnalysis.soulIdentity.tier3Grandmaster.apexRank}
                            </span>
                            <span className="font-bold text-[#6E3C80] bg-[#FAF5FC] border border-[#DEC3EB] px-2 py-0.5 rounded-full text-[10px]">
                              {tierAnalysis.soulIdentity.tier3Grandmaster.rarityPercent}
                            </span>
                          </div>

                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FAF0FC] to-[#EEDBF6] border border-[#DEC3EB] flex items-center justify-center mx-auto my-1 shadow-inner relative overflow-hidden">
                            <BespokeManorSanctuary dimension={topDimension.key} size="md" />
                            <span className="absolute -bottom-1 -right-1 text-[10px] bg-white/90 px-1 py-0.2 rounded-full border border-[#DEC3EB]">
                              {tierAnalysis.soulIdentity.tier3Grandmaster.manorEmoji}
                            </span>
                          </div>

                          <div className="text-base font-bold text-[#2A1731] font-serif-title mt-1">
                            {userName.trim() || '可爱的你'} · {tierAnalysis.soulIdentity.tier3Grandmaster.grandmasterTitle}
                          </div>
                          <div className="text-xs text-[#694E73] font-medium mt-0.5 italic font-serif">
                            “{tierAnalysis.soulIdentity.tier3Grandmaster.destinyDecree}”
                          </div>

                          {/* Grandmaster Tags */}
                          <div className="flex flex-wrap justify-center gap-1 mt-2.5">
                            {tierAnalysis.soulIdentity.tier3Grandmaster.grandmasterTags.map((tag, i) => (
                              <span key={i} className="text-[10px] font-bold text-[#6E3C80] bg-[#FAF5FC] border border-[#DEC3EB] px-2 py-0.5 rounded-lg shadow-2xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Moat on Poster */}
                      <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E9D5F2] space-y-2 text-xs text-[#2A1731]">
                        <div className="font-bold text-[#6E3C80] border-b border-[#F4EAF9] pb-1 flex items-center gap-1 text-[11px]">
                          <Compass className="w-3.5 h-3.5 text-[#A569BD]" />
                          <span>属于你的心安秘密庄园</span>
                        </div>
                        <div className="space-y-1.5 text-[11px]">
                          <div>
                            <span className="font-bold text-[#7D4F91]">🏰 心安护城河：</span>
                            <span className="text-[#694E73]">{tierAnalysis.soulIdentity.tier3Grandmaster.uncopyableMoat}</span>
                          </div>
                          <div>
                            <span className="font-bold text-[#7D4F91]">💖 热爱自转飞轮：</span>
                            <span className="text-[#694E73]">{tierAnalysis.soulIdentity.tier3Grandmaster.passiveEngine}</span>
                          </div>
                        </div>
                      </div>

                      {/* Soft Rose-Gold Permission Wax Seal on Poster */}
                      <div className="p-2.5 rounded-xl border border-[#D98880] bg-gradient-to-r from-[#FAF0FC] to-[#F5EFF9] text-center">
                        <div className="text-[9px] font-bold text-[#7D4F91] uppercase tracking-wider">PERMISSION TO BE YOURSELF · 自在人生许可证</div>
                        <div className="text-xs font-bold text-[#2A1731] mt-0.5">
                          专属持证人：{userName.trim() || '可爱的你'} 亲钤 · 允许自己慢慢发光
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* TAB 2: CAREER & STRENGTHS POSTER */}
              {posterTab === 'career' && (
                <>
                  {/* Poster Artwork Header */}
                  <div className="mt-1 h-28 rounded-2xl overflow-hidden relative border border-[#E8DFD3]">
                    <img
                      src={currentArchetype.artImage}
                      alt={currentArchetype.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-white text-xs font-semibold">
                        {currentArchetype.name} · {currentArchetype.englishSubtitle}
                      </span>
                    </div>
                  </div>

                  <div className="my-2.5 text-center">
                    <div className="text-[11px] text-[#8A7D73]">
                      {userName.trim() || '寻光旅人'} 的【{tierAnalysis.tierTitle}】
                    </div>
                    <div className="text-lg font-bold text-[#29221E] font-serif-title">
                      {currentArchetype.name}
                    </div>
                  </div>

                  {/* Soul Totem Badge on Poster */}
                  <div className="mb-2 p-2 rounded-xl bg-[#FDF6EA] border border-[#F0DEC2] flex items-center justify-between text-[11px]">
                    <span className="text-[#8C6246] font-medium flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-[#D95D39]" />
                      灵魂图腾：{tierAnalysis.soulIdentity.totemName}
                    </span>
                    <span className="text-[10px] text-[#D95D39] font-bold">
                      {tierAnalysis.soulIdentity.totemKicker}
                    </span>
                  </div>

                  {/* Theory Diagnosis Tag on Poster */}
                  <div className="mb-2.5 p-2 rounded-xl bg-[#FBF8F3] border border-[#EFE7DC] flex items-center justify-between text-[10px]">
                    <span className="text-[#8A7D73]">{tierAnalysis.theoryDiagnosis.frameworkName}</span>
                    <span className="font-bold text-[#D95D39] bg-[#FDF1EC] px-1.5 py-0.5 rounded">
                      {tierAnalysis.theoryDiagnosis.codeOrAnchor}
                    </span>
                  </div>

                  {/* Dimension Bars */}
                  <div className="bg-[#FBF8F3] rounded-2xl p-3 space-y-2 border border-[#EFE7DC]">
                    {rankedDimensions.slice(0, 4).map((dim) => (
                      <div key={dim.key} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-medium text-[#4A3F37]">{dim.name}</span>
                          <span className="font-semibold text-[#D95D39] tabular-nums">
                            {computedScores[dim.key]}分
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-[#E8DFD3] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#D95D39] rounded-full"
                            style={{ width: `${computedScores[dim.key]}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Top Careers */}
                  <div className="mt-2.5 p-3 rounded-2xl bg-[#FDF6EA] text-xs">
                    <div className="font-semibold text-[#946121] text-[11px] mb-1">
                      契合职业方向：
                    </div>
                    <div className="space-y-1 text-[#4A3F37] text-[11px]">
                      {matchedCareers.slice(0, 3).map((c, i) => (
                        <div key={c.id} className="flex items-center justify-between">
                          <span>
                            0{i + 1}. {c.title}
                          </span>
                          <span className="font-semibold text-[#D95D39] tabular-nums">
                            {c.matchScore}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-center text-[#8A7D73] italic my-3">
                    “{tierAnalysis.summaryQuote}”
                  </p>
                </>
              )}

              {/* TAB 3: USER MANUAL & SOUL IDENTITY POSTER CARD */}
              {posterTab === 'manual' && (
                <div className="space-y-2.5 my-1">
                  <div className="rounded-2xl bg-gradient-to-r from-[#FDF5EC] to-[#FAF0E4] border border-[#F0DEC2] text-center overflow-hidden relative shadow-2xs">
                    <div className="w-full h-24 relative overflow-hidden border-b border-[#F0DEC2]/70 shrink-0">
                      <img
                        src={ARTWORK_IMAGES.heroBanner}
                        alt="灵魂名片"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#201811]/45 via-transparent to-transparent flex items-end px-3.5 pb-2">
                        <span className="bg-white/90 backdrop-blur-xs text-[10px] text-[#6B4E2B] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs border border-white/70">
                          <Feather className="w-3 h-3 text-[#D95D39]" />
                          <span>个人使用说明书 · 允许被温柔懂得</span>
                        </span>
                      </div>
                    </div>
                    <div className="p-3.5 pt-2.5">
                      <div className="text-[11px] text-[#8C6246]">
                        {userName.trim() || '寻光者'} 的专属灵魂身份名片
                      </div>
                      <div className="text-base font-bold text-[#29221E] font-serif-title mt-0.5">
                        {tierAnalysis.soulIdentity.totemName}
                      </div>
                      <div className="text-xs text-[#D95D39] font-medium mt-0.5">
                        “{tierAnalysis.soulIdentity.totemKicker}”
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-2xl bg-[#F4F9F2] border border-[#DCEAD9]">
                      <div className="font-bold text-[#3B6E32] text-[11px] mb-0.5 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#4D8B42]" />
                        激发出我 120% 状态的相处密码
                      </div>
                      <p className="text-[11px] text-[#4A5D44] leading-relaxed">
                        {tierAnalysis.soulIdentity.userManual.bestWorkingState}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#FDF4F2] border border-[#FADBD8]">
                      <div className="font-bold text-[#B03A2E] text-[11px] mb-0.5 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-[#D95D39]" />
                        触碰就会让我瞬间关上心门的绝对雷区
                      </div>
                      <p className="text-[11px] text-[#6E423E] leading-relaxed">
                        {tierAnalysis.soulIdentity.userManual.tabooBehavior}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#FDF6EA] border border-[#F0DEC2]">
                      <div className="font-bold text-[#946121] text-[11px] mb-0.5 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#D48C2A]" />
                        当我无声透支时的呼救暗号
                      </div>
                      <p className="text-[11px] text-[#6E502B] leading-relaxed">
                        {tierAnalysis.soulIdentity.userManual.silentDistressSignal}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#F7F4EF] border border-[#E8DFD3]">
                      <div className="font-bold text-[#5C5046] text-[11px] mb-0.5 flex items-center gap-1">
                        <Coffee className="w-3.5 h-3.5 text-[#8C6246]" />
                        身边人如何温柔地拉我一把
                      </div>
                      <p className="text-[11px] text-[#4A3F37] leading-relaxed">
                        {tierAnalysis.soulIdentity.userManual.gentleRescueWay}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#EBD5B3] text-center">
                    <div className="text-[10px] text-[#8C6246] font-semibold mb-0.5">
                      🌟 给灵魂的深层确认
                    </div>
                    <p className="text-[11px] text-[#4A3F37] font-serif italic leading-relaxed">
                      “{tierAnalysis.soulIdentity.innerMonologue.validationWord}”
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleCopySummary}
                className="w-full min-h-[46px] py-2.5 rounded-xl bg-[#D95D39] active:bg-[#C24D2C] text-white text-xs font-semibold transition-colors cursor-pointer mt-2"
              >
                {copySuccess
                  ? (posterTab === 'rewards'
                      ? '已复制【SSR 级天命觉醒卡】文案，去朋友圈装杯吧！'
                      : posterTab === 'manual'
                      ? '已复制《使用说明书》，去分享给懂你的人吧！'
                      : '已复制报告文案，去粘贴分享吧！')
                  : (posterTab === 'rewards'
                      ? '一键复制我的【SSR 级天命觉醒卡】'
                      : posterTab === 'manual'
                      ? '一键复制我的《个人使用说明书》'
                      : '一键复制我的本层报告摘要')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

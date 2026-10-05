import { DimensionKey } from './assessmentData';

export interface TheoryMapping {
  hollandCode: string;
  hollandNameZh: string;
  scheinAnchor: string;
  gallupDomain: string;
  coreMechanism: string;
  scientificBasis: string;
}

export const DIMENSION_THEORY_MAP: Record<DimensionKey, TheoryMapping> = {
  creative: {
    hollandCode: 'A (Artistic 艺术型)',
    hollandNameZh: '艺术型 · 表达与审美直觉',
    scheinAnchor: '创造/创业型 (Creativity)',
    gallupDomain: '战略思维 (Strategic Thinking)',
    coreMechanism: '追求非结构化的自由表达，对色彩、形式、情感共振有天然敏感性，抗拒教条与机械重复。',
    scientificBasis: '基于霍兰德职业兴趣理论（RIASEC）的 A 维，擅长依靠直觉发散与审美通感创造差异化价值。'
  },
  logical: {
    hollandCode: 'I (Investigative 研究型)',
    hollandNameZh: '研究型 · 规律与系统解构',
    scheinAnchor: '技术/职能型 (Technical Competence)',
    gallupDomain: '战略思维 (Strategic Thinking)',
    coreMechanism: '面对海量信息倾向寻找因果逻辑与第一性原理，注重数据实证与逻辑闭环，反感无逻辑的空谈。',
    scientificBasis: '基于霍兰德 I 维与分析心理学理性判断功能，在复杂策略制定、分析建模中表现卓越。'
  },
  empathy: {
    hollandCode: 'S (Social 社会型)',
    hollandNameZh: '社会型 · 人文与情感联结',
    scheinAnchor: '服务/奉献型 (Service/Dedication)',
    gallupDomain: '关系建立 (Relationship Building)',
    coreMechanism: '以他人福祉和团队凝聚为内在驱动，敏锐感知未言明的情绪暗流，化解摩擦，激发他人内在潜能。',
    scientificBasis: '基于霍兰德 S 维与情商（EQ）同理心模型，是现代组织中最高阶的信任枢纽与组织润滑剂。'
  },
  execution: {
    hollandCode: 'C (Conventional 常规型)',
    hollandNameZh: '常规/稳健型 · 秩序与闭环统筹',
    scheinAnchor: '安全/稳定型 (Security & Stability)',
    gallupDomain: '执行力 (Executing)',
    coreMechanism: '享受将模糊宏大目标拆解为精细落地清单，讲求排期、确定性与凡事有交代，厌恶脱序失控。',
    scientificBasis: '基于霍兰德 C 维与现代项目敏捷管理理念，确保组织战略不沦为空想的落地定海神针。'
  },
  exploration: {
    hollandCode: 'E (Enterprising 企业型)',
    hollandNameZh: '企业/开创型 · 趋势与破局冒险',
    scheinAnchor: '自主/独立型 (Autonomy & Independence)',
    gallupDomain: '影响力 (Influencing)',
    coreMechanism: '对时代风口与新奇玩法充满兴奋，在信息不完全时敢于率先试水破风，以小博大拓展新增长曲线。',
    scientificBasis: '基于霍兰德 E 维与精益创业（Lean Startup）假说验证精神，是新业务从0到1的核心破冰引擎。'
  },
  craft: {
    hollandCode: 'R (Realistic 现实/工匠型)',
    hollandNameZh: '现实型 · 深度专注与精益手艺',
    scheinAnchor: '纯粹挑战型 (Pure Challenge / Craft)',
    gallupDomain: '执行力 (Executing)',
    coreMechanism: '耐得住寂寞，追求细节与品质的至高标准，享受亲手将一个作品或技术打磨到极致的心流体验。',
    scientificBasis: '基于霍兰德 R 维与心流理论（Flow Theory），在细分赛道能够构筑极高不可替代性技术壁垒。'
  }
};

export interface StageTheoryInfo {
  tier: 1 | 2 | 3;
  superStageName: string;
  developmentGoal: string;
  psychologicalFocus: string;
  theorySource: string;
}

export const STAGE_THEORY_MAP: Record<1 | 2 | 3, StageTheoryInfo> = {
  1: {
    tier: 1,
    superStageName: '探索觉醒期 (Exploration Stage)',
    developmentGoal: '自我概念初步形成，识别天生才干 (Talent) 与直觉偏好',
    psychologicalFocus: '通过生活化切片剥离外界社会期待，定位最底层的兴趣天性与原型长板。',
    theorySource: '舒伯生涯发展理论 (Super\'s Theory) 之探索期：自我认知澄清与初步职业幻想落地。'
  },
  2: {
    tier: 2,
    superStageName: '建立立足期 (Establishment Stage)',
    developmentGoal: '将才干转化为实战技能 (Skill)，适配组织协同角色与抗压心流',
    psychologicalFocus: '还原高频职场真实冲突与多线程并发，厘清能量雷区与高效协同工作风格。',
    theorySource: '贝尔宾团队角色理论 (Belbin) × 沙因职业锚 (Schein)：组织身位确立与防内耗能量管理。'
  },
  3: {
    tier: 3,
    superStageName: '维持与超越期 (Maintenance & Transcendence)',
    developmentGoal: '构筑不可替代的商业价值护城河，制定 3~5 年生涯战略路线图',
    psychologicalFocus: '从体力竞争跃迁为战略智力与系统杠杆，探索第二曲线、超级个体与长期精神遗存。',
    theorySource: '德鲁克自我管理思想 × 战略管理第一性原理：构筑个人商业护城河与跨周期抗风险系统。'
  }
};

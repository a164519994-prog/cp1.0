import heroBannerImg from '../assets/images/hero_career_compass_1791033797108.jpg';
import creativeVisionImg from '../assets/images/creative_vision_art_1791033810230.jpg';
import logicStrategyImg from '../assets/images/logic_strategy_art_1791033821239.jpg';
import peopleConnectImg from '../assets/images/people_connect_art_1791033834184.jpg';

export type DimensionKey =
  | 'creative'
  | 'logical'
  | 'empathy'
  | 'execution'
  | 'exploration'
  | 'craft';

export interface TheoryMapping {
  riasecCode: string;
  bigFiveTrait: string;
  careerAnchor: string;
  gallupDomain: string;
}

export interface DimensionInfo {
  key: DimensionKey;
  name: string;
  shortName: string;
  subtitle: string;
  description: string;
  color: string;
  lightBg: string;
  highTrait: string;
  dailyStrength: string;
  artImage?: string;
  theory: TheoryMapping;
}

export type QuestionInteractionType = 'scenario_choice' | 'dual_slider' | 'visual_card' | 'priority_pick';

export interface QuestionOption {
  id: string;
  label: string;
  sublabel?: string;
  scores: Partial<Record<DimensionKey, number>>;
  feedbackText: string;
  visualType?: 'garden' | 'workshop' | 'library' | 'campfire';
}

export interface AssessmentQuestion {
  id: number;
  chapter: string;
  type: QuestionInteractionType;
  title: string;
  subtitle: string;
  options: QuestionOption[];
  leftPoleLabel?: string;
  rightPoleLabel?: string;
}

export interface CareerRole {
  id: string;
  title: string;
  category: string;
  primaryDims: [DimensionKey, DimensionKey];
  matchBase: number;
  tagline: string;
  whyFit: string;
  dailyMoment: string;
  coreSkills: string[];
  workStyle: string;
  salaryRange: string;
  growthPath: string[];
  firstSteps: string[];
}

export interface ArchetypeProfile {
  id: string;
  name: string;
  englishSubtitle: string;
  primaryDim: DimensionKey;
  secondaryDim?: DimensionKey;
  quote: string;
  summary: string;
  superpowers: {
    title: string;
    desc: string;
  }[];
  blindSpotTip: string;
  idealEnvironment: string;
  bestPartnerArchetype: string;
  artImage: string;
}

// Artwork image paths generated
export const ARTWORK_IMAGES = {
  heroBanner: heroBannerImg,
  creativeVision: creativeVisionImg,
  logicStrategy: logicStrategyImg,
  peopleConnect: peopleConnectImg
};

export const THEORY_FRAMEWORKS = [
  {
    name: '霍兰德职业兴趣理论 (Holland RIASEC)',
    core: '将人格与工作环境分为实用(R)、研究(I)、艺术(A)、社交(S)、企业(E)、常规(C)六角模型，主张人格与职业环境匹配度越高，成就感与稳定性越持久。'
  },
  {
    name: '大五人格特质模型 (Big Five / OCEAN)',
    core: '现代心理学界公认最实证的五大底层人格维度（开放性、尽责性、外倾性、宜人性、神经质），揭示个人面对认知、压力与任务时的天性基线。'
  },
  {
    name: '施恩职业锚理论 (Edgar Schein)',
    core: '麻省理工斯隆管理学院施恩教授提出，职业锚是个体在职业抉择中绝不妥协的核心价值观（技术型、管理型、自主型、创造型、安全型等）。'
  },
  {
    name: '积极心理学优势才干模型 (CliftonStrengths)',
    core: '主张“把精力投入在天赋长板上所带来的跃迁，远胜于将精力耗费在补齐无感短板上”，强调发现天性特长并转化为持续胜任力。'
  }
];

export const DIMENSIONS: Record<DimensionKey, DimensionInfo> = {
  creative: {
    key: 'creative',
    name: '灵感创想力',
    shortName: '创想',
    subtitle: '审美直觉 · 创意发散 · 故事表达',
    description: '对生活中的色彩、情绪与新奇想法格外敏锐，擅长把平淡的事物变得生动有趣。',
    color: '#D95D39',
    lightBg: '#FDF1EC',
    highTrait: '天马行空的审美捕捉者与灵感策源地',
    dailyStrength: '总能想到让人眼前一亮的点子，对视觉美感与文字氛围有天然直觉',
    artImage: ARTWORK_IMAGES.creativeVision,
    theory: {
      riasecCode: 'A 艺术型 (Artistic)',
      bigFiveTrait: '高体验开放性 (High Openness)',
      careerAnchor: '创造/创业锚 (Creativity Anchor)',
      gallupDomain: '战略思维领域 (Strategic Thinking)'
    }
  },
  logical: {
    key: 'logical',
    name: '逻辑洞察力',
    shortName: '逻辑',
    subtitle: '抽丝剥茧 · 规律推演 · 结构思辨',
    description: '喜欢看清事物背后的因果关系，面对复杂混乱的信息能迅速理出清晰脉络。',
    color: '#D48C2A',
    lightBg: '#FDF6EA',
    highTrait: '冷静通透的秩序构建者与迷雾拆解家',
    dailyStrength: '擅长在纷繁信息中抓重点，做决定前习惯权衡利弊，条理极佳',
    artImage: ARTWORK_IMAGES.logicStrategy,
    theory: {
      riasecCode: 'I 研究型 (Investigative)',
      bigFiveTrait: '高认知需求与严谨理性 (Need for Cognition)',
      careerAnchor: '专业/技术胜任锚 (Technical Competence)',
      gallupDomain: '战略分析领域 (Analytical Acuity)'
    }
  },
  empathy: {
    key: 'empathy',
    name: '共情沟通力',
    shortName: '共情',
    subtitle: '敏锐倾听 · 温暖联结 · 团队凝聚',
    description: '能自然感知他人的情绪变化，用真诚温和的沟通化解隔阂，让人感到如沐春风。',
    color: '#C86D51',
    lightBg: '#FBF0EC',
    highTrait: '春风化雨的倾听者与人际关系粘合剂',
    dailyStrength: '朋友们都很愿意找你倾诉，你擅长协调不同意见并照顾每个人的感受',
    artImage: ARTWORK_IMAGES.peopleConnect,
    theory: {
      riasecCode: 'S 社交型 (Social)',
      bigFiveTrait: '高宜人性与亲和力 (High Agreeableness)',
      careerAnchor: '服务/奉献锚 (Service & Dedication)',
      gallupDomain: '关系建立领域 (Relationship Building)'
    }
  },
  execution: {
    key: 'execution',
    name: '笃行统筹力',
    shortName: '统筹',
    subtitle: '计划拆解 · 节奏掌控 · 稳健落地',
    description: '享受把模糊目标变成清晰清单的过程，做事靠谱有交代，是团队里的定海神针。',
    color: '#7A8B68',
    lightBg: '#F2F5EF',
    highTrait: '踏实可靠的行动派与节奏掌控大师',
    dailyStrength: '讨厌拖延与混乱，喜欢列清单推进事务，把控时间节点让你充满成就感',
    artImage: ARTWORK_IMAGES.heroBanner,
    theory: {
      riasecCode: 'C 常规事务型 (Conventional)',
      bigFiveTrait: '高尽责性与秩序感 (High Conscientiousness)',
      careerAnchor: '综合管理锚 (General Managerial)',
      gallupDomain: '执行推进领域 (Executing Dominance)'
    }
  },
  exploration: {
    key: 'exploration',
    name: '开拓破局力',
    shortName: '开拓',
    subtitle: '好奇跨界 · 拥抱变化 · 果敢尝试',
    description: '对未知领域充满好奇，不甘于一成不变的日常，敢于率先尝试新工具与新玩法。',
    color: '#E07A47',
    lightBg: '#FEF3ED',
    highTrait: '永远好奇的破风者与新鲜事物体验官',
    dailyStrength: '看到新鲜趋势就想试一试，在变化和挑战面前比别人更快适应并找到机会',
    artImage: ARTWORK_IMAGES.heroBanner,
    theory: {
      riasecCode: 'E 企业开拓型 (Enterprising)',
      bigFiveTrait: '高外倾性与进取冒险 (Extraversion & Risk Taking)',
      careerAnchor: '纯粹挑战锚 (Pure Challenge Anchor)',
      gallupDomain: '战略影响领域 (Influencing Force)'
    }
  },
  craft: {
    key: 'craft',
    name: '匠心钻研力',
    shortName: '匠心',
    subtitle: '深度专注 · 细节打磨 · 专业精进',
    description: '耐得住寂寞，一旦沉浸在感兴趣的技艺或课题里，就会追求极致的品质与完整度。',
    color: '#A66E4E',
    lightBg: '#F8F1EC',
    highTrait: '沉静专注的手艺人式钻研者',
    dailyStrength: '能长时间沉浸在一件事里打磨细节，不允许自己交出敷衍粗糙的作品',
    artImage: ARTWORK_IMAGES.creativeVision,
    theory: {
      riasecCode: 'R 实际操作型 / I 深度研究型 (Realistic & Deep)',
      bigFiveTrait: '高坚毅特质与沉浸心流 (Grit & Flow State)',
      careerAnchor: '自主/独立专业锚 (Autonomy & Independence)',
      gallupDomain: '专注深耕领域 (Deep Deliberation)'
    }
  }
};

export const DIMENSION_LIST: DimensionInfo[] = [
  DIMENSIONS.creative,
  DIMENSIONS.logical,
  DIMENSIONS.empathy,
  DIMENSIONS.execution,
  DIMENSIONS.exploration,
  DIMENSIONS.craft
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    chapter: '01 · 周末生活切片',
    type: 'scenario_choice',
    title: '难得迎来一个没有任何安排的晴朗周末，你最向往怎么度过？',
    subtitle: '不用考虑现实琐事，凭第一直觉选出最让你充电的方式',
    options: [
      {
        id: 'q1_a',
        label: '去逛艺术展、独立书店，或者随手拍下好看的街景',
        sublabel: '在充满美感与故事感的氛围里漫步',
        scores: { creative: 16, exploration: 8 },
        feedbackText: '你对生活里的美感与新鲜灵感有着天然的敏锐度。'
      },
      {
        id: 'q1_b',
        label: '约两三位好友去温馨的小馆子喝茶聊天，听听彼此近况',
        sublabel: '在真诚温暖的对话中放松身心',
        scores: { empathy: 16, creative: 6 },
        feedbackText: '人与人之间真实温暖的情感联结，是你重要的能量来源。'
      },
      {
        id: 'q1_c',
        label: '把房间彻底收纳整理一番，列好下周计划，清掉待办清单',
        sublabel: '享受一切井井有条带来的踏实感',
        scores: { execution: 16, logical: 6 },
        feedbackText: '秩序感与掌控感能让你迅速恢复内心的平静。'
      },
      {
        id: 'q1_d',
        label: '安静宅家拼乐高、研究一道新菜谱，或深挖一个感兴趣的冷知识',
        sublabel: '沉浸在自己的小世界里专注钻研',
        scores: { craft: 16, logical: 8 },
        feedbackText: '你拥有难得的深度专注力，享受亲手打磨一件事的过程。'
      }
    ]
  },
  {
    id: 2,
    chapter: '02 · 理想空间图卷',
    type: 'visual_card',
    title: '如果可以拥有一间专属的工作与创作空间，你最想推开哪扇门？',
    subtitle: '点击最让你觉得舒适、充满干劲的美好空间画卷',
    options: [
      {
        id: 'q2_a',
        label: '阳光画室与灵感墙',
        sublabel: '满墙色彩拼贴、手绘草图与黑胶唱片，随时捕捉奇思妙想',
        visualType: 'garden',
        scores: { creative: 16, exploration: 6 },
        feedbackText: '自由包容、富有视觉刺激的环境最能激发你的创造潜能。'
      },
      {
        id: 'q2_b',
        label: '原木手作与精密工坊',
        sublabel: '工具排列整齐、台灯温暖明亮，可以不受打扰地钻研一整天',
        visualType: 'workshop',
        scores: { craft: 16, execution: 6 },
        feedbackText: '安静专注、讲究专业品质的匠心空间最契合你的步调。'
      },
      {
        id: 'q2_c',
        label: '全景落地窗与思维白板',
        sublabel: '视野开阔，整面墙的逻辑导图与数据看板，一眼看清全局',
        visualType: 'library',
        scores: { logical: 16, execution: 8 },
        feedbackText: '清晰、理性、视野开阔的结构化环境让你思维如鱼得水。'
      },
      {
        id: 'q2_d',
        label: '暖炉沙发与开放茶歇角',
        sublabel: '随时能和伙伴围坐碰撞想法，有咖啡香与笑声的温暖客厅',
        visualType: 'campfire',
        scores: { empathy: 15, exploration: 9 },
        feedbackText: '开放流动的互动氛围，最能让你发挥凝聚人心的优势。'
      }
    ]
  },
  {
    id: 3,
    chapter: '03 · 旅行协作角色',
    type: 'scenario_choice',
    title: '和朋友们一起筹备一次去陌生城市的旅行，你通常会自然承担什么角色？',
    subtitle: '回想一下以往出游或组织活动时你的真实状态',
    options: [
      {
        id: 'q3_a',
        label: '「行程总管」：做表格订机酒、算预算，把路线时间排得明明白白',
        sublabel: '有你在，大家永远不用担心迷路或踩坑',
        scores: { execution: 16, logical: 8 },
        feedbackText: '出色的统筹力与未雨绸缪的习惯，让你成为团队最安心的后盾。'
      },
      {
        id: 'q3_b',
        label: '「宝藏雷达」：挖掘小众打卡地、特色市集和新奇体验项目',
        sublabel: '带大家去尝试别人没玩过的趣味路线',
        scores: { exploration: 16, creative: 8 },
        feedbackText: '强烈的好奇心让你总能发现常规路线之外的惊喜。'
      },
      {
        id: 'q3_c',
        label: '「气氛担当」：照顾每个人的口味和体力，化解分歧，让大家玩得开心',
        sublabel: '只要大家相处融洽，去哪里都觉得值得',
        scores: { empathy: 16, execution: 6 },
        feedbackText: '体贴入微的共情力，让你在任何群体里都备受欢迎。'
      },
      {
        id: 'q3_d',
        label: '「记录与攻略控」：专门研究当地历史美食，或负责拍美照剪Vlog',
        sublabel: '要么把攻略研究透彻，要么把回忆定格成作品',
        scores: { craft: 12, creative: 12 },
        feedbackText: '你喜欢在体验中注入深度与质感，留下值得回味的作品。'
      }
    ]
  },
  {
    id: 4,
    chapter: '04 · 思维天平倾向',
    type: 'dual_slider',
    title: '当你要接手一件全新的任务时，你的大脑通常先启动哪一侧？',
    subtitle: '轻触天平刻度，选择最符合你日常习惯的一端',
    leftPoleLabel: '先梳理清晰规则、底层逻辑与可行步骤',
    rightPoleLabel: '先脑暴各种好玩可能、画面感与独特亮点',
    options: [
      {
        id: 'q4_1',
        label: '完全偏向理性推演',
        sublabel: '必须先搞懂逻辑框架与考核标准，才安心动手',
        scores: { logical: 18, execution: 6 },
        feedbackText: '结构先行的思维方式，让你极少走弯路。'
      },
      {
        id: 'q4_2',
        label: '略偏向条理分析',
        sublabel: '先搭好稳妥骨架，再往里面填创意细节',
        scores: { logical: 12, craft: 10 },
        feedbackText: '你兼具理性骨架与细节耐性，做事稳健扎实。'
      },
      {
        id: 'q4_3',
        label: '略偏向直觉发散',
        sublabel: '先抓住让人兴奋的切入点，边试边调整方向',
        scores: { creative: 12, exploration: 10 },
        feedbackText: '灵动的直觉让你能快速打开局面，不被条框束缚。'
      },
      {
        id: 'q4_4',
        label: '完全偏向灵感创想',
        sublabel: '常规做法太无聊，我喜欢直接构想最酷的呈现效果',
        scores: { creative: 18, exploration: 6 },
        feedbackText: '充沛的想象力让你天生适合创造与众不同的新体验。'
      }
    ]
  },
  {
    id: 5,
    chapter: '05 · 成就感高光时刻',
    type: 'scenario_choice',
    title: '以下哪种夸奖，听到之后会让你在心里暗暗开心最久？',
    subtitle: '让你最有获得感的评价，往往藏着你的核心天赋',
    options: [
      {
        id: 'q5_a',
        label: '“你也太懂我了吧！每次跟你聊完，心情都豁然开朗。”',
        sublabel: '因为真诚倾听与共情力被温柔认可',
        scores: { empathy: 18, creative: 4 },
        feedbackText: '被需要、能温暖与启发他人，是你内心深处的驱动力。'
      },
      {
        id: 'q5_b',
        label: '“这么复杂的烂摊子，居然被你三下五除二理得这么清楚！”',
        sublabel: '因为强大的分析力和靠谱执行被依赖',
        scores: { logical: 14, execution: 12 },
        feedbackText: '在混乱中建立秩序、解决难题，最能激发你的自豪感。'
      },
      {
        id: 'q5_c',
        label: '“这个点子绝了，审美和细节真是没得挑，太有灵气了！”',
        sublabel: '因为独特的创造力与作品质感被惊艳',
        scores: { creative: 15, craft: 10 },
        feedbackText: '独特的审美表达与作品质感，是你闪闪发光的名片。'
      },
      {
        id: 'q5_d',
        label: '“你行动力也太强了吧，别人还在犹豫，你已经闯出新路子了！”',
        sublabel: '因为勇敢破局与超快上手速度被佩服',
        scores: { exploration: 16, execution: 8 },
        feedbackText: '敢想敢干、先人一步探索未知，是你的鲜明标签。'
      }
    ]
  },
  {
    id: 6,
    chapter: '06 · 问题应对直觉',
    type: 'scenario_choice',
    title: '假如你精心筹备的小活动突然遇到临时变故（比如场地设备故障），你会？',
    subtitle: '面对突发小插曲时，你最自然的本能反应是',
    options: [
      {
        id: 'q6_a',
        label: '迅速排查故障原因，对比备选方案，10分钟内敲定最优补救措施',
        sublabel: '冷静分析利弊，快速做出判断',
        scores: { logical: 15, execution: 10 },
        feedbackText: '临危不乱的理性判断力，让你在关键时刻格外可靠。'
      },
      {
        id: 'q6_b',
        label: '先微笑着安抚现场伙伴和嘉宾的情绪，用幽默化解尴尬气氛',
        sublabel: '稳住人心与场子温度最重要',
        scores: { empathy: 16, exploration: 6 },
        feedbackText: '你懂得先处理情绪再处理事情，拥有极高的情商智慧。'
      },
      {
        id: 'q6_c',
        label: '灵机一动把“突发小插曲”直接改造成即兴互动环节，反而成亮点',
        sublabel: '顺势而为，把意外变成惊喜',
        scores: { exploration: 15, creative: 12 },
        feedbackText: '极强的应变力与幽默创意，让你总能转危为机。'
      },
      {
        id: 'q6_d',
        label: '挽起袖子亲自调试设备或寻找替代工具，直到把问题彻底修好',
        sublabel: '专注动手解决具体技术细节',
        scores: { craft: 16, execution: 8 },
        feedbackText: '务实专注的动手能力，让你能够扎实地攻克具体难关。'
      }
    ]
  },
  {
    id: 7,
    chapter: '07 · 协作能量天平',
    type: 'dual_slider',
    title: '在日常学习或工作推进中，你更喜欢怎样的节奏与方式？',
    subtitle: '没有好坏之分，选择最让你感到自在不内耗的状态',
    leftPoleLabel: '专注把一门技术或作品打磨到95分以上',
    rightPoleLabel: '广泛涉猎新领域，连接不同的人与资源破局',
    options: [
      {
        id: 'q7_1',
        label: '深度钻研派',
        sublabel: '喜欢安静深耕专业，用过硬的作品说话',
        scores: { craft: 18, logical: 6 },
        feedbackText: '专注深耕的定力，会让你在专业领域建立起极高壁垒。'
      },
      {
        id: 'q7_2',
        label: '稳健精进派',
        sublabel: '有清晰的目标规划，一步一个脚印把事情做扎实',
        scores: { execution: 14, craft: 10 },
        feedbackText: '靠谱稳健的推进节奏，让你交付的每一件事都让人放心。'
      },
      {
        id: 'q7_3',
        label: '温暖协同派',
        sublabel: '喜欢和合拍的伙伴一起讨论，在交流中推进目标',
        scores: { empathy: 14, execution: 10 },
        feedbackText: '你既能照顾团队氛围，又能推动事情落地，是极佳的协作者。'
      },
      {
        id: 'q7_4',
        label: '跨界探索派',
        sublabel: '喜欢不断尝试新事物、认识新朋友，开拓新可能',
        scores: { exploration: 18, empathy: 6 },
        feedbackText: '开阔的视野与活跃的连接力，让你总能捕捉到新机遇。'
      }
    ]
  },
  {
    id: 8,
    chapter: '08 · 好奇心引力场',
    type: 'scenario_choice',
    title: '刷手机或看书时，哪一类内容最容易让你不知不觉看进去很久？',
    subtitle: '注意力自发流向的地方，就是你潜能生长的土壤',
    options: [
      {
        id: 'q8_a',
        label: '商业拆解、科技趋势、悬疑推理或“为什么会这样”的深度科普',
        sublabel: '看清事物运转的底层规律非常过瘾',
        scores: { logical: 16, exploration: 8 },
        feedbackText: '你对世界运转的底层逻辑有着旺盛的求知欲。'
      },
      {
        id: 'q8_b',
        label: '摄影构图、家居美学、广告创意、电影分镜或动人的文学故事',
        sublabel: '被美好的视觉画面与细腻表达打动',
        scores: { creative: 18, craft: 6 },
        feedbackText: '细腻的审美感知力，是你源源不断的创作养分。'
      },
      {
        id: 'q8_c',
        label: '人物访谈、心理学洞察、真实成长故事或高情商沟通技巧',
        sublabel: '对人性的丰富与温暖始终抱有好奇',
        scores: { empathy: 16, logical: 6 },
        feedbackText: '理解人、看见人，是你极具温度的天赋所在。'
      },
      {
        id: 'q8_d',
        label: '效率神器测评、手工艺制作全过程、硬核技能教程或新兴副业玩法',
        sublabel: '喜欢学到马上能用、能做出成品的实用技能',
        scores: { craft: 12, execution: 10, exploration: 6 },
        feedbackText: '你偏爱知行合一，喜欢把知识转化为看得见的成果。'
      }
    ]
  },
  {
    id: 9,
    chapter: '09 · 理想职业状态',
    type: 'priority_pick',
    title: '想象三年后的理想工作日，以下哪个画面最让你心生向往？',
    subtitle: '最后一步，选出最契合你内心期待的职业生活图景',
    options: [
      {
        id: 'q9_a',
        label: '主导一个充满创意的品牌企划或视觉作品，看到大众被它打动',
        sublabel: '用审美与创意在世界留下独特印记',
        scores: { creative: 16, exploration: 8 },
        feedbackText: '你的舞台在于用创意点亮人心。'
      },
      {
        id: 'q9_b',
        label: '作为核心智囊，用清晰的数据分析与策略方案帮团队找准方向',
        sublabel: '运筹帷幄，做聪明且关键的决策者',
        scores: { logical: 16, execution: 10 },
        feedbackText: '你的价值在于洞察本质、指引方向。'
      },
      {
        id: 'q9_c',
        label: '陪伴用户、学员或团队伙伴成长，成为大家信任的引路人与联结者',
        sublabel: '在成就他人的过程中收获温暖与尊重',
        scores: { empathy: 18, execution: 6 },
        feedbackText: '你的光芒在于温暖赋能、凝聚同行。'
      },
      {
        id: 'q9_d',
        label: '手握过硬的专业技术或代表作，在细分领域拥有无可替代的话语权',
        sublabel: '凭实力说话，自由且专注地深耕所爱',
        scores: { craft: 18, logical: 6 },
        feedbackText: '你的底气来自精益求精的专业主义。'
      }
    ]
  }
];

export const ARCHETYPES: Record<DimensionKey, ArchetypeProfile> = {
  creative: {
    id: 'arch_creative',
    name: '暖阳造梦师',
    englishSubtitle: 'Aesthetic & Creative Storyteller',
    primaryDim: 'creative',
    quote: '“万物皆有裂痕，而你擅长把裂痕画成光照进来的地方。”',
    summary:
      '你拥有细腻的审美直觉与丰沛的想象力，不喜欢千篇一律的模板。别人眼里的普通日常，经过你的视角重新组合，总能焕发出独特的美感与故事张力。在充满自由度与表达空间的领域，你会散发出惊人的感染力。',
    superpowers: [
      {
        title: '氛围与美感雷达',
        desc: '对色彩、排版、画面节奏和文字情绪极其敏感，一眼能看出怎样调整更有质感。'
      },
      {
        title: '跨界联想力',
        desc: '擅长把看似不相关的生活观察串联起来，提出让人眼前一亮的创意企划。'
      },
      {
        title: '共鸣式表达',
        desc: '不用生硬说教，而是用画面感和故事感打动人心，让受众自然产生好感。'
      }
    ],
    blindSpotTip: '灵感爆棚时容易同时开启太多新坑，搭配一位擅长推进排期的伙伴，或者用轻量化清单抓大放小，会让你的才华更快变成代表作。',
    idealEnvironment: '审美在线、鼓励创新、扁平少内耗、允许自由探索与表达的团队氛围。',
    bestPartnerArchetype: '秩序领航员（笃行统筹力）',
    artImage: ARTWORK_IMAGES.creativeVision
  },
  logical: {
    id: 'arch_logical',
    name: '星图解码者',
    englishSubtitle: 'Strategic & Analytical Architect',
    primaryDim: 'logical',
    quote: '“在纷繁复杂的迷雾里，你总能率先看见那条最清晰的底层脉络。”',
    summary:
      '你具备冷静通透的结构化思维，面对庞杂的信息或棘手难题时，不会盲目焦虑，而是习惯先找原因、看数据、理框架。你追求事物的合理性与高效率，是团队里最让人信赖的“清醒大脑”与策略智囊。',
    superpowers: [
      {
        title: '抽丝剥茧的洞察',
        desc: '能迅速穿透表面现象，一针见血地找到问题的核心卡点与因果逻辑。'
      },
      {
        title: '系统化构建力',
        desc: '擅长搭建可复用的流程、方法论与评估框架，让复杂事务变得井然有序。'
      },
      {
        title: '理性决策定力',
        desc: '不轻易被情绪或跟风噪音带偏，习惯依据事实与全局利弊做出最优选择。'
      }
    ],
    blindSpotTip: '有时因为看得太透彻，容易对低效沟通感到不耐烦。在表达精准结论时加一点温和的铺垫，会让你的专业建议更容易被全员欣然接受。',
    idealEnvironment: '目标清晰、讲求逻辑与事实、看重实际产出与方法论沉淀的专业型组织。',
    bestPartnerArchetype: '春风联结者（共情沟通力）',
    artImage: ARTWORK_IMAGES.logicStrategy
  },
  empathy: {
    id: 'arch_empathy',
    name: '春风联结者',
    englishSubtitle: 'Empathetic Connector & Enabler',
    primaryDim: 'empathy',
    quote: '“真正的力量不在于声嘶力竭，而在于让人如沐春风的懂得与陪伴。”',
    summary:
      '你天生拥有极高的情感敏锐度与亲和力，能够迅速捕捉到他人未说出口的顾虑与期待。你擅长倾听、协调与赋能，有你在的地方，紧绷的气氛会自然柔和下来，不同背景的人也能顺畅对话、凝聚合力。',
    superpowers: [
      {
        title: '深度倾听与共情',
        desc: '能迅速建立信任感，让用户、客户或同事愿意敞开心扉表达真实需求。'
      },
      {
        title: '温柔而坚定的协调',
        desc: '在多方分歧中找到共赢平衡点，用高情商沟通化解摩擦、推进合作。'
      },
      {
        title: '发现他人闪光点',
        desc: '擅长激发团队伙伴的潜能，在陪伴与支持他人成长的过程中创造长期价值。'
      }
    ],
    blindSpotTip: '因为太习惯照顾别人的感受，有时会不自觉委屈自己或不好意思拒绝。学会设立温和而清晰的个人边界，你的善良与共情才不会变成内耗。',
    idealEnvironment: '人际氛围真诚温暖、注重用户体验或人才培养、强调协作共赢的人文型团队。',
    bestPartnerArchetype: '星图解码者（逻辑洞察力）',
    artImage: ARTWORK_IMAGES.peopleConnect
  },
  execution: {
    id: 'arch_execution',
    name: '秩序领航员',
    englishSubtitle: 'Reliable Coordinator & Executor',
    primaryDim: 'execution',
    quote: '“再遥远的星辰大海，在你手里都能拆解成一步步稳稳抵达的航线。”',
    summary:
      '你是天生的行动派与节奏掌控者。当别人还停留在空谈或焦虑时，你已经默默列好了时间表、分清了轻重缓急并迈出了第一步。你做事有始有终、颗粒度清晰，是任何关键项目里都不可或缺的定海神针。',
    superpowers: [
      {
        title: '目标拆解与排期',
        desc: '擅长把宏大模糊的目标，转化为每一天、每一周可执行落地的清晰清单。'
      },
      {
        title: '多线统筹不慌乱',
        desc: '面对多任务并行与时间节点压力，依然能稳住阵脚、合理调配资源按时交付。'
      },
      {
        title: '满分靠谱度',
        desc: '凡事有交代、件件有着落，与你合作的人永远享有最高级别的安全感。'
      }
    ],
    blindSpotTip: '当计划被突发状况打乱时可能会感到短暂烦躁。不妨给日程表预留15%的弹性空白，允许一点即兴惊喜的发生。',
    idealEnvironment: '权责清晰、流程规范、奖惩分明、能够看到自己推进的项目实实在在落地的环境。',
    bestPartnerArchetype: '暖阳造梦师（灵感创想力）',
    artImage: ARTWORK_IMAGES.heroBanner
  },
  exploration: {
    id: 'arch_exploration',
    name: '旷野破风者',
    englishSubtitle: 'Curious Pioneer & Trend Explorer',
    primaryDim: 'exploration',
    quote: '“你不喜欢只走别人踩平的路，风吹向哪里，哪里就有你的新大陆。”',
    summary:
      '你身上有着旺盛的好奇心与蓬勃的生命力，对新兴趋势、跨界玩法和未知挑战充满热情。你适应力极强，从不害怕从零开始，总能在变化莫测的环境中敏锐嗅到新机会，带领大家打开新局面。',
    superpowers: [
      {
        title: '前沿趋势嗅觉',
        desc: '总能第一时间捕捉到新工具、新平台与新风向，并迅速上手试出门道。'
      },
      {
        title: '从0到1破局力',
        desc: '在没有现成模板的新业务或新场景中，敢于大胆试错、快速跑通第一条路径。'
      },
      {
        title: '高能量感染力',
        desc: '乐观果敢的行动力能带动身边的人跳出舒适区，一起拥抱新鲜变化。'
      }
    ],
    blindSpotTip: '新鲜感褪去后，你可能会对重复性的维护工作感到枯燥。在把新项目从0做到1之后，尝试建立标准化机制或交接给稳健型伙伴，让你继续开拓下一片疆土。',
    idealEnvironment: '充满活力与上升空间、鼓励大胆尝试、拒绝僵化论资排辈的创新型舞台。',
    bestPartnerArchetype: '沉静手艺人（匠心钻研力）',
    artImage: ARTWORK_IMAGES.heroBanner
  },
  craft: {
    id: 'arch_craft',
    name: '沉静手艺人',
    englishSubtitle: 'Deep Specialist & Quality Craftsman',
    primaryDim: 'craft',
    quote: '“时间从不辜负专注的人，你打磨的每一处细节，都在替你发光。”',
    summary:
      '在这个追求快节奏的时代，你保留着难得的沉静与定力。你讨厌浮夸的噱头，更愿意把精力投入到具体技艺、作品质感或专业课题的深度打磨上。一旦进入心流状态，你交付的成果往往拥有令人惊叹的专业完成度。',
    superpowers: [
      {
        title: '深度心流专注力',
        desc: '能够屏蔽外界杂音，长时间沉浸在复杂技艺或专业课题中不断精进。'
      },
      {
        title: '细节控与高标准',
        desc: '对品质有着近乎执着的追求，能敏锐修正别人忽略的1%瑕疵。'
      },
      {
        title: '长期主义复利',
        desc: '不追求一时热闹，凭扎实过硬的专业护城河赢得长久尊重与自由。'
      }
    ],
    blindSpotTip: '有时因为追求100分完美而推迟了亮出作品的时机。记住“先完成85分亮出来收集反馈，再迭代到满分”，你的才华值得被更多人早点看见。',
    idealEnvironment: '尊重专业技术、减少无效会议打扰、鼓励深度学习与精益求精的匠心团队。',
    bestPartnerArchetype: '旷野破风者（开拓破局力）',
    artImage: ARTWORK_IMAGES.creativeVision
  }
};

export const CAREER_DATABASE: CareerRole[] = [
  // 1. Creative x Empathy
  {
    id: 'career_ux_designer',
    title: '用户体验与服务设计师 (UX / Service Design)',
    category: '数字体验与情感化设计',
    primaryDims: ['creative', 'empathy'],
    matchBase: 95,
    tagline: '把冰冷的功能变成有温度、好上手、润物无声的生活体验',
    whyFit: '你兼具敏锐的美学直觉与深度的换位思考力，擅长捕捉用户细微的焦虑与期待，设计出既赏心悦目又体贴入微的交互细节。',
    dailyMoment: '调研真实用户的使用日常与痛点，绘制流畅细腻的原型动线，与产品研发伙伴共同打磨让人身心放松的使用细节。',
    coreSkills: ['情感化界面构图', '深度用户访谈共情', '服务动线与交互逻辑', '设计系统规范化'],
    workStyle: '创意构思 + 跨团队温和协同',
    salaryRange: '15k - 35k / 月（资深可达40k+）',
    growthPath: ['体验设计师', '高级服务设计师', '体验设计总监', '独立设计咨询顾问'],
    firstSteps: [
      '遇到顺手或暖心的应用时，截图记录它让你感觉舒服的微交互细节',
      '尝试用 Figma 重新设计一个你觉得繁琐冷漠的日常办事页面'
    ]
  },
  {
    id: 'career_visual_storyteller',
    title: '视觉叙事与治愈插画师 / 视觉艺术家',
    category: '艺术创作与视觉表达',
    primaryDims: ['creative', 'empathy'],
    matchBase: 94,
    tagline: '用色彩与笔触疗愈人心，将抽象细腻的情绪转化为触手可及的温度画卷',
    whyFit: '你拥有天然的通感力与审美感知，能将生活中被忽视的微小美好和情感涟漪，通过插画和视觉语言精准表达出来。',
    dailyMoment: '构思温暖治愈的绘本画卷，为出版物或生活方式品牌创作主视觉插画，在工作室里静静调试细腻的色彩层次。',
    coreSkills: ['情绪通感色彩学', '手绘与数字板绘功底', '视觉故事分镜构图', 'IP形象性格塑造'],
    workStyle: '沉浸式灵感创作 + 柔性跨界合作',
    salaryRange: '12k - 32k / 月（作品版权与商业授权弹性大）',
    growthPath: ['自由插画师', '视觉企划艺术指导', '出版绘本作家', '独立艺术IP主理人'],
    firstSteps: [
      '坚持每天用 3 种颜色画一张“今日情绪手账卡”，捕捉日常灵动瞬间',
      '精选个人最有辨识度的9幅作品制作在线作品集并投递生活方式杂志'
    ]
  },
  {
    id: 'career_art_therapy_coach',
    title: '表达性艺术疗愈顾问 / 情绪美学导师',
    category: '身心疗愈与心理陪伴',
    primaryDims: ['creative', 'empathy'],
    matchBase: 93,
    tagline: '引导人们通过绘画、泥塑与音乐唤醒内在自愈力，重获平和自洽',
    whyFit: '你既有包容温厚的倾听气场，又有丰富的美学表达手法，擅长借助艺术媒介帮助疲惫内耗的人放下防备、梳理内心世界。',
    dailyMoment: '主持小班艺术解压工作坊，引导学员在涂鸦与色彩中表达潜意识，一对一陪伴来访者抚平职场与生活创伤。',
    coreSkills: ['艺术疗愈引导技术', '非评判接纳性倾听', '团体安全场域营建', '情绪解压课程研发'],
    workStyle: '温润面对面赋能 + 舒缓工作坊',
    salaryRange: '14k - 30k / 月（咨询时薪可达500-1500元）',
    growthPath: ['心理助理咨询师', '资深艺术疗愈师', '身心成长中心督导', '个人疗愈工作室主理人'],
    firstSteps: [
      '系统阅读表达性艺术治疗导论，掌握曼陀罗绘画等基础疗愈工具',
      '为身边的闺蜜朋友主持一次“曼陀罗情绪涂色+围炉倾诉”微沙龙'
    ]
  },

  // 2. Creative x Exploration
  {
    id: 'career_brand_planner',
    title: '品牌叙事与内容企划主理人',
    category: '品牌传播与生活方式',
    primaryDims: ['creative', 'exploration'],
    matchBase: 94,
    tagline: '用有灵魂的观念、视觉与叙事，让一个品牌从平庸走向被大众真挚热爱',
    whyFit: '你脑海里总有打破常规的新奇灵感，对社会前沿审美与情绪潮流嗅觉极其灵敏，天生适合塑造有辨识度的品牌灵魂。',
    dailyMoment: '策划一季打动人心的品牌主题短片与文案企划，寻找具有共鸣的独立艺术家联名，输出具有文化质感的传播案。',
    coreSkills: ['观念型文案叙事', '潮流与社会心理洞察', '跨界联名审美把控', '全域整合营销策划'],
    workStyle: '灵感脑暴 + 跨界潮流探索',
    salaryRange: '14k - 35k / 月',
    growthPath: ['品牌企划主管', '创意内容总监', '生活方式品牌主理人', '独立品牌战略合伙人'],
    firstSteps: [
      '挑选3个近年出圈的新锐女性友好品牌，拆解其文案调性与核心价值观',
      '尝试为一个假想的生活方式香氛或茶饮品牌撰写一份包含核心slogan的企划案'
    ]
  },
  {
    id: 'career_new_media_director',
    title: '独立创意编导 / 视觉IP主理人',
    category: '新媒体与创意影像',
    primaryDims: ['creative', 'exploration'],
    matchBase: 94,
    tagline: '敏锐捕捉时代潜意识情绪，用镜头与巧思打造有回响的高质感现象作品',
    whyFit: '你对新鲜风向永葆好奇，审美调性高级且行动迅速，擅长把微小的生活洞察转化为极具传播力的美学短片与深度图文。',
    dailyMoment: '捕捉当周文化热点，推敲分镜脚本与配乐节奏，带领摄像师与剪辑师将灵感高水准转化，与粉丝保持真诚共鸣。',
    coreSkills: ['网感与选题穿透力', '镜头美学与节奏把控', '情绪共鸣剧本创作', 'IP持续迭代自驱力'],
    workStyle: '敏捷创作 + 视觉艺术冲浪',
    salaryRange: '13k - 38k / 月（头部爆款商业收益弹性高）',
    growthPath: ['内容编导', '核心栏目制片人', 'MCN内容合伙人', '高声量独立IP创作者'],
    firstSteps: [
      '建立个人“审美选题灵感池”，随手记录打动你的生活片段与光影分镜',
      '拍摄并剪辑一支1分钟的个人生活美学Vlog，测试视听节奏与情绪传递'
    ]
  },
  {
    id: 'career_trend_curator',
    title: '流行趋势买手 / 生活方式策展买手',
    category: '美学零售与趋势洞察',
    primaryDims: ['creative', 'exploration'],
    matchBase: 92,
    tagline: '行走在世界审美前沿，为人们淘选唤醒生活热情的器物与灵感',
    whyFit: '你充满探索欲与审美品位，善于发现小众设计师与新兴生活美学，能把冷门前卫的概念包装成大众喜爱的美好物件。',
    dailyMoment: '奔走于国内外设计展与独立手作市集，甄选符合买手店风格的优质单品，规划橱窗空间与主推故事线。',
    coreSkills: ['前沿潮流预测能力', '商品企划与采销核算', '空间陈列美学设计', '供应商挖掘与商务谈判'],
    workStyle: '全球看展采风 + 空间美学陈列',
    salaryRange: '15k - 36k / 月',
    growthPath: ['助理买手', '资深商品企划专家', '买手集合店艺术总监', '独立生活方式买手店创始人'],
    firstSteps: [
      '关注 WGSN 等全球趋势发布机构报告，提炼未来一季的核心流行色与材质关键词',
      '尝试为一家你喜欢的街角小店做一次模拟买手选品清单与陈列企划'
    ]
  },

  // 3. Creative x Craft
  {
    id: 'career_frontend_creative',
    title: '创意交互工程师 / 独立数字创作者',
    category: '数字技术与交互美学',
    primaryDims: ['creative', 'craft'],
    matchBase: 94,
    tagline: '以代码作画笔，雕琢具有丝滑微交互与指尖触感的数字艺术品',
    whyFit: '你既耐得住性子沉浸钻研技术细节，又对色彩、动效曲线与交互质感有着苛刻要求，享受用技术亲手构筑精美界面的成就感。',
    dailyMoment: '手写丝滑的物理阻尼微动效与响应式布局，攻克复杂画面的渲染性能，把设计图以120%的完成度注入生命。',
    coreSkills: ['CSS与WebGL图形渲染', '微交互物理动效调优', '组件架构模块化', '匠心代码美学精益'],
    workStyle: '沉浸心流编码 + 精雕细琢',
    salaryRange: '16k - 38k / 月',
    growthPath: ['前端开发工程师', '高级交互工程师', '体验技术总监', '独立数字产品开发者 (Indie Hacker)'],
    firstSteps: [
      '搭建一个属于自己的响应式作品集网页，加入柔和温暖的微动效',
      '研究优秀设计系统中的交互动画源码（如 Framer Motion、Three.js）'
    ]
  },
  {
    id: 'career_game_concept_artist',
    title: '游戏世界观与概念美术设计师',
    category: '数字艺术与互动叙事',
    primaryDims: ['creative', 'craft'],
    matchBase: 93,
    tagline: '在虚构的时空里创造唯美秘境与动人角色，让千万玩家身临其境',
    whyFit: '你有极其丰沛的想象力与扎实的手绘功底，乐于在建筑结构、服饰纹理与光影氛围中细致考究，赋予虚拟世界沉浸的真实感。',
    dailyMoment: '绘制游戏关键场景的气氛概念图，推敲不同地域文明的服饰细节与道具设计，与3D建模团队沟通材质还原度。',
    coreSkills: ['宏大场景气氛图绘制', '角色服饰与道具概念设定', '数字绘画材质质感', '世界观文献视觉转化'],
    workStyle: '深度专注作画 + 概念设定迭代',
    salaryRange: '15k - 36k / 月（优秀原画版权分红丰厚）',
    growthPath: ['概念原画师', '主美术设计师', '艺术总监 (Art Director)', '独立游戏工作室美术合伙人'],
    firstSteps: [
      '为一部你喜欢的奇幻小说或古代神话设定一套包含3个场景的视觉设定图',
      '在 ArtStation 建立个人画廊并持续更新高质量细节作品'
    ]
  },

  // 4. Creative x Logical
  {
    id: 'career_info_architect',
    title: '设计策略顾问 / 体验信息架构师',
    category: '设计策略与商业创新',
    primaryDims: ['creative', 'logical'],
    matchBase: 93,
    tagline: '打通审美感知与底层商业闭环，让复杂的系统井然有序且极富美感',
    whyFit: '你擅长用理性框架拆解混乱，同时拥有极高的美学素养，能把繁琐庞杂的业务信息抽丝剥茧，整理成优雅清晰的交互蓝图。',
    dailyMoment: '梳理跨多业务线的复杂信息层级与任务链路，产出条理分明的站点地图与体验策略，与技术架构师对齐数据模型。',
    coreSkills: ['信息分类与导航设计', '复杂系统解构重塑', '体验策略路线规划', '跨学科逻辑说服力'],
    workStyle: '逻辑建模 + 美学系统整合',
    salaryRange: '18k - 40k / 月',
    growthPath: ['资深交互架构师', '设计策略总监', '体验咨询合伙人', '数字化转型顾问'],
    firstSteps: [
      '分析一个功能极其繁琐的平台（如政务服务或大型电商），绘制其信息流向图并提出简化方案',
      '阅读《信息架构：超越Web的设计》，掌握卡片分类法等专业梳理工具'
    ]
  },
  {
    id: 'career_creative_technologist',
    title: 'AIGC 视觉算法艺术指导 / 生成式创意专家',
    category: '前沿科技与前锋艺术',
    primaryDims: ['creative', 'logical'],
    matchBase: 95,
    tagline: '站在AI技术与人文审美的交汇处，开创下一代人机协同创新的无限可能',
    whyFit: '你既懂提示词工程与模型微调的严密逻辑，又有挑剔的艺术眼光与设计审美，擅长驯服前沿算法产出高质量的惊艳视觉成果。',
    dailyMoment: '测试最新文生图与视频算法模型，调优特定风格的LoRA权重与工作流，为品牌量身打造AI生成式广告大片与数字资产。',
    coreSkills: ['AIGC工具链与工作流', '美学风格量化与提示词工程', '算力模型微调与质检', '跨界创意工程转化'],
    workStyle: '科技极客试验 + 视觉美学前锋',
    salaryRange: '20k - 45k / 月',
    growthPath: ['AI视觉专家', 'AIGC创意总监', '前沿科技艺术实验室主理人', 'AI创意机构合伙人'],
    firstSteps: [
      '精通 ComfyUI 或 Midjourney 高级工作流，建立属于自己的特定艺术风格模型库',
      '用AI生成一套完整的虚拟时装周或未来城市视觉企划案并公开发布'
    ]
  },

  // 5. Creative x Execution
  {
    id: 'career_experience_curator',
    title: '空间体验策展人 / 沉浸艺术活动主理人',
    category: '线下体验与文化策展',
    primaryDims: ['creative', 'execution'],
    matchBase: 93,
    tagline: '在现实空间里编织光影、气味与动线，打造让人久久回味的场域记忆',
    whyFit: '你兼具天马行空的浪漫构想与踏实靠谱的落地手腕，既能设计出唯美震撼的展览体验，又能把控好复杂的搭建预算与工期节点。',
    dailyMoment: '绘制展览参观情绪动线图，挑选极具质感的物料打样，带领搭建团队在展厅彻夜连轴转，确保开幕式完美呈现。',
    coreSkills: ['空间动线与声光策展', '多方供应商工程统筹', '预算把控与风险预案', '现场突发状况调度'],
    workStyle: '美学构想 + 现场铁腕推进',
    salaryRange: '13k - 32k / 月',
    growthPath: ['策展执行主管', '独立策展人 / 空间总监', '文化空间合伙人', '文旅体验节事制作人'],
    firstSteps: [
      '看展时记录优秀的展陈细节（灯光照射角度、转角说明牌排版、背景气味营造）',
      '尝试为主办一次 20 人的小型艺术派对或手作沙龙编制完整的物资进度排期表'
    ]
  },
  {
    id: 'career_design_ops',
    title: '设计统筹管理师 (DesignOps) / 创意制片人',
    category: '创意管理与设计工程',
    primaryDims: ['creative', 'execution'],
    matchBase: 92,
    tagline: '让天马行空的创意团队高效、快乐且保质保量地稳步交出传世作品',
    whyFit: '你理解设计师的心流与创作规律，同时拥有清晰的时间表与流程思维，能在保护创作者灵气的同时确保商业交付滴水不漏。',
    dailyMoment: '梳理创意部门的多项目协同排期，优化设计资产流转规范，主持高效简明的需求评审会，清理一切阻碍创作的卡点。',
    coreSkills: ['创意流程标准化 (SOP)', '设计资源科学分配', '跨部门期待值管理', '团队心流状态保护'],
    workStyle: '节奏中枢 + 创意保驾护航',
    salaryRange: '15k - 35k / 月',
    growthPath: ['设计项目经理', 'DesignOps负责人', '创意机构运营总经理', '大型制片公司监制'],
    firstSteps: [
      '学习国际顶级科技大厂的 DesignOps 运作机制与工具链',
      '用多维表格为跨岗位的创意设计协作建立清晰直观的任务流转看板'
    ]
  },

  // 6. Logical x Empathy
  {
    id: 'career_product_manager',
    title: '创新产品经理 (C端体验 / 生活方式工具)',
    category: '产品战略与需求洞察',
    primaryDims: ['logical', 'empathy'],
    matchBase: 95,
    tagline: '左手体察人性的微妙脆弱，右手构筑坚固的逻辑基石，从0到1孵化好产品',
    whyFit: '你既能温柔体察用户的真切痛点与心理防线，又能用严密的逻辑将其转化为高可用的产品架构，兼具人文关怀与理智清醒。',
    dailyMoment: '深入用户日常进行深度共情访谈，梳理核心功能逻辑图，平衡商业目标与用户体验，带领产研团队把灵感推向落地。',
    coreSkills: ['人性洞察与需求萃取', '结构化PRD文档撰写', '数据指标复盘归因', '跨角色共识凝聚力'],
    workStyle: '全局战略思考 + 深度人际沟通',
    salaryRange: '18k - 40k / 月',
    growthPath: ['助理产品经理', '核心业务产品经理', '产品副总裁 (VP of Product)', '科技创业公司合伙人'],
    firstSteps: [
      '深度拆解一款女性评分极高的小众生活工具App，写出1500字的产品逻辑体验分析',
      '练习用结构化思维梳理一次复杂的日常生活决策（如购房或转行规划）'
    ]
  },
  {
    id: 'career_psychology_researcher',
    title: '用户研究专家 / 认知心理学顾问',
    category: '心理认知与定性实证',
    primaryDims: ['logical', 'empathy'],
    matchBase: 94,
    tagline: '用严谨的实证方法与深度的同理心，看懂用户未曾说出口的潜意识渴望',
    whyFit: '你拥有敏锐的心理捕捉力与客观中立的科研素养，能透过表面的言语看穿深层动机，用扎实的研究报告为决策层提供确定性。',
    dailyMoment: '开展一对一定性深度访谈，分析眼动仪测试与日志行为数据，提炼典型用户画像与心智模型，输出战略级洞察简报。',
    coreSkills: ['定性深度访谈技巧', '心智模型构建', '问卷与统计学实证', '洞察报告故事化呈现'],
    workStyle: '深度沉浸调研 + 严谨科学推理',
    salaryRange: '16k - 36k / 月',
    growthPath: ['用户研究员', '资深洞察专家', '全球用研总监', '消费者行为学独立智库合伙人'],
    firstSteps: [
      '学习半结构化访谈的追问技巧（连续追问5次“为什么”，探寻底层心理驱动力）',
      '对5位不同年龄段的朋友就“职场安全感从何而来”做一次深入调研记录'
    ]
  },

  // 7. Logical x Execution
  {
    id: 'career_data_strategy',
    title: '商业策略顾问 / 业务经营分析师',
    category: '商业洞察与战略咨询',
    primaryDims: ['logical', 'execution'],
    matchBase: 94,
    tagline: '剥离纷乱杂音洞察商业本质，用扎实的数据推演为企业航向指明最优解',
    whyFit: '你信奉逻辑与事实，擅长从看似杂乱无章的业务数据中提取清晰因果链条，并能给出可落地、能见效的执行拆解方案。',
    dailyMoment: '搭建业务经营看板与预测模型，与各业务线负责人对齐执行瓶颈，输出条理清晰的高管汇报PPT并跟进改善进展。',
    coreSkills: ['商业分析框架 (MECE/金字塔)', '数据建模与可视化', '业务经营指标拆解', '高管汇报说服力'],
    workStyle: '严谨案头推演 + 强势策略推进',
    salaryRange: '16k - 38k / 月',
    growthPath: ['初级战略分析师', '高级商业分析专家', '企业战略规划部总经理', '管理咨询公司合伙人'],
    firstSteps: [
      '精通 SQL 与主流商业 BI 可视化工具，熟练运用杜邦分析等经典财务商业模型',
      '挑选一家上市公司财报，做一次10页纸的业务增长驱动力分析报告'
    ]
  },
  {
    id: 'career_operations_specialist',
    title: '精细化业务运营架构师 / 增长操盘手',
    category: '商业运营与系统增长',
    primaryDims: ['logical', 'execution'],
    matchBase: 93,
    tagline: '用科学的指标体系与严谨的SOP推进机制，让业务如飞轮般自洽稳健运转',
    whyFit: '你既有全局的商业沙盘意识，又有一竿子插到底的执行韧劲，擅长用流程标准化把复杂业务梳理得井然有序。',
    dailyMoment: '监控全链路用户生命周期漏斗，快速设计并上线A/B测试方案，复盘转化率指标并形成可复制的落地手册。',
    coreSkills: ['转化漏斗全链路优化', 'SOP标准化手册搭建', 'A/B测试科学归因', '多项目协同执行力'],
    workStyle: '数据闭环管理 + 扎实拿结果',
    salaryRange: '14k - 35k / 月',
    growthPath: ['运营专家', '业务线运营总监', '首席运营官 (COO)', '品牌商业操盘手'],
    firstSteps: [
      '梳理自己目前工作中任何一个重复性流程，写出一份带标准检查清单的 SOP 手册',
      '研究瑞幸咖啡等高效率企业的标准化运营模型'
    ]
  },
  {
    id: 'career_supply_chain_analyst',
    title: '可持续供应链与智能履约规划师',
    category: '运营系统与精益管理',
    primaryDims: ['logical', 'execution'],
    matchBase: 92,
    tagline: '掌控全球货品与资源的精密脉搏，以零浪费的优雅秩序支持品质生活',
    whyFit: '你对数字敏感，看重计划的准确性与系统的稳健性，擅长在动态变化的市场中通过精算库存与物流，让运转滴水不漏。',
    dailyMoment: '运用预测算法评估季节性需求波动，制定精益补货计划，协调生产工厂与仓储物流节点，实现绿色低碳履约。',
    coreSkills: ['进销存预测算法分析', '精益生产与库存周转', '智能物流路径规划', '供应商质量合规管理'],
    workStyle: '精密统筹调度 + 系统性降本增效',
    salaryRange: '15k - 34k / 月',
    growthPath: ['供应链计划专家', '供应链运营总监', '全球履约副总裁', '跨国品牌运营合伙人'],
    firstSteps: [
      '学习精益六西格玛 (Six Sigma) 与现代供应链管理核心知识体系',
      '调研一家本土新消费品牌的仓储配货路径，分析其如何降低退货率与破损率'
    ]
  },

  // 8. Logical x Craft
  {
    id: 'career_craft_specialist',
    title: '深度行业研究员 / 智库独立分析师',
    category: '专业研究与深度洞察',
    primaryDims: ['logical', 'craft'],
    matchBase: 94,
    tagline: '耐得住寂寞深耕一门学问，用无懈可击的一手考据与缜密框架铸就专业壁垒',
    whyFit: '你具备极高的认知坚毅度与严谨治学精神，面对复杂的产业生态能沉潜梳理一手文献，以绝对过硬的专业实力赢得尊重。',
    dailyMoment: '沉浸于海量行业年报与学术文献，进行跨周期数据回溯与专家访谈，产出上万字的深度专题白皮书。',
    coreSkills: ['一手文献严密考证', '宏观与中观产业拆解', '深度长文写作体系', '高度自律专注力'],
    workStyle: '独立书斋深耕 + 权威成果交付',
    salaryRange: '15k - 38k / 月',
    growthPath: ['行业研究专员', '首席分析师 / 智库主笔', '研究院院长', '独立产业学者 / 畅销书作家'],
    firstSteps: [
      '锁定一个你长期看好的未来产业，搭建结构化的双链笔记知识库',
      '连续1个月每天写一份300字的核心新闻事实与逻辑评注'
    ]
  },
  {
    id: 'career_software_architect',
    title: '全栈系统架构师 / 核心算法工程师',
    category: '深层技术与工程架构',
    primaryDims: ['logical', 'craft'],
    matchBase: 95,
    tagline: '以精妙的高并发架构与优雅代码底座，构建支撑海量用户安心运行的数字殿堂',
    whyFit: '你热爱纯粹的技术挑战，拥有强悍的逻辑推演力与精益求精的工匠情怀，能把最复杂棘手的问题抽象为坚如磐石的优雅架构。',
    dailyMoment: '设计高可用、高扩展的底层微服务架构，攻克高并发下的性能与安全难题，重构冗余代码并编写清晰的工程文档。',
    coreSkills: ['高可用分布式系统架构', '复杂算法与数据结构', '底层性能调优与安全风控', '优雅代码重构力'],
    workStyle: '静默极客钻研 + 核心技术攻坚',
    salaryRange: '20k - 50k+ / 月',
    growthPath: ['核心开发工程师', '技术专家', '首席技术架构师 / CTO', '开源技术基金会导师'],
    firstSteps: [
      '阅读经典著作《设计模式》与《重构：改善既有代码的设计》',
      '参与一个开源项目并贡献高质量的单元测试与模块优化'
    ]
  },
  {
    id: 'career_financial_planner',
    title: '私人财富规划与独立理财架构师',
    category: '财富安全与资产配置',
    primaryDims: ['logical', 'craft'],
    matchBase: 93,
    tagline: '量身定制稳健穿越周期的资产风控网络，为女性与家庭守护一生的底气与自由',
    whyFit: '你对经济周期与复利规律有清醒洞察，做事谨慎严谨，不被短期暴利诱惑，擅长用匠心打磨适合长跑的资产防御堡垒。',
    dailyMoment: '全面梳理客户家庭财务状况与未来现金流需求，构建跨资产类别的抗通胀组合，进行严密的极端情景压力测试。',
    coreSkills: ['全生命周期财务建模', '资产配置与风险对冲', '税筹与家族信托架构', '长期主义冷静定力'],
    workStyle: '私密严谨咨询 + 长期资产护航',
    salaryRange: '15k - 40k / 月（资深管理规模提成丰厚）',
    growthPath: ['理财顾问', '高级财富规划专家', '家族办公室投资总监', '独立理财工作室合伙人'],
    firstSteps: [
      '系统考取 CFP / CFA 认证相关基础模块知识',
      '为自己或家庭制定一份详尽的未来5年现金流收支与应急金风控预案'
    ]
  },

  // 9. Logical x Exploration
  {
    id: 'career_innovation_strategist',
    title: '未来趋势商业化策略顾问',
    category: '跨界创新与商业孵化',
    primaryDims: ['logical', 'exploration'],
    matchBase: 93,
    tagline: '在变化未明时推演未来图景，帮前沿科技与新兴消费品找到精准破局口',
    whyFit: '你拥有敏锐的前瞻直觉与强悍的逻辑推导力，既敢于踏入无人区探索新鲜事物，又能用科学的商业逻辑将其变现落地。',
    dailyMoment: '扫描全球前沿专利与商业雏形，研判颠覆性技术的商业化临界点，为大型集团或创新团队撰写孵化可行性报告。',
    coreSkills: ['颠覆性技术商业化推演', '未来场景构建学', '敏捷商业画布验证', '早期项目尽职调查'],
    workStyle: '前沿趋势扫描 + 商业创新孵化',
    salaryRange: '18k - 42k / 月',
    growthPath: ['创新策略顾问', '新业务孵化总监', '风险投资(VC)副总裁', '创新工场管理合伙人'],
    firstSteps: [
      '阅读《创新者的窘境》与《跨越鸿沟》，理解科技产品进入主流市场的客观规律',
      '挑选一个正在萌芽的新概念（如人形机器人入户或脑机接口），推演其潜在的杀手级应用场景'
    ]
  },
  {
    id: 'career_esg_analyst',
    title: 'ESG 与绿色可持续发展顾问',
    category: '社会责任与绿色经济',
    primaryDims: ['logical', 'exploration'],
    matchBase: 92,
    tagline: '推动商业向善与生态永续，把环境保护与社会价值转化为坚实的长期收益',
    whyFit: '你有开阔的全球视野与扎实的定量分析素养，相信商业的力量可以改善世界，乐于在新兴标准领域开拓创新标杆。',
    dailyMoment: '评估企业的碳足迹与供应链劳工人权合规，搭建科学可衡量的ESG评价体系，协助企业发布高质量的可持续发展披露报告。',
    coreSkills: ['碳核算与ESG评级框架', '可持续供应链审计', '绿色金融与社会价值量化', '跨国合规政策解读'],
    workStyle: '跨国标准推演 + 绿色商业开拓',
    salaryRange: '16k - 36k / 月',
    growthPath: ['可持续发展专员', 'ESG咨询业务总监', '跨国企业可持续发展官 (CSO)', '影响力投资基金合伙人'],
    firstSteps: [
      '学习 GRI、ISSB 等全球公认的可持续发展报告披露准则',
      '研读 Patagonia 或特斯拉的最新可持续发展报告，分析其背后的商业逻辑'
    ]
  },

  // 10. Empathy x Exploration
  {
    id: 'career_community_user',
    title: '社群生态主理人 / 温暖关系网络架构师',
    category: '人际连接与社群归属',
    primaryDims: ['empathy', 'exploration'],
    matchBase: 94,
    tagline: '把志趣相投的个体聚拢成互助的微光森林，让每个人找到深层的精神归属',
    whyFit: '你拥有春风拂面的亲和力与永不停歇的新鲜感，天生懂得如何倾听、如何破冰，擅长在快节奏都市中搭建高粘性的避风港。',
    dailyMoment: '策划主题新颖的线上线下共创沙龙，与核心活跃会员一对一交流倾听心声，设计温暖有爱、互帮互助的社群仪式感。',
    coreSkills: ['高情商倾听与情感破冰', '创意社交场景搭建', '核心圈层KOL共创激活', '归属感文化符号设计'],
    workStyle: '高频人际互动 + 灵动创意策展',
    salaryRange: '12k - 30k / 月',
    growthPath: ['社群运营官', '社区生态负责人', '用户运营副总裁', '青年文化社群品牌创始人'],
    firstSteps: [
      '发起并组织一次6-8人的主题读书聚会或露营沙龙，观察如何通过开场小游戏让陌生人快速敞开心扉',
      '研究小红书上受女性欢迎的头部社群，拆解其社群公约与成长机制'
    ]
  },
  {
    id: 'career_cultural_travel_leader',
    title: '人文旅行定制师 / 旷野游牧领航员',
    category: '文化旅行与自然探索',
    primaryDims: ['empathy', 'exploration'],
    matchBase: 93,
    tagline: '带都市人暂别水泥森林走入自然与古老村落，在陌生而温热的风土中重新找回自己',
    whyFit: '你热爱辽阔山海与多样文化，心思细腻善解人意，擅长为疲惫的现代人量身定制放飞身心、深度体验当地生活的治愈旅途。',
    dailyMoment: '踏勘未被过度商业化的高山秘境或古朴村落，与当地手艺人建立深度合作，设计富有人文深度的独家漫游路线。',
    coreSkills: ['小众目的地深度踩线', '旅行者身心状态洞察', '跨文化沟通与资源整合', '突发状况温暖安抚'],
    workStyle: '山海漫游踏勘 + 深度陪伴定制',
    salaryRange: '13k - 35k / 月（带队与定制利润空间大）',
    growthPath: ['线路规划师', '高级人文定制师', '旅行俱乐部主理人', '独立旅行纪录片制片人'],
    firstSteps: [
      '为自己或家人策划一次避开人挤人景区的深度在地文化周末自驾路线',
      '撰写一篇充满风土温度与人情故事的目的地游记，在旅游社区尝试发布'
    ]
  },
  {
    id: 'career_social_innovation_pm',
    title: '社会创新与公益共创项目发起人',
    category: '社会价值与共益事业',
    primaryDims: ['empathy', 'exploration'],
    matchBase: 93,
    tagline: '将同理心化作破界行动，用创新商业思维解决真实困境，让脆弱群体被温柔看见',
    whyFit: '你心怀善意且充满探索精神，不满足于纸上谈兵，擅长连接各方资源，用可持续的创新手段为社会难题找到体面温和的解决方案。',
    dailyMoment: '深入乡村小学或老年社区探访真实诉求，联合爱心企业与青年志愿者共创落地项目，跟踪受助者的心理与生活变化。',
    coreSkills: ['弱势群体共情访谈', '社会企业商业模式设计', '多方利益相关者协调', '影响力成效量化评估'],
    workStyle: '田野调研共情 + 跨界资源聚合',
    salaryRange: '12k - 28k / 月',
    growthPath: ['公益项目专员', '社会企业运营总监', '共益基金会秘书长', '独立共益组织创始人'],
    firstSteps: [
      '参与一次周末社区公益服务，尝试用笔记记录观察到的3个未被满足的微小需求',
      '研读诺贝尔和平奖尤努斯“穷人银行”等经典社会创新案例'
    ]
  },

  // 11. Empathy x Execution
  {
    id: 'career_edu_counselor',
    title: '生涯发展教练 / 女性成长咨询师',
    category: '生涯辅导与个人成长',
    primaryDims: ['empathy', 'execution'],
    matchBase: 95,
    tagline: '以温暖倾听做镜子，以清晰步骤做拐杖，陪伴迷茫的人走向属于自己的辽阔旷野',
    whyFit: '你拥有天然令人信赖的共情力量，同时具备把复杂困境拆解成明确行动计划的统筹能力，能帮陷入内耗的人重聚力量、迈出步伐。',
    dailyMoment: '开展一对一生涯咨询，运用倾听与提问帮来访者看清天性优势，协助对方制定转行或升职的 90 天可落地路线图。',
    coreSkills: ['非暴力沟通与共情倾听', '教练式启发提问 (GROW模型)', '能力与优势定位拆解', '行动目标督导赋能'],
    workStyle: '一对一温暖对谈 + 长期成长陪伴',
    salaryRange: '14k - 36k / 月（独立咨询时薪400-1200元）',
    growthPath: ['职场咨询师', '高级生涯督导', '企业人才发展(TD)总监', '女性个人成长品牌创始人'],
    firstSteps: [
      '系统学习国际教练联盟(ICF)核心理念或生涯规划师基础工具',
      '以志愿者身份为3位刚毕业或正在经历职业转型的朋友做一次模拟优势复盘'
    ]
  },
  {
    id: 'career_org_happiness_director',
    title: '企业人文关怀顾问 / 职场幸福度体验官 (CHO)',
    category: '组织发展与员工赋能',
    primaryDims: ['empathy', 'execution'],
    matchBase: 93,
    tagline: '革新职场文化与协作机制，消除冷漠内耗，让组织成为能滋养人才的温室',
    whyFit: '你深知“人”才是企业最核心的灵魂，懂得换位思考员工的疲惫与委屈，并能通过切实可行的管理制度把温暖落实到位。',
    dailyMoment: '设计关怀女性身心健康的弹性工作福利，调解跨部门沟通隔阂，组织激发内驱力的内部赋能活动，跟踪员工心理健康指数。',
    coreSkills: ['员工情绪晴雨表洞察', '柔性职场文化建设', '心理韧性辅导 (EAP)', '组织制度人性化落地'],
    workStyle: '以人为本关怀 + 体系化制度落地',
    salaryRange: '16k - 35k / 月',
    growthPath: ['员工关系专家', '人力资源组织发展负责人', '首席幸福官 (CHO)', '企业管理咨询顾问'],
    firstSteps: [
      '调研国内外标杆公司（如微软、谷仓）在提升女性员工幸福感与心理安全感方面的实践',
      '在当前团队中推动一次“无干扰深度工作时段”或“暖心互赞会”微型实验'
    ]
  },

  // 12. Empathy x Craft
  {
    id: 'career_sound_healer_artisan',
    title: '颂钵声音疗愈师 / 芳香调息师',
    category: '身心健康与感官调理',
    primaryDims: ['empathy', 'craft'],
    matchBase: 94,
    tagline: '沉浸于植物精油与自然声波的微妙振动，用匠心为疲惫心灵卸下厚重铠甲',
    whyFit: '你拥有高度敏锐的身体感官通感力与深厚的人文共情，能沉下心来打磨每一次音钵敲击与精油滴数，给予他人深层放松。',
    dailyMoment: '为高压都市人群定制一对一沉浸式音疗方案，调配契合当下情绪周期的植物复方精油，带领来访者在深沉呼吸中放下压力。',
    coreSkills: ['身体能量与声音共振调理', '有机芳香精油调配考据', '沉浸空间感官营造', '细腻同理心与身心陪伴'],
    workStyle: '手作匠心调配 + 宁静疗愈场域',
    salaryRange: '13k - 32k / 月（个案预约制，单次600-1800元）',
    growthPath: ['感官疗愈师', '资深芳香音疗培训导师', '身心健康美学中心督导', '独立自愈生活方式品牌主理人'],
    firstSteps: [
      '系统学习国际认证芳疗师 (IFA/NAHA) 基础理论，积累50种常见植物精油特性',
      '购置一只手工锻造颂钵，每天练习定息敲击与听音冥想，培养对微小振动的敏感度'
    ]
  },
  {
    id: 'career_independent_publisher',
    title: '深度人物访谈记者 / 独立传记出版人',
    category: '人文非虚构与深度出版',
    primaryDims: ['empathy', 'craft'],
    matchBase: 93,
    tagline: '以最大的敬意与耐心记录普通生命的高光与褶皱，为时代留下沉静有力的文字',
    whyFit: '你拥有静水流深的倾听耐心与精益求精的文字功底，不随波逐流追逐短平快热点，擅长用最克制有温度的文字书写人心力量。',
    dailyMoment: '花费数月时间陪伴采访对象，查阅大量口述历史资料，字斟句酌地打磨每一段非虚构文字，与设计师推敲装帧纸张触感。',
    coreSkills: ['口述历史与深度访谈', '非虚构文学叙事技巧', '出版选题与装帧把控', '对人性复杂度的敬畏心'],
    workStyle: '长期静心采访 + 匠心文字打磨',
    salaryRange: '12k - 30k / 月（图书版税长期复利）',
    growthPath: ['深度特稿记者', '非虚构文学编辑', '独立出版工作室主理人', '传记作家 / 文学奖得主'],
    firstSteps: [
      '为自己的母亲或身边的女性长辈做一次完整的口述人生访谈，写一篇3000字的人物侧写',
      '研读普利策非虚构特稿经典范文，学习如何捕捉人物对话中的情绪停顿'
    ]
  },

  // 13. Execution x Craft
  {
    id: 'career_project_pmo',
    title: '敏捷项目总监 / 创意制作人 (PMO)',
    category: '跨界协同与交付统筹',
    primaryDims: ['execution', 'craft'],
    matchBase: 95,
    tagline: '做复杂项目中最令人安心的节拍器，把每一次承诺变为无可挑剔的惊艳成果',
    whyFit: '你做事极其靠谱有交代，追求交付的极致品质与时间节点，擅长在纷乱的跨界协作中建立高标准、高透明度的交付秩序。',
    dailyMoment: '拆解多条业务线的大型交付里程碑，预判供应链与人员风险，主持精准到分钟的复盘会，确保每一个细节达到免检品质。',
    coreSkills: ['复杂排期与关键路径规划', '质量控制与风险预案', '跨部门协同温和催进', '精益复盘与标准迭代'],
    workStyle: '全局节奏把控 + 匠心质量把关',
    salaryRange: '16k - 38k / 月',
    growthPath: ['项目主管', '高级项目总监 / 制作人', 'PMO业务副总裁', '大型跨国项目操盘手'],
    firstSteps: [
      '考取 PMP 或敏捷认证 (Scrum Master) 知识框架',
      '用甘特图或敏捷看板规范管理自己近期的一项中长期目标（如备考或健身）'
    ]
  },
  {
    id: 'career_quality_architect',
    title: '数字化服务质量专家 / 体验标准制定官',
    category: '品质保障与标准工程',
    primaryDims: ['execution', 'craft'],
    matchBase: 93,
    tagline: '守住服务体验的生命线，用精密严密的考量杜绝哪怕0.1%的粗糙与敷衍',
    whyFit: '你有强烈的责任心与对完美的执着追求，不放过任何一个死角，擅长通过搭建完善的质检与反馈闭环，守护用户的信任基石。',
    dailyMoment: '开展端到端用户体验旅程实测走查，定位异常报错与服务瑕疵，制定免检标准与评测指标，推动各部门持续精益改善。',
    coreSkills: ['体验旅程端到端质检', '缺陷根因分析 (RCA)', '服务质量量化评级体系', '精细化复盘推进力'],
    workStyle: '明察秋毫质检 + 体系化闭环跟进',
    salaryRange: '15k - 34k / 月',
    growthPath: ['质检与体验工程师', '质量管理总监', '客户体验与合规副总裁', '独立第三方认证咨询专家'],
    firstSteps: [
      '梳理一次日常网购或点餐的完整体验流程，罗列出可能出现糟糕体验的10个关键脆弱点',
      '学习ISO体验管理与服务质量量化评价核心原则'
    ]
  },
  {
    id: 'career_niche_brand_founder',
    title: '手作香氛与生活器物品牌主理人',
    category: '独立品牌与实体工艺',
    primaryDims: ['execution', 'craft'],
    matchBase: 94,
    tagline: '把精湛的手工艺转化为具有自我造血能力的小而美品牌，过上自洽踏实的手艺人人生',
    whyFit: '你既耐得住性子长年累月打磨独家手作工艺，又懂得精打细算供应链成本与销售渠道，能把个人纯粹的热爱做成稳固的事业。',
    dailyMoment: '在工坊里手工调配蜡烛或烧制陶艺器皿，把控每一批包材与蜡芯质感，规划线上私域发售节奏与线下买手店铺货。',
    coreSkills: ['手作工艺研发与品控', '实体供应链小批量排产', '私域发售与会员留存', '品牌成本与现金流把控'],
    workStyle: '手工作坊深耕 + 独立商业操盘',
    salaryRange: '15k - 45k / 月（店铺自主盈利上限高）',
    growthPath: ['独立手作匠人', '工作室主理人', '生活方式品牌创始人', '非遗文化现代商业合伙人'],
    firstSteps: [
      '独立研发一款具有鲜明气味或触感记忆的香氛蜡烛或陶瓷器皿原型',
      '测算原材料、包材、物流与时间成本，制定合理定价模型并试卖给第一批种子用户'
    ]
  },

  // 14. Execution x Exploration
  {
    id: 'career_growth_experimenter',
    title: '出海全球化业务拓展总监 (Global BD)',
    category: '全球商业与跨文化开拓',
    primaryDims: ['execution', 'exploration'],
    matchBase: 94,
    tagline: '带着中国优秀创意与科技勇敢出海，在未知的全球版图上扎下根来',
    whyFit: '你渴望看更大的世界，行动力强韧果敢，不畏惧陌生语言与未知规则，善于用强大的执行推进力在异国市场快速打开局面。',
    dailyMoment: '分析海外当地目标市场的法律法规与用户消费习惯，与当地合作伙伴开展跨时区商务洽谈，把控本地化团队运营进度。',
    coreSkills: ['跨文化商务沟通', '海外本地化合规开拓', '陌生市场破局落地', '高韧性抗压推进力'],
    workStyle: '空中飞人 + 全球市场破冰',
    salaryRange: '20k - 50k+ / 月（海外业务提成弹性极大）',
    growthPath: ['海外市场拓展专员', '出海大区业务总监', '全球副总裁 (VP Global)', '跨国跨境品牌创始人'],
    firstSteps: [
      '熟练掌握一门外语并了解目标出海国家（如东南亚、中东或拉美）的年轻人群文化',
      '调研一家成功出海的中国品牌（如 SHEIN 或 Anker），拆解其本地化落地路径'
    ]
  },
  {
    id: 'career_event_producer',
    title: '跨界潮流艺术节总制作人',
    category: '大型节事与现场娱乐',
    primaryDims: ['execution', 'exploration'],
    matchBase: 93,
    tagline: '从空无一物的旷野到容纳上万人的狂欢盛宴，靠钢铁般的统筹力让奇迹落地',
    whyFit: '你热爱充满活力的新潮文化，胆大心细，越是面对人多事杂的大场面越能冷静沉着，享受把不可能的构想在现场变成现实的震撼感。',
    dailyMoment: '统筹数百家参展艺术家与赞助商品牌进场，协调公安消防报批与安保医疗救护，在对讲机里高效指挥全场各个端口。',
    coreSkills: ['大型万人活动报批与安保', '艺人商务与赞助商谈判', '复杂的应急危机响应', '现场庞大工程统筹调度'],
    workStyle: '高燃现场指挥 + 强抗压钢铁执行',
    salaryRange: '16k - 40k / 月（项目制奖金丰厚）',
    growthPath: ['现场执行导演', '大型节事制作人', '文化演艺集团总经理', '独立节事商业操盘手'],
    firstSteps: [
      '参与一次大型户外音乐节或艺术市集的幕后志愿者工作，仔细观察后台指挥系统如何运作',
      '练习编制一份包含50项应急突发事件（如暴雨、断电、迷路）的现场处置应急手册'
    ]
  },

  // 15. Exploration x Craft
  {
    id: 'career_indie_game_producer',
    title: '独立游戏制作人 / 互动叙事架构师',
    category: '独立游戏与互动艺术',
    primaryDims: ['exploration', 'craft'],
    matchBase: 94,
    tagline: '跳出大厂流水线框架，凭一颗匠心探索游戏机制的新边界，让作品触动全世界',
    whyFit: '你有不甘平庸的创新渴望，又耐得住数年磨一剑的代码与美术打磨，擅长把深邃的世界观和独特的玩法机制融为一体。',
    dailyMoment: '反复调优游戏核心玩法的手感反馈，撰写多分支剧情对话树，在 Steam 社区与全球玩家坦诚交流并快速修复测试反馈。',
    coreSkills: ['核心游戏机制创新设计', '分支叙事脚本创作', 'Unity/Unreal引擎深度开发', '小规模社区众筹运营'],
    workStyle: '独立自驱研发 + 全球小众连接',
    salaryRange: '15k - 45k / 月（独立上线后长尾分成极具爆发力）',
    growthPath: ['独立游戏开发者', '主策划 / 制作人', '知名精品工作室主理人', '独立游戏创投基金导师'],
    firstSteps: [
      '用简易游戏引擎（如 RPG Maker 或 Godot）在两周内完成一个 10 分钟流程的试玩 Demo',
      '向家人朋友测试并收集他们第一次玩时最困惑卡壳的地方'
    ]
  },
  {
    id: 'career_bio_lab_specialist',
    title: '未来农业与有机食品科研创客',
    category: '生态科技与健康生活',
    primaryDims: ['exploration', 'craft'],
    matchBase: 93,
    tagline: '把实验室搬进大自然，用科学配方与耐心培育纯净健康的下一代生命营养',
    whyFit: '你向往自然纯粹的生活方式，同时拥有严谨的科学探索精神，渴望用生物技术与农业创新改良食品品质，让人们吃得安心美好。',
    dailyMoment: '在智慧温室里监测微藻或有机水培蔬菜的光照温湿度曲线，化验土壤微生物多样性，研发无添加的纯净植物基配方。',
    coreSkills: ['生物发酵与植物配方研发', '智慧农业物联网监测', '食品安全与有机认证体系', '耐心细致的科学实验记录'],
    workStyle: '田园阳光试验 + 严谨实验研发',
    salaryRange: '14k - 35k / 月',
    growthPath: ['农业科研工程师', '研发总监', '有机农业庄园合伙人', '可持续食品科技品牌创始人'],
    firstSteps: [
      '在阳台尝试用无土水培种植生菜或香草，记录其每天的生长日记与水肥配比',
      '调研市场上植物燕麦奶或人造肉的技术痛点，思考如何用天然食材实现更好的口感'
    ]
  }
];

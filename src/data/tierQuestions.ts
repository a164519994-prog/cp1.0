import { DimensionKey, QuestionInteractionType } from './assessmentData';

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

export interface TierInfo {
  tier: 1 | 2 | 3;
  name: string;
  title: string;
  subtitle: string;
  questionCount: number;
  badge: string;
  unlockRequirement: string;
  focus: string;
}

export const ASSESSMENT_TIERS: TierInfo[] = [
  {
    tier: 1,
    name: '第一层 · 初探',
    title: '天赋基因与直觉初探',
    subtitle: '轻松生活化切片，锁定你的核心原型画像与天赋长板',
    questionCount: 9,
    badge: '初探勋章',
    unlockRequirement: '初始开放',
    focus: '直觉偏好 · 审美与灵感 · 基础人际状态'
  },
  {
    tier: 2,
    name: '第二层 · 进阶',
    title: '职场实战与协作工作风格',
    subtitle: '还原高频工作场景，剖析抗压韧性、能量损耗与细分赛道',
    questionCount: 12,
    badge: '实战勋章',
    unlockRequirement: '完成第一层后解锁（或直接体验）',
    focus: '团队协作模式 · 应对不确定性 · 节奏与抗压 · 6大细分岗位'
  },
  {
    tier: 3,
    name: '第三层 · 大师',
    title: '生涯战略与长期价值护城河',
    subtitle: '洞察终局价值取向，定制未来 3~5 年专属发展路线图',
    questionCount: 15,
    badge: '大师认证',
    unlockRequirement: '完成前两层进阶解锁',
    focus: '长期护城河 · 商业价值破局 · 3~5年里程碑路线 · 副业与独立探索'
  }
];

// Tier 1: 9 Questions (Intuitive & Lifestyle)
export const TIER_1_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 101,
    chapter: '初探 01 · 周末生活切片',
    type: 'scenario_choice',
    title: '难得迎来一个没有任何安排的晴朗周末，你最向往怎么度过？',
    subtitle: '不用考虑现实琐事，凭第一直觉选出最让你充电的方式',
    options: [
      {
        id: 't1_q1_a',
        label: '去逛艺术展、独立书店，或者随手拍下好看的街景',
        sublabel: '在充满美感与故事感的氛围里漫步',
        scores: { creative: 16, exploration: 8 },
        feedbackText: '你对生活里的美感与新鲜灵感有着天然的敏锐度。'
      },
      {
        id: 't1_q1_b',
        label: '约两三位好友去温馨的小馆子喝茶聊天，听听彼此近况',
        sublabel: '在真诚温暖的对话中放松身心',
        scores: { empathy: 16, creative: 6 },
        feedbackText: '人与人之间真实温暖的情感联结，是你重要的能量来源。'
      },
      {
        id: 't1_q1_c',
        label: '把房间彻底收纳整理一番，列好下周计划，清掉待办清单',
        sublabel: '享受一切井井有条带来的踏实感',
        scores: { execution: 16, logical: 6 },
        feedbackText: '秩序感与掌控感能让你迅速恢复内心的平静。'
      },
      {
        id: 't1_q1_d',
        label: '安静宅家拼乐高、研究一道新菜谱，或深挖一个感兴趣的冷知识',
        sublabel: '沉浸在自己的小世界里专注钻研',
        scores: { craft: 16, logical: 8 },
        feedbackText: '你拥有难得的深度专注力，享受亲手打磨一件事的过程。'
      }
    ]
  },
  {
    id: 102,
    chapter: '初探 02 · 空间意象图卷',
    type: 'visual_card',
    title: '如果可以拥有一间专属的工作室，你最想推开哪扇门？',
    subtitle: '轻触最契合你直觉节奏的空间图卷',
    options: [
      {
        id: 't1_q2_a',
        label: '阳光画室与灵感墙',
        sublabel: '满墙色彩拼贴与手绘草图，随时捕捉奇思妙想',
        visualType: 'garden',
        scores: { creative: 16, exploration: 6 },
        feedbackText: '自由包容、富有视觉刺激的环境最能激发你的创造潜能。'
      },
      {
        id: 't1_q2_b',
        label: '原木手作与精密工坊',
        sublabel: '工具排列整齐、台灯温暖明亮，不受打扰地打磨作品',
        visualType: 'workshop',
        scores: { craft: 16, execution: 6 },
        feedbackText: '安静专注、讲究专业品质的匠心空间最契合你的步调。'
      },
      {
        id: 't1_q2_c',
        label: '全景落地窗与思维白板',
        sublabel: '视野开阔，整面墙的逻辑导图与数据看板，一眼看清全局',
        visualType: 'library',
        scores: { logical: 16, execution: 8 },
        feedbackText: '清晰、理性、视野开阔的结构化环境让你思维如鱼得水。'
      },
      {
        id: 't1_q2_d',
        label: '暖炉沙发与开放茶歇角',
        sublabel: '随时能和伙伴围坐碰撞想法，有咖啡香与笑声的客厅',
        visualType: 'campfire',
        scores: { empathy: 15, exploration: 9 },
        feedbackText: '开放流动的互动氛围，最能让你发挥凝聚人心的优势。'
      }
    ]
  },
  {
    id: 103,
    chapter: '初探 03 · 出游协作角色',
    type: 'scenario_choice',
    title: '和朋友们结伴去陌生的山野或小镇旅行，你通常自然担任什么？',
    subtitle: '回想出游或聚会时你最舒适自然的真实状态',
    options: [
      {
        id: 't1_q3_a',
        label: '「行程管家」订车票酒店、列时间表，把各项细节安排妥帖',
        sublabel: '有你在，大家永远不用担心迷路或踩坑',
        scores: { execution: 16, logical: 8 },
        feedbackText: '出色的统筹力与未雨绸缪的习惯，让你成为团队最安心的后盾。'
      },
      {
        id: 't1_q3_b',
        label: '「宝藏雷达」挖掘小众秘境、特色手作市集和新奇体验',
        sublabel: '带大家体验不落俗套的趣味小路',
        scores: { exploration: 16, creative: 8 },
        feedbackText: '强烈的好奇心让你总能发现常规路线之外的惊喜。'
      },
      {
        id: 't1_q3_c',
        label: '「暖心纽带」照顾大家的体力和情绪，化解小摩擦，让全员舒服',
        sublabel: '只要大家相处融洽，去哪里都觉得温暖',
        scores: { empathy: 16, execution: 6 },
        feedbackText: '体贴入微的共情力，让你在任何群体里都备受欢迎。'
      },
      {
        id: 't1_q3_d',
        label: '「美学记录者」负责拍照录像、调色剪片，把旅程定格成作品',
        sublabel: '注重作品质感与深度回忆沉淀',
        scores: { craft: 12, creative: 12 },
        feedbackText: '你喜欢在体验中注入深度与质感，留下值得回味的作品。'
      }
    ]
  },
  {
    id: 104,
    chapter: '初探 04 · 思维天平刻度',
    type: 'dual_slider',
    title: '接手一个全新的事物时，你的大脑通常先启动哪一侧？',
    subtitle: '轻触刻度，选择最符合你日常习惯的一端',
    leftPoleLabel: '先搞清逻辑闭环与规则步骤',
    rightPoleLabel: '先构想画面氛围与好玩创意',
    options: [
      {
        id: 't1_q4_1',
        label: '完全偏向理性推演',
        sublabel: '必须先搞懂逻辑框架，才安心动手',
        scores: { logical: 18, execution: 6 },
        feedbackText: '结构先行的思维方式，让你极少走弯路。'
      },
      {
        id: 't1_q4_2',
        label: '略偏向条理分析',
        sublabel: '先搭好骨架，再逐步充实细节',
        scores: { logical: 12, craft: 10 },
        feedbackText: '你兼具理性骨架与细节耐性，做事稳健扎实。'
      },
      {
        id: 't1_q4_3',
        label: '略偏向直觉发散',
        sublabel: '抓住兴奋点，边试边调整方向',
        scores: { creative: 12, exploration: 10 },
        feedbackText: '灵动的直觉让你能快速打开局面，不被条框束缚。'
      },
      {
        id: 't1_q4_4',
        label: '完全偏向灵感创想',
        sublabel: '常规做法太无趣，喜欢直接构想独特呈现',
        scores: { creative: 18, exploration: 6 },
        feedbackText: '充沛的想象力让你天生适合创造与众不同的新体验。'
      }
    ]
  },
  {
    id: 105,
    chapter: '初探 05 · 成就感高光',
    type: 'scenario_choice',
    title: '哪一种对你的评价，会让你打心底里感到最满足？',
    subtitle: '最能带来获得感的反馈，往往藏着你的天生擅长',
    options: [
      {
        id: 't1_q5_a',
        label: '“你太懂我了！跟你聊完，心情豁然开朗，感觉被深深看见。”',
        sublabel: '因温暖共情与真诚倾听而被认可',
        scores: { empathy: 18, creative: 4 },
        feedbackText: '被需要、能温暖与启发他人，是你内心深处的驱动力。'
      },
      {
        id: 't1_q5_b',
        label: '“这么乱的事居然被你理得井井有条，逻辑太清晰靠谱了！”',
        sublabel: '因出色的梳理与排忧能力被依赖',
        scores: { logical: 14, execution: 12 },
        feedbackText: '在混乱中建立秩序、解决难题，最能激发你的自豪感。'
      },
      {
        id: 't1_q5_c',
        label: '“这个点子太有灵气了，审美和质感真的独一无二！”',
        sublabel: '因独特的美学与创意作品被惊艳',
        scores: { creative: 15, craft: 10 },
        feedbackText: '独特的审美表达与作品质感，是你闪闪发光的名片。'
      },
      {
        id: 't1_q5_d',
        label: '“你行动力太快了，别人还在观望，你已经探索出新路了！”',
        sublabel: '因敢为人先的破风行动被佩服',
        scores: { exploration: 16, execution: 8 },
        feedbackText: '敢想敢干、先人一步探索未知，是你的鲜明标签。'
      }
    ]
  },
  {
    id: 106,
    chapter: '初探 06 · 突发状况本能',
    type: 'scenario_choice',
    title: '准备好的计划遇到突发变故（如设备故障或行程受阻），你的第一反应是？',
    subtitle: '面对小意外时最真实的直觉选择',
    options: [
      {
        id: 't1_q6_a',
        label: '排查原因，对比备选方案，快速敲定最优应对预案',
        sublabel: '保持冷静，靠理性判断力解决',
        scores: { logical: 15, execution: 10 },
        feedbackText: '临危不乱的理性判断力，让你在关键时刻格外可靠。'
      },
      {
        id: 't1_q6_b',
        label: '先安抚周围同伴的情绪，用幽默和温和稳住场子',
        sublabel: '情绪抚平了，事情就能顺畅推进',
        scores: { empathy: 16, exploration: 6 },
        feedbackText: '你懂得先处理情绪再处理事情，拥有极高的情商智慧。'
      },
      {
        id: 't1_q6_c',
        label: '借题发挥，把小意外即兴改造成好玩的互动小插曲',
        sublabel: '顺势而为，意外往往是创意的催化剂',
        scores: { exploration: 15, creative: 12 },
        feedbackText: '极强的应变力与幽默创意，让你总能转危为机。'
      },
      {
        id: 't1_q6_d',
        label: '卷起袖子亲自上手调试和修复，直到彻底搞定',
        sublabel: '务实动手，用技术死磕问题',
        scores: { craft: 16, execution: 8 },
        feedbackText: '务实专注的动手能力，让你能够扎实地攻克具体难关。'
      }
    ]
  },
  {
    id: 107,
    chapter: '初探 07 · 节奏能量天平',
    type: 'dual_slider',
    title: '在长期学习或做事时，你更适应哪种能量状态？',
    subtitle: '选择最让你自在不内耗的生活节奏',
    leftPoleLabel: '专心致志把一门手艺打磨精通',
    rightPoleLabel: '广泛跨界接触新鲜事物与人脉',
    options: [
      {
        id: 't1_q7_1',
        label: '深度沉浸派',
        sublabel: '安静深耕专业，用扎实作品说话',
        scores: { craft: 18, logical: 6 },
        feedbackText: '专注深耕的定力，会让你在专业领域建立起极高壁垒。'
      },
      {
        id: 't1_q7_2',
        label: '稳健落地派',
        sublabel: '目标明确，循序渐进把计划做踏实',
        scores: { execution: 14, craft: 10 },
        feedbackText: '靠谱稳健的推进节奏，让你交付的每一件事都让人放心。'
      },
      {
        id: 't1_q7_3',
        label: '温暖协同派',
        sublabel: '与合拍伙伴互通有无，在交流中达成目标',
        scores: { empathy: 14, execution: 10 },
        feedbackText: '你既能照顾团队氛围，又能推动事情落地，是极佳的协作者。'
      },
      {
        id: 't1_q7_4',
        label: '跨界探索派',
        sublabel: '尝试新趋势新工具，开拓更多可能性',
        scores: { exploration: 18, empathy: 6 },
        feedbackText: '开阔的视野与活跃的连接力，让你总能捕捉到新机遇。'
      }
    ]
  },
  {
    id: 108,
    chapter: '初探 08 · 注意力自发流向',
    type: 'scenario_choice',
    title: '闲暇翻看书影音时，哪类题材最容易让你忘记时间？',
    subtitle: '注意力自发停留的地方，往往藏着你的潜能沃土',
    options: [
      {
        id: 't1_q8_a',
        label: '商业底层规律、科技大势、悬疑推演或硬核科普',
        sublabel: '沉迷于看懂世界运转的本质逻辑',
        scores: { logical: 16, exploration: 8 },
        feedbackText: '你对世界运转的底层逻辑有着旺盛的求知欲。'
      },
      {
        id: 't1_q8_b',
        label: '家居美学、电影构图、平面设计或文学叙事',
        sublabel: '被美好的视觉画面与情绪细节打动',
        scores: { creative: 18, craft: 6 },
        feedbackText: '细腻的审美感知力，是你源源不断的创作养分。'
      },
      {
        id: 't1_q8_c',
        label: '人物自传、心理疗愈、真实人生访谈与人际沟通',
        sublabel: '对真实人性的丰富与温存深感兴趣',
        scores: { empathy: 16, logical: 6 },
        feedbackText: '理解人、看见人，是你极具温度的天赋所在。'
      },
      {
        id: 't1_q8_d',
        label: '手工艺制作过程、实操技能拆解或硬核生产力工具',
        sublabel: '偏好看得见摸得着的实用成品与精巧手艺',
        scores: { craft: 12, execution: 10, exploration: 6 },
        feedbackText: '你偏爱知行合一，喜欢把知识转化为看得见的成果。'
      }
    ]
  },
  {
    id: 109,
    chapter: '初探 09 · 理想职业图景',
    type: 'priority_pick',
    title: '想象三年后的一个惬意工作日，哪个画面最让你期待？',
    subtitle: '第一层终章，定格最契合你内心的职业向往',
    options: [
      {
        id: 't1_q9_a',
        label: '主导一个口碑与美感兼具的创意企划，被大众喜爱',
        sublabel: '用审美与故事在世界上留下印记',
        scores: { creative: 16, exploration: 8 },
        feedbackText: '你的舞台在于用创意点亮人心。'
      },
      {
        id: 't1_q9_b',
        label: '作为智囊核心，用清晰的数据模型指引关键方向',
        sublabel: '运筹帷幄，做理智清醒的把关者',
        scores: { logical: 16, execution: 10 },
        feedbackText: '你的价值在于洞察本质、指引方向。'
      },
      {
        id: 't1_q9_c',
        label: '陪伴学员、用户或团队成长，成为被信任的引路人',
        sublabel: '在赋能与托举他人的过程中收获丰盛',
        scores: { empathy: 18, execution: 6 },
        feedbackText: '你的光芒在于温暖赋能、凝聚同行。'
      },
      {
        id: 't1_q9_d',
        label: '凭过硬的专业技能或代表作，拥有无可替代的专业话语权',
        sublabel: '凭真才实学说话，自由沉浸于所爱',
        scores: { craft: 18, logical: 6 },
        feedbackText: '你的底气来自精益求精的专业主义。'
      }
    ]
  }
];

// Tier 2: 12 Questions (Workplace Scenarios & Practical Collaboration)
export const TIER_2_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 201,
    chapter: '实战 01 · 项目启动立项',
    type: 'scenario_choice',
    title: '当公司接下一个方向模糊的新项目时，你最希望从哪一步切入？',
    subtitle: '考验在职场不确定性环境中的启动本能',
    options: [
      {
        id: 't2_q1_a',
        label: '先搜集行业竞品案例与潮流风向，脑暴最具辨识度的创意亮点',
        sublabel: '为项目注入独特的灵魂与差异化切口',
        scores: { creative: 16, exploration: 8 },
        feedbackText: '你习惯从差异化与视觉创新切入，为项目赋予鲜明辨识度。'
      },
      {
        id: 't2_q1_b',
        label: '拆解商业目标与考核指标，用逻辑梳理出漏斗模型和主干流程',
        sublabel: '确保每一步都有据可依，不盲目投入',
        scores: { logical: 18, execution: 6 },
        feedbackText: '严谨的商业逻辑梳理，能为团队避免大量沉没成本。'
      },
      {
        id: 't2_q1_c',
        label: '找相关负责人与潜在用户深入聊聊，摸清各方的真实关切与顾虑',
        sublabel: '理顺人际与需求，确保方向不跑偏',
        scores: { empathy: 18, execution: 6 },
        feedbackText: '你重视人的真实意图，能提前消除协同阻力。'
      },
      {
        id: 't2_q1_d',
        label: '制作甘特图与里程碑清单，明确每一阶段的交接人与输出标准',
        sublabel: '把模糊设想转化为清晰推进节奏',
        scores: { execution: 18, logical: 6 },
        feedbackText: '出色的排期与执行颗粒度，让项目能稳步落地。'
      }
    ]
  },
  {
    id: 202,
    chapter: '实战 02 · 团队意见分歧',
    type: 'scenario_choice',
    title: '开会时两个平级伙伴因为方案方向争执不下，你通常会如何介入？',
    subtitle: '职场冲突与跨部门协同风格',
    options: [
      {
        id: 't2_q2_a',
        label: '先安抚双方情绪，分别提炼两人提议里的合理成分，寻找共赢折中点',
        sublabel: '用温和的情商化解对立气氛',
        scores: { empathy: 18, logical: 6 },
        feedbackText: '兼顾人情与效率的协调能力，是团队不可多得的润滑剂。'
      },
      {
        id: 't2_q2_b',
        label: '列出客观评判维度表（成本、周期、收益、风险），用打分事实说话',
        sublabel: '用数据和逻辑推导最优解',
        scores: { logical: 18, execution: 6 },
        feedbackText: '用客观标准替代主观争执，展现出优秀的结构化素养。'
      },
      {
        id: 't2_q2_c',
        label: '跳出既有框架，提出一个融合两者长处且更有创意的第三条路径',
        sublabel: '用跨界脑洞打破非此即彼的僵局',
        scores: { creative: 16, exploration: 10 },
        feedbackText: '跳出局限的破局创意，往往能带来柳暗花明的转机。'
      },
      {
        id: 't2_q2_d',
        label: '提议分别进行小规模A/B测试或快速做个最小原型，用落地实测决胜负',
        sublabel: '争论不如动手验证',
        scores: { craft: 14, exploration: 10 },
        feedbackText: '敏捷务实的极客作风，能让团队快速走出内耗。'
      }
    ]
  },
  {
    id: 203,
    chapter: '实战 03 · 职场能量消耗',
    type: 'scenario_choice',
    title: '以下哪种工作情境，最容易让你在一天结束后感到心力交瘁？',
    subtitle: '识别你的职场能量损耗雷区与防内耗防线',
    options: [
      {
        id: 't2_q3_a',
        label: '一整天都在按机械呆板的流程填报表，没有任何个人发挥余地',
        sublabel: '创造力与自主权被严重压制',
        scores: { creative: 16, exploration: 10 },
        feedbackText: '机械僵化会消耗你的灵气，你需要有留白与创造空间的岗位。'
      },
      {
        id: 't2_q3_b',
        label: '团队内部勾心斗角、互相推诿，沟通必须拐弯抹角如履薄冰',
        sublabel: '真实情感被过度消耗',
        scores: { empathy: 18, craft: 6 },
        feedbackText: '真诚透明的人际氛围对你至关重要，内耗环境会极大折损你的潜力。'
      },
      {
        id: 't2_q3_c',
        label: '领导想法朝令夕改、没有条理，之前制定的计划被推倒重来无数次',
        sublabel: '秩序感与节奏被反复打乱',
        scores: { execution: 16, logical: 12 },
        feedbackText: '目标稳定与逻辑自洽是你的定海神针，无序折腾会让你极其疲惫。'
      },
      {
        id: 't2_q3_d',
        label: '要求赶工交付粗制滥造的半成品，根本不允许花时间打磨品质',
        sublabel: '专业操守与品质标准被迫妥协',
        scores: { craft: 18, logical: 8 },
        feedbackText: '你对专业尊严有高标准，粗糙应付会严重打击你的工作热情。'
      }
    ]
  },
  {
    id: 204,
    chapter: '实战 04 · 多任务并发节奏',
    type: 'dual_slider',
    title: '当手头同时堆积了来自多个部门的紧急需求时，你的应对本能是？',
    subtitle: '多线程调度与时间管理风格',
    leftPoleLabel: '关掉所有打扰，死磕最硬骨头逐一击破',
    rightPoleLabel: '快速穿梭各环节，调配资源并行推进',
    options: [
      {
        id: 't2_q4_1',
        label: '深度专注·单线程推进',
        sublabel: '按重要性排序，一件做完再开启下一件',
        scores: { craft: 16, execution: 8 },
        feedbackText: '高专注度能确保每一个交付件都具备顶尖质量。'
      },
      {
        id: 't2_q4_2',
        label: '清单掌控·四象限过滤',
        sublabel: '用四象限法过滤紧急度，分发或按序消灭',
        scores: { execution: 16, logical: 10 },
        feedbackText: '清晰的优先级规划让你在压力面前游刃有余。'
      },
      {
        id: 't2_q4_3',
        label: '柔性沟通·管理预期',
        sublabel: '主动与各方确认真实DDL，争取合理空间与协助',
        scores: { empathy: 14, execution: 10 },
        feedbackText: '懂得管理相关方预期，体现出成熟的高情商职场智慧。'
      },
      {
        id: 't2_q4_4',
        label: '全景统筹·杠杆调度',
        sublabel: '抓大放小，把琐事分包，自己把控关键枢纽',
        scores: { exploration: 14, logical: 12 },
        feedbackText: '擅长借力与调度资源，具备天然的管理操盘潜质。'
      }
    ]
  },
  {
    id: 205,
    chapter: '实战 05 · 面对批评与复盘',
    type: 'scenario_choice',
    title: '当你的提案或交付成果被提出严肃质疑时，你最真实的心态是？',
    subtitle: '职场韧性与复盘迭代机制',
    options: [
      {
        id: 't2_q5_a',
        label: '剥离情绪，一条条梳理对方指出的具体依据，寻找逻辑漏洞补齐',
        sublabel: '以事实为准绳，用理性完善漏洞',
        scores: { logical: 18, craft: 8 },
        feedbackText: '强大的事实客观性，让你能迅速把批评转化为升级契机。'
      },
      {
        id: 't2_q5_b',
        label: '感受对方的期待与担忧，私下做一次温和沟通，探寻彼此真实诉求',
        sublabel: '看重彼此信任的维系与重新校准',
        scores: { empathy: 18, exploration: 6 },
        feedbackText: '敏锐的同理心让你不仅解决事情，更能稳固合作盟友。'
      },
      {
        id: 't2_q5_c',
        label: '反思是否表现形式不够出彩，立刻构思全新视觉角度重做震撼版本',
        sublabel: '用更惊艳的创意彻底打消疑虑',
        scores: { creative: 18, craft: 8 },
        feedbackText: '不服输的创作自尊心，促使你交付出超越期待的高水准之作。'
      },
      {
        id: 't2_q5_d',
        label: '建立复盘清单与排查规程，防止类似问题在未来的流程中再次出现',
        sublabel: '沉淀SOP，把教训变成制度财富',
        scores: { execution: 18, logical: 8 },
        feedbackText: '流程化复盘思维，让你带过的团队具备持续进化的确定性。'
      }
    ]
  },
  {
    id: 206,
    chapter: '实战 06 · 新工具与AI浪潮',
    type: 'scenario_choice',
    title: '当行业内涌现出颠覆性的新技术或工具时，你的第一反应是？',
    subtitle: '对技术变迁的拥抱姿态与学习敏锐度',
    options: [
      {
        id: 't2_q6_a',
        label: '第一时间自掏腰包尝鲜体验，探索它能否玩出前所未有的新花样',
        sublabel: '对新事物抱有极大的好奇与兴奋',
        scores: { exploration: 18, creative: 10 },
        feedbackText: '前沿工具的天然弄潮儿，总能比别人更早发现新风口。'
      },
      {
        id: 't2_q6_b',
        label: '深入研究底层架构与技术原理，评估它对行业格局与生产力的实际影响',
        sublabel: '不盲目跟风，看透本质才下结论',
        scores: { logical: 18, craft: 8 },
        feedbackText: '深度的底层思辨力，让你不被浮躁的概念和泡沫带偏。'
      },
      {
        id: 't2_q6_c',
        label: '研究它如何切实优化日常繁琐环节，将其沉淀为团队的标准提效手册',
        sublabel: '注重切实落地与组织赋能',
        scores: { execution: 16, logical: 10 },
        feedbackText: '务实的工具整合力，能切实将先进工具转化为生产力优势。'
      },
      {
        id: 't2_q6_d',
        label: '思考它会对人与人之间的交流、用户体验带来什么温度变化',
        sublabel: '始终关注人本体验与伦理温度',
        scores: { empathy: 16, creative: 10 },
        feedbackText: '在技术狂飙中坚守人文关怀，这是极高阶的产品与用户直觉。'
      }
    ]
  },
  {
    id: 207,
    chapter: '实战 07 · 汇报与沟通风格',
    type: 'scenario_choice',
    title: '向核心决策层或重要客户汇报项目进展时，你最倚重哪种表达武器？',
    subtitle: '职场影响力与商业说服力偏好',
    options: [
      {
        id: 't2_q7_a',
        label: '精美有品味的PPT视觉、生动的用户故事与让人眼前一亮的画面演示',
        sublabel: '用审美格调与情绪共鸣打动人',
        scores: { creative: 18, empathy: 6 },
        feedbackText: '出色的视觉包装与讲故事能力，能瞬间提升方案的高级感。'
      },
      {
        id: 't2_q7_b',
        label: '清晰严密的逻辑树、扎实的数据对照与有理有据的投入产出比推演',
        sublabel: '用无可辩驳的事实闭环赢得信任',
        scores: { logical: 18, execution: 8 },
        feedbackText: '逻辑严密的专业汇报，在严肃商务场合拥有极高信任溢价。'
      },
      {
        id: 't2_q7_c',
        label: '倾听对方提问背后的真正顾虑，用换位思考的方式逐一化解疑虑',
        sublabel: '以真诚柔韧的沟通建立同盟关系',
        scores: { empathy: 18, logical: 6 },
        feedbackText: '能够听懂潜台词的高情商沟通，是顶级谈判与BD的核心武器。'
      },
      {
        id: 't2_q7_d',
        label: '拿出发货成果或原型演示，展示清晰的进度节点与风险兜底预案',
        sublabel: '用扎实的确定性让人彻底安心',
        scores: { execution: 16, craft: 10 },
        feedbackText: '实物胜过千言万语，让人一眼看出你极高的靠谱程度。'
      }
    ]
  },
  {
    id: 208,
    chapter: '实战 08 · 资源匮乏突破',
    type: 'scenario_choice',
    title: '如果预算和人手极度受限，却必须完成一件有挑战的任务，你会？',
    subtitle: '逆境突破与精益创业者心态',
    options: [
      {
        id: 't2_q8_a',
        label: '靠敏锐人脉与个人号召力，拉来志同道合的朋友低成本互助共赢',
        sublabel: '用真诚的人格魅力盘活资源',
        scores: { empathy: 16, exploration: 12 },
        feedbackText: '强大人格感染力与连接力，能无中生有地聚拢资源。'
      },
      {
        id: 't2_q8_b',
        label: '果断砍掉80%非核心功能，死守核心指标做极简MVP版本先跑通闭环',
        sublabel: '敏锐抓重点，集中优势兵力',
        scores: { logical: 16, execution: 12 },
        feedbackText: '卓越的定夺取舍魄力，具备优秀产品操盘手的核心特质。'
      },
      {
        id: 't2_q8_c',
        label: '亲自动手死磕攻坚核心难点，用巧思和过硬技术抹平资源不足',
        sublabel: '用手艺人式的匠心硬啃骨头',
        scores: { craft: 18, execution: 8 },
        feedbackText: '硬核的技术与作品攻坚力，是你永远不惧逆境的底气。'
      },
      {
        id: 't2_q8_d',
        label: '另辟蹊径寻找非寻常渠道或跨界玩法，用四两拨千斤的巧劲破局',
        sublabel: '打破常规玩法，以奇兵制胜',
        scores: { exploration: 18, creative: 10 },
        feedbackText: '野蛮生长的破局创造力，往往能打出以小博大的经典战役。'
      }
    ]
  },
  {
    id: 209,
    chapter: '实战 09 · 协作角色生态',
    type: 'dual_slider',
    title: '在成熟组织里，你更偏爱哪种日常角色担当？',
    subtitle: '专业深耕者 vs 组织赋能者',
    leftPoleLabel: '无可替代的核心专业技术主力',
    rightPoleLabel: '串联各方、指引节奏的领航总控',
    options: [
      {
        id: 't2_q9_1',
        label: '领域技术王牌',
        sublabel: '不愿被行政琐事缠身，专注产出专业成果',
        scores: { craft: 18, logical: 6 },
        feedbackText: '专家型发展通道是最能让你长期享受职业红利的路线。'
      },
      {
        id: 't2_q9_2',
        label: '骨干参谋与顾问',
        sublabel: '既有扎实输出，又能在关键时刻提供战略建议',
        scores: { logical: 14, craft: 10 },
        feedbackText: '专家智囊型角色，能让你拥有稳固的影响力。'
      },
      {
        id: 't2_q9_3',
        label: '温暖赋能导师',
        sublabel: '帮助团队成员排忧解难、激发大家潜能',
        scores: { empathy: 16, execution: 10 },
        feedbackText: '仆人式领导风格，深得团队敬佩与爱戴。'
      },
      {
        id: 't2_q9_4',
        label: '项目全局操盘手',
        sublabel: '统领方向、拿结果，对全局产出负责',
        scores: { execution: 16, exploration: 12 },
        feedbackText: '强结果导向的统帅风范，适合负责从0到1或大型业务线。'
      }
    ]
  },
  {
    id: 210,
    chapter: '实战 10 · 质量与速度权衡',
    type: 'dual_slider',
    title: '当“交付速度”与“极致品质”发生冲突时，你的内心天平？',
    subtitle: '敏捷上线 vs 工匠执念',
    leftPoleLabel: '宁可慢一点，也不交出粗糙作品',
    rightPoleLabel: '先快速上线验证，再逐步迭代优化',
    options: [
      {
        id: 't2_q10_1',
        label: '极致工匠派',
        sublabel: '交出不及格的作品会让我极度难受',
        scores: { craft: 18, creative: 6 },
        feedbackText: '高水准作品壁垒是你的立足之本，适合高端品牌与核心技术。'
      },
      {
        id: 't2_q10_2',
        label: '高质量底线派',
        sublabel: '保证核心关键体验不打折，边缘部分可容忍简化',
        scores: { craft: 12, execution: 12 },
        feedbackText: '兼具原则性与灵活性，在商业实操中极具性价比。'
      },
      {
        id: 't2_q10_3',
        label: '用户感知优先派',
        sublabel: '优先确保用户能舒服使用，后台细节可逐步修缮',
        scores: { empathy: 14, execution: 10 },
        feedbackText: '以用户体验为首要衡量尺，避免闭门造车。'
      },
      {
        id: 't2_q10_4',
        label: '敏捷迭代派',
        sublabel: '市场机会稍纵即逝，先抢占先机比完美更重要',
        scores: { exploration: 18, execution: 8 },
        feedbackText: '强烈的商业嗅觉，非常契合互联网与初创开拓业务。'
      }
    ]
  },
  {
    id: 211,
    chapter: '实战 11 · 团队带教赋能',
    type: 'scenario_choice',
    title: '带实习生或新入职伙伴时，你更倾向于怎样帮助对方成长？',
    subtitle: '指导与管理风格偏好',
    options: [
      {
        id: 't2_q11_a',
        label: '给对方列出详尽的SOP手册和注意事项，定期跟进检查纠偏',
        sublabel: '确保新人在清晰框架内安全成长',
        scores: { execution: 18, logical: 6 },
        feedbackText: '体系化的带教方法，能高效复制出靠谱的战斗力。'
      },
      {
        id: 't2_q11_b',
        label: '耐心倾听对方的迷茫，先帮对方建立自信，给予温柔而坚定的心理支撑',
        sublabel: '重视人的内心力量激发',
        scores: { empathy: 18, creative: 6 },
        feedbackText: '充满温度的导师风范，能收获长久的情感追随与信赖。'
      },
      {
        id: 't2_q11_c',
        label: '带着对方拆解底层逻辑与思考模型，教他学会“授人以渔”',
        sublabel: '传授思考框架，培养独立判断力',
        scores: { logical: 16, craft: 10 },
        feedbackText: '深度启发式带教，能培养出极具深度的思考型人才。'
      },
      {
        id: 't2_q11_d',
        label: '直接给一个有挑战的新任务，鼓励大胆放手去试错并随时给予掩护',
        sublabel: '在真实战场中快速拔节生长',
        scores: { exploration: 18, execution: 8 },
        feedbackText: '充满信任的放权风格，最能激发高潜人才的主观能动性。'
      }
    ]
  },
  {
    id: 212,
    chapter: '实战 12 · 核心竞争力自评',
    type: 'priority_pick',
    title: '在职场打拼中，你认为自己最不容易被替代的“独门绝技”是？',
    subtitle: '第二层终章，锚定你的核心职场身位',
    options: [
      {
        id: 't2_q12_a',
        label: '敏锐的审美格调与把平庸事物转化为动人作品的创意天赋',
        sublabel: '不可复制的美学直觉与叙事感染力',
        scores: { creative: 18, craft: 8 },
        feedbackText: '审美与情感共鸣是AI与自动化难以攻破的护城河。'
      },
      {
        id: 't2_q12_b',
        label: '抽丝剥茧的系统分析力，能在复杂变局中快速看清关键破局点',
        sublabel: '通透冷静的商业智囊与战略大脑',
        scores: { logical: 18, exploration: 8 },
        feedbackText: '看透商业迷雾的底层洞察力，享有持续的战略溢价。'
      },
      {
        id: 't2_q12_c',
        label: '润物细无声的人际粘合力，能让最难协同的团队凝聚成合力',
        sublabel: '高情商沟通与深度信任构建者',
        scores: { empathy: 18, execution: 8 },
        feedbackText: '聚拢人心、化解摩擦的温度，是组织中最高阶的无形资产。'
      },
      {
        id: 't2_q12_d',
        label: '极其靠谱的把控力与耐性，把每一件接手的事做出超预期品质',
        sublabel: '凡事有交代、件件有回音的定海神针',
        scores: { execution: 16, craft: 12 },
        feedbackText: '确定性与过硬交付，是所有企业最渴求的压舱石品格。'
      }
    ]
  }
];

// Tier 3: 15 Questions (Career Strategy, Life Philosophy & Long-term Moat)
export const TIER_3_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 301,
    chapter: '战略 01 · 职业终极价值锚点',
    type: 'scenario_choice',
    title: '如果一生只能追求一个核心职业意义，哪一个最能让你感到此生无憾？',
    subtitle: '底层价值观决定生涯天花板与幸福感源头',
    options: [
      {
        id: 't3_q1_a',
        label: '用独特的作品、创意或设计，在人类文明的长河里留下属于自己的美学印记',
        sublabel: '追求美与灵感的永恒表达',
        scores: { creative: 20, craft: 8 },
        feedbackText: '追求作品传世的艺术家心态，会引导你走上追求卓越的创意之路。'
      },
      {
        id: 't3_q1_b',
        label: '建立一套经得起时间考验的理论、系统或企业，显著提高世界的运转效率',
        sublabel: '追求真理与秩序的系统构建',
        scores: { logical: 20, execution: 8 },
        feedbackText: '渴望建立秩序与系统的大师格局，适合主导大型事业体系。'
      },
      {
        id: 't3_q1_c',
        label: '真实地帮助、陪伴与点亮成百上千个生命，成为他人漫长岁月里的温暖灯塔',
        sublabel: '追求生命与生命间的深度救赎与陪伴',
        scores: { empathy: 20, creative: 6 },
        feedbackText: '以人为本的博大仁爱，会让你在教育、心理与人际事业中备受敬仰。'
      },
      {
        id: 't3_q1_d',
        label: '踏遍未知边界，体验前所未见的多元生活，做时代潮流里的先锋探索者',
        sublabel: '追求生命的宽度与极致自由',
        scores: { exploration: 20, creative: 8 },
        feedbackText: '旷达无畏的探险家灵魂，注定不会被单一平庸的人生模板拘束。'
      }
    ]
  },
  {
    id: 302,
    chapter: '战略 02 · 舒适区与破局抉择',
    type: 'scenario_choice',
    title: '当你在现有岗位已经非常熟练稳定、收入优渥，但一眼能望到未来十年时，你会？',
    subtitle: '面对舒适区诱惑时的战略觉醒',
    options: [
      {
        id: 't3_q2_a',
        label: '主动探索副业或跨界试验田，用小成本不断试水新赛道，谋求第二曲线',
        sublabel: '骑驴找马，用精益试验拓展新边界',
        scores: { exploration: 18, execution: 8 },
        feedbackText: '优秀的第二曲线思维，能在保持基本盘的同时稳妥孵化新机会。'
      },
      {
        id: 't3_q2_b',
        label: '把精力转移到专业课题的深度攻坚上，向细分领域的顶级学者/大工匠发起冲击',
        sublabel: '不求虚浮规模，追求专业壁垒极致',
        scores: { craft: 20, logical: 8 },
        feedbackText: '深耕长青的复利心态，终将铸就无可动摇的专业护城河。'
      },
      {
        id: 't3_q2_c',
        label: '向上重构商业模型，尝试从业务执行者转型为业务操盘手或产业投资者',
        sublabel: '升级思考维度，扩大商业杠杆',
        scores: { logical: 18, exploration: 10 },
        feedbackText: '资本与系统杠杆思维，具备领军人物的战略跃迁潜质。'
      },
      {
        id: 't3_q2_d',
        label: '把重心倾注到培养新人、营建高凝聚力团队或投身有社会价值的事业上',
        sublabel: '追求影响力与社会价值的双重沉淀',
        scores: { empathy: 18, execution: 8 },
        feedbackText: '从自我成就走向托举他人，是成熟领导者的崇高境界。'
      }
    ]
  },
  {
    id: 303,
    chapter: '战略 03 · 商业价值护城河',
    type: 'scenario_choice',
    title: '未来 3~5 年，你打算通过构筑什么壁垒，来确保自己的身价持续增值？',
    subtitle: '核心资产构筑路径选择',
    options: [
      {
        id: 't3_q3_a',
        label: '拥有独树一帜的个人品牌 IP 与视觉审美印记，靠辨识度吸引高净值客户',
        sublabel: '无形资产与审美溢价壁垒',
        scores: { creative: 18, exploration: 10 },
        feedbackText: '个人 IP 与美学溢价，是抵御标准化冲击的利器。'
      },
      {
        id: 't3_q3_b',
        label: '掌握复合型的“技术/数据 + 商业决策”跨界能力，能帮企业算清大账',
        sublabel: '结构化解决商业难题的硬壁垒',
        scores: { logical: 18, execution: 10 },
        feedbackText: '既懂数据又懂生意的复合型人才，在任何经济周期都是稀缺品。'
      },
      {
        id: 't3_q3_c',
        label: '积累深度信任的核心人脉与社群圈层，成为行业内关键信息与资源的枢纽',
        sublabel: '深度信任关系与人际网络壁垒',
        scores: { empathy: 18, exploration: 10 },
        feedbackText: '信任资产是所有商业交易的底色，拥有极高的话语权粘性。'
      },
      {
        id: 't3_q3_d',
        label: '打磨一门高精尖、需要数万小时沉淀的核心技术，做行业顶级硬手艺人',
        sublabel: '无可争议的技术深度壁垒',
        scores: { craft: 20, logical: 6 },
        feedbackText: '极致的不可替代性，让你始终拥有掌握定价权的主动地位。'
      }
    ]
  },
  {
    id: 304,
    chapter: '战略 04 · 危机时刻定力',
    type: 'dual_slider',
    title: '当行业发生剧烈下行震荡、人心惶惶时，你的第一战略行动倾向？',
    subtitle: '逆周期生存与危机定力',
    leftPoleLabel: '苦练内功，深耕基本功与核心产品',
    rightPoleLabel: '顺势而变，果断拥抱新业务与新平台',
    options: [
      {
        id: 't3_q4_1',
        label: '潜龙在渊·深耕内功',
        sublabel: '淘汰浮躁竞争对手，用过硬品质熬过寒冬',
        scores: { craft: 18, logical: 8 },
        feedbackText: '长期主义者的耐受力，往往能在潮水退去后成为真正的赢家。'
      },
      {
        id: 't3_q4_2',
        label: '降本增效·稳住现金流',
        sublabel: '紧缩战线，保留核心业务，确保稳步生存',
        scores: { execution: 18, logical: 8 },
        feedbackText: '稳健的风险控制意识，是穿越经济周期的生命线。'
      },
      {
        id: 't3_q4_3',
        label: '抱团取暖·凝聚人心',
        sublabel: '关照伙伴心态，稳固核心客户群的情感纽带',
        scores: { empathy: 18, execution: 8 },
        feedbackText: '在逆境中传递安全感，能淬炼出生死与共的高忠诚度团队。'
      },
      {
        id: 't3_q4_4',
        label: '弯道超车·寻找新蓝海',
        sublabel: '危机就是转机，在别人恐慌时率先试错新机会',
        scores: { exploration: 20, creative: 8 },
        feedbackText: '极度敏锐的逆向投资直觉，注定成就敢闯敢拼的破局英雄。'
      }
    ]
  },
  {
    id: 305,
    chapter: '战略 05 · 终身学习机制',
    type: 'scenario_choice',
    title: '在离开校园多年后，你是如何持续升级自己的认知操作系统？',
    subtitle: '认知迭代飞轮的设计模式',
    options: [
      {
        id: 't3_q5_a',
        label: '通过旅行、看展、结识跨界奇人，在生活美学与人情冷暖中汲取源源灵感',
        sublabel: '感性体验与生活观察驱动',
        scores: { creative: 18, exploration: 10 },
        feedbackText: '生活本身就是你最好的灵感大学，保有敏锐的生活触角。'
      },
      {
        id: 't3_q5_b',
        label: '阅读经典大部头著作、精读研报与学术论文，构建底层思维模型知识树',
        sublabel: '理性严密的理论体系构建',
        scores: { logical: 18, craft: 10 },
        feedbackText: '直接从人类智识源头汲取养分，你的认知底座扎实而厚重。'
      },
      {
        id: 't3_q5_c',
        label: '通过与不同行业的高手深度对谈、做深度教练与倾听，以人为镜迭代认知',
        sublabel: '高密度人际连接与镜像启发',
        scores: { empathy: 18, exploration: 10 },
        feedbackText: '人是最鲜活的百科全书，擅长从他人经验中汲取精华。'
      },
      {
        id: 't3_q5_d',
        label: '做中学（Learning by doing），直接立项动手做新项目，在实战报错中进化',
        sublabel: '实践反馈回路驱动',
        scores: { execution: 16, craft: 12 },
        feedbackText: '知行合一的闭环进化者，你的认知每一条都经受过实战检验。'
      }
    ]
  },
  {
    id: 306,
    chapter: '战略 06 · 金钱与财富哲学',
    type: 'scenario_choice',
    title: '对你而言，积累财富与商业回报最根本的意义是什么？',
    subtitle: '财富观指引职业道路的终局方向',
    options: [
      {
        id: 't3_q6_a',
        label: '购买自由与时间，让自己不必做违心的妥协，能心无旁骛创作所爱',
        sublabel: '财富是守护尊严与创作自由的盾牌',
        scores: { creative: 16, craft: 12 },
        feedbackText: '把财富视为自由的工具而非目的，你始终能保持心灵的纯粹与敏锐。'
      },
      {
        id: 't3_q6_b',
        label: '验证自己的商业洞察是否正确，是理性推演逻辑闭环的客观计分板',
        sublabel: '财富是认知变现的精准度量衡',
        scores: { logical: 20, execution: 8 },
        feedbackText: '冷静客观的商业世界玩家，财富是你洞悉商业规律的必然副产物。'
      },
      {
        id: 't3_q6_c',
        label: '让身边的家人朋友过上有安全感的生活，并在关键时刻有能力托举弱者',
        sublabel: '财富是传递爱与庇护的源泉',
        scores: { empathy: 20, execution: 6 },
        feedbackText: '因爱而生的财富驱动力，会让你行稳致远且内心丰盈充盈。'
      },
      {
        id: 't3_q6_d',
        label: '作为未来开启更多疯狂有趣冒险、投资新奇项目的充沛启动弹药',
        sublabel: '财富是探索星辰大海的燃料',
        scores: { exploration: 20, creative: 8 },
        feedbackText: '永远向前看的探险家风骨，财富在你手中总能焕发出无限生机。'
      }
    ]
  },
  {
    id: 307,
    chapter: '战略 07 · 个人与组织共生',
    type: 'dual_slider',
    title: '在长期的职业生态中，你更认同哪种存在形态？',
    subtitle: '超级个体 vs 航母型大组织中流砥柱',
    leftPoleLabel: '掌控绝对自主的独立超级个体',
    rightPoleLabel: '依托大平台调配百亿资源的领航者',
    options: [
      {
        id: 't3_q7_1',
        label: '完全自主·独立顾问/创作者',
        sublabel: '一人即是一支军队，享受高度自由',
        scores: { craft: 18, creative: 10 },
        feedbackText: '天生契合超级个体时代，凭无可取代的单点极致赢得广阔天地。'
      },
      {
        id: 't3_q7_2',
        label: '精品工作室合伙人',
        sublabel: '3-10人精锐小队，既有自由又有战友',
        scores: { empathy: 14, craft: 12 },
        feedbackText: '精品团队模式最能平衡你的创作自由与协作温情。'
      },
      {
        id: 't3_q7_3',
        label: '成长型企业核心骨干',
        sublabel: '伴随企业快速增长，享受期权与平台放大',
        scores: { execution: 16, logical: 10 },
        feedbackText: '伴随高成长组织崛起，是你实现阶层跨越的高效杠杆。'
      },
      {
        id: 't3_q7_4',
        label: '大平台操盘领袖',
        sublabel: '调动庞大资金与组织资源，撬动重大社会影响',
        scores: { exploration: 16, logical: 12 },
        feedbackText: '大格局统帅气质，唯有波澜壮阔的宏大舞台方显英雄本色。'
      }
    ]
  },
  {
    id: 308,
    chapter: '战略 08 · 决策风格底色',
    type: 'scenario_choice',
    title: '在面临人生命运级别的重大转折时，最终推你下定决心的往往是？',
    subtitle: '底层决策直觉机制',
    options: [
      {
        id: 't3_q8_a',
        label: '内心深处那种挥之不去的心动、美感与“这件事非我莫属”的直觉召唤',
        sublabel: '遵从灵性直觉与美学召唤',
        scores: { creative: 20, exploration: 8 },
        feedbackText: '伟大的创造往往源于超越常理的直觉跳跃，听从内心的召唤。'
      },
      {
        id: 't3_q8_b',
        label: '详尽的利弊穷尽分析、赔率与胜率精算，以及最坏结果承受能力评估',
        sublabel: '经过极限压力测试的理性决策',
        scores: { logical: 20, execution: 8 },
        feedbackText: '精密的概率算力，让你哪怕面对惊涛骇浪也能保持绝对的胜算。'
      },
      {
        id: 't3_q8_c',
        label: '与生命中最信任的导师、伴侣促膝长谈后，得到的深层默契与支持',
        sublabel: '情感后盾与同行者的力量',
        scores: { empathy: 20, craft: 6 },
        feedbackText: '在人际温暖中校准心锚，你的重大决定总有着稳固的人性温度。'
      },
      {
        id: 't3_q8_d',
        label: '“生命只有一次，再不折腾就老了”的昂扬冲动，即使撞南墙也不后悔',
        sublabel: '宁可轰烈犯错，绝不平庸遗憾',
        scores: { exploration: 20, execution: 6 },
        feedbackText: '无畏的生命英雄主义，让你的人生永远比常人拥有更多跌宕起伏的华彩。'
      }
    ]
  },
  {
    id: 309,
    chapter: '战略 09 · 领导力与感召模式',
    type: 'scenario_choice',
    title: '如果你未来要带领一支团队打胜仗，你希望依靠什么凝聚军心？',
    subtitle: '高阶领导力原型投射',
    options: [
      {
        id: 't3_q9_a',
        label: '描绘一个令人心驰神往的美好愿景与审美神话，激发全员的浪漫情怀',
        sublabel: '愿景型与灵感布道式领导',
        scores: { creative: 18, exploration: 10 },
        feedbackText: '擅长为冰冷的工作注入崇高感与仪式感，极具造梦魔力。'
      },
      {
        id: 't3_q9_b',
        label: '制定极其清晰透明的利益分配机制与高效的战术打法，让大家跟着赚大钱',
        sublabel: '机制型与理性战略式领导',
        scores: { logical: 18, execution: 10 },
        feedbackText: '赏罚分明、章法有度，是下属最愿意长久追随的靠谱主帅。'
      },
      {
        id: 't3_q9_c',
        label: '把团队当家人，关心每个人的难处与成长，甘当幕后筑路人',
        sublabel: '仆人式与赋能共情型领导',
        scores: { empathy: 20, execution: 6 },
        feedbackText: '春风化雨的凝聚力，能在关键时刻换来整个团队的死心塌地。'
      },
      {
        id: 't3_q9_d',
        label: '身先士卒打头阵，用全公司最狠的业务战绩和专业素养树立绝对威信',
        sublabel: '专家型与战神榜样式领导',
        scores: { craft: 18, execution: 10 },
        feedbackText: '用无懈可击的专业战力服人，团队在你身后永远充满底气。'
      }
    ]
  },
  {
    id: 310,
    chapter: '战略 10 · 失败重构哲学',
    type: 'dual_slider',
    title: '当经历了一次投入巨大却最终失败的职业尝试时，你的复原逻辑是？',
    subtitle: '逆商（AQ）与生涯创伤修复机制',
    leftPoleLabel: '闭门反思，重构技艺直至完美无瑕',
    rightPoleLabel: '抖掉尘土，立刻寻找下一次翻盘机会',
    options: [
      {
        id: 't3_q10_1',
        label: '深度沉淀·破茧化蝶',
        sublabel: '把失败拆成技术细节，潜心闭关补强短板',
        scores: { craft: 18, logical: 8 },
        feedbackText: '把苦难酿成老酒，你经受过的每一次挫折都会成为日后的金刚不坏身。'
      },
      {
        id: 't3_q10_2',
        label: '系统复盘·修正战略',
        sublabel: '重新评估市场假设，优化资源配置模型',
        scores: { logical: 18, execution: 8 },
        feedbackText: '将失败视为算法更新的数据点，你的决策机器正在变得愈发强大。'
      },
      {
        id: 't3_q10_3',
        label: '温柔自洽·接纳局限',
        sublabel: '给身心放个假，珍惜逆境中留存的真情',
        scores: { empathy: 18, creative: 6 },
        feedbackText: '极高的心理弹性与自愈力，让你永远不会被挫折剥夺爱与生活的能力。'
      },
      {
        id: 't3_q10_4',
        label: '越挫越勇·火线反击',
        sublabel: '胜败乃兵家常事，快速投身下一场战斗',
        scores: { exploration: 20, execution: 6 },
        feedbackText: '打不倒你的终将使你更强大，天生的冒险家永远拥有重新开局的勇气。'
      }
    ]
  },
  {
    id: 311,
    chapter: '战略 11 · 时间资产分配',
    type: 'scenario_choice',
    title: '如果要给未来十年的时间精力做战略分配，你最愿意加仓哪个账户？',
    subtitle: '生命精力配比决定最终成就形态',
    options: [
      {
        id: 't3_q11_a',
        label: '持续打磨一两件能传达个人审美品味的代表作，把生命雕刻成艺术',
        sublabel: '倾注于美感与创作长卷',
        scores: { creative: 20, craft: 8 },
        feedbackText: '把有限生命投入到永恒艺术品中，你的人生将是一部动人的史诗。'
      },
      {
        id: 't3_q11_b',
        label: '研究经济大势与产业规律，建立多维度的被动商业与投资资产',
        sublabel: '倾注于财富杠杆与系统复利',
        scores: { logical: 20, execution: 8 },
        feedbackText: '尊重复利规律，你将逐步构建起坚不可摧的商业与财务帝国。'
      },
      {
        id: 't3_q11_c',
        label: '深度陪伴值得爱的人，营建温暖有爱的家庭、社群与生活方式',
        sublabel: '倾注于真实亲密关系与人文幸福',
        scores: { empathy: 20, craft: 6 },
        feedbackText: '看见生命最真实充盈的温度，你收获的幸福感将远超凡俗名利。'
      },
      {
        id: 't3_q11_d',
        label: '始终保持在时代风口的前线，不断尝试最前沿的生活实验与跨国事业',
        sublabel: '倾注于未知世界的奇遇与征途',
        scores: { exploration: 20, creative: 8 },
        feedbackText: '世界是你的游乐场与画布，你的生命旅程将无比绚烂壮阔。'
      }
    ]
  },
  {
    id: 312,
    chapter: '战略 12 · 个人商业化模式',
    type: 'scenario_choice',
    title: '未来如果你要做自己的商业项目，你最向往哪种商业形态？',
    subtitle: '商业模式与人格特质的最优契合点',
    options: [
      {
        id: 't3_q12_a',
        label: '高客单价的设计/内容/生活美学品牌，受众小众狂热，极度注重品味',
        sublabel: '美学生活方式品牌主理人',
        scores: { creative: 18, craft: 10 },
        feedbackText: '高溢价美学路线，最能兑现你天生高贵独到的审美感知。'
      },
      {
        id: 't3_q12_b',
        label: '高壁垒的咨询、数据策略或软件工具产品，靠清晰的ROI让B端客户持续买单',
        sublabel: 'B端专业服务或SaaS工具矩阵',
        scores: { logical: 18, execution: 10 },
        feedbackText: '硬核解决痛点的理智商业路线，拥有极高客户粘性与续费率。'
      },
      {
        id: 't3_q12_c',
        label: '高粘性的会员制成长俱乐部、心理疗愈社群或人文书店茶室',
        sublabel: '情感归属与温暖社群生态',
        scores: { empathy: 20, exploration: 8 },
        feedbackText: '贩卖温暖与连接的社群模型，能为你带来丰厚的社会资本与忠实拥趸。'
      },
      {
        id: 't3_q12_d',
        label: '敏捷的新零售爆品孵化、潮流买手或跨国新业态探索，快速捕捉时代红利',
        sublabel: '趋势弄潮与敏捷零售网络',
        scores: { exploration: 18, execution: 10 },
        feedbackText: '嗅觉灵敏的趋势捕手，总能在时代浪潮的转弯处拔得头筹。'
      }
    ]
  },
  {
    id: 313,
    chapter: '战略 13 · 跨代系影响力',
    type: 'dual_slider',
    title: '你希望年轻一代在提到你时，给出的第一句评价是？',
    subtitle: '人生终局声誉与精神遗存',
    leftPoleLabel: '“他/她的专业作品是不可逾越的标杆”',
    rightPoleLabel: '“他/她是一个永远年轻、敢想敢干的传奇”',
    options: [
      {
        id: 't3_q13_1',
        label: '一代宗师·专业丰碑',
        sublabel: '在专业领域被后人敬仰与奉为典范',
        scores: { craft: 20, creative: 6 },
        feedbackText: '工匠精神的极致象征，你的名字将与你的领域融为一体。'
      },
      {
        id: 't3_q13_2',
        label: '智慧导师·明镜清风',
        sublabel: '用通透的认知指引迷茫者，桃李不言下自成蹊',
        scores: { logical: 16, empathy: 12 },
        feedbackText: '智慧的传灯人，你的思想将照亮无数前行者的暗夜。'
      },
      {
        id: 't3_q13_3',
        label: '仁者无疆·人间暖阳',
        sublabel: '给世界带来了真实的温暖、善意与治愈',
        scores: { empathy: 20, creative: 6 },
        feedbackText: '大善如水，你在这颗星球上留下的温柔足迹是最永恒的勋章。'
      },
      {
        id: 't3_q13_4',
        label: '不羁风客·无尽冒险',
        sublabel: '活得尽兴炽烈，鼓舞了无数人勇敢做自己',
        scores: { exploration: 20, creative: 8 },
        feedbackText: '自由灵魂的先驱，你的存在本身就是对生命可能性最热烈的礼赞。'
      }
    ]
  },
  {
    id: 314,
    chapter: '战略 14 · 生涯精力瓶颈突破',
    type: 'scenario_choice',
    title: '当你感受到年龄渐长、体力和专注力不如二十岁那般充沛时，你的战略调整是？',
    subtitle: '从体力竞争走向智力与系统杠杆',
    options: [
      {
        id: 't3_q14_a',
        label: '退居幕后，从“亲自挥刀上阵”转为“把握战略方向与关键美学审核”',
        sublabel: '化繁为简，只在关键处用巧劲',
        scores: { creative: 16, logical: 12 },
        feedbackText: '高段位者的无为而治，把审美鉴赏力作为最高级的统领杠杆。'
      },
      {
        id: 't3_q14_b',
        label: '把精力全部聚焦于建立可自动化运转的组织流程与人才梯队',
        sublabel: '搭建系统，让机器与制度替自己奔跑',
        scores: { execution: 18, logical: 10 },
        feedbackText: '彻底脱离劳动密集型内耗，晋升为成熟体系的设计师。'
      },
      {
        id: 't3_q14_c',
        label: '挑选少数几个真正有天赋与激情的门生，把平生绝学倾囊相授',
        sublabel: '传承生命经验，通过他人延伸影响力',
        scores: { empathy: 18, craft: 10 },
        feedbackText: '生生不息的人文传承，让你的技艺与心性得以代代延续。'
      },
      {
        id: 't3_q14_d',
        label: '精简一切无效社交，只保留少数能带来纯粹喜悦的深度课题沉心探索',
        sublabel: '大道至简，守住内心的安宁一隅',
        scores: { craft: 18, creative: 8 },
        feedbackText: '繁华落尽见真淳，深度沉静的时光往往能孕育出最震撼人心的绝唱。'
      }
    ]
  },
  {
    id: 315,
    chapter: '战略 15 · 终章·人生誓愿',
    type: 'priority_pick',
    title: '最后一步，选出最能代表你未来十年人生立身之本的终极座右铭：',
    subtitle: '第三层终章 · 淬炼出属于你的生涯大师之道',
    options: [
      {
        id: 't3_q15_a',
        label: '“不与平庸同流合污，用一颗诗意的心，把苍白的世界染上温度与色彩。”',
        sublabel: '暖阳创想之道',
        scores: { creative: 20, exploration: 8 },
        feedbackText: '你将成为这个时代难能可贵的造梦人与美学点灯者。'
      },
      {
        id: 't3_q15_b',
        label: '“透过现象看本质，在混乱的迷雾里，做那个永远清醒的指路星图。”',
        sublabel: '理性格物之道',
        scores: { logical: 20, execution: 8 },
        feedbackText: '你将成为团队与行业不可替代的清醒大脑与谋略统帅。'
      },
      {
        id: 't3_q15_c',
        label: '“若能照亮他人的一段暗夜，自己的生命便永远不会坠入荒芜。”',
        sublabel: '春风共情之道',
        scores: { empathy: 20, craft: 6 },
        feedbackText: '你将用慈悲与懂得，构建起人世间最坚韧不摧的温暖纽带。'
      },
      {
        id: 't3_q15_d',
        label: '“路在脚下，心在旷野；既然来了人间，就要活得轰轰烈烈、无愧于心。”',
        sublabel: '无畏破局之道',
        scores: { exploration: 20, craft: 8 },
        feedbackText: '你将是风的信使与浪的弄潮儿，永远走在时代的最前端。'
      }
    ]
  }
];

import { DimensionKey } from './assessmentData';
import { SOUL_IDENTITIES, SoulIdentityData } from './soulIdentity';

export interface TheoryDiagnosis {
  frameworkName: string;
  codeOrAnchor: string;
  interpretation: string;
}

export interface TierAnalysisContent {
  tier: 1 | 2 | 3;
  tierBadge: string;
  tierTitle: string;
  summaryQuote: string;
  theoryDiagnosis: TheoryDiagnosis;
  soulIdentity: SoulIdentityData;
  keyInsights: {
    title: string;
    description: string;
  }[];
  workStyleProfile?: {
    collaborationStyle: string;
    decisionMaking: string;
    flowTrigger: string;
    energyDrainAlert: string;
    rechargeMethod: string;
  };
  strategyRoadmap?: {
    phase1: { timeframe: string; title: string; actions: string[] };
    phase2: { timeframe: string; title: string; actions: string[] };
    phase3: { timeframe: string; title: string; actions: string[] };
    commercialMoat: string;
    ipExpansionTip: string;
  };
}

export function generateTierAnalysis(
  tier: 1 | 2 | 3,
  topDim: DimensionKey,
  secondDim: DimensionKey,
  scores: Record<DimensionKey, number>
): TierAnalysisContent {
  const soul = SOUL_IDENTITIES[topDim];

  if (tier === 1) {
    return {
      tier: 1,
      tierBadge: '第一层 · 探索初醒报告',
      tierTitle: '直觉潜能与天命长板全景画像',
      summaryQuote: '“看见自己的第一步，是承认并且毫无保留地拥抱你的独特偏好。”',
      soulIdentity: soul,
      theoryDiagnosis: {
        frameworkName: '霍兰德职业兴趣代码 (RIASEC 模型)',
        codeOrAnchor: `${getRiasecLetter(topDim)}${getRiasecLetter(secondDim)} 双核复合型`,
        interpretation: getRiasecLabel(topDim, secondDim)
      },
      keyInsights: [
        {
          title: `首要核心长板：天然降维打击力 (主干评级：${scores[topDim]}分)`,
          description: `你在「${getDimName(topDim)}」展现出了极高纯度的天生直觉。在日常工作或创作中，当别人需要经过漫长培训、费尽心力去模仿推演时，你仅凭无意识的肌肉记忆与灵魂直觉就能迅速抓住要害。这是你立足所有环境的核心压舱石，也是最容易产生沉浸心流的能量发源地。`
        },
        {
          title: `次要黄金辅助维度：双核协同化学反应 (辅助评级：${scores[secondDim]}分)`,
          description: `你的「${getDimName(secondDim)}」与第一长板形成了绝妙的互补闭环。这种“${getDimName(topDim)}的灵性洞察 + ${getDimName(secondDim)}的务实支撑”，让你彻底摆脱了单一特质容易走极端的盲区，在多方博弈与复杂任务中能自如切换视角，形成立体复合竞争力。`
        },
        {
          title: '直觉雷达：必须果断绕开的消耗型伪机会',
          description: `警惕那些表面光鲜但要求你“彻底抹杀个性、日复一日机械重复、缺乏自主节奏”的伪成长机会。你的灵魂对粗粝无序和过度控制极其敏感，强行削足适履不仅无法积累资本，反而会迅速透支你的灵气与身心健康。`
        },
        {
          title: '天生高能工作流法则：如何守护你的灵魂电池',
          description: `不要试图逼迫自己全天8小时保持匀速输出。对你而言，2小时极致专注的心流爆发，产出的高光价值远胜于平庸忙碌一整天。学会为自己争取不受即时消息打扰的“深度专注保护区”，你的灵兽天赋才能持续惊艳全场。`
        }
      ]
    };
  }

  if (tier === 2) {
    return {
      tier: 2,
      tierBadge: '第二层 · 实战进阶报告',
      tierTitle: '职场协作实态与高定特调风格矩阵',
      summaryQuote: '“真正的高手，从不盲目硬抗环境，而是主动调配最契合自己的工作气场。”',
      soulIdentity: soul,
      theoryDiagnosis: {
        frameworkName: '施恩职业锚诊断 (Schein Career Anchors)',
        codeOrAnchor: getAnchorLabel(topDim),
        interpretation: getAnchorDesc(topDim)
      },
      keyInsights: [
        {
          title: '实战生态位与协作黄金身位',
          description: `基于你在团队分歧与多任务调度中的实战表现，你的最佳角色定位是「${getWorkStyleSummary(topDim, secondDim)}」。在权责明晰、鼓励专业主见、且保留充分自主呼吸感的环境中，你的交付水准会迎来指数级跃升。`
        },
        {
          title: '防内耗免疫机制：高情商立界心法',
          description: `当你面临「${getEnergyDrain(topDim)}」的消耗场景时，无需陷入委屈或正面激烈冲突。启动你专属的情绪结界，通过二段式交付和时间戳证据链，体面而坚定地明确权责，拒绝替别人的草率与越界买单。`
        },
        {
          title: '决策取舍天平：如何在分歧中掌握主动权',
          description: `你的决策逻辑受「${getDecisionStyle(topDim)}」深度驱动。在面对多方拉扯与质疑时，学会运用降维的专业Demo或客观事实对照表，给对方提供经过你筛选的“确定性选择题”，把被动承压转化为主动引领。`
        },
        {
          title: '高溢价变现法则：将专业感知转化为稀缺资产',
          description: `拒绝沦为按小时计费的被动苦力搬砖人。将每一次实战经验沉淀为可复用的模块化工具箱、标准化SOP或高辨识度案例集，让市场为你的独特品位、精准判断与端到端确定性买单。`
        }
      ],
      workStyleProfile: {
        collaborationStyle: getCollabStyle(topDim),
        decisionMaking: getDecisionStyle(topDim),
        flowTrigger: getFlowTrigger(topDim),
        energyDrainAlert: getEnergyDrain(topDim),
        rechargeMethod: getRechargeMethod(topDim)
      }
    };
  }

  // Tier 3
  return {
    tier: 3,
    tierBadge: '第三层 · 大师战略报告',
    tierTitle: '终身秘密庄园蓝图与 3~5 年不可复制护城河',
    summaryQuote: '“所有战术上的疲于奔命，都抵不过一次清晰清醒的终局战略觉醒。”',
    soulIdentity: soul,
    theoryDiagnosis: {
      frameworkName: '盖洛普才干领域协同模型 (CliftonStrengths)',
      codeOrAnchor: getGallupPair(topDim, secondDim),
      interpretation: getGallupSynergy(topDim, secondDim)
    },
    keyInsights: [
      {
        title: '终身不可复制的复合商业护城河',
        description: `你的核心壁垒建立在「${getDimName(topDim)} × ${getDimName(secondDim)}」的跨界融合上。在AI工具能够海量量产平庸代码、画作与公文的时代，唯有你所具备的「${getMoatKeyword(topDim)}」，能够形成真正抗周期的稀缺溢价，越陈越香。`
      },
      {
        title: '第二曲线培育：从被动打工者到超级个体主理人',
        description: `你不适合在单一僵化的螺丝钉岗位上空耗一生。在主业保持现金流的同时，必须及早培育你的第二增长曲线——将个人核心经验产品化、IP化，逐步搭建轻资产自运转的“超级个体果园”。`
      },
      {
        title: '战略减法与长青定力：抵御诱惑的定盘星',
        description: `真正的战略不在于做了多少，而在于果断放弃了什么。学会坚决拒绝看似有短期收益但严重污染你审美与心力的低阶消耗局，把 70% 的黄金战略时间持续加仓在能代表你终身水平的核心代表作上。`
      },
      {
        title: '终局自洽生活模型：构建心安丰盛的精神与物质庄园',
        description: `生活不是只有永无止境的赛跑。你的终生愿景应当是拥有高度自由的时间自主权、健康充盈的身心状态、以及一处四季常青的私享精神花园。在自己的时区里从容起舞，做自己人生的真正大女主。`
      }
    ],
    strategyRoadmap: {
      phase1: {
        timeframe: '0 ~ 6 个月 · 破土筑基期',
        title: '打造 1~2 件无可争议的专业代表作与心智标签',
        actions: [
          '全面复盘过往成功项目，提炼出可被外界一眼看懂的结构化案例集与高质感视觉作品库',
          '在现有岗位或垂直圈层中主动攻坚 1 项标杆难题，确立“找她解决必有惊喜”的心智壁垒',
          '严格清理每周 20% 带来情绪内耗的无效社交与琐碎杂务，强制锁定每天 2 小时沉浸心流时间',
          '启动个人知识资产备份体系，将每一次灵感脑暴沉淀为日后可复用的底层模块'
        ]
      },
      phase2: {
        timeframe: '1 ~ 2 年 · 枝繁叶茂期',
        title: '构筑个人专业影响力与跨界协同杠杆网络',
        actions: [
          '开启高质量的公开表达与持续输出（开设深度专栏、发布独家工作方法论或开源实用小工具）',
          '连接 3~5 位理念一致、能力互补的优秀同行与战略伙伴，尝试以轻量化联盟形式承接高溢价专案',
          '向上跨界参与更高维度的商业策略或品牌顶层设计，打通从创意到商业转化的端到端闭环',
          '启动第一套轻量化数字资产（如付费咨询框架、模板手册或精品内测专栏）的变现闭环测试'
        ]
      },
      phase3: {
        timeframe: '3 ~ 5 年 · 终身圆满期',
        title: '享有主导权与溢价红利的专家主理人自转生态',
        actions: [
          '正式落成个人品牌工作室或高粘性私域滋养社群，彻底摆脱单一雇主依赖，实现时间与经济双重独立',
          '将积累多年的方法论与资产转化为高复利的自动化产品生态，享受长坡厚雪的睡后收益',
          '拥有完全由自己掌控的工作节拍与生活半径，把工作与个人热爱深度融合，过上从容自洽的丰盈人生',
          '成为细分领域公认的灯塔式人物，以传帮带或投资孵化的方式，温柔回馈并滋养更多同行者'
        ]
      },
      commercialMoat: `「${getDimName(topDim)}」的极致感知高度 + 「${getDimName(secondDim)}」的扎实落地闭环，构筑出任凭外界风雨侵袭依然屹立不倒的双重复利护城河。`,
      ipExpansionTip: '非常适合通过高审美案例长图、诚恳有温度的成长手记、或陪伴式深度私塾建立极高粘性的拥趸生态，主打“高信任度与高级审美”的无上溢价。'
    }
  };
}

function getDimName(dim: DimensionKey): string {
  const map: Record<DimensionKey, string> = {
    creative: '灵感创想力',
    logical: '逻辑洞察力',
    empathy: '共情沟通力',
    execution: '笃行统筹力',
    exploration: '开拓破局力',
    craft: '匠心钻研力'
  };
  return map[dim] || '综合潜能';
}

function getWorkStyleSummary(top: DimensionKey, second: DimensionKey): string {
  if (top === 'creative') return '审美引导 + 灵动发散型';
  if (top === 'logical') return '数据驱动 + 系统推演型';
  if (top === 'empathy') return '人文关怀 + 关系粘合型';
  if (top === 'execution') return '稳健闭环 + 节奏把控型';
  if (top === 'exploration') return '前瞻敏锐 + 破局开拓型';
  return '精益求精 + 深度钻研型';
}

function getCollabStyle(dim: DimensionKey): string {
  const map: Record<DimensionKey, string> = {
    creative: '在开放、包容、非评判性的研讨场域中灵感迸发最为迅猛。习惯先抛出具有强烈画面感与情绪穿透力的概念原型，非常需要搭配擅长排期推演与细节锁定的伙伴协同推进，避免灵感在落地中被过度折损。',
    logical: '遵循严密的事实链条与因果规律展开协同，主张“凡事以数据为基准、以SOP为轨道”。善于为团队制定清晰的权责与质量验收标准，极度反感充满情绪化撕扯、缺乏事实依据的低效内耗沟通。',
    empathy: '天然具备极强的团队温湿度计功能，能敏锐捕捉合作各方未曾言说的顾虑与深层诉求。善于在僵持对抗中充当柔性润滑剂，把剑拔弩张的利益拉扯转化为彼此信任的合作同盟，是团队长治久安的核心粘合剂。',
    execution: '以交付里程碑和结果闭环为绝对行动纲领，行事雷厉风行、条理分明。擅长将宏大空泛的愿景拆解为责任到人的排期表，并设立强力检查点，给予上下游合作方无可替代的安全感与确定性。',
    exploration: '擅长在从0到1的无序荒原中敏捷破冰，喜欢扁平、敏捷且容错率高的探险型战队。厌恶论资排辈与繁文缛节，更愿意用轻量级MVP快速试错拿回一手用户反馈，带动全队跳出存量内卷。',
    craft: '推崇“免受繁琐打扰的深度专注”，对交付品质有近乎苛刻的专业自尊心。喜欢在明确边界内独立攻坚，厌恶频繁被无意义的碎片化会议打断，一旦进入心流状态便能交付出令人惊叹的传世级成果。'
  };
  return map[dim];
}

function getDecisionStyle(dim: DimensionKey): string {
  const map: Record<DimensionKey, string> = {
    creative: '美学直觉与人文共鸣深度驱动。在做关键选择时，更看重方案是否具备打动人心的独创性、高级感与长线品牌资产价值，坚决拒绝平庸无趣但看似稳妥的流水线产物。',
    logical: '底层第一性原理与长期期望值驱动。做决策前习惯穷尽核心因果推演，对比横向关键参数与风险兜底方案，追求逻辑闭环与资源利用效率的最大化。',
    empathy: '人性关怀与多方共赢天平驱动。做决策时会反复权衡对团队士气、用户情感体验及长远信任关系的深层影响，确保结果不仅在商业上成立，更在道义与温度上站得住脚。',
    execution: '落地可行性与交付确定性优先驱动。在信息不完全的迷雾中，优先选择阻力最小、能够迅速拿到阶段性战果的扎实路径，坚信“在奔跑中调整姿态，远胜于在原地空想等待”。',
    exploration: '潜在战略突破口与敏捷破局速度驱动。敢于在只有60%把握时率先出牌抢占风口，把不确定性视为最大的套利红利，宁愿承担尝试带来的微小试错代价，也绝不因迟疑错失时代窗口。',
    craft: '专业公信力与长青经纬度深度驱动。始终把品质底线放在第一位，坚信“宁可为打磨无瑕多花三天，也绝不为了敷衍交差砸掉招牌”，用经得起岁月检验的口碑作为决策准绳。'
  };
  return map[dim];
}

function getFlowTrigger(dim: DimensionKey): string {
  const map: Record<DimensionKey, string> = {
    creative: '面对崭新留白的画布、全新品牌的视觉叙事构思、或在完全不受打扰的音乐声中沉浸拼贴视觉情绪板（Moodboard）时，灵感会如泉涌般喷发。',
    logical: '面对盘根错节的混乱业务流或海量零散数据，戴上降噪耳机，一格一格抽丝剥茧还原出优雅秩序、并推导出唯一破局最优解时，全身神经都会感受到极度舒适。',
    empathy: '与用户或挚友进行完全不设防的深度交心，看见对方原本暗淡紧锁的眉宇重新舒展、眼中重新燃起希望与力量时，内心会感受到巨大的生命滋养。',
    execution: '当手头千头万绪的混乱任务被整齐拆解到甘特图，并且一关一关攻坚克难、把清单上的待办全部打勾按期交付时，会获得难以言喻的掌控快感。',
    exploration: '在全行业都还没反应过来时，率先摸透最新AI黑科技或小众商业打法，并用低成本跑通第一笔现金流闭环时，血液中会充满探险家的狂热多巴胺。',
    craft: '窗外风雨大作，室内一灯如豆，双手触摸着细腻的材质、代码或稿纸，心无旁骛雕琢每一个微小倒角直到彻底无瑕，时间仿佛在这一刻完全静止。'
  };
  return map[dim];
}

function getEnergyDrain(dim: DimensionKey): string {
  const map: Record<DimensionKey, string> = {
    creative: '长期被困在毫无审美追求的流水线任务中，被外行用粗糙蛮横的标准反复催促交差，或者不得不为了迎合庸俗指标而阉割自己的灵气方案。',
    logical: '置身于朝令夕改、权责混乱且充满虚假画饼的内耗环境，被缺乏事实逻辑支撑的官僚主义反复折腾，眼睁睁看着系统由于低智决策走向崩溃。',
    empathy: '身处冷漠孤立、互不信任、充满勾心斗角与阴暗揣测的低能量组织，自己的真诚被当作软弱可欺，每天被迫吸收大量未消化的负能量垃圾。',
    execution: '遭遇严重拖延且不可控的外部猪队友，原本规划严密的推进节奏被无休止打乱推迟，陷入求助无门却必须独自背锅的被动深渊。',
    exploration: '被禁锢在一眼望得到头、论资排辈、任何新奇尝试都会招致冷嘲热讽与打压的僵化体制中，生命的活力被无休止的平庸例会彻底磨灭。',
    craft: '被逼迫为了所谓的盲目赶工而牺牲品质底线，明知有致命瑕疵却被要求“差不多就行了”，专业尊严遭到无情践踏与羞辱。'
  };
  return map[dim];
}

function getRechargeMethod(dim: DimensionKey): string {
  const map: Record<DimensionKey, string> = {
    creative: '去逛一家小众高审美的艺术展、淘一家中古首饰店，或者在一个雨后的午后坐在靠窗的咖啡馆观察街景，让视觉感官吸饱新鲜氧气。',
    logical: '彻底关闭所有社媒弹窗，把房间桌面与电脑文件夹整理得井井有条，沉浸在一部结构严密、逻辑精湛的悬疑长篇或硬核科普著作中。',
    empathy: '约上彼此绝对信任的闺蜜或知己，在幽静的茶室里点上一壶温茶慢聊，彼此不带评判地倾诉与拥抱，让紧绷的情绪神经被温柔抚平。',
    execution: '做一次彻底的物理断舍离，扔掉积累的杂物，列出一份仅保留3个最核心动作的轻便日计划，通过重新掌控生活的秩序找回从容。',
    exploration: '来一场没有任何预设规划的城市漫游（Citywalk），跳上一辆从未坐过的公交车开到终点站，或者品尝一家从未涉足的异域料理。',
    craft: '亲手做一顿复杂的烘焙料理、拼装一套高难度微缩模型、或精心修剪一盆绿植，在双手与实体材质的每一次触碰中找回内心的安定。'
  };
  return map[dim];
}

function getMoatKeyword(dim: DimensionKey): string {
  const map: Record<DimensionKey, string> = {
    creative: '无法被冷冰冰的算法复制的高维美学通感与深层情绪共鸣力',
    logical: '穿越混乱商业迷雾、直抵事物本质的底层第一性原理推演力',
    empathy: '在原子化冷漠社会中凝聚极高忠诚度与终身拥趸的高维共情磁场',
    execution: '将庞杂混沌愿景拆解并百分之百确定显化的卓越端到端操盘力',
    exploration: '超前于时代周期的风口敏锐嗅觉与零成本破局开疆拓土力',
    craft: '数十年如一日沉淀打磨、经得起漫长岁月淘洗的传世工艺壁垒'
  };
  return map[dim];
}

function getRiasecLetter(dim: DimensionKey): string {
  const map: Record<DimensionKey, string> = {
    creative: 'A',
    logical: 'I',
    empathy: 'S',
    execution: 'C',
    exploration: 'E',
    craft: 'R'
  };
  return map[dim] || 'A';
}

function getRiasecLabel(top: DimensionKey, second: DimensionKey): string {
  const t1 = getDimName(top);
  const t2 = getDimName(second);
  return `你的职业兴趣底层呈现出极具辨识度的「${t1}为主核引掣 + ${t2}为稳固基盘」双重复合结构。在霍兰德动力模型中，这种组合意味着你绝非千篇一律的单向度零件，而是兼备敏锐的天生直觉与独特的落地骨架。你在需要自驱创造、保持自主节奏、并能持续带来正向成就感的领域，将释放出数倍于常人的惊人潜能。`;
}

function getAnchorLabel(dim: DimensionKey): string {
  const map: Record<DimensionKey, string> = {
    creative: '创造/创业型职业锚 (Entrepreneurial Creativity)',
    logical: '技术/职能型职业锚 (Technical/Functional Competence)',
    empathy: '服务/奉献型职业锚 (Service/Dedication to a Cause)',
    execution: '通用管理型职业锚 (General Managerial Competence)',
    exploration: '纯粹挑战型职业锚 (Pure Challenge Anchor)',
    craft: '自主/独立型职业锚 (Autonomy/Independence)'
  };
  return map[dim] || '自主专业型职业锚';
}

function getAnchorDesc(dim: DimensionKey): string {
  const map: Record<DimensionKey, string> = {
    creative: '在施恩职业锚体系中，你的灵魂底层永远无法妥协对“自我意志被创造出作品”的渴望。传统的科层制螺丝钉岗位会让你感到精神枯竭；唯有当你拥有将独特的审美主张与个人构想转化为可感知实物的自由度时，你才会真正感到生命在奔涌。',
    logical: '在施恩职业锚体系中，你的底线是对“客观真理、技术深度与逻辑合理性”的执着追求。你无法容忍为虚妄的谎言或无效流程背书；受到业内懂行专家的真实认可、并在复杂系统中确立无可辩驳的技术权威，是你长青自洽的真正源泉。',
    empathy: '在施恩职业锚体系中，你无法妥协对“自己的存在是否让周围世界变得更温暖、更有温度”的伦理底线。纯粹冷酷的数字KPI与互相践踏的办公室政治会击垮你的心防；唯有在一个彼此关爱、被深度信任与尊重的温感团队中，你才能绽放最强大的领导力。',
    execution: '在施恩职业锚体系中，你的核心驱动力是对“全局统筹把控度与按期显化结果”的渴望。你享受整合各方资源攻坚克难的快感，害怕无法掌控进度的失控状态；拥有充分的调配实权与明确的目标奖惩，能让你彻底化身为独当一面的大女主。',
    exploration: '在施恩职业锚体系中，你无法妥协对“面对新鲜未知、突破常规挑战与拓展生命边界”的自由向往。僵化守成的日复一日是你的最大牢笼；唯有在瞬息万变的新赛道或充满不确定性的先锋领域，你的好奇心与冒险精神才能变成最大的财富。',
    craft: '在施恩职业锚体系中，你的终极坚守是“免受繁琐行政羁绊的绝对自主权”与“精益求精的传世专业标准”。你不屑于参与功利浮躁的权力追逐，宁愿在安静的个人工坊中十年磨一剑，用任何人都无法忽视的代表作赢得至高无上的尊严。'
  };
  return map[dim];
}

function getGallupPair(top: DimensionKey, second: DimensionKey): string {
  const map: Record<DimensionKey, string> = {
    creative: '战略思维 (Strategic Thinking)',
    logical: '分析思维 (Analytical Mastery)',
    empathy: '关系建立 (Relationship Building)',
    execution: '执行推进 (Executing Force)',
    exploration: '战略影响 (Influencing Energy)',
    craft: '深度专注 (Deliberative Mastery)'
  };
  return `${map[top]} × ${map[second]}`;
}

function getGallupSynergy(top: DimensionKey, second: DimensionKey): string {
  return `在盖洛普才干发展动力学中，你的两大核心才干领域构成了罕见的“高维天花板构思 + 坚实地面承接”复合格局。前者决定了你能看多高、破局多惊艳，后者确保了你能走多稳、结果多扎实。两者的协同效应不仅杜绝了浮躁空转，更赋予你在漫长的职业长跑中持续复利演进的战略定力。`;
}

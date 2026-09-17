// 题库结构：id | text | dimension（大维度） | node（细分模块） | subNode（子项）

export const questions = [
  // ================= D1 思维与认知（20题，6大细分模块） =================
  // 1. 智力模块（4题）
  { id: 1, text: '我能够快速识别复杂信息中的因果关系和逻辑漏洞。', dimension: 'D1', node: '智力模块' },
  { id: 2, text: '面对杂乱无章的数据或信息，我能很快发现其中的规律。', dimension: 'D1', node: '智力模块' },
  { id: 3, text: '进入一个完全陌生的业务领域时，我能在短时间内掌握核心规则。', dimension: 'D1', node: '智力模块' },
  { id: 4, text: '我对数字和量化指标比较敏感，能从中读出业务含义。', dimension: 'D1', node: '智力模块' },
  // 2. 情境感知能力（3题）
  { id: 5, text: '我能准确判断组织中谁对某个决策有真正的发言权。', dimension: 'D1', node: '情境感知能力' },
  { id: 6, text: '我能从他人的表情、语气中读出他们真实的感受。', dimension: 'D1', node: '情境感知能力' },
  { id: 7, text: '我懂得在什么场合说什么话，知道何时该沉默。', dimension: 'D1', node: '情境感知能力' },
  // 3. 化繁为简能力（3题）
  { id: 8, text: '当信息互相矛盾时，我能从中提炼出有价值的结论。', dimension: 'D1', node: '化繁为简能力' },
  { id: 9, text: '我能把复杂的问题用清晰、有结构的方式表达出来。', dimension: 'D1', node: '化繁为简能力' },
  { id: 10, text: '我善于把具体问题上升为框架或模型来思考。', dimension: 'D1', node: '化繁为简能力' },
  // 4. 提高思考判断（4题）
  { id: 11, text: '在做决策时，我不仅考虑眼前结果，还会预判其连锁反应。', dimension: 'D1', node: '提高思考判断' },
  { id: 12, text: '我习惯从长期视角看待问题，而不只是关注当前季度。', dimension: 'D1', node: '提高思考判断' },
  { id: 13, text: '我能看到自己部门与公司整体之间的联动关系。', dimension: 'D1', node: '提高思考判断' },
  { id: 14, text: '当资源有限时，我能果断做出取舍，把资源放在最重要的事上。', dimension: 'D1', node: '提高思考判断' },
  // 5. 加速学习能力（3题）
  { id: 15, text: '进入陌生领域时，我能快速把新知识应用到实际工作中。', dimension: 'D1', node: '加速学习能力' },
  { id: 16, text: '我能把在一个情境中学到的东西，灵活运用到另一个新情境中。', dimension: 'D1', node: '加速学习能力' },
  { id: 17, text: '我经常反思自己的行为，思考如何做得更好。', dimension: 'D1', node: '加速学习能力' },
  // 6. 性格脱轨风险（3题）
  { id: 18, text: '我在高压下依然能保持清晰的思考，不被情绪影响。', dimension: 'D1', node: '性格脱轨风险' },
  { id: 19, text: '面对批评时，我能客观接受并快速调整行为。', dimension: 'D1', node: '性格脱轨风险' },
  { id: 20, text: '我经常追问事情的本质，而不仅仅满足于表面答案。', dimension: 'D1', node: '性格脱轨风险' },

  // ================= D2 人际与领导（20题，7大细分模块） =================
  // 1. 发掘才华（3题）
  { id: 21, text: '我能准确判断团队成员的优势，把人放在对的位置上。', dimension: 'D2', node: '发掘才华' },
  { id: 22, text: '我看人比较准，能判断一个人适合做什么、不适合做什么。', dimension: 'D2', node: '发掘才华' },
  { id: 23, text: '我善于发现他人身上自己都没注意到的潜力。', dimension: 'D2', node: '发掘才华' },
  // 2. 持续培养（3题）
  { id: 24, text: '我能够给下属提供具体、可操作的反馈，帮助他们成长。', dimension: 'D2', node: '持续培养' },
  { id: 25, text: '我愿意投资时间培养他人，即使短期看不到回报。', dimension: 'D2', node: '持续培养' },
  { id: 26, text: '我团队中的成员，在我手下工作后往往能获得明显的成长。', dimension: 'D2', node: '持续培养' },
  // 3. 及时调整（2题）
  { id: 27, text: '在必要时，我能果断做出人员调整，不让不合适的人拖累团队。', dimension: 'D2', node: '及时调整' },
  { id: 28, text: '我敢于做出不受欢迎但对团队有利的人事决定。', dimension: 'D2', node: '及时调整' },
  // 4. 组织协同（3题）
  { id: 29, text: '我善于打破部门壁垒，让不同单元围绕共同目标协作。', dimension: 'D2', node: '组织协同' },
  { id: 30, text: '在推动跨部门合作时，我经常能获得没有汇报关系的人的支持。', dimension: 'D2', node: '组织协同' },
  { id: 31, text: '我能让不同背景、不同立场的人坐到一起，达成共识。', dimension: 'D2', node: '组织协同' },
  // 5. 领导团队（4题）
  { id: 32, text: '我愿意授权给下属，即使这意味着短期内可能会犯错。', dimension: 'D2', node: '领导团队' },
  { id: 33, text: '我带领的团队，整体战斗力比我个人单打独斗时更强。', dimension: 'D2', node: '领导团队' },
  { id: 34, text: '我善于激发团队成员的潜力，让他们做出超越预期的成果。', dimension: 'D2', node: '领导团队' },
  { id: 35, text: '我能够接受来自上级和同事的评估，并据此改进。', dimension: 'D2', node: '领导团队' },
  // 6. 全面把控（3题）
  { id: 36, text: '我善于与他人建立信任关系，让别人愿意向我敞开心扉。', dimension: 'D2', node: '全面把控' },
  { id: 37, text: '在谈判或分歧中，我能找到双方都能接受的共识方案。', dimension: 'D2', node: '全面把控' },
  { id: 38, text: '在不确定的状态下，我仍能与他人保持稳定的合作关系。', dimension: 'D2', node: '全面把控' },
  // 7. 人际风险调节（2题）
  { id: 39, text: '在自信心和自我怀疑之间，我能把握一个较好的平衡点。', dimension: 'D2', node: '人际风险调节' },
  { id: 40, text: '在面对压力或冲突时，我的情绪通常能保持稳定。', dimension: 'D2', node: '人际风险调节' },

  // ================= D3 内驱与动机（15题，5大细分模块） =================
  // 1. 高潜三项特质（3题）
  { id: 41, text: '我敢于构想大格局，愿意为了长期目标而放弃短期利益。', dimension: 'D3', node: '高潜三项特质' },
  { id: 42, text: '我经常思考工作的意义，而不仅仅是完成任务。', dimension: 'D3', node: '高潜三项特质' },
  { id: 43, text: '我愿意为了突破“不可能”而承担经过计算的风险。', dimension: 'D3', node: '高潜三项特质' },
  // 2. 工作满足四标准（3题）
  { id: 44, text: '即使没有外部奖励，我也渴望把事情做到超越标准。', dimension: 'D3', node: '工作满足四标准' },
  { id: 45, text: '我对自己设定的目标，通常比上级要求的更高。', dimension: 'D3', node: '工作满足四标准' },
  { id: 46, text: '我对平庸的结果很难容忍，会想方设法做得更好。', dimension: 'D3', node: '工作满足四标准' },
  // 3. 加速学习循环（4题）
  { id: 47, text: '我经常主动向他人寻求反馈，以加速自己的成长。', dimension: 'D3', node: '加速学习循环' },
  { id: 48, text: '我能从成功或失败的经历中快速总结出可复用的经验。', dimension: 'D3', node: '加速学习循环' },
  { id: 49, text: '我倾向于选择那些稍微超出我能力、但能让我成长的任务。', dimension: 'D3', node: '加速学习循环' },
  { id: 50, text: '面对有挑战性的项目，我会主动请缨而不是等待指派。', dimension: 'D3', node: '加速学习循环' },
  // 4. 激励与保健因素（3题）
  { id: 51, text: '驱动我努力工作的，更多是内在兴趣，而不是外在奖励。', dimension: 'D3', node: '激励与保健因素' },
  { id: 52, text: '在擅长的工作中，我经常能进入全神贯注的“心流”状态。', dimension: 'D3', node: '激励与保健因素' },
  { id: 53, text: '工作时，我很容易沉浸其中，忘记时间的流逝。', dimension: 'D3', node: '激励与保健因素' },
  // 5. 动机偏转预警（2题）
  { id: 54, text: '我懂得拒绝低价值的事务，把精力集中在高杠杆的事情上。', dimension: 'D3', node: '动机偏转预警' },
  { id: 55, text: '我能够觉察到自己是否在为了证明自己而过度工作。', dimension: 'D3', node: '动机偏转预警' },

  // ================= D4 关键行为（20题，9大细分模块） =================
  // 1. 提高时间回报（2题）
  { id: 56, text: '我能够把精力集中在最高杠杆的事情上，而不是平均用力。', dimension: 'D4', node: '提高时间回报' },
  { id: 57, text: '我善于授权，把低价值事务交给他人处理。', dimension: 'D4', node: '提高时间回报' },
  // 2. 创意与执行（2题）
  { id: 58, text: '我承诺的事情，通常都能形成从创意到结果的闭环。', dimension: 'D4', node: '创意与执行' },
  { id: 59, text: '我不仅能提出好想法，还能推动它落地。', dimension: 'D4', node: '创意与执行' },
  // 3. 环境扫描（2题）
  { id: 60, text: '我习惯主动了解客户、对手和行业环境的最新变化。', dimension: 'D4', node: '环境扫描' },
  { id: 61, text: '我善于从用户体验的端到端流程中，发现改进机会。', dimension: 'D4', node: '环境扫描' },
  // 4. 信任构建（2题）
  { id: 62, text: '我能够准确感知并适应上级的工作风格和期望。', dimension: 'D4', node: '信任构建' },
  { id: 63, text: '我懂得避免触碰组织中的“雷区”，与难相处的人也能共事。', dimension: 'D4', node: '信任构建' },
  // 5. 团队领导（2题）
  { id: 64, text: '我善于通过团队放大个人产出，而不是单打独斗。', dimension: 'D4', node: '团队领导' },
  { id: 65, text: '我善于激发团队成员的潜力，让团队做出超越预期的成果。', dimension: 'D4', node: '团队领导' },
  // 6. 挑战应对（3题）
  { id: 66, text: '在模糊不清、信息不全的情境下，我仍能保持行动力。', dimension: 'D4', node: '挑战应对' },
  { id: 67, text: '在高压状态下，我依然能够保持清晰的思考并做出决策。', dimension: 'D4', node: '挑战应对' },
  { id: 68, text: '我敢于做出不受欢迎但对组织有利的决定。', dimension: 'D4', node: '挑战应对' },
  // 7. 特质调节（3题）
  { id: 69, text: '我的行为在不同情境下保持一致，不会因权力变化而改变。', dimension: 'D4', node: '特质调节' },
  { id: 70, text: '我愿意直面困难的对话，即使这会让我感到不舒服。', dimension: 'D4', node: '特质调节' },
  { id: 71, text: '我说到做到，言出必行。', dimension: 'D4', node: '特质调节' },
  // 8. 经验学习（2题）
  { id: 72, text: '我能从每一次经历中提取可迁移的经验，而非简单重复。', dimension: 'D4', node: '经验学习' },
  { id: 73, text: '我会主动寻求有挑战性的任务，以加速自己的成长。', dimension: 'D4', node: '经验学习' },
  // 9. 行为偏转预警（2题）
  { id: 74, text: '当我犯错时，我会主动承认并承担责任。', dimension: 'D4', node: '行为偏转预警' },
  { id: 75, text: '在利益冲突面前，我会选择符合原则的做法。', dimension: 'D4', node: '行为偏转预警' },

  // ================= D5 脱轨预警（5题，独立预警层级） =================
  { id: 76, text: '当取得重大成绩时，我偶尔会觉得规则是可以适当变通的。', dimension: 'D5', node: '表层表现' },
  { id: 77, text: '面对批评，我表面上接受，但内心常常感到不适或记仇。', dimension: 'D5', node: '成因结构' },
  { id: 78, text: '我倾向于用一些政治手腕来获取自己想要的东西。', dimension: 'D5', node: '深层人格' },
  { id: 79, text: '我在一些小权力情况下，有时会放松对自己的行为要求。', dimension: 'D5', node: '触发机制' },
  { id: 80, text: '我会为了达到目的，对某些事实进行修饰。', dimension: 'D5', node: '诊断链条' }
];

// 细分模块的展示名称与描述（供报告页使用）
export const nodeMetadata = {
  // D1
  '智力模块': { dimension: 'D1', displayName: '智力模块', description: '逻辑推理、模式识别与快速学习能力' },
  '情境感知能力': { dimension: 'D1', displayName: '情境感知能力', description: '读取环境、理解他人期望、适应组织风格' },
  '化繁为简能力': { dimension: 'D1', displayName: '化繁为简能力', description: '将散乱信息转化为清晰洞见与结构' },
  '提高思考判断': { dimension: 'D1', displayName: '提高思考判断', description: '独立思考、深度思考、预判连锁反应' },
  '加速学习能力': { dimension: 'D1', displayName: '加速学习能力', description: '从经历中学习、迁移应用、持续迭代' },
  '性格脱轨风险': { dimension: 'D1', displayName: '性格脱轨风险', description: '性格特质对认知发挥的影响程度' },
  // D2
  '发掘才华': { dimension: 'D2', displayName: '发掘才华', description: '识人用人、把人放在对的位置上' },
  '持续培养': { dimension: 'D2', displayName: '持续培养', description: '投资他人成长，建立日常培养机制' },
  '及时调整': { dimension: 'D2', displayName: '及时调整', description: '果断做出人员调整，保持团队质量' },
  '组织协同': { dimension: 'D2', displayName: '组织协同', description: '打破部门壁垒，连接组织节点' },
  '领导团队': { dimension: 'D2', displayName: '领导团队', description: '通过团队放大个人产出，激发潜力' },
  '全面把控': { dimension: 'D2', displayName: '全面把控', description: '构建牢靠合作关系，适应不确定状态' },
  '人际风险调节': { dimension: 'D2', displayName: '人际风险调节', description: '情绪稳定、自我平衡，调节人际效能' },
  // D3
  '高潜三项特质': { dimension: 'D3', displayName: '高潜三项特质', description: '构想大格局、突破不可能、构建生态圈' },
  '工作满足四标准': { dimension: 'D3', displayName: '工作满足四标准', description: '忠于自我、富有意义、全心投入、发挥优势' },
  '加速学习循环': { dimension: 'D3', displayName: '加速学习循环', description: '从经历中学习，将洞见转化为绩效' },
  '激励与保健因素': { dimension: 'D3', displayName: '激励与保健因素', description: '保健因素消除不满，激励因素产生内驱' },
  '动机偏转预警': { dimension: 'D3', displayName: '动机偏转预警', description: '成就动机的过度使用与偏转风险' },
  // D4
  '提高时间回报': { dimension: 'D4', displayName: '提高时间回报', description: '把精力投在最高杠杆处' },
  '创意与执行': { dimension: 'D4', displayName: '创意与执行', description: '把想法变成结果的闭环能力' },
  '环境扫描': { dimension: 'D4', displayName: '环境扫描', description: '持续获取外部信号，研究客户与对手' },
  '信任构建': { dimension: 'D4', displayName: '信任构建', description: '建立向上信任关系' },
  '团队领导': { dimension: 'D4', displayName: '团队领导', description: '通过团队放大产出' },
  '挑战应对': { dimension: 'D4', displayName: '挑战应对', description: '在高挑战任务中保持稳定' },
  '特质调节': { dimension: 'D4', displayName: '特质调节', description: '性格特质驱动行为模式' },
  '经验学习': { dimension: 'D4', displayName: '经验学习', description: '通过经验积累驱动行为升级' },
  '行为偏转预警': { dimension: 'D4', displayName: '行为偏转预警', description: '识别行为偏转信号' },
  // D5
  '表层表现': { dimension: 'D5', displayName: '表层表现', description: '脱轨类型：可恶型、狂妄型、可悲型' },
  '成因结构': { dimension: 'D5', displayName: '成因结构', description: '毒三角：领导者+追随者+环境' },
  '深层人格': { dimension: 'D5', displayName: '深层人格', description: '暗黑特质与十种表现清单' },
  '触发机制': { dimension: 'D5', displayName: '触发机制', description: '核心特质的过度使用' },
  '诊断链条': { dimension: 'D5', displayName: '诊断链条', description: '从表层到深层的完整风险监测' }
};
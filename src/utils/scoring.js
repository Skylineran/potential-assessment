import { nodeMetadata } from '@/data/questions';

const WEIGHTS = { D1: 0.25, D2: 0.30, D3: 0.25, D4: 0.20 };

/* ========== 1. 计算大维度均分 ========== */
export function calcDimensionScores(answers, questions) {
  const dims = { D1: [], D2: [], D3: [], D4: [], D5: [] };
  questions.forEach(q => {
    const score = answers[q.id];
    if (score !== undefined) dims[q.dimension].push(score);
  });
  const avg = arr => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  return {
    D1: avg(dims.D1), D2: avg(dims.D2), D3: avg(dims.D3), D4: avg(dims.D4), D5: dims.D5
  };
}

/* ========== 2. 计算细分模块均分 ========== */
export function calcNodeScores(answers, questions) {
  const nodeMap = {};
  questions.forEach(q => {
    const score = answers[q.id];
    if (score === undefined) return;
    if (!nodeMap[q.node]) nodeMap[q.node] = [];
    nodeMap[q.node].push(score);
  });

  const result = {};
  Object.entries(nodeMap).forEach(([node, scores]) => {
    result[node] = {
      avg: +(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2),
      count: scores.length,
      dimension: nodeMetadata[node]?.dimension || '',
      displayName: nodeMetadata[node]?.displayName || node,
      description: nodeMetadata[node]?.description || ''
    };
  });
  return result;
}

/* ========== 3. 脱轨风险判定 ========== */
export function checkRisk(d5Scores) {
  if (!d5Scores.length) return { level: 'low', message: '' };
  const highRiskCount = d5Scores.filter(s => s >= 4).length;
  if (highRiskCount >= 2) return { level: 'high', message: '⚠️ 高风险提示：存在明显的脱轨风险信号，建议在权力放大情境下重点关注。' };
  if (highRiskCount === 1) return { level: 'medium', message: '⚠️ 中风险提示：存在个别脱轨风险信号，建议保持觉察并定期复评。' };
  return { level: 'low', message: '' };
}

/* ========== 4. 生成完整报告 ========== */
export function generateFullReport(scores, answers, questions) {
  const { D1, D2, D3, D4 } = scores;
  const nodeScores = calcNodeScores(answers, questions);

  // ---- 4.1 潜力类型判定 ----
  let type = '稳健发展型', combo = '整体均衡发展，无明显短板。';
  if (D1 >= 4 && D3 >= 4) { type = '战略领航型'; combo = '思维打底、内驱助推——不仅能想得深，更能扛得住。'; }
  else if (D2 >= 4 && D4 >= 4) { type = '团队磁石型'; combo = '人际连接、行为落地——带领团队拿到结果。'; }
  else if (D1 >= 4 && D4 >= 4) { type = '破局专家型'; combo = '认知引领、行为破局——在复杂局面中打开缺口。'; }
  else if (D3 >= 4 && D4 >= 4) { type = '自驱实干型'; combo = '内驱发动、行为闭环——持续把想法变成结果。'; }

  // ---- 4.2 大维度排序 ----
  const dimMap = [
    { key: 'D1', name: '思维与认知', score: D1, icon: '🧠' },
    { key: 'D2', name: '人际与领导', score: D2, icon: '🤝' },
    { key: 'D3', name: '内驱与动机', score: D3, icon: '🔥' },
    { key: 'D4', name: '关键行为', score: D4, icon: '⚡' }
  ];
  const sortedDims = [...dimMap].sort((a, b) => b.score - a.score);

  // ---- 4.3 细分模块按维度分组 ----
  const nodesByDim = { D1: [], D2: [], D3: [], D4: [] };
  Object.entries(nodeScores).forEach(([node, info]) => {
    if (nodesByDim[info.dimension]) {
      nodesByDim[info.dimension].push({
        node,
        displayName: info.displayName,
        description: info.description,
        score: info.avg,
        level: getNodeLevel(info.avg)
      });
    }
  });
  // 每组按分数降序
  Object.keys(nodesByDim).forEach(k => {
    nodesByDim[k].sort((a, b) => b.score - a.score);
  });

  // ---- 4.4 每个维度的洞察（优势节点 + 待发展节点 + 整体建议） ----
  const dimensionInsights = {};
  ['D1', 'D2', 'D3', 'D4'].forEach(dimKey => {
    const nodes = nodesByDim[dimKey];
    const strengths = nodes.filter(n => n.score >= 4.0);
    const gaps = nodes.filter(n => n.score <= 2.5);
    const dimAvg = nodes.reduce((sum, n) => sum + n.score, 0) / (nodes.length || 1);

    dimensionInsights[dimKey] = {
      dimAvg: +dimAvg.toFixed(2),
      nodes,
      strengths: strengths.slice(0, 3),
      gaps: gaps.slice(0, 2),
      summary: generateDimSummary(dimKey, dimAvg, strengths, gaps)
    };
  });

  // ---- 4.5 脱轨风险 ----
  const risk = checkRisk(scores.D5);

  // ---- 4.6 适配角色 ----
  const topDims = sortedDims.filter(d => d.score >= 3.5).slice(0, 3);
  const suitable = mapSuitableRoles(sortedDims);
  const unsuitable = sortedDims.filter(d => d.score < 3).map(d => d.name);

  return {
    potentialType: type,
    topTags: topDims.map(d => `${d.icon} ${d.name}`).slice(0, 3),
    typeDescription: '你的能力组合具有独特的竞争优势。',
    comboPlay: combo,
    warningText: risk.message,
    riskLevel: risk.level,
    dimensionScores: { D1, D2, D3, D4 },
    sortedDimensions: sortedDims,
    nodesByDim,
    dimensionInsights,
    suitableRoles: suitable.length ? suitable : ['需要进一步探索'],
    unsuitableRoles: unsuitable.length ? unsuitable : ['暂无明显盲区'],
    comboFeature: `你的能力组合偏向于「${sortedDims[0].name} + ${sortedDims[1].name}」的${type}。`,
    workMode: generateWorkMode(sortedDims, nodesByDim)
  };
}

/* ========== 辅助函数 ========== */

function getNodeLevel(score) {
  if (score >= 4.5) return { label: '突出潜能', class: 'level-top' };
  if (score >= 4.0) return { label: '较明显优势', class: 'level-high' };
  if (score >= 3.0) return { label: '一般倾向', class: 'level-mid' };
  return { label: '待提升', class: 'level-low' };
}

function generateDimSummary(dimKey, dimAvg, strengths, gaps) {
  const dimNames = { D1: '思维与认知', D2: '人际与领导', D3: '内驱与动机', D4: '关键行为' };
  const name = dimNames[dimKey];
  if (dimAvg >= 4.0) {
    return `你的「${name}」整体突出${strengths.length ? `，尤其在「${strengths[0].displayName}」上表现优异` : ''}。这是你的核心竞争力，建议持续强化。`;
  }
  if (dimAvg >= 3.0) {
    return `你的「${name}」处于中上水平${strengths.length ? `，「${strengths[0].displayName}」是你的相对优势` : ''}。${gaps.length ? `建议关注「${gaps[0].displayName}」的提升。` : ''}`;
  }
  return `你的「${name}」还有较大提升空间${gaps.length ? `，建议优先发展「${gaps[0].displayName}」` : ''}。可通过针对性任务与刻意练习加速成长。`;
}

function mapSuitableRoles(sortedDims) {
  const roles = [];
  const topKey = sortedDims[0].key;
  const roleMap = {
    D1: ['战略规划', '复杂问题诊断', '商业分析'],
    D2: ['团队管理', '跨部门协调', '组织发展'],
    D3: ['创业团队', '高挑战业务', '新市场开拓'],
    D4: ['项目落地', '危机处理', '运营推动']
  };
  if (roleMap[topKey]) roles.push(...roleMap[topKey]);
  if (sortedDims[1] && roleMap[sortedDims[1].key]) {
    roles.push(...roleMap[sortedDims[1].key].slice(0, 2));
  }
  return [...new Set(roles)].slice(0, 5);
}

function generateWorkMode(sortedDims, nodesByDim) {
  const topDim = sortedDims[0];
  const topNodes = nodesByDim[topDim.key]?.slice(0, 1) || [];
  const topNodeName = topNodes[0]?.displayName || '';
  const modeMap = {
    D1: `独立思考者，善于在复杂环境中梳理逻辑、找到破局点。${topNodeName ? `在「${topNodeName}」方面尤为突出。` : ''}`,
    D2: `团队催化剂，善于通过他人拿结果，在协作网络中如鱼得水。${topNodeName ? `在「${topNodeName}」方面尤为突出。` : ''}`,
    D3: `自驱实干者，自带发动机，能够把一个个想法持续变成现实结果。${topNodeName ? `在「${topNodeName}」方面尤为突出。` : ''}`,
    D4: `执行破局者，在混乱和压力中提供确定性，持续交付高质量结果。${topNodeName ? `在「${topNodeName}」方面尤为突出。` : ''}`
  };
  return modeMap[topDim.key] || '综合型人才，能够在多种场景下稳定发挥。';
}
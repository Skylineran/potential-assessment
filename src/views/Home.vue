<template>
  <div class="home">
    <!-- 1. 顶部 Hero 区 -->
    <div class="hero">
      <div class="hero-content">
        <h1>发现你的职场潜力密码</h1>
        <div class="tags">
          <span class="tag">职业深度版</span>
          <span class="tag">基于多维潜力模型</span>
        </div>
        <p class="desc">结合《能力孵化》《高潜》等权威框架，科学预测你的未来胜任力。</p>
        <div class="hero-stats">
          <div class="stat-item"><span class="num">20-30</span><span class="unit">分钟完成</span></div>
          <div class="stat-item"><span class="num">80</span><span class="unit">道题目</span></div>
          <div class="stat-item"><span class="num">4+1</span><span class="unit">大维度</span></div>
          <div class="stat-item"><span class="num">100%</span><span class="unit">隐私保护</span></div>
        </div>
      </div>
    </div>

    <!-- 2. 权威背书 -->
    <div class="section-card">
      <div class="section-header">
        <h3>📚 理论基础</h3>
        <span class="header-hint">扎实的学术根基</span>
      </div>
      <p class="section-desc">本测评基于组织心理学与领导力发展领域的多项研究，整合了三大权威框架：</p>
      <div class="theory-list">
        <div class="theory-item" v-for="book in theoryBooks" :key="book.name">
          <div class="book-name">{{ book.name }}</div>
          <div class="book-desc">{{ book.desc }}</div>
        </div>
      </div>
    </div>

    <!-- 3. 评估维度全景 -->
    <div class="section-card">
      <div class="section-header">
        <h3>🎯 评估维度全景</h3>
        <span class="header-hint">4+1 大核心模块</span>
      </div>
      <div class="dimension-grid">
        <div class="dim-card" v-for="dim in dimensions" :key="dim.title">
          <div class="icon-wrap" :class="dim.colorClass">
            <span class="icon">{{ dim.icon }}</span>
          </div>
          <div class="title">{{ dim.title }}</div>
          <div class="subtitle">{{ dim.subtitle }}</div>
        </div>
      </div>
    </div>

    <!-- 4. 深度剖析（折叠面板交互） -->
    <div class="section-card">
      <div class="section-header">
        <h3>🔍 深度剖析：五大维度解密</h3>
        <span class="header-hint">点击展开</span>
      </div>
      <p class="section-desc">点击下方模块卡片，展开查看各维度的详细理论模型：</p>

      <van-collapse v-model="activeNames" class="custom-collapse">
        <!-- 1. 思维与认知 -->
        <van-collapse-item name="1" class="collapse-purple">
          <template #title>
            <div class="custom-title">
              <span class="title-icon">🧠</span>
              <span class="title-text">思维与认知潜力</span>
              <span class="title-hint">点击展开</span>
            </div>
          </template>
          <div class="module-list">
            <div class="module-item cognition-item" v-for="item in cognitionModules" :key="item.module">
              <div class="item-header">
                <span class="dim-tag purple">{{ item.dimension }}</span>
                <span class="source-tag">{{ item.source }}</span>
              </div>
              <div class="module-name">{{ item.module }}</div>
              <div class="module-detail">{{ item.detail }}</div>
            </div>
          </div>
        </van-collapse-item>

        <!-- 2. 人际与领导 -->
        <van-collapse-item name="2" class="collapse-blue">
          <template #title>
            <div class="custom-title">
              <span class="title-icon">🤝</span>
              <span class="title-text">人际与领导潜力</span>
              <span class="title-hint">点击展开</span>
            </div>
          </template>
          <div class="module-list">
            <div class="module-item interpersonal-item" v-for="item in interpersonalModules" :key="item.module">
              <div class="item-header">
                <span class="dim-tag blue">{{ item.dimension }}</span>
                <span class="source-tag">{{ item.source }}</span>
              </div>
              <div class="module-name">{{ item.module }}</div>
              <div class="module-detail">{{ item.detail }}</div>
              <div class="chain-position blue-chain" v-if="item.position">
                <span class="chain-label">人际链位置：</span>{{ item.position }}
              </div>
            </div>
          </div>
        </van-collapse-item>

        <!-- 3. 内驱与动机 -->
        <van-collapse-item name="3" class="collapse-orange">
          <template #title>
            <div class="custom-title">
              <span class="title-icon">🔥</span>
              <span class="title-text">内驱与动机潜力</span>
              <span class="title-hint">点击展开</span>
            </div>
          </template>
          <div class="module-list">
            <div class="module-item motivation-item" v-for="item in motivationModules" :key="item.module">
              <div class="item-header">
                <span class="dim-tag orange">{{ item.dimension }}</span>
                <span class="source-tag">{{ item.source }}</span>
              </div>
              <div class="module-name">{{ item.module }}</div>
              <div class="module-detail">{{ item.detail }}</div>
              <div class="chain-position orange-chain" v-if="item.position">
                <span class="chain-label">动机链位置：</span>{{ item.position }}
              </div>
            </div>
          </div>
        </van-collapse-item>

        <!-- 4. 关键行为 -->
        <van-collapse-item name="4" class="collapse-green">
          <template #title>
            <div class="custom-title">
              <span class="title-icon">⚡</span>
              <span class="title-text">关键行为倾向</span>
              <span class="title-hint">点击展开</span>
            </div>
          </template>
          <div class="module-list">
            <div class="module-item behavior-item" v-for="item in behaviorModules" :key="item.module">
              <div class="item-header">
                <span class="dim-tag green">{{ item.dimension }}</span>
                <span class="source-tag">{{ item.source }}</span>
              </div>
              <div class="module-name">{{ item.module }}</div>
              <div class="module-detail">{{ item.detail }}</div>
              <div class="chain-position green-chain" v-if="item.position">
                <span class="chain-label">行为链位置：</span>{{ item.position }}
              </div>
            </div>
          </div>
        </van-collapse-item>

        <!-- 5. 脱轨预警 -->
        <van-collapse-item name="5" class="collapse-red">
          <template #title>
            <div class="custom-title">
              <span class="title-icon">⚠️</span>
              <span class="title-text">脱轨预警筛查</span>
              <span class="title-hint">点击展开</span>
            </div>
          </template>
          <div class="module-list">
            <div class="module-item derailment-item" v-for="item in derailmentModules" :key="item.module">
              <div class="item-header">
                <span class="dim-tag red">{{ item.dimension }}</span>
                <span class="source-tag">{{ item.source }}</span>
              </div>
              <div class="module-name">{{ item.module }}</div>
              <div class="module-detail">{{ item.detail }}</div>
              <div class="chain-position red-chain" v-if="item.position">
                <span class="chain-label">诊断位置：</span>{{ item.position }}
              </div>
            </div>
          </div>

          <!-- 过度使用对照表 -->
          <div class="overuse-section">
            <h4>📉 核心特质“过度使用”对照表</h4>
            <p class="overuse-intro">正向特质被过度使用后，会转化为脱轨风险：</p>
            <div class="overuse-list">
              <div class="overuse-item" v-for="item in overuseTable" :key="item.trait">
                <div class="trait-name">{{ item.trait }}</div>
                <div class="trait-compare">
                  <div class="trait-box pros">
                    <span class="tag-label">适度表现（优势）</span>
                    <p>{{ item.pros }}</p>
                  </div>
                  <div class="trait-arrow">→</div>
                  <div class="trait-box cons">
                    <span class="tag-label">过度使用（脱轨风险）</span>
                    <p>{{ item.cons }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>

    <!-- 5. 评估流程 -->
    <div class="section-card">
      <div class="section-header">
        <h3>🗺️ 评估流程</h3>
        <span class="header-hint">三步完成</span>
      </div>
      <div class="step-timeline">
        <div class="step-item" v-for="(step, index) in steps" :key="index">
          <div class="step-num">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 6. 底部按钮与隐私承诺 -->
    <div class="footer-section">
      <div class="privacy-badge" @click="goToPrivacy">
        <span class="lock-icon">🔒</span>
        <span>您的作答数据仅保存在本地 · 查看隐私说明 ›</span>
      </div>
      <van-button type="primary" block round @click="goToQuiz" class="start-btn">
        开始探索
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeNames = ref(['1']);

const goToQuiz = () => router.push('/quiz');
const goToPrivacy = () => router.push('/privacy');

const theoryBooks = [
  { name: '《能力孵化》', desc: '引入智商、性格与脱轨风险的多维分析体系。' },
  { name: '《高潜》', desc: '借鉴查兰大师关于高潜领导者五大关键能力的模型。' },
  { name: '《高潜力人才的5大关键能力》', desc: '融合康格与丘奇关于“情境感知”与“人才中心型领导”的实证研究。' }
];

const dimensions = [
  { icon: '🧠', title: '思维与认知', subtitle: '逻辑推理与复杂转化', colorClass: 'navy' },
  { icon: '🤝', title: '人际与领导', subtitle: '情境感知与影响力', colorClass: 'blue' },
  { icon: '🔥', title: '内驱与动机', subtitle: '成就渴望与学习敏锐度', colorClass: 'orange' },
  { icon: '⚡', title: '关键行为', subtitle: '适应性与压力决策', colorClass: 'green' },
  { icon: '⚠️', title: '脱轨预警', subtitle: '独立预警，不参与总分', colorClass: 'red' }
];

const steps = [
  { title: '进入测评', desc: '完成80道行为题，凭直觉作答' },
  { title: '生成图谱', desc: '系统实时计算生成专属潜力图谱' },
  { title: '获取报告', desc: '获取优势解析、发展建议与预警提示' }
];

const cognitionModules = [
  { dimension: '基础能力', source: '《能力孵化》', module: '智力模块', detail: '晶体智力、流体智力；IQ对复杂工作绩效有预测力；工作越复杂，智力越重要。' },
  { dimension: '情境输入', source: '《高潜力人才的5大关键能力》', module: '情境感知能力', detail: '读取环境、理解关键利益相关者期望、适应上级与组织风格。' },
  { dimension: '信息加工', source: '《高潜力人才的5大关键能力》', module: '化繁为简能力', detail: '将散乱数据转化为洞见；识别不同层级信息需求；用三步法提炼核心。' },
  { dimension: '判断决策', source: '《高潜》', module: '提高思考及判断能力', detail: '独立思考、深度思考；提升视野格局、保持动态思维、拓展多元人脉。' },
  { dimension: '学习迭代', source: '《高潜力人才的5大关键能力》', module: '加速学习能力', detail: '把洞见转化为绩效；从经历中学习；持续迭代认知。' },
  { dimension: '调节风险', source: '《能力孵化》', module: '性格与脱轨风险', detail: '性格影响认知发挥；脱轨风险会削弱高潜认知优势。' }
];

const interpersonalModules = [
  { dimension: '识人用人', source: '《高潜》', module: '发掘才华', detail: '识别团队成员的优势与潜力，把人放在对的位置上。', position: '入口：找到对的人' },
  { dimension: '发展他人', source: '《高潜》', module: '持续培养', detail: '有意识地投资于他人成长，建立人才培养的日常机制。', position: '加工：让人变得更强' },
  { dimension: '人员调整', source: '《高潜》', module: '及时调整', detail: '在必要时果断做出人员调整，不让不合适的人拖累团队。', position: '纠偏：保持团队质量' },
  { dimension: '组织协同', source: '《高潜》', module: '组织协同', detail: '打破部门壁垒，让不同单元围绕共同目标协作。', position: '横向：连接组织节点' },
  { dimension: '团队领导', source: '《高潜力人才的5大关键能力》', module: '领导团队', detail: '人才乘数效应——你的团队是你的“左膀右臂”；专注于团队发展，激发潜力。', position: '放大：通过团队放大个人产出' },
  { dimension: '关系构建', source: '《高潜力人才的5大关键能力》', module: '全面把控', detail: '构建牢靠的合作关系，让团队积极参与；适应不确定状态。', position: '底盘：合作关系是任务成功的基础' },
  { dimension: '风险调节', source: '《能力孵化》', module: '性格与脱轨风险', detail: '负面性格特质或特质“过度使用”可能导致人际层面的领导力灾难。', position: '贯穿：调节人际效能的稳定性' }
];

const motivationModules = [
  { dimension: '意义驱动', source: '《高潜》', module: '高潜三项特质', detail: '敢于构想大格局、勇于突破不可能、善于构建生态圈——内在的成就抱负与格局追求。', position: '方向：为什么而驱动' },
  { dimension: '满足感驱动', source: '《高潜》', module: '工作满足的四个标准', detail: '忠于自我、富有意义、全心投入、发挥优势。', position: '燃料：驱动力的质量检验' },
  { dimension: '学习驱动', source: '《高潜力人才的5大关键能力》', module: '加速学习的内在循环', detail: '从每一次经历中学习；一切始于多样化学习；将洞见转化为绩效。', position: '引擎：驱动力的运转机制' },
  { dimension: '双因素调节', source: '《能力孵化》', module: '激励因素与保健因素', detail: '保健因素消除不满，激励因素产生真正的内在驱动。', position: '调节：驱动力的底层结构' },
  { dimension: '脱轨预警', source: '《能力孵化》', module: '动机的过度使用与偏转', detail: '成就动机可能异化为对权力或认可的过度追逐，导致脱轨。', position: '风险：驱动力的失控信号' }
];

const behaviorModules = [
  { dimension: '时间效能行为', source: '《高潜》', module: '提高时间回报', detail: '敢用牛人、聚焦重点、善用信息、授权跟进、帮助成长、建立机制、果断决策。', position: '起点：把精力投在最高杠杆处' },
  { dimension: '创意执行行为', source: '《高潜》', module: '创意与执行', detail: '制定目标聚焦重点、了解进展及时准确、推动落实严格跟进。', position: '转化：把想法变成结果' },
  { dimension: '环境扫描行为', source: '《高潜》', module: '研究客户、对手与环境', detail: '端到端梳理用户体验全过程，把握关键点，重新认识经营。', position: '输入：持续获取外部信号' },
  { dimension: '信任构建行为', source: '《高潜力人才的5大关键能力》', module: '情境感知', detail: '感知并灵活应对4个机会区、找准并适应上级工作风格、避免触碰雷区、与难相处的上级共事。', position: '入口：建立向上信任关系' },
  { dimension: '团队领导行为', source: '《高潜力人才的5大关键能力》', module: '领导团队', detail: '人才乘数效应、领导团队5大核心技巧、接受上级评估。', position: '放大：通过团队放大产出' },
  { dimension: '挑战应对行为', source: '《高潜力人才的5大关键能力》', module: '全面把控', detail: '适应不确定状态、5次重要谈话让上级参与、构建合作关系、拒绝4类任务。', position: '底盘：在高挑战任务中保持稳定' },
  { dimension: '特质调节行为', source: '《能力孵化》', module: '性格特质的行为表现', detail: '尽责性、调整性、好奇心、冒险精神、模糊接受度。', position: '调节器：性格特质驱动行为模式' },
  { dimension: '经验学习行为', source: '《能力孵化》', module: '经验与刻意练习', detail: '1万小时理论、刻意练习、三种晋升路径、可迁移经验分析。', position: '引擎：通过经验积累驱动行为升级' },
  { dimension: '脱轨预警行为', source: '《能力孵化》', module: '负面性格的行为信号', detail: '可恶型、狂妄型、可悲型脱轨行为；暗黑特质十种表现。', position: '风险：识别行为偏转信号' }
];

const derailmentModules = [
  { dimension: '表层表现', source: '脱轨类型', module: '可恶型；狂妄型；可悲型', detail: '可恶型：恶意伤害他人；狂妄型：自负无视他人；可悲型：盲目乐观、缺乏风险警觉。', position: '识别类型' },
  { dimension: '成因结构', source: '毒三角', module: '破坏性领导者+易受影响的追随者+纵容性/不良环境', detail: '脱轨不是单一因素，而是领导者、追随者与环境三者交互作用的结果。', position: '分析成因' },
  { dimension: '深层人格', source: '暗黑特质', module: '竞争障碍者、马基雅维利主义者、自恋狂；十种表现清单', detail: '可归纳为：侵略性行为、不正常生活方式、人际关系不佳、支配欲、权力感、自我膨胀、低同理心等。', position: '评估深层特质' },
  { dimension: '触发机制', source: '核心特质过度使用', module: '尽责性、调整性、好奇心、冒险精神、模糊接受度、竞争性', detail: '正向特质被过度使用后，转化为脱轨风险。', position: '追踪触发机制' },
  { dimension: '诊断链条', source: '四步识别', module: '识别类型 → 分析成因 → 评估深层特质 → 追踪触发机制', detail: '从表层到深层、从个体到环境的完整风险监测系统。', position: '完整风险监测' }
];

const overuseTable = [
  { trait: '尽责性', pros: '有条理、自律、可靠', cons: '僵化、完美主义、微观管理' },
  { trait: '调整性', pros: '情绪稳定、抗压', cons: '对风险麻木、缺乏紧迫感' },
  { trait: '好奇心', pros: '开放、乐于探索', cons: '注意力分散、难以深耕' },
  { trait: '冒险精神', pros: '敢于尝试、有魄力', cons: '鲁莽、不计后果' },
  { trait: '模糊接受度', pros: '在不确定中保持灵活', cons: '缺乏方向感、决策拖延' },
  { trait: '竞争性', pros: '追求卓越、有驱动力', cons: '攻击性、不择手段、破坏合作' }
];
</script>

<style scoped>
/* ================= 全局基础样式 ================= */
.home { 
  min-height: 100vh; 
  padding-bottom: 100px; 
  max-width: 1200px; 
  margin: 0 auto; 
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Source Han Sans', 'Segoe UI', Roboto, sans-serif; 
}

/* ================= 1. Hero 区 ================= */
.hero { 
  background: linear-gradient(135deg, #0A1628 0%, #1E3A8A 50%, #3B82F6 100%); 
  padding: 60px 20px 50px; 
  border-radius: 0 0 30px 30px; 
  text-align: center; 
  position: relative; 
  overflow: hidden; 
}
.hero::after { 
  content: ''; 
  position: absolute; 
  top: -50%; 
  right: -20%; 
  width: 80%; 
  height: 200%; 
  background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%); 
  transform: rotate(30deg); 
}
.hero-content { 
  max-width: 640px; 
  margin: 0 auto; 
  position: relative; 
  z-index: 1; 
  text-align: center; 
}

/* 核心：标题显式白色 + 居中 */
.hero h1 { 
  font-size: 30px; 
  color: #FFFFFF; 
  margin: 0 0 20px; 
  letter-spacing: 2px; 
  font-weight: 700; 
  text-align: center; 
  line-height: 1.3; 
}

.tags { 
  display: flex; 
  justify-content: center; 
  gap: 10px; 
  margin-bottom: 20px; 
}
.tag { 
  border: 1px solid rgba(255,255,255,0.6); 
  border-radius: 8px; 
  padding: 5px 15px; 
  font-size: 13px; 
  color: #FFFFFF; 
  background: rgba(255,255,255,0.1); 
  backdrop-filter: blur(4px); 
}
.desc { 
  font-size: 15px; 
  color: #FFFFFF; 
  line-height: 1.6; 
  opacity: 0.92; 
  margin-bottom: 32px; 
  text-align: center; 
}
.hero-stats { 
  display: flex; 
  justify-content: space-around; 
  padding: 20px 10px; 
  background: rgba(255,255,255,0.12); 
  backdrop-filter: blur(10px); 
  border-radius: 12px; 
  border: 1px solid rgba(255,255,255,0.2); 
}
.stat-item { 
  text-align: center; 
}
.stat-item .num { 
  display: block; 
  font-size: 26px; 
  font-weight: 700; 
  color: #FFFFFF; 
  margin-bottom: 4px; 
  letter-spacing: -0.5px; 
  text-shadow: 0 2px 8px rgba(0,0,0,0.15); 
}
.stat-item .unit { 
  font-size: 12px; 
  color: rgba(255,255,255,0.95); 
  letter-spacing: 0.5px; 
}

@media (max-width: 480px) {
  .hero h1 { font-size: 24px; letter-spacing: 1px; }
  .hero { padding: 48px 16px 40px; }
}
@media (min-width: 768px) {
  .hero h1 { font-size: 38px; }
}

/* ================= 2. 通用 Section 卡片 ================= */
.section-card { 
  background: #fff; 
  margin: 16px; 
  border-radius: 12px; 
  padding: 24px; 
  box-shadow: 0 4px 16px rgba(0,0,0,0.04); 
  border: 1px solid #E2E8F0; 
}
.section-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: baseline; 
  margin-bottom: 16px; 
}
.section-header h3 { 
  font-size: 18px; 
  color: #1E3A8A; 
  font-weight: 700; 
  letter-spacing: 0.5px; 
}
.header-hint { 
  font-size: 12px; 
  color: #3B82F6; 
  background: #EFF6FF; 
  padding: 2px 8px; 
  border-radius: 6px; 
  font-weight: 500; 
}
.section-desc { 
  font-size: 14px; 
  color: #475569; 
  line-height: 1.6; 
  margin-bottom: 16px; 
}

/* ================= 3. 理论基础模块 ================= */
.theory-list { 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
}
.theory-item { 
  background: #F1F5F9; 
  border-radius: 8px; 
  padding: 14px 16px; 
  border-left: 3px solid #1E3A8A; 
  transition: transform 0.2s; 
}
.theory-item:hover { 
  transform: translateX(4px); 
}
.book-name { 
  font-size: 16px; 
  font-weight: 700; 
  color: #1E3A8A; 
  margin-bottom: 6px; 
}
.book-desc { 
  font-size: 14px; 
  color: #475569; 
  line-height: 1.6; 
}

/* ================= 4. 评估维度全景 ================= */
.dimension-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 16px; 
}
@media (min-width: 768px) { 
  .dimension-grid { 
    grid-template-columns: repeat(3, 1fr); 
  } 
}

.dim-card { 
  background: #FFFFFF; 
  border-radius: 12px; 
  padding: 28px 16px 24px; 
  text-align: center; 
  box-shadow: 0 4px 16px rgba(0,0,0,0.03); 
  border: 1px solid #E2E8F0; 
  transition: all 0.3s ease; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
}
.dim-card:hover { 
  box-shadow: 0 8px 24px rgba(0,0,0,0.06); 
  transform: translateY(-4px); 
  border-color: #CBD5E1; 
}

.icon-wrap { 
  width: 80px; 
  height: 80px; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  margin-bottom: 18px; 
  font-size: 44px; 
  line-height: 1; 
  transition: transform 0.3s;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.02); 
}
.dim-card:hover .icon-wrap { 
  transform: scale(1.06); 
}

.icon-wrap .icon { 
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: inherit;
  transform: translateY(1px);
}

.icon-wrap.navy { background: #EFF6FF; }
.icon-wrap.blue { background: #F0F7FF; }
.icon-wrap.orange { background: #FFF7E6; }
.icon-wrap.green { background: #E8F8F0; }
.icon-wrap.red { background: #FFF1F0; }

.dim-card .title { 
  font-size: 16px; 
  font-weight: 700; 
  color: #1E3A8A; 
  margin-bottom: 6px; 
}
.dim-card .subtitle { 
  font-size: 12px; 
  color: #64748B; 
  font-weight: 500; 
}

/* ================= 5. 折叠面板 ================= */
:deep(.van-collapse) { 
  border: none; 
  background: transparent; 
}
:deep(.van-collapse-item) { 
  margin-bottom: 14px; 
  border-radius: 12px; 
  overflow: hidden; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.03); 
  background: #fff; 
  border: 1px solid #E2E8F0; 
}
:deep(.van-collapse-item__title) { 
  padding: 0; 
  background: transparent; 
  border: none; 
}
:deep(.van-collapse-item__content) { 
  padding: 16px 20px 20px; 
  background: #fff; 
}
.custom-title { 
  display: flex; 
  align-items: center; 
  padding: 18px 20px; 
  background: #FFFFFF; 
  transition: background-color 0.2s; 
  border-left: 6px solid #ccc; 
}
.custom-title:active { 
  background: #EFF6FF; 
}
.title-icon { 
  font-size: 20px; 
  margin-right: 12px; 
}
.title-text { 
  flex: 1; 
  font-size: 16px; 
  font-weight: 700; 
  color: #1E3A8A; 
  letter-spacing: 0.5px; 
}
.title-hint { 
  font-size: 12px; 
  color: #3B82F6; 
  font-weight: 500; 
}
:deep(.van-collapse-item--expanded .custom-title) { 
  background: #EFF6FF; 
  border-bottom: 1px solid #E2E8F0; 
}
:deep(.van-collapse-item--expanded .title-text) { 
  color: #1E3A8A; 
}
.collapse-purple .custom-title { border-left-color: #1E3A8A; }
.collapse-blue .custom-title { border-left-color: #3B82F6; }
.collapse-orange .custom-title { border-left-color: #F59E0B; }
.collapse-green .custom-title { border-left-color: #10B981; }
.collapse-red .custom-title { border-left-color: #EF4444; }

.module-list { 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
  margin-top: 10px; 
}
.module-item { 
  background: #F1F5F9; 
  padding: 16px; 
  border-radius: 0 8px 8px 0; 
  border: 1px solid #E2E8F0; 
  border-left-width: 4px; 
}
.item-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 8px; 
}
.source-tag { 
  font-size: 12px; 
  color: #64748B; 
  font-weight: 500; 
}
.module-name { 
  font-size: 16px; 
  font-weight: 700; 
  color: #1E3A8A; 
  margin-bottom: 6px; 
}
.module-detail { 
  font-size: 14px; 
  color: #475569; 
  line-height: 1.6; 
}
.cognition-item { border-left-color: #1E3A8A; }
.interpersonal-item { border-left-color: #3B82F6; }
.motivation-item { border-left-color: #F59E0B; }
.behavior-item { border-left-color: #10B981; }
.derailment-item { border-left-color: #EF4444; }

.dim-tag { 
  color: #fff; 
  font-size: 12px; 
  padding: 2px 8px; 
  border-radius: 4px; 
  font-weight: 500; 
}
.dim-tag.purple { background: #1E3A8A; }
.dim-tag.blue { background: #3B82F6; }
.dim-tag.orange { background: #F59E0B; }
.dim-tag.green { background: #10B981; }
.dim-tag.red { background: #EF4444; }

.chain-position { 
  margin-top: 10px; 
  padding: 6px 10px; 
  border-radius: 6px; 
  font-size: 12px; 
  display: inline-block; 
  font-weight: 500; 
}
.blue-chain { background: #EFF6FF; color: #1E3A8A; }
.orange-chain { background: #FFF7E6; color: #F59E0B; }
.green-chain { background: #E8F8F0; color: #10B981; }
.red-chain { background: #FFF1F0; color: #EF4444; }
.chain-label { font-weight: 700; }

.overuse-section { 
  margin-top: 24px; 
  padding-top: 16px; 
  border-top: 1px dashed #E5E5E5; 
}
.overuse-section h4 { 
  font-size: 16px; 
  color: #1E3A8A; 
  margin-bottom: 8px; 
}
.overuse-intro { 
  font-size: 12px; 
  color: #64748B; 
  margin-bottom: 16px; 
}
.overuse-list { 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
}
.overuse-item { 
  background: #F1F5F9; 
  border-radius: 8px; 
  padding: 12px; 
  border: 1px solid #E2E8F0; 
}
.trait-name { 
  font-size: 16px; 
  font-weight: 700; 
  color: #1E3A8A; 
  margin-bottom: 8px; 
  text-align: center; 
}
.trait-compare { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  gap: 8px; 
}
.trait-box { 
  flex: 1; 
  padding: 8px; 
  border-radius: 6px; 
  text-align: center; 
}
.tag-label { 
  font-size: 12px; 
  display: block; 
  margin-bottom: 4px; 
  font-weight: 700; 
}
.trait-box p { 
  font-size: 14px; 
  margin: 0; 
  line-height: 1.5; 
  color: #1E3A8A; 
}
.trait-box.pros { background: #E8F8F0; color: #10B981; }
.trait-box.pros .tag-label { color: #10B981; }
.trait-box.cons { background: #FFF1F0; color: #EF4444; }
.trait-box.cons .tag-label { color: #EF4444; }
.trait-arrow { 
  font-size: 16px; 
  color: #64748B; 
}

/* ================= 6. 评估流程 ================= */
.step-timeline { 
  display: flex; 
  flex-direction: column; 
  gap: 0; 
}
.step-item { 
  display: flex; 
  gap: 16px; 
  position: relative; 
  padding-bottom: 24px; 
}
.step-item:last-child { 
  padding-bottom: 0; 
}
.step-item::before { 
  content: ''; 
  position: absolute; 
  left: 15px; 
  top: 30px; 
  bottom: 0; 
  width: 1px; 
  background: #E2E8F0; 
}
.step-item:last-child::before { 
  display: none; 
}
.step-num { 
  width: 30px; 
  height: 30px; 
  background: #1E3A8A; 
  color: #fff; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 14px; 
  font-weight: 700; 
  flex-shrink: 0; 
  z-index: 1; 
  box-shadow: 0 4px 8px rgba(30, 58, 138, 0.25); 
}
.step-content { 
  flex: 1; 
  padding-top: 4px; 
}
.step-title { 
  font-size: 16px; 
  font-weight: 700; 
  color: #1E3A8A; 
  margin-bottom: 4px; 
}
.step-desc { 
  font-size: 14px; 
  color: #475569; 
  line-height: 1.5; 
}

/* ================= 7. 底部 ================= */
.footer-section { 
  padding: 20px 16px; 
  text-align: center; 
}
.privacy-badge { 
  display: inline-flex; 
  align-items: center; 
  gap: 6px; 
  background: #EFF6FF; 
  padding: 8px 16px; 
  border-radius: 8px; 
  margin-bottom: 20px; 
  cursor: pointer; 
  transition: background 0.2s; 
}
.privacy-badge:active { 
  background: #DBEAFE; 
}
.lock-icon { 
  font-size: 14px; 
}
.privacy-badge span { 
  font-size: 12px; 
  color: #3B82F6; 
  font-weight: 500; 
}
.start-btn { 
  height: 54px; 
  font-size: 16px; 
  font-weight: 700; 
  background: linear-gradient(135deg, #1E3A8A 0%, #06B6D4 100%); 
  border: none; 
  box-shadow: 0 8px 24px rgba(30, 58, 138, 0.25); 
  letter-spacing: 1px; 
  transition: all 0.3s; 
}
.start-btn:active { 
  transform: scale(0.98); 
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.15); 
}
</style>
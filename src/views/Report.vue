<template>
  <div class="report-page" v-if="report">
    <!-- 0. 全局顶部导航栏 -->
    <div class="app-header">
      <div class="header-left" @click="goHome">
        <van-icon name="arrow-left" size="16" color="#FFFFFF" />
      </div>
      <span class="header-title">职场潜力评估 · 报告页</span>
      <div class="header-right"></div>
    </div>

    <!-- 1. 报告标题区 -->
    <div class="hero-section">
      <h1 class="hero-title">职场潜力评估报告</h1>
      <div class="hero-tags">
        <span class="hero-tag">职业深度版</span>
        <span class="hero-tag">基于多维潜力模型</span>
      </div>
    </div>

    <!-- 报告主体（用于导出） -->
    <div id="report-content">
      <!-- 2. 核心类型卡片 -->
      <div class="header-section">
        <div class="type-card">
          <h2 class="type-title">{{ report.potentialType }}</h2>
          <div class="type-keywords">
            <span>关键词：</span>
            <span v-for="tag in report.topTags" :key="tag" class="keyword">{{ tag }}</span>
          </div>
          <div class="desc-block">
            <p><strong>你擅长：</strong>{{ report.comboFeature }}</p>
            <p><strong>组合打法：</strong>{{ report.comboPlay }}</p>
          </div>
          <div v-if="report.riskLevel !== 'low'" class="warning-box">
            <span>⚠️ 注意：</span>{{ report.warningText }}
          </div>
        </div>
      </div>

      <!-- 3. 四大维度总览雷达图 -->
      <div class="chart-section">
        <h3>📊 潜力能力图谱</h3>
        <RadarChart :scores="report.dimensionScores" :height="280" radius="62%" :fontSize="13" />
        <div class="suitability">
          <div class="tags-row">
            <span class="label">✅ 更适合：</span>
            <span v-for="role in report.suitableRoles" :key="role" class="pill green">{{ role }}</span>
          </div>
          <div class="tags-row">
            <span class="label">❌ 不太适合：</span>
            <span v-for="role in report.unsuitableRoles" :key="role" class="pill red">{{ role }}</span>
          </div>
        </div>
      </div>

      <!-- 4. 【新增】细分模块雷达图（2×2 网格） -->
      <div class="sub-radar-section">
        <h3>🔬 细分模块雷达图</h3>
        <p class="sub-radar-desc">四大维度下的细分模块强弱分布，帮您精准定位优势与短板</p>
        <div class="sub-radar-grid">
          <div
            v-for="dim in report.sortedDimensions"
            :key="'radar-' + dim.key"
            class="sub-radar-card"
          >
            <div class="sub-radar-header">
              <span class="sub-icon">{{ dim.icon }}</span>
              <span class="sub-name">{{ dim.name }}</span>
              <span class="sub-score">{{ report.dimensionInsights[dim.key].dimAvg }}</span>
            </div>
            <RadarChart
              :indicators="buildIndicators(report.dimensionInsights[dim.key].nodes)"
              :values="buildValues(report.dimensionInsights[dim.key].nodes)"
              :height="240"
              radius="58%"
              :fontSize="10"
            />
          </div>
        </div>
      </div>

      <!-- 5. 大维度排名 -->
      <div class="ranking-section">
        <div class="section-header">
          <h3>📋 四大维度总览</h3>
          <span>按强度排序</span>
        </div>
        <div v-for="(item, index) in report.sortedDimensions" :key="item.key" class="ranking-item">
          <span class="rank-num">{{ index + 1 }}</span>
          <span class="rank-name">{{ item.icon }} {{ item.name }}</span>
          <van-progress :percentage="item.score / 5 * 100" color="#1E3A8A" track-color="#F8FAFC" :show-pivot="false" />
          <span class="rank-score">{{ item.score.toFixed(1) }}</span>
          <span class="rank-label" :class="getScoreLevelClass(item.score)">{{ getScoreLevel(item.score) }}</span>
        </div>
      </div>

      <!-- 6. 细分模块深度解析 -->
      <div class="detail-section">
        <h3>🔍 细分模块深度解析</h3>
        <div v-for="dim in report.sortedDimensions" :key="dim.key" class="dim-block">
          <div class="dim-header">
            <span class="dim-icon">{{ dim.icon }}</span>
            <div class="dim-title-wrap">
              <h4>{{ dim.name }}</h4>
              <span class="dim-score">{{ report.dimensionInsights[dim.key].dimAvg }} / 5</span>
            </div>
          </div>
          <p class="dim-summary">{{ report.dimensionInsights[dim.key].summary }}</p>
          <div class="node-list">
            <div v-for="node in report.dimensionInsights[dim.key].nodes" :key="node.node" class="node-item">
              <div class="node-header">
                <span class="node-name">{{ node.displayName }}</span>
                <span class="node-score-badge" :class="node.level.class">{{ node.score.toFixed(1) }}</span>
              </div>
              <p class="node-desc">{{ node.description }}</p>
              <div class="node-bar">
                <div class="node-bar">
                 <div class="node-bar-fill" :style="getBarStyle(node.score)"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 7. 典型工作模式 -->
      <div class="footer-section">
        <div class="work-mode-card">
          <h4>💼 你的典型工作模式</h4>
          <p>{{ report.workMode }}</p>
        </div>
      </div>
    </div>

    <!-- 8. 操作按钮区 -->
    <div class="action-bar">
      <van-button round block plain @click="savePDF" :loading="exporting">保存报告PDF</van-button>
      <van-button round block type="primary" @click="sharePoster" :loading="exporting">生成分享图片</van-button>
    </div>
  </div>

  <!-- 空状态 -->
  <div class="empty-state" v-else>
    <div class="empty-icon">📄</div>
    <h2>暂无评估报告</h2>
    <p>您还没有完成职场潜力评估，请先完成测评以生成专属报告。</p>
    <van-button type="primary" round block @click="goHome" class="empty-btn">开始测评</van-button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '@/stores/quizStore';
import RadarChart from '@/components/RadarChart.vue';
import { showToast } from 'vant';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const router = useRouter();
const quizStore = useQuizStore();
const report = computed(() => quizStore.reportData);
const exporting = ref(false);

const goHome = () => router.push('/');

/* 构建细分雷达图的 indicators 和 values */
const buildIndicators = (nodes) => {
  return nodes.map(n => ({
    name: n.displayName,
    max: 5
  }));
};
const buildValues = (nodes) => {
  return nodes.map(n => n.score);
};

const getScoreLevel = (score) => {
  if (score >= 4.5) return '突出潜能';
  if (score >= 4.0) return '较明显优势';
  if (score >= 3.0) return '一般倾向';
  return '待提升';
};
const getScoreLevelClass = (score) => {
  if (score >= 4.0) return 'level-high';
  if (score >= 3.0) return 'level-mid';
  return 'level-low';
};
const getBarStyle = (score) => {
  let bg = '#94A3B8'; // 默认灰（待提升）
  if (score >= 4.0) bg = '#10B981';        // 翠绿（突出）
  else if (score >= 3.0) bg = '#3B82F6';   // 亮蓝（一般）
  return {
    width: (score / 5 * 100) + '%',
    background: bg
  };
};

/* 导出 Canvas */
const generateCanvas = async () => {
  const element = document.getElementById('report-content');
  if (!element) throw new Error('报告内容未找到');
  return await html2canvas(element, {
    backgroundColor: '#F5F7FA',
    scale: window.devicePixelRatio > 1 ? 2 : 1.5,
    useCORS: true,
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight
  });
};

/* 保存为 PDF */
const savePDF = async () => {
  if (exporting.value) return;
  exporting.value = true;
  showToast({ message: '正在生成 PDF，请稍候...', position: 'bottom' });
  try {
    const canvas = await generateCanvas();
    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save(`职场潜力评估报告_${new Date().toISOString().slice(0,10)}.pdf`);
    showToast({ message: 'PDF 已保存', position: 'bottom' });
  } catch (e) {
    console.error(e);
    showToast({ message: '生成失败，请稍后重试', position: 'bottom' });
  } finally {
    exporting.value = false;
  }
};

/* 保存为图片 */
const sharePoster = async () => {
  if (exporting.value) return;
  exporting.value = true;
  showToast({ message: '正在生成图片，请稍候...', position: 'bottom' });
  try {
    const canvas = await generateCanvas();
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `职场潜力评估报告_${new Date().toISOString().slice(0,10)}.png`;
    link.href = imgData;
    link.click();
    showToast({ message: '图片已保存', position: 'bottom' });
  } catch (e) {
    console.error(e);
    showToast({ message: '生成失败，请稍后重试', position: 'bottom' });
  } finally {
    exporting.value = false;
  }
};
</script>

<style scoped>
#report-content { background: transparent; }

/* 顶部导航 */
.app-header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  color: #FFFFFF;
  position: relative;
  z-index: 10;
}
.header-left {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; border-radius: 50%; transition: background 0.2s;
}
.header-left:active { background: rgba(255,255,255,0.15); }
.header-title { font-size: 15px; font-weight: 500; letter-spacing: 1px; opacity: 0.95; }
.header-right { width: 40px; }

/* 标题区 */
.hero-section { text-align: center; padding: 20px 20px 32px; }
.hero-title { font-size: 26px; font-weight: 700; color: #FFFFFF; letter-spacing: 2px; margin: 0 0 16px; }
.hero-tags { display: flex; justify-content: center; gap: 10px; }
.hero-tag {
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 20px;
  padding: 5px 16px;
  font-size: 13px;
  color: #FFFFFF;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(4px);
  font-weight: 500;
}

#report-content { background: #F5F7FA; }

/* 核心类型卡片 */
.header-section { margin: 0 16px 16px; }
.type-card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 8px 32px rgba(43, 72, 101, 0.08); border: 1px solid #E2E8F0; }
.type-title { font-size: 24px; color: #1E3A8A; margin-bottom: 12px; font-weight: 700; }
.type-keywords { font-size: 14px; color: #3B82F6; margin-bottom: 16px; font-weight: 500; }
.type-keywords .keyword { color: #1E3A8A; font-weight: 700; margin-right: 8px; }
.desc-block p { font-size: 14px; color: #475569; line-height: 1.7; margin-bottom: 8px; }
.warning-box { background: #FFF7E6; color: #D46B08; padding: 12px; border-radius: 8px; font-size: 13px; margin-top: 12px; border-left: 4px solid #F59E0B; line-height: 1.6; }

/* 雷达图区 */
.chart-section { background: #fff; margin: 0 16px 16px; border-radius: 16px; padding: 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); border: 1px solid #E2E8F0; }
.chart-section h3 { font-size: 16px; color: #1E3A8A; margin-bottom: 16px; font-weight: 700; }
.suitability { margin-top: 16px; background: #F1F5F9; padding: 16px; border-radius: 12px; }
.tags-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 12px; font-size: 13px; }
.tags-row:last-child { margin-bottom: 0; }
.pill { padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.pill.green { background: #E8F8F0; color: #10B981; }
.pill.red { background: #FFF1F0; color: #EF4444; }

/* 【新增】细分模块雷达图区 */
.sub-radar-section { margin: 0 16px 16px; }
.sub-radar-section > h3 { font-size: 16px; color: #1E3A8A; margin-bottom: 8px; font-weight: 700; }
.sub-radar-desc { font-size: 13px; color: #3B82F6; margin-bottom: 16px; line-height: 1.5; }
.sub-radar-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 600px) { .sub-radar-grid { grid-template-columns: 1fr 1fr; } }
.sub-radar-card {
  background: #fff;
  border-radius: 16px;
  padding: 16px 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
  border: 1px solid #E2E8F0;
}
.sub-radar-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #E2E8F0;
  margin-bottom: 8px;
}
.sub-icon { font-size: 20px; }
.sub-name { flex: 1; font-size: 14px; font-weight: 700; color: #1E3A8A; }
.sub-score {
  font-size: 16px;
  font-weight: 700;
  color: #1E3A8A;
  background: #EFF6FF;
  padding: 2px 10px;
  border-radius: 12px;
}

/* 大维度排名 */
.ranking-section { background: #fff; margin: 0 16px 16px; border-radius: 16px; padding: 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); border: 1px solid #E2E8F0; }
.section-header { display: flex; justify-content: space-between; margin-bottom: 20px; color: #64748B; font-size: 13px; font-weight: 500; }
.section-header h3 { font-size: 16px; color: #1E3A8A; font-weight: 700; }
.ranking-item { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.ranking-item:last-child { margin-bottom: 0; }
.rank-num { width: 24px; height: 24px; background: #1E3A8A; color: #fff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700; flex-shrink: 0; }
.rank-name { width: 110px; font-size: 14px; color: #0F172A; flex-shrink: 0; font-weight: 500; }
.rank-score { width: 32px; font-size: 14px; font-weight: 700; color: #1E3A8A; text-align: right; flex-shrink: 0; }
.rank-label { width: 65px; font-size: 12px; text-align: right; flex-shrink: 0; font-weight: 500; }
.level-high { color: #F59E0B; }
.level-mid { color: #1E3A8A; }
.level-low { color: #64748B; }

/* 细分模块 */
.detail-section { margin: 0 16px 16px; }
.detail-section > h3 { font-size: 16px; color: #1E3A8A; margin-bottom: 16px; font-weight: 700; }
.dim-block { background: #fff; border-radius: 16px; padding: 24px; margin-bottom: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); border: 1px solid #E2E8F0; }
.dim-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.dim-icon { font-size: 32px; }
.dim-title-wrap { flex: 1; display: flex; justify-content: space-between; align-items: baseline; }
.dim-title-wrap h4 { font-size: 18px; color: #1E3A8A; font-weight: 700; }
.dim-score { font-size: 14px; font-weight: 700; color: #1E3A8A; }
.dim-summary { font-size: 13px; color: #475569; line-height: 1.6; background: #F1F5F9; padding: 12px; border-radius: 8px; margin-bottom: 16px; border-left: 3px solid #1E3A8A; }
.node-list { display: flex; flex-direction: column; gap: 14px; }
.node-item { padding-bottom: 12px; border-bottom: 1px dashed #E2E8F0; }
.node-item:last-child { border-bottom: none; padding-bottom: 0; }
.node-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.node-name { font-size: 14px; font-weight: 700; color: #0F172A; }
.node-score-badge { font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 10px; }
.node-score-badge.level-top { background: #E8F8F0; color: #10B981; }
.node-score-badge.level-high { background: #E8F8F0; color: #10B981; }
.node-score-badge.level-mid { background: #EFF6FF; color: #1E3A8A; }
.node-score-badge.level-low { background: #F2F3F5; color: #64748B; }
.node-desc { font-size: 12px; color: #64748B; margin-bottom: 8px; line-height: 1.5; }
.node-bar { height: 6px; background: #EFF6FF; border-radius: 3px; overflow: hidden; }
.node-bar-fill {  height: 100%;  border-radius: 3px;  transition: width 0.6s ease;  /* background 由 JS 动态设置，这里不要写死 */}

/* 底部 */
.footer-section { margin: 0 16px 16px; }
.work-mode-card { background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%); border-radius: 16px; padding: 24px; border: 1px solid #CBD5E1; }
.work-mode-card h4 { font-size: 16px; margin-bottom: 8px; color: #1E3A8A; font-weight: 700; }
.work-mode-card p { font-size: 14px; color: #475569; line-height: 1.6; }

/* 操作按钮 */
.action-bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  display: flex;
  gap: 12px;
  padding: 16px 20px 28px;
  background: #FFFFFF;
  box-shadow: 0 -4px 16px rgba(0,0,0,0.04);
  max-width: 800px;
  margin: 0 auto;
  z-index: 10;
}
.action-bar .van-button { flex: 1; height: 48px; font-size: 16px; }

/* 空状态 */
.empty-state { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 32px; text-align: center; }
.empty-icon { font-size: 64px; margin-bottom: 24px; opacity: 0.6; }
.empty-state h2 { font-size: 20px; color: #1E3A8A; font-weight: 700; margin-bottom: 12px; }
.empty-state p { font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 32px; max-width: 320px; }
.empty-btn { height: 48px; font-size: 16px; background: #1E3A8A; border: none; max-width: 280px; }
</style>
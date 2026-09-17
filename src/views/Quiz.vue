<template>
  <div class="quiz-page">
    <!-- 0. 全局顶部标题栏 -->
    <div class="app-header">
      职场潜力评估 · 职业深度版
    </div>

    <!-- 1. 沉浸式操作区 -->
    <div class="header-action">
      <div class="header-content">
        <div class="back-btn" @click="handleBack">
          <van-icon name="arrow-left" size="14" color="#FFFFFF" />
          <span class="back-text">返回</span>
        </div>
        <span class="progress-text">测评进度 · {{ currentIndex + 1 }}/{{ questions.length }}</span>
      </div>
      <div class="progress-bar-wrap">
        <van-progress 
          :percentage="progressPercent" 
          stroke-width="4" 
          color="#FFFFFF" 
          track-color="rgba(255,255,255,0.3)" 
          :show-pivot="false"
        />
      </div>
    </div>

    <!-- 2. 题目卡片 -->
    <div class="question-card">
      <div class="question-number">QUESTION {{ currentIndex + 1 }} / {{ questions.length }}</div>
      <p class="question-text">{{ currentQuestion.text }}</p>

      <div class="hint-box">
        请根据您的真实情况选择：
      </div>

      <!-- 3. 选项区 -->
      <div class="options-list">
        <div
          v-for="score in [1,2,3,4,5]"
          :key="score"
          class="option-item"
          :class="{ active: answers[currentQuestion.id] === score }"
          @click="selectScore(score)"
        >
          <div class="radio-circle" :class="{ checked: answers[currentQuestion.id] === score }"></div>
          <span class="option-label">{{ scoreLabels[score - 1] }}</span>
        </div>
      </div>

      <!-- 行为证据输入 -->
      <div v-if="showEvidenceInput" class="evidence-input">
        <van-field
          v-model="evidenceText"
          type="textarea"
          rows="2"
          placeholder="可简述一个具体事件（时间/情境/结果），帮助报告更准确。（选填）"
        />
      </div>
    </div>

    <!-- 4. 底部操作栏 -->
    <div class="footer-actions">
      <van-button plain round :disabled="currentIndex === 0" @click="prev" class="prev-btn">
        ‹ 上一题
      </van-button>
      <van-button type="primary" round :disabled="!answers[currentQuestion.id]" @click="next" class="next-btn">
        {{ currentIndex === questions.length - 1 ? '生成报告' : '下一题 ›' }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '@/stores/quizStore';
import { showConfirmDialog } from 'vant';

const router = useRouter();
const quizStore = useQuizStore();
const currentIndex = ref(0);
const answers = ref({});
const evidenceText = ref('');
const showEvidenceInput = ref(false);

const questions = quizStore.questions;
const currentQuestion = computed(() => questions[currentIndex.value]);
const progressPercent = computed(() => Math.round(((currentIndex.value + 1) / questions.length) * 100));
const scoreLabels = ['非常不像我', '不太像我', '一般 / 不确定', '比较像我', '非常像我'];

const PROGRESS_KEY = 'potential_assessment_progress';

/* ========== 断点续答：进入时恢复 ========== */
onMounted(() => {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      const answeredCount = data.answers ? Object.keys(data.answers).length : 0;
      if (answeredCount > 0) {
        showConfirmDialog({
          title: '继续上次的作答？',
          message: `检测到您有未完成的作答（已答 ${answeredCount} 题），是否从上次中断处继续？`,
          confirmButtonText: '继续作答',
          cancelButtonText: '重新开始',
          confirmButtonColor: '#1E3A8A'
        }).then(() => {
          answers.value = data.answers || {};
          currentIndex.value = data.currentIndex || 0;
        }).catch(() => {
          localStorage.removeItem(PROGRESS_KEY);
        });
      }
    }
  } catch (e) {
    console.warn('读取进度失败', e);
  }

  // 刷新/关闭页面前的提示
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});

const handleBeforeUnload = (e) => {
  // 只有答过题且未完成时才提示
  if (Object.keys(answers.value).length > 0 && currentIndex.value < questions.length - 1) {
    e.preventDefault();
    e.returnValue = '';
  }
};

/* ========== 断点续答：每次变更保存 ========== */
watch([answers, currentIndex], () => {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      answers: answers.value,
      currentIndex: currentIndex.value
    }));
  } catch (e) {}
}, { deep: true });

/* ========== 业务逻辑 ========== */
const selectScore = (score) => {
  answers.value[currentQuestion.value.id] = score;
  showEvidenceInput.value = score <= 2 || score >= 4;
};

const next = () => {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++;
    evidenceText.value = '';
    showEvidenceInput.value = false;
  } else {
    quizStore.submitAnswers(answers.value);
    // 提交完成，清除断点进度
    localStorage.removeItem(PROGRESS_KEY);
    router.push('/report');
  }
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    evidenceText.value = '';
    showEvidenceInput.value = false;
  }
};

const handleBack = () => {
  const answeredCount = Object.keys(answers.value).length;
  if (answeredCount === 0) {
    router.push('/');
    return;
  }
  showConfirmDialog({
    title: '确认退出测评？',
    message: `您已完成 ${answeredCount} 道题目，进度已自动保存，下次进入可继续作答。`,
    confirmButtonText: '确认退出',
    cancelButtonText: '继续答题',
    confirmButtonColor: '#1E3A8A'
  }).then(() => {
    router.push('/');
  }).catch(() => {});
};
</script>

<style scoped>
.quiz-page { 
  min-height: 100vh; 
  padding-bottom: 100px;
  max-width: 800px; 
  margin: 0 auto; 
  position: relative;
}

.app-header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  position: relative;
  z-index: 10;
}

.header-action {
  padding: 10px 20px 30px;
  position: relative;
  z-index: 10;
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.6);
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(4px);
  cursor: pointer;
  transition: background 0.2s;
}
.back-btn:active { background: rgba(255,255,255,0.2); }
.back-text { font-size: 13px; color: #FFFFFF; font-weight: 500; }
.progress-text { font-size: 14px; color: #FFFFFF; font-weight: 500; letter-spacing: 0.5px; opacity: 0.95; }
.progress-bar-wrap { width: 100%; }

.question-card {
  background: #FFFFFF;
  border-radius: 20px;
  padding: 28px 24px;
  margin: 0 16px 16px;
  box-shadow: 0 12px 40px rgba(43, 72, 101, 0.1);
  position: relative;
  z-index: 20;
}
.question-number {
  font-size: 13px;
  font-weight: 700;
  color: #3B82F6;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
}
.question-text {
  font-size: 18px;
  line-height: 1.6;
  color: #0F172A;
  font-weight: 700;
  margin-bottom: 24px;
}
.hint-box {
  background: #F1F5F9;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 13px;
  color: #3B82F6;
  margin-bottom: 20px;
  line-height: 1.5;
}

.options-list { display: flex; flex-direction: column; gap: 12px; }
.option-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1.5px solid #E2E8F0;
  background: #FAFBFD;
  cursor: pointer;
  transition: all 0.2s ease;
}
.option-item:active { background: #EFF6FF; }
.radio-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #94A3B8;
  margin-right: 16px;
  flex-shrink: 0;
  position: relative;
  transition: all 0.2s;
}
.option-item.active {
  background: #EFF6FF;
  border-color: #1E3A8A;
  box-shadow: 0 4px 12px rgba(43, 72, 101, 0.08);
}
.option-item.active .radio-circle { border-color: #1E3A8A; }
.option-item.active .radio-circle::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #1E3A8A;
}
.option-label {
  font-size: 15px;
  color: #475569;
  font-weight: 500;
  transition: color 0.2s;
}
.option-item.active .option-label { color: #1E3A8A; font-weight: 700; }

.evidence-input { margin-top: 20px; }

.footer-actions {
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
.prev-btn {
  flex: 1;
  height: 50px;
  font-size: 16px;
  color: #1E3A8A;
  border-color: #1E3A8A;
  background: #FFFFFF;
}
.prev-btn[disabled] { color: #94A3B8; border-color: #E2E8F0; background: #FAFBFD; }
.next-btn {
  flex: 2;
  height: 50px;
  font-size: 16px;
  background: #1E3A8A;
  border: none;
  box-shadow: 0 4px 12px rgba(43, 72, 101, 0.2);
}
.next-btn[disabled] { background: #E5E6EB; color: #94A3B8; box-shadow: none; }
</style>
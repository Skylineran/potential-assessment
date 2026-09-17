import { defineStore } from 'pinia';
import { questions } from '@/data/questions';
// 修正：删除了已不存在的 calcWeightedScore 和 checkRisk，只保留实际使用的两个函数
import { calcDimensionScores, generateFullReport } from '@/utils/scoring';

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questions,
    answers: {},
    reportData: null
  }),
  actions: {
    submitAnswers(answers) {
      this.answers = answers;
      // 1. 计算各个维度的均分
      const scores = calcDimensionScores(this.answers, this.questions);
      // 2. 传入均分和答案，生成包含丰富内容的报告数据
      this.reportData = generateFullReport(scores, this.answers, this.questions);
    },
    reset() {
      this.answers = {};
      this.reportData = null;
    }
  }
});
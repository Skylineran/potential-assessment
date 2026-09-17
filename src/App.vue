<template>
  <router-view />
</template>

<style>
/* ========== 全局 Vant 主题变量 ========== */
:root {
  --van-primary-color: #1E3A8A;
  --van-success-color: #10B981;
  --van-warning-color: #F59E0B;
  --van-info-color: #3B82F6;
  --van-text-color: #0F172A;
  --van-background-color: #F8FAFC;
  --van-button-border-radius: 8px;
}

/* ========== 全局基础样式 ========== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Source Han Sans', 'Segoe UI', Roboto, sans-serif;
  color: #0F172A;
  font-size: 14px;
}

/* ========== 全局统一渐变背景（深海蓝 → 亮宝蓝 → 冷灰白） ========== */
body {
  background-color: #F8FAFC;
  background-image: linear-gradient(
    180deg,
    #0A1628 0%,                        /* 午夜蓝黑（顶部） */
    #1E3A8A 10%,                       /* 快速过渡到宝蓝 */
    rgba(30, 58, 138, 0.55) 22%,       /* 宝蓝淡出 */
    rgba(59, 130, 246, 0.25) 32%,      /* 亮蓝渐隐 */
    rgba(59, 130, 246, 0) 42%          /* 42% 处完全透明 */
  );
  background-repeat: no-repeat;
  background-size: 100% 100vh;
  background-attachment: fixed;
}

h1, h2, h3, h4 { font-weight: 700; }
</style>
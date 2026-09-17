<template>
  <div class="privacy-page">
    <div class="app-header">
      <div class="header-left" @click="goBack">
        <van-icon name="arrow-left" size="16" color="#FFFFFF" />
      </div>
      <span class="header-title">隐私说明</span>
      <div class="header-right"></div>
    </div>

    <div class="hero-section">
      <h1 class="hero-title">关于您的数据</h1>
      <p class="hero-subtitle">这个工具如何对待您的信息</p>
    </div>

    <div class="content-card">
      <div class="block">
        <h3>🔒 数据完全保存在您的设备上</h3>
        <p>您的所有答案、作答进度和评估报告，都只保存在您当前使用的浏览器本地（localStorage），我们无法看到、也无法获取您的任何作答内容。</p>
      </div>

      <div class="block">
        <h3>📡 不上传任何数据</h3>
        <p>本工具不包含任何数据上报功能，也不会使用 Google Analytics 或类似的数据统计工具。您的作答内容不会离开您的设备。</p>
      </div>

      <div class="block">
        <h3>❌ 不需要注册、不收集身份</h3>
        <p>我们不会要求您填写手机号、邮箱、姓名或公司名称。您可以直接开始测评，无需任何账号。</p>
      </div>

      <div class="block">
        <h3>⏳ 数据保留与删除</h3>
        <p>您的数据保留在浏览器中，直到：</p>
        <ul>
          <li>您主动清除浏览器数据</li>
          <li>您使用"无痕模式"关闭浏览器</li>
          <li>您更换设备或浏览器</li>
        </ul>
        <p>以上任一情况发生，报告将无法恢复，建议完成后导出为 PDF 或图片保存。</p>
      </div>

      <div class="block">
        <h3>🔧 工具用途</h3>
        <p>本工具用于帮助您对个人职业潜力进行大概评估，不构成专业测评意见，也不应作为任何人事决策的依据。</p>
      </div>

      <div class="block">
        <h3>📮 联系我们</h3>
        <p>如您有任何疑问，可通过 [您的邮箱] 与我们联系。</p>
      </div>
    </div>

    <div class="footer">
      <p>版本 v1.0 · 2026-09</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goBack = () => router.back();
</script>

<style scoped>
.privacy-page { min-height: 100vh; padding-bottom: 40px; max-width: 800px; margin: 0 auto; }

.app-header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  color: #FFFFFF;
}
.header-left {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; border-radius: 50%; transition: background 0.2s;
}
.header-left:active { background: rgba(255,255,255,0.15); }
.header-title { font-size: 15px; font-weight: 500; letter-spacing: 1px; opacity: 0.95; }
.header-right { width: 40px; }

.hero-section { text-align: center; padding: 20px 20px 24px; }
.hero-title { font-size: 24px; font-weight: 700; color: #FFFFFF; letter-spacing: 1px; margin: 0 0 8px; }
.hero-subtitle { font-size: 13px; color: rgba(255,255,255,0.85); margin: 0; }

.content-card {
  background: #fff;
  margin: 0 16px 16px;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(43, 72, 101, 0.08);
  border: 1px solid #E2E8F0;
}
.block { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px dashed #E2E8F0; }
.block:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
.block h3 { font-size: 15px; color: #1E3A8A; font-weight: 700; margin-bottom: 10px; }
.block p { font-size: 14px; color: #475569; line-height: 1.7; margin-bottom: 8px; }
.block ul { padding-left: 20px; margin: 8px 0; }
.block li { font-size: 14px; color: #475569; line-height: 1.8; }

.footer { text-align: center; padding: 16px; }
.footer p { font-size: 12px; color: #64748B; }
</style>
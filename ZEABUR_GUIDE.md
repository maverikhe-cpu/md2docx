# 🚀 Zeabur 部署完整指南

## 方式一：通过 GitHub 部署（推荐）⭐

这是最简单和推荐的方式，支持自动更新。

### 前置准备

1. **确保代码已推送到 GitHub**
   ```bash
   # 如果还没有推送，先执行：
   git remote add origin https://github.com/你的用户名/仓库名.git
   git branch -M main
   git push -u origin main
   ```

### 部署步骤

#### 步骤 1: 登录 Zeabur

1. 访问 [zeabur.com](https://zeabur.com)
2. 点击右上角 **"Sign In"** 或 **"登录"**
3. 选择 **"Continue with GitHub"** 使用 GitHub 账户登录（推荐）
   - 这样可以直接访问你的 GitHub 仓库
   - 或者使用邮箱注册

#### 步骤 2: 创建项目

1. 登录后，点击右上角的 **"New Project"** 或 **"创建项目"**
2. 选择项目区域（通常选择离你最近的区域，如 `Asia Pacific`）

#### 步骤 3: 导入 GitHub 仓库

1. 在项目页面，点击 **"Import from GitHub"** 或 **"从 GitHub 导入"**
2. 如果是第一次使用，需要授权 Zeabur 访问你的 GitHub 账户
   - 点击 **"Authorize"** 或 **"授权"**
   - 选择要授权的仓库范围（可以选择所有仓库或特定仓库）
3. 在仓库列表中找到你的 `md2docx` 仓库
4. 点击仓库名称或点击 **"Import"** 按钮

#### 步骤 4: 自动部署

1. Zeabur 会自动检测项目类型
   - 我们的项目会被识别为 **静态网站 (Static Site)**
   - 系统会自动使用 **Caddy** 服务器进行托管
2. 等待部署完成（通常 1-2 分钟）
   - 可以在部署日志中查看进度
   - 状态会从 "Building" → "Deploying" → "Running"

#### 步骤 5: 获取访问链接

1. 部署完成后，Zeabur 会自动生成一个域名
   - 格式：`你的项目名-随机字符.zeabur.app`
   - 例如：`md2docx-abc123.zeabur.app`
2. 点击域名即可访问你的应用！

---

## 方式二：直接上传本地项目

如果你不想使用 GitHub，可以直接上传项目文件。

### 部署步骤

#### 步骤 1: 准备项目文件

确保项目文件夹包含所有必要文件：
- ✅ `index.html`
- ✅ `styles.css`
- ✅ `app.js`
- ✅ `package.json`
- ✅ `zeabur.json`

#### 步骤 2: 压缩项目

1. 将整个 `md2docx` 文件夹压缩为 ZIP 文件
   - macOS: 右键文件夹 → "压缩"
   - Windows: 右键文件夹 → "发送到" → "压缩文件夹"
   - Linux: `zip -r md2docx.zip md2docx/`

#### 步骤 3: 登录 Zeabur

1. 访问 [zeabur.com](https://zeabur.com)
2. 登录你的账户

#### 步骤 4: 创建项目并上传

1. 点击 **"New Project"** 或 **"创建项目"**
2. 选择 **"Local Project"** 或 **"本地项目"**
3. 点击上传区域，选择你刚才压缩的 ZIP 文件
4. 等待上传完成

#### 步骤 5: 等待部署

1. Zeabur 会自动解压并识别项目类型
2. 等待部署完成（1-2 分钟）
3. 获取访问链接

---

## 📋 部署后配置

### 查看部署状态

在 Zeabur 项目页面，你可以看到：
- **部署状态**: Running（运行中）/ Building（构建中）/ Error（错误）
- **访问链接**: 点击即可访问应用
- **部署日志**: 查看详细的构建和部署信息

### 绑定自定义域名（可选）

1. 在项目设置中找到 **"Domains"** 或 **"域名"** 选项
2. 点击 **"Add Domain"** 或 **"添加域名"**
3. 输入你的域名（例如：`md2docx.yourdomain.com`）
4. 按照提示配置 DNS 记录：
   - 添加 **CNAME** 记录
   - 指向 Zeabur 提供的地址（例如：`xxx.zeabur.app`）
5. 等待 DNS 生效（通常几分钟到几小时）

### 环境变量

本项目不需要环境变量配置，所有功能都在客户端完成。

---

## 🔄 更新部署

### 通过 GitHub（自动更新）

每次你推送代码到 GitHub，Zeabur 会自动检测并重新部署：

```bash
# 修改代码后
git add .
git commit -m "更新内容"
git push

# Zeabur 会自动重新部署
```

### 直接上传（手动更新）

1. 修改代码后重新压缩项目
2. 在 Zeabur 项目页面点击 **"Redeploy"** 或 **"重新部署"**
3. 上传新的 ZIP 文件

---

## ❓ 常见问题

### Q1: 部署失败怎么办？

**检查清单：**
- ✅ 确认所有必需文件都已上传
- ✅ 检查 `package.json` 格式是否正确
- ✅ 查看 Zeabur 的部署日志获取详细错误信息
- ✅ 确认 `zeabur.json` 配置正确

**查看日志：**
- 在项目页面点击 **"Logs"** 或 **"日志"**
- 查看构建和部署过程中的错误信息

### Q2: 页面显示空白？

**可能原因和解决方案：**

1. **CDN 资源加载失败**
   - 打开浏览器开发者工具（F12）
   - 查看 Console 标签页的错误信息
   - 确认网络连接正常
   - 检查是否有 CORS 错误

2. **文件路径问题**
   - 确认所有资源文件（CSS、JS）都在正确位置
   - 检查 `index.html` 中的资源路径是否正确

3. **缓存问题**
   - 清除浏览器缓存
   - 使用无痕模式访问
   - 在 URL 后添加 `?v=1` 强制刷新

### Q3: 如何查看应用访问量？

- Zeabur 提供基本的访问统计
- 在项目设置中可以查看访问日志

### Q4: 免费计划有限制吗？

Zeabur 免费计划通常包括：
- 一定数量的部署
- 基本的资源配额
- 子域名访问

如需更多资源，可以升级到付费计划。

### Q5: 如何删除部署？

1. 在项目页面找到 **"Settings"** 或 **"设置"**
2. 滚动到底部
3. 点击 **"Delete Project"** 或 **"删除项目"**
4. 确认删除

---

## 🎯 快速检查清单

部署前确认：
- [ ] 所有文件已提交到 Git（如果使用 GitHub 方式）
- [ ] `package.json` 存在且格式正确
- [ ] `zeabur.json` 存在且配置正确
- [ ] `index.html` 是入口文件
- [ ] 所有静态资源路径正确

部署后检查：
- [ ] 部署状态为 "Running"
- [ ] 可以访问提供的域名
- [ ] 页面正常显示
- [ ] 功能正常工作（可以测试转换功能）

---

## 📚 更多资源

- **Zeabur 官方文档**: https://zeabur.com/docs
- **静态网站部署指南**: https://zeabur.com/docs/zh-CN/guides/static
- **快速入门**: https://zeabur.com/docs/zh-CN/get-started
- **故障排除**: https://zeabur.com/docs/zh-CN/troubleshooting

---

## 💡 提示

1. **推荐使用 GitHub 方式**：支持自动更新，更便于维护
2. **定期备份代码**：确保代码已推送到 GitHub 或本地备份
3. **测试功能**：部署后记得测试所有功能是否正常
4. **监控日志**：定期查看部署日志，及时发现问题

---

祝你部署顺利！🎉


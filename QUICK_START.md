# 快速部署指南

## 🚀 5 分钟部署到 Zeabur

### 步骤 1: 准备代码仓库（推荐）

```bash
# 初始化 Git 仓库（如果还没有）
git init
git add .
git commit -m "Initial commit: Markdown to Word converter"

# 推送到 GitHub
# 1. 在 GitHub 创建新仓库
# 2. 执行以下命令：
git remote add origin <你的GitHub仓库URL>
git branch -M main
git push -u origin main
```

### 步骤 2: 在 Zeabur 部署

1. **访问 Zeabur**
   - 打开 [zeabur.com](https://zeabur.com)
   - 使用 GitHub 账户登录

2. **创建项目**
   - 点击 "New Project" 或 "创建项目"
   - 选择 "Import from GitHub" 或 "从 GitHub 导入"
   - 授权 Zeabur 访问 GitHub
   - 选择你的仓库

3. **自动部署**
   - Zeabur 会自动检测为静态网站
   - 等待部署完成（通常 1-2 分钟）

4. **获取访问链接**
   - 部署完成后，Zeabur 会提供一个 `.zeabur.app` 域名
   - 点击域名即可访问你的应用

### 步骤 3: 自定义域名（可选）

1. 在项目设置中找到 "Domains" 或 "域名"
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录

## ✅ 部署检查清单

部署前确认：
- [ ] 所有文件已提交到 Git
- [ ] `package.json` 存在且格式正确
- [ ] `zeabur.json` 存在且配置正确
- [ ] `index.html` 是入口文件
- [ ] 所有静态资源（CSS、JS）路径正确

## 🔍 常见问题

**Q: 部署后页面显示空白？**
A: 检查浏览器控制台，确认 CDN 资源是否正常加载。

**Q: 如何更新部署？**
A: 推送新代码到 GitHub，Zeabur 会自动重新部署。

**Q: 可以离线使用吗？**
A: 需要网络连接加载 CDN 资源。如需离线使用，需要将 CDN 资源下载到本地。

## 📚 更多帮助

- 详细部署文档：[DEPLOY.md](./DEPLOY.md)
- Zeabur 官方文档：https://zeabur.com/docs


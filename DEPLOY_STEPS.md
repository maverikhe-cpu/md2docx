# 🚀 部署步骤详解

## 快速部署（3 步完成）

### 步骤 1: 创建 GitHub 仓库

1. 访问 [GitHub 新建仓库页面](https://github.com/new)
2. 输入仓库名称（例如：`md2docx`）
3. **不要**勾选 "Initialize this repository with a README"（我们已经有了）
4. 点击 "Create repository"

### 步骤 2: 推送代码到 GitHub

**方法 A: 使用部署脚本（推荐）**

```bash
./deploy.sh
```

脚本会引导你完成所有步骤。

**方法 B: 手动执行**

```bash
# 添加远程仓库（替换为你的实际仓库 URL）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 3: 在 Zeabur 部署

1. **访问 Zeabur**
   - 打开 [zeabur.com](https://zeabur.com)
   - 使用 GitHub 账户登录（推荐）

2. **创建项目**
   - 点击 "New Project" 或 "创建项目"
   - 选择 "Import from GitHub" 或 "从 GitHub 导入"
   - 授权 Zeabur 访问你的 GitHub 账户
   - 选择你的 `md2docx` 仓库

3. **自动部署**
   - Zeabur 会自动检测为静态网站
   - 使用 Caddy 服务器托管
   - 等待 1-2 分钟完成部署

4. **获取访问链接**
   - 部署完成后，Zeabur 会提供一个 `.zeabur.app` 域名
   - 点击域名即可访问你的应用！

## 替代方案：直接上传到 Zeabur

如果不想使用 GitHub，也可以直接上传：

1. 登录 [Zeabur](https://zeabur.com)
2. 点击 "创建项目" → "本地项目"
3. 将整个 `md2docx` 文件夹压缩为 ZIP
4. 上传 ZIP 文件
5. 等待自动部署

## 更新部署

### 通过 GitHub（自动）

每次推送代码到 GitHub，Zeabur 会自动重新部署：

```bash
git add .
git commit -m "更新内容"
git push
```

### 直接上传（手动）

重新上传更新后的文件到 Zeabur。

## 自定义域名

部署完成后，可以绑定自定义域名：

1. 在 Zeabur 项目设置中找到 "Domains" 或 "域名"
2. 点击 "Add Domain" 或 "添加域名"
3. 输入你的域名
4. 按照提示配置 DNS 记录：
   - 添加 CNAME 记录
   - 指向 Zeabur 提供的地址

## 故障排除

### 问题：部署失败

**检查清单：**
- ✅ 所有文件都已提交（`git status` 显示 clean）
- ✅ `package.json` 存在且格式正确
- ✅ `zeabur.json` 存在
- ✅ `index.html` 是入口文件

**查看日志：**
- 在 Zeabur 项目页面查看部署日志
- 检查是否有错误信息

### 问题：页面显示空白

**可能原因：**
1. CDN 资源加载失败
   - 检查浏览器控制台（F12）
   - 确认网络连接正常

2. 路径问题
   - 确认所有资源路径正确
   - CSS 和 JS 文件应该在同一目录

### 问题：Git 推送失败

**常见错误：**

1. **"remote origin already exists"**
   ```bash
   git remote remove origin
   git remote add origin YOUR_REPO_URL
   ```

2. **"Permission denied"**
   - 检查 GitHub 仓库 URL 是否正确
   - 确认有推送权限
   - 可能需要配置 SSH 密钥

3. **"Repository not found"**
   - 确认仓库已创建
   - 检查仓库名称和用户名是否正确

## 需要帮助？

- 📖 详细文档：[DEPLOY.md](./DEPLOY.md)
- ⚡ 快速开始：[QUICK_START.md](./QUICK_START.md)
- 🌐 Zeabur 文档：https://zeabur.com/docs


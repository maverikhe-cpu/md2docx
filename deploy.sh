#!/bin/bash

# Markdown 转 Word 转换器 - 部署脚本
# 用于推送到 GitHub 并准备 Zeabur 部署

echo "🚀 Markdown 转 Word 转换器 - 部署助手"
echo "======================================"
echo ""

# 检查 Git 状态
if [ ! -d ".git" ]; then
    echo "❌ 错误: 未找到 Git 仓库"
    echo "请先运行: git init"
    exit 1
fi

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 检测到未提交的更改，正在提交..."
    git add .
    read -p "请输入提交信息 (默认: Update): " commit_msg
    commit_msg=${commit_msg:-Update}
    git commit -m "$commit_msg"
    echo "✅ 更改已提交"
    echo ""
fi

# 检查远程仓库
if git remote | grep -q "origin"; then
    echo "✅ 已配置远程仓库:"
    git remote -v
    echo ""
    read -p "是否推送到 GitHub? (y/n): " push_confirm
    if [ "$push_confirm" = "y" ] || [ "$push_confirm" = "Y" ]; then
        echo "📤 正在推送到 GitHub..."
        git push -u origin main
        if [ $? -eq 0 ]; then
            echo "✅ 代码已成功推送到 GitHub!"
            echo ""
            echo "📋 下一步:"
            echo "1. 访问 https://zeabur.com"
            echo "2. 登录并创建新项目"
            echo "3. 选择 '从 GitHub 导入'"
            echo "4. 选择你的仓库"
            echo "5. 等待自动部署完成"
        else
            echo "❌ 推送失败，请检查网络连接和权限"
        fi
    fi
else
    echo "📦 未配置远程仓库"
    echo ""
    read -p "是否要添加 GitHub 远程仓库? (y/n): " add_remote
    if [ "$add_remote" = "y" ] || [ "$add_remote" = "Y" ]; then
        read -p "请输入 GitHub 仓库 URL (例如: https://github.com/username/repo.git): " repo_url
        if [ -n "$repo_url" ]; then
            git remote add origin "$repo_url"
            echo "✅ 远程仓库已添加"
            echo ""
            read -p "是否现在推送到 GitHub? (y/n): " push_now
            if [ "$push_now" = "y" ] || [ "$push_now" = "Y" ]; then
                git branch -M main
                git push -u origin main
                if [ $? -eq 0 ]; then
                    echo "✅ 代码已成功推送到 GitHub!"
                    echo ""
                    echo "📋 下一步:"
                    echo "1. 访问 https://zeabur.com"
                    echo "2. 登录并创建新项目"
                    echo "3. 选择 '从 GitHub 导入'"
                    echo "4. 选择你的仓库"
                    echo "5. 等待自动部署完成"
                else
                    echo "❌ 推送失败，请检查:"
                    echo "   - GitHub 仓库是否已创建"
                    echo "   - 仓库 URL 是否正确"
                    echo "   - 是否有推送权限"
                fi
            fi
        else
            echo "❌ 未提供仓库 URL"
        fi
    else
        echo ""
        echo "💡 提示: 你也可以直接上传项目文件夹到 Zeabur"
        echo "   1. 访问 https://zeabur.com"
        echo "   2. 选择 '本地项目'"
        echo "   3. 上传整个项目文件夹"
    fi
fi

echo ""
echo "✨ 部署脚本执行完成!"


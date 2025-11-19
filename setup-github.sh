#!/bin/bash

# GitHub 仓库设置脚本

echo "🔧 GitHub 仓库设置助手"
echo "======================"
echo ""

# 检查是否已配置远程仓库
if git remote | grep -q "origin"; then
    echo "⚠️  已存在远程仓库配置:"
    git remote -v
    echo ""
    read -p "是否要移除现有配置并重新设置? (y/n): " remove_confirm
    if [ "$remove_confirm" = "y" ] || [ "$remove_confirm" = "Y" ]; then
        git remote remove origin
        echo "✅ 已移除现有配置"
        echo ""
    else
        echo "取消操作"
        exit 0
    fi
fi

echo "📋 请按照以下步骤操作:"
echo ""
echo "1. 访问 https://github.com/new"
echo "2. 创建新仓库"
echo "   仓库名称: md2docx (或你喜欢的名称)"
echo "   描述: Markdown to Word Converter"
echo "   可见性: Public 或 Private"
echo "   ⚠️  不要勾选 'Initialize this repository with a README'"
echo ""
echo "3. 创建完成后，复制仓库 URL"
echo "   格式: https://github.com/用户名/仓库名.git"
echo ""

read -p "请输入 GitHub 仓库 URL: " repo_url

if [ -z "$repo_url" ]; then
    echo "❌ 未提供仓库 URL"
    exit 1
fi

# 移除末尾的斜杠
repo_url=$(echo "$repo_url" | sed 's|/$||')

# 添加远程仓库
echo ""
echo "📦 正在添加远程仓库..."
git remote add origin "$repo_url"

if [ $? -eq 0 ]; then
    echo "✅ 远程仓库已添加: $repo_url"
    echo ""
    
    # 检查仓库是否存在
    echo "🔍 正在验证仓库..."
    http_code=$(curl -s -o /dev/null -w "%{http_code}" "$repo_url")
    
    if [ "$http_code" = "200" ]; then
        echo "✅ 仓库存在，可以推送"
        echo ""
        read -p "是否现在推送到 GitHub? (y/n): " push_confirm
        if [ "$push_confirm" = "y" ] || [ "$push_confirm" = "Y" ]; then
            echo ""
            echo "📤 正在推送到 GitHub..."
            git branch -M main
            git push -u origin main
            
            if [ $? -eq 0 ]; then
                echo ""
                echo "🎉 成功！代码已推送到 GitHub!"
                echo ""
                echo "📋 下一步 - 在 Zeabur 部署:"
                echo "1. 访问 https://zeabur.com"
                echo "2. 登录并创建新项目"
                echo "3. 选择 '从 GitHub 导入'"
                echo "4. 选择你的仓库: $(basename "$repo_url" .git)"
                echo "5. 等待自动部署完成"
            else
                echo ""
                echo "❌ 推送失败"
                echo ""
                echo "可能的原因:"
                echo "- 仓库还未创建，请先创建仓库"
                echo "- 没有推送权限，检查仓库设置"
                echo "- 网络问题，稍后重试"
            fi
        fi
    else
        echo "⚠️  警告: 无法访问仓库 (HTTP $http_code)"
        echo ""
        echo "请确认:"
        echo "1. 仓库是否已创建"
        echo "2. 仓库 URL 是否正确"
        echo "3. 仓库是否为公开（如果是私有，需要配置认证）"
        echo ""
        echo "如果仓库已创建，你可以手动推送:"
        echo "  git branch -M main"
        echo "  git push -u origin main"
    fi
else
    echo "❌ 添加远程仓库失败"
    exit 1
fi


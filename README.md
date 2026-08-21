# GfireTech 外贸独立站 — 部署上线指引

纯 HTML 静态站（无构建步骤），可一键部署到 Vercel，也可托管到任意静态平台（Netlify / Cloudflare Pages / GitHub Pages）。

## 1. 项目结构

```
foreign-trade-site/
├── index.html            # 单页站点（Hero/产品/优势/认证/关于/询盘）
├── assets/
│   ├── css/styles.css    # 响应式样式（品牌色在 :root 变量）
│   └── js/main.js        # 菜单/表单/滚动动画
├── vercel.json           # Vercel 静态配置（缓存头）
└── README.md             # 本文件
```

## 2. 本地预览

无需安装依赖，用任意静态服务器即可：

```bash
# 进入项目目录
cd foreign-trade-site
# Python 内置服务器（任选其一）
python -m http.server 8123
# 然后浏览器打开 http://localhost:8123
```

> 直接双击 index.html 也能看，但部分浏览器会限制本地资源加载，建议用上面的服务器方式。

## 3. 上线方式 A：Git 推送（推荐，最稳）

1. 在 GitHub / GitLab / Bitbucket 新建一个**空仓库**（不要含 README）。
2. 本地初始化并推送：
   ```bash
   cd foreign-trade-site
   git init
   git add .
   git commit -m "GfireTech static site"
   git branch -M main
   git remote add origin <你的仓库地址>
   git push -u origin main
   ```
3. 打开 https://vercel.com → **Add New → Project** → 导入该仓库。
4. Framework 选 **Other**，Build Command 留空，Output Directory 填 **.**（点号）。
5. 点击 **Deploy**，约 30 秒后获得 `https://xxx.vercel.app` 临时域名。

## 4. 上线方式 B：拖拽部署（最快，免 Git）

1. 打开 https://vercel.com
2. 直接把 `foreign-trade-site` 整个文件夹拖到首页的拖拽区。
3. 自动识别为静态项目，等待部署完成即可。

## 5. 绑定自定义域名 + HTTPS

1. Vercel 项目内 **Settings → Domains**，输入你的域名（如 `www.gfiretech.com`）。
2. 按提示到域名服务商添加 **CNAME** 记录指向 `cname.vercel-dns.com`（或用 Vercel 提供的 Nameservers 整域托管）。
3. Vercel 自动签发 **HTTPS 证书**（无需手动申请），生效后地址栏显示锁标。
4. 验证：浏览器访问你的域名，确认 `https://` 且页面正常。

## 6. 表单收件

当前已使用 **mailto 方案**：访客点击提交后，会打开本地邮件客户端（Outlook / Apple Mail / Gmail App 等），收件人自动填入 `Leo@gfiretech.com`，主题和正文预填好表单信息。此方案**不依赖任何第三方表单服务**，在国内网络环境下最稳定。

**后续如需升级，可选方案：**

- **Formspree**：国内注册有时会被卡；如能正常注册，在 `index.html` 恢复 `<form action="https://formspree.io/f/你的表单ID">`，并把 `main.js` 中的 mailto 逻辑改回 `fetch` 提交。
- **自建 Vercel Serverless Function**：在根目录建 `api/contact.js`，用 `nodemailer` 或邮件 API 发送。邮件服务密钥只放 Vercel 环境变量，切勿写进前端代码。

## 7. 上线前必改清单（占位符一览）

| 位置 | 占位内容 | 改成 |
|------|----------|------|
| index.html `<title>` / meta | GfireTech | ✅ 已更新 |
| `canonical` / `og:url` | www.gfiretech.com | ✅ 已更新 |
| 联系信息 | Leo@gfiretech.com / +86 195 6635 1393（WhatsApp 同号） | ✅ 已更新 |
| 工厂地址 | Room 712, Commercial Building, Tangwei Community, Bao'an District, Shenzhen | ✅ 已更新 |
| 询盘表单 | Formspree 占位 `your_form_id` | ✅ 已改为 mailto 方案，收件人 Leo@gfiretech.com |
| 产品图 | 内联 SVG 占位 | 实拍图（建议 WebP 800×800） |
| `og:image` | assets/img/og-cover.jpg | 上传封面图并修正路径 |
| 多语言 | 仅英文 | 后续加 /de /fr /es 子目录 |

## 8. 回滚与验证

- **回滚**：Vercel 每次部署都是独立版本，**Deployments** 列表里点旧版本 → **Promote to Production** 即可秒回滚。
- **验证清单**：
  - [ ] 桌面 + 手机（≤390px）布局均正常，汉堡菜单可开合
  - [ ] 点击产品卡「Request Quote」能跳到表单并预选产品
  - [ ] 表单提交后显示成功提示（或收到邮件）
  - [ ] 页面标题/描述在分享到 WhatsApp/LinkedIn 时正确显示
  - [ ] Lighthouse 跑分（SEO / 无障碍 ≥ 90）

## 9. 常见失败原因

- **部署后样式/脚本 404**：检查 `assets/` 路径大小写与 `vercel.json` 是否把目录改了；静态站 `outputDirectory` 必须是 `.`。
- **表单没反应**：mailto 方案依赖访客本地邮件客户端；如手机端未安装邮件 App，可改用 Formspree 或自建后端。
- **自定义域名无法访问**：CNAME 未生效（DNS 全球生效需 5 分钟~24 小时），先在临时 `*.vercel.app` 域名验证页面本身没问题。
- **HTTPS 不显示锁标**：证书签发中（通常几分钟），或混合内容（页面引用了 `http://` 资源）——本模板无外链，一般不会有此问题。

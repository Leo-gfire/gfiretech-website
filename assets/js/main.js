/* =========================================================
   GfireTech 外贸独立站交互脚本
   - 移动端菜单开关（同步 aria-expanded）
   - 点击导航链接后自动收起移动菜单
   - 询盘表单：前端校验 + 蜜罐防垃圾 + fetch 异步提交到 Formspree（转发 Leo@gfiretech.com）
   - 滚动 reveal 动画（IntersectionObserver）
   注意：所有逻辑仅作用于客户端，无任何服务端密钥。
   ========================================================= */
(function () {
  "use strict";

  /* 页脚年份自动更新 */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- 移动端菜单 ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // 点击任意导航链接后收起菜单（移动端）
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 860px)").matches) {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Open menu");
        }
      });
    });
  }

  /* ---------- 滚动 reveal ---------- */
  var revealEls = document.querySelectorAll(".section, .product-card, .feature, .stat");
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 询盘表单（Formspree 异步提交） ----------
     提交到真实 Formspree 表单 xyegodab，询盘以邮件形式转发到 Leo@gfiretech.com。
     采用 fetch 异步提交（Formspree 已配置 CORS），不刷新页面；
     失败时页内提示用户改用复制邮箱按钮直发。 */
  var FORM_ENDPOINT = "https://formspree.io/f/xyegodab";
  var form = document.getElementById("quoteForm");
  var status = document.getElementById("formStatus");
  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // 蜜罐：机器人填了隐藏字段则静默丢弃
      var gotcha = form.querySelector('[name="_gotcha"]');
      if (gotcha && gotcha.value) return;

      // 前端校验：必填项
      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var message = form.querySelector("#message");
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        status.textContent = "Please fill in Name, Email and Message.";
        status.className = "form-status err";
        return;
      }
      // 邮箱格式
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      if (!emailOk) {
        status.textContent = "Please enter a valid work email.";
        status.className = "form-status err";
        return;
      }

      status.textContent = "Sending…";
      status.className = "form-status";

      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            status.textContent = "Thanks! Your inquiry has been sent. We will reply within 24 hours.";
            status.className = "form-status ok";
            form.reset();
          } else {
            throw new Error("submit failed");
          }
        })
        .catch(function () {
          status.textContent = "Network error. Please use the Copy email button below to reach us at Leo@gfiretech.com.";
          status.className = "form-status err";
        });
    });
  }

  /* 产品卡片的 Request Quote 按钮：把产品名带入表单的 Product Interest */
  document.querySelectorAll("[data-product]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var select = document.getElementById("product");
      if (select) {
        Array.prototype.some.call(select.options, function (opt) {
          if (opt.value === btn.getAttribute("data-product")) {
            select.value = opt.value;
            return true;
          }
          return false;
        });
      }
    });
  });

  /* ---------- 复制邮箱按钮 ---------- */
  function showCopyHint(msg) {
    var hint = document.getElementById("copyHint");
    if (hint) {
      hint.textContent = msg;
      setTimeout(function () { hint.textContent = ""; }, 2500);
    }
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    ta.style.top = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    showCopyHint(ok ? "Copied!" : "Copy failed, select manually.");
  }
  function copyEmail(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { showCopyHint("Copied!"); },
        function () { fallbackCopy(text); }
      );
    } else {
      fallbackCopy(text);
    }
  }
  document.querySelectorAll(".btn-copy, #copyEmailBtn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var email = btn.getAttribute("data-email");
      if (email) copyEmail(email);
    });
  });
})();

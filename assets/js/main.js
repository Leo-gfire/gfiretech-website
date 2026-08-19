/* =========================================================
   GfireTech 外贸独立站交互脚本
   - 移动端菜单开关（同步 aria-expanded）
   - 点击导航链接后自动收起移动菜单
   - 询盘表单：前端校验 + 蜜罐防垃圾 + fetch 提交到 Formspree
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

  /* ---------- 询盘表单 ---------- */
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

      // 用 FormData 直接提交到 formspree（已配置 CORS）。
      // 上线前把 index.html 中 action 的 your_form_id 换成您的真实 ID。
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            status.textContent = "Thanks! We will reply within 24 hours.";
            status.className = "form-status ok";
            form.reset();
          } else {
            throw new Error("submit failed");
          }
        })
        .catch(function () {
          status.textContent = "Something went wrong. Please email us directly at Leo@gfiretech.com.";
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
})();

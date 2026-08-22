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

  /* ---------- 区块标题橙色短杠：滚动进入视口时「画出」 ---------- */
  var titleEls = document.querySelectorAll(".section-title");
  if ("IntersectionObserver" in window) {
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          tio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    titleEls.forEach(function (el) { tio.observe(el); });
  } else {
    titleEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- 询盘表单：根据入口自动切换服务类型 ----------
     支持 #contact?service=verify-supplier 自动展开「供应商验证」字段。
     同时根据下拉选择动态显示/隐藏供应商信息输入框。
     修复：hashchange + 链接点击都会触发，避免同页内点击无反应。 */
  (function () {
    var form = document.getElementById("quoteForm");
    if (!form) return;
    var helpTypeGroup = form.querySelector("#helptype");
    var helpTypeRadios = form.querySelectorAll('input[name="helptype"]');
    var supplierField = document.getElementById("supplierInfoField");
    var supplierInput = document.getElementById("supplier_info");
    if (!helpTypeGroup || !supplierField || !supplierInput) return;

    // 初始状态：无论入口如何，supplier 字段默认隐藏且非必填（仅在 Verify a Supplier 时显示）
    setSupplierVisible(false);

    function getHelpTypeValue() {
      var checked = form.querySelector('input[name="helptype"]:checked');
      return checked ? checked.value : "";
    }
    function setHelpTypeValue(val) {
      helpTypeRadios.forEach(function (r) {
        r.checked = (r.value === val);
      });
    }

    function setSupplierVisible(show) {
      supplierField.classList.toggle("is-visible", show);
      supplierInput.required = show;
      if (!show) supplierInput.value = "";
    }

    // 智能字段显示：根据选择的服务类型显示相关字段
    var smartFields = form.querySelectorAll(".smart-field");
    var TYPE_MAP = {
      "Find a Supplier": "find",
      "Verify a Supplier": "verify",
      "Product Development": "develop",
      "OEM / ODM": "odm",
      "Procurement Support": "procure",
      "Other": "other"
    };
    function updateSmartFields(type) {
      smartFields.forEach(function (f) {
        var shows = (f.getAttribute("data-show") || "").split(",");
        var visible = shows.indexOf(type) !== -1;
        f.classList.toggle("is-visible", visible);
        // 隐藏时清空值，避免脏数据提交
        if (!visible) {
          var inp = f.querySelector("input, select, textarea");
          if (inp) inp.value = "";
        }
      });
    }

    function applyType(type) {
      setSupplierVisible(type === "verify");
      updateSmartFields(type);
    }

    helpTypeGroup.addEventListener("change", function () {
      var t = TYPE_MAP[getHelpTypeValue()] || "";
      applyType(t);
    });

    function applyContactHash(force) {
      var rawHash = window.location.hash || "";
      var hashParts = rawHash.split("?");
      var anchor = hashParts[0];
      var params = hashParts[1] ? new URLSearchParams(hashParts[1]) : new URLSearchParams();
      var isVerify = anchor === "#contact" && params.get("service") === "verify-supplier";

      if (anchor === "#contact" || force) {
        if (isVerify) {
          setHelpTypeValue("Verify a Supplier");
          applyType("verify");
        } else if (force) {
          // 普通入口：不预设选项，让用户自己选（所有智能字段隐藏）
          setHelpTypeValue("");
          setSupplierVisible(false);
          updateSmartFields("");
        }
        var contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }

    // 页面加载时解析
    applyContactHash();

    // hash 变化时解析（支持同页内点击）
    window.addEventListener("hashchange", function () {
      applyContactHash();
    });

    // 强制处理带 service=verify-supplier 的链接（浏览器不会二次触发 hashchange）
    document.querySelectorAll('a[href="#contact?service=verify-supplier"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        // 如果已经是该 hash，浏览器不会做任何事，必须手动处理
        if (window.location.hash === "#contact?service=verify-supplier") {
          e.preventDefault();
          applyContactHash(true);
        }
      });
    });

    // 普通 #contact 链接点击时重置为默认 sourcing 状态
    document.querySelectorAll('a[href="#contact"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.location.hash === "#contact" || window.location.hash === "#contact?service=verify-supplier") {
          e.preventDefault();
          window.location.hash = "#contact";
          applyContactHash(true);
        }
      });
    });
  })();

  /* ---------- 询盘表单（Formspree 异步提交） ----------
     提交到真实 Formspree 表单 xyegodab，询盘以邮件形式转发到 Leo@gfiretech.com。
     采用 fetch 异步提交（Formspree 已配置 CORS），不刷新页面；
     失败时页内提示用户改用复制邮箱按钮直发。 */
  var FORM_ENDPOINT = "https://formspree.io/f/xyegodab";
  var form = document.getElementById("quoteForm");
  var status = document.getElementById("formStatus");
  // 取选中的 helptype 单选值（独立 IIFE 内重新实现，避免跨 IIFE 引用私有函数导致 ReferenceError）
  function getHelpTypeValue() {
    var checked = form && form.querySelector('input[name="helptype"]:checked');
    return checked ? checked.value : "";
  }
  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // 蜜罐：机器人填了隐藏字段则静默丢弃
      var gotcha = form.querySelector('[name="_gotcha"]');
      if (gotcha && gotcha.value) return;

      // 前端校验：必填项（Name / Email / helptype / Message 必填；Country 按优化意见为非必填）
      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var message = form.querySelector("#message");
      var supplierInfo = form.querySelector("#supplier_info");
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        status.textContent = "Please fill in Name, Email and Message.";
        status.className = "form-status err";
        return;
      }
      if (!getHelpTypeValue()) {
        status.textContent = "Please select what you need help with.";
        status.className = "form-status err";
        return;
      }
      if (getHelpTypeValue() === "Verify a Supplier" && (!supplierInfo || !supplierInfo.value.trim())) {
        status.textContent = "Please provide the supplier information you want us to verify.";
        status.className = "form-status err";
        if (supplierInfo) supplierInfo.focus();
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

  /* 产品卡片的 Request a Quote 按钮：把产品名带入表单的 Product 输入框 */
  document.querySelectorAll("[data-product]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var input = document.getElementById("product");
      if (input) {
        input.value = btn.getAttribute("data-product");
        input.focus();
      }
    });
  });

  /* 产品变体小图点击切换主图 */
  document.querySelectorAll(".product-variants img").forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      var card = thumb.closest(".product-card");
      if (!card) return;
      var main = card.querySelector(".product-image");
      if (!main) return;
      var newSrc = thumb.getAttribute("src");
      if (!newSrc || main.getAttribute("src") === newSrc) return;
      main.src = newSrc;
      main.alt = thumb.alt || main.alt;
      card.querySelectorAll(".product-variants img").forEach(function (t) { t.classList.remove("active"); });
      thumb.classList.add("active");
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

  /* ---------- Case study 视频切换 ---------- */
  var caseVideo = document.getElementById("caseVideo");
  if (caseVideo) {
    document.querySelectorAll(".case-thumb").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = btn.getAttribute("data-src");
        if (!src) return;
        caseVideo.poster = btn.getAttribute("data-poster") || caseVideo.poster;
        var source = caseVideo.querySelector("source");
        if (source) source.src = src;
        caseVideo.load();
        var p = caseVideo.play();
        if (p && p.catch) p.catch(function () {});
        document.querySelectorAll(".case-thumb").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
      });
    });
  }

  /* ---------- Case study carousel 切换 ---------- */
  var caseTrack = document.querySelector(".case-track");
  var caseTabs = document.querySelectorAll(".case-tab");
  if (caseTrack && caseTabs.length) {
    caseTabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        var slide = caseTrack.children[i];
        if (slide && slide.scrollIntoView) {
          slide.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
        }
      });
    });

    /* 左右箭头按钮 */
    var prevBtn = document.querySelector(".case-arrow-prev");
    var nextBtn = document.querySelector(".case-arrow-next");
    function updateArrows(idx) {
      if (prevBtn) prevBtn.disabled = (idx <= 0);
      if (nextBtn) nextBtn.disabled = (idx >= caseTabs.length - 1);
    }
    if (prevBtn) prevBtn.addEventListener("click", function () {
      var i = Math.max(0, (currentIdx || 0) - 1);
      caseTrack.children[i] && caseTrack.children[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
    if (nextBtn) nextBtn.addEventListener("click", function () {
      var i = Math.min(caseTabs.length - 1, (currentIdx || 0) + 1);
      caseTrack.children[i] && caseTrack.children[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });

    /* 滚动同步 tab + arrow 状态 */
    var scrollTimer;
    var currentIdx = 0;
    caseTrack.addEventListener("scroll", function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        var w = caseTrack.clientWidth;
        currentIdx = Math.round(caseTrack.scrollLeft / Math.max(w, 1));
        caseTabs.forEach(function (t, i) {
          var on = i === currentIdx;
          t.classList.toggle("active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });
        updateArrows(currentIdx);
      }, 80);
    }, { passive: true });
    updateArrows(0);
  }

  /* ---------- Product carousel 切换 ---------- */
  var productTrack = document.querySelector(".product-track");
  var productTabs = document.querySelectorAll(".product-tab");
  if (productTrack && productTabs.length) {
    productTabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        var slide = productTrack.children[i];
        if (slide && slide.scrollIntoView) {
          slide.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
        }
      });
    });
    var pPrevBtn = document.querySelector(".product-arrow-prev");
    var pNextBtn = document.querySelector(".product-arrow-next");
    var pCurrent = 0;
    function pUpdateArrows(idx) {
      if (pPrevBtn) pPrevBtn.disabled = (idx <= 0);
      if (pNextBtn) pNextBtn.disabled = (idx >= productTabs.length - 1);
    }
    if (pPrevBtn) pPrevBtn.addEventListener("click", function () {
      var i = Math.max(0, pCurrent - 1);
      productTrack.children[i] && productTrack.children[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
    if (pNextBtn) pNextBtn.addEventListener("click", function () {
      var i = Math.min(productTabs.length - 1, pCurrent + 1);
      productTrack.children[i] && productTrack.children[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
    var pScrollTimer;
    productTrack.addEventListener("scroll", function () {
      clearTimeout(pScrollTimer);
      pScrollTimer = setTimeout(function () {
        var w = productTrack.clientWidth;
        pCurrent = Math.round(productTrack.scrollLeft / Math.max(w, 1));
        productTabs.forEach(function (t, i) {
          var on = i === pCurrent;
          t.classList.toggle("active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });
        pUpdateArrows(pCurrent);
      }, 80);
    }, { passive: true });
    pUpdateArrows(0);
  }
})();

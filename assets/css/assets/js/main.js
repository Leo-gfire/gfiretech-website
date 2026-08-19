/**
 * ThermoCool 外贸独立站交互脚本
 * 功能：移动菜单、平滑滚动、表单校验与提交、产品卡片带入、滚动 reveal
 */

(function () {
  'use strict';

  // 1. 移动端菜单开关
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.hidden = expanded;
      document.body.classList.toggle('menu-open', !expanded);
    });

    // 点击移动菜单链接后自动关闭菜单
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
        document.body.classList.remove('menu-open');
      });
    });
  }

  // 2. 平滑滚动（锚点跳转时给顶部留出导航高度）
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  // 3. 询盘表单前端校验与提交
  const form = document.getElementById('quoteForm');
  const realForm = document.getElementById('realForm');
  const successMsg = document.getElementById('formSuccess');

  if (form && realForm) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const product = form.elements.product.value;
      const msg = form.elements.message.value.trim();

      // 基础校验
      if (!name || !email) {
        alert('Please fill in your name and business email.（请填写姓名和邮箱）');
        form.elements.name.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.（请输入有效邮箱）');
        form.elements.email.focus();
        return;
      }

      // 如果还是占位符 action，提醒用户上线前替换
      const action = realForm.getAttribute('action');
      if (action && action.includes('your_form_id')) {
        alert(
          'Formspree form ID is still a placeholder.（表单服务 ID 还是占位符）\n' +
          'Please replace "your_form_id" in index.html with your real Formspree ID.（请上线前替换为真实 ID）'
        );
        return;
      }

      // 构建 FormData 并提交
      const formData = new FormData(form);
      try {
        const res = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          form.reset();
          if (successMsg) successMsg.hidden = false;
        } else {
          const err = await res.json().catch(() => ({}));
          alert(err.error || 'Submission failed. Please try again later.（提交失败，请稍后重试）');
        }
      } catch (err) {
        console.error(err);
        alert('Network error. Please check your connection.（网络错误，请检查网络）');
      }
    });
  }

  // 4. 产品卡片点击自动带入询盘表单
  document.querySelectorAll('.product-card .link-arrow').forEach(link => {
    link.addEventListener('click', function (e) {
      const productName = this.getAttribute('data-product');
      const select = document.getElementById('product');
      if (select && productName) {
        select.value = productName;
      }
    });
  });

  // 5. 页脚年份自动更新
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 6. IntersectionObserver 滚动 reveal 动画
  const revealEls = document.querySelectorAll('.product-card, .why-card, .cert-list li, .about-stats li');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  } else {
    // 老浏览器兜底：直接显示
    revealEls.forEach(el => el.classList.add('visible'));
  }
})();

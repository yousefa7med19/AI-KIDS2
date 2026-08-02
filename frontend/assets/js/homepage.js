
    const menuButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const toast = document.querySelector('.toast');

    menuButton?.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '✕' : '☰';
    });

    document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
      if (menuButton) menuButton.textContent = '☰';
    }));

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
    }

    document.querySelectorAll('[data-toast]').forEach(el => el.addEventListener('click', () => showToast(el.dataset.toast)));
    document.querySelectorAll('.age-card button').forEach(button => button.addEventListener('click', () => {
      const age = button.closest('.age-card').dataset.age;
      showToast(`Great! The ${age}-year-old learning path is selected.`);
    }));

    document.querySelectorAll('.billing-toggle button').forEach(button => button.addEventListener('click', () => {
      const period = button.dataset.period;
      document.querySelectorAll('.billing-toggle button').forEach(b => b.classList.toggle('selected', b === button));
      document.querySelectorAll('.price b, .price small').forEach(node => node.textContent = node.dataset[period]);
    }));

    document.querySelectorAll('.mission input').forEach(box => box.addEventListener('change', () => {
      const completed = document.querySelectorAll('.mission input:checked').length;
      showToast(`${completed} mission${completed === 1 ? '' : 's'} completed today!`);
    }));
document.addEventListener("DOMContentLoaded", function () {

    const heroImage = document.getElementById("heroImage");
    const familyImage = document.getElementById("familyImage");

    heroImage.src = "../images/boy using laptop white part.png";
    familyImage.src = "../images/parents white background.png";

    heroImage.alt = "AI Kids Hero";
    familyImage.alt = "Family";
});
document.addEventListener("DOMContentLoaded", function () {
    const animatedImages = document.querySelectorAll(".image-animation");

    const imageObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show-image");

                    // تشغيل الحركة مرة واحدة فقط
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    animatedImages.forEach(function (imageContainer) {
        imageObserver.observe(imageContainer);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const signupButtons = document.querySelectorAll(
        '.age-card button[data-path="signup"]'
    );

    signupButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedAge = button.dataset.age;

            window.location.href =
                "../pages/signup.html?age=" + encodeURIComponent(selectedAge);
        });
    });
});
const paymentLinks = document.querySelectorAll(".payment-link");
const billingButtons = document.querySelectorAll(
  ".billing-toggle button[data-period]"
);

let selectedBillingPeriod = "monthly";

billingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedBillingPeriod = button.dataset.period || "monthly";

    paymentLinks.forEach((link) => {
      const plan = link.dataset.plan;

      link.href =
        `pages/payment.html?plan=${encodeURIComponent(plan)}` +
        `&billing=${encodeURIComponent(selectedBillingPeriod)}`;
    });
  });
});
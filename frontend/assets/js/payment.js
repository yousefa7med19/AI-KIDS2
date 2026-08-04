const plans = {
  basic: {
    name: 'Basic Plan',
    monthly: 199,
    yearly: 1910,
    badge: 'Great Start',
    features: [
      'Access to all courses',
      'Interactive lessons',
      'Basic Habit Builder',
      'Progress tracking'
    ]
  },

  premium: {
    name: 'Premium Plan',
    monthly: 299,
    yearly: 2870,
    badge: '⭐ Most Popular',
    features: [
      'Access to all courses',
      'All games & activities',
      'Advanced Habit Builder',
      'Detailed progress reports',
      'Certificates & rewards'
    ]
  },

  family: {
    name: 'Family Plan',
    monthly: 499,
    yearly: 4790,
    badge: 'Best for Families',
    features: [
      'Everything in Premium',
      'Up to 3 children',
      'Parent dashboard',
      'Priority support',
      'Exclusive content & rewards'
    ]
  }
};

const API_URL = 'http://localhost:5000/api';

const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

const params = new URLSearchParams(window.location.search);

let planKey = (params.get('plan') || 'premium').toLowerCase();

if (!plans[planKey]) {
  planKey = 'premium';
}

let billing =
  params.get('billing') === 'yearly'
    ? 'yearly'
    : 'monthly';

let discount = 0;
let method = 'fawry';

const $ = (selector) => document.querySelector(selector);

const money = (value) => {
  return `EGP ${Math.round(value).toLocaleString('en-US')}`;
};

function render() {
  const plan = plans[planKey];
  const price = plan[billing];
  const totalPrice = Math.max(0, price - discount);

  $('#planName').textContent = plan.name;
  $('#planBadge').textContent = plan.badge;

  $('#billingText').textContent =
    billing === 'yearly'
      ? 'Billed yearly'
      : 'Billed monthly';

  $('#planFeatures').innerHTML = plan.features
    .map((feature) => `<li>✓ ${feature}</li>`)
    .join('');

  $('#subtotal').textContent = money(price);
  $('#discount').textContent = money(discount);
  $('#total').textContent = money(totalPrice);
  $('#payAmount').textContent = money(totalPrice);
}

document
  .querySelectorAll('.payment-tab')
  .forEach((button) => {
    button.addEventListener('click', () => {
      method = button.dataset.method;

      document
        .querySelectorAll('.payment-tab')
        .forEach((item) => {
          item.classList.toggle(
            'active',
            item === button
          );
        });

      document
        .querySelectorAll('.payment-panel')
        .forEach((panel) => {
          panel.classList.toggle(
            'active',
            panel.dataset.panel === method
          );
        });
    });
  });

$('#applyCoupon').addEventListener('click', () => {
  const code = $('#couponInput')
    .value
    .trim()
    .toUpperCase();

  const price = plans[planKey][billing];

  if (code === 'AIKIDS10') {
    discount = price * 0.1;

    $('#couponMessage').textContent =
      '10% discount applied 🎉';
  } else {
    discount = 0;

    $('#couponMessage').textContent =
      'Coupon not recognized';
  }

  render();
});

$('#changePlan').addEventListener('click', () => {
  window.location.href = '../index.html#pricing';
});

$('#paymentForm').addEventListener(
  'submit',
  async (event) => {
    event.preventDefault();

    const formMessage = $('#formMessage');
    const submitButton =
      event.currentTarget.querySelector('.pay-btn');

    formMessage.className = 'form-message';
    formMessage.textContent = '';

    if (!$('#agree').checked) {
      formMessage.textContent =
        'Please accept the terms to continue.';

      formMessage.classList.add('error');
      return;
    }

    const payload = {
      plan: planKey,
      billing,
      method
    };

    if (method === 'bank-transfer') {
      const bankTransferReference =
        $('[name=bankTransferReference]')
          ?.value
          .trim();

      if (!bankTransferReference) {
        formMessage.textContent =
          'Please enter the bank transfer reference.';

        formMessage.classList.add('error');
        return;
      }

      payload.bankTransferReference =
        bankTransferReference;

      payload.notes =
        $('[name=transferNotes]')
          ?.value
          .trim() || '';
    }

    submitButton.disabled = true;

    const originalButtonText =
      submitButton.innerHTML;

    submitButton.innerHTML =
      '<span>Processing...</span>';

    try {
      const response = await fetch(
        `${API_URL}/payments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Unable to create payment request'
        );
      }

      formMessage.classList.add('success');

      if (method === 'bank-transfer') {
        formMessage.textContent =
          'Bank transfer submitted successfully. Your payment is pending review.';
      } else {
        formMessage.textContent =
          'Fawry payment request created. The Fawry reference will appear after connecting Fawry Accept.';
      }

      console.log('Payment created:', data.payment);
    } catch (error) {
      formMessage.classList.add('error');
      formMessage.textContent =
        error.message ||
        'Unable to process payment request.';
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  }
);

render();
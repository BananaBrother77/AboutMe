const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll('.reveal').forEach((el, index) => {
  const rect = el.getBoundingClientRect();
  const isOnScreen = rect.top < window.innerHeight;

  if (isOnScreen) {
    el.style.transitionDelay = `${index * 0.1}s`;
  }

  revealObserver.observe(el);
});

const feedbackForm = document.getElementById('feedbackForm');
const feedbackSuccess = document.getElementById('feedbackSuccess');
const categoryGrid = document.getElementById('categoryGrid');
const starRating = document.getElementById('feedbackRating');
const feedbackText = document.getElementById('feedbackText');
const feedbackContact = document.getElementById('feedbackContact');
const submitBtn = document.getElementById('btnFeedbackSubmit');
const charHint = document.querySelector('.char-hint');

let selectedCategory = null;
let selectedRating = null;
let turnstileRendered = false;

function checkForm() {
  let valid = true;

  const text = (feedbackText.value || '').trim();
  if (text.length < 10) valid = false;

  if (!selectedCategory) valid = false;
  if (!selectedRating) valid = false;

  const captcha =
    window.turnstile && turnstileRendered && turnstile.getResponse();
  if (!captcha) valid = false;

  submitBtn.disabled = !valid;
}

function resetForm() {
  selectedCategory = null;
  selectedRating = null;

  document.querySelectorAll('.feedback-category').forEach(function (c) {
    c.classList.remove('selected');
  });

  document.querySelectorAll('.star').forEach(function (s) {
    s.classList.remove('filled');
    let path = s.querySelector('svg path');
    if (path) path.setAttribute('fill', 'none');
  });

  feedbackText.value = '';
  feedbackContact.value = '';
  charHint.textContent = '0 / 10 min';

  if (window.turnstile && turnstileRendered) turnstile.reset();

  feedbackForm.style.display = '';
  feedbackSuccess.classList.remove('show');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Send Feedback';

  checkForm();
}

categoryGrid.addEventListener('click', function (e) {
  let card = e.target.closest('.feedback-category');
  if (!card) return;

  document.querySelectorAll('.feedback-category').forEach(function (c) {
    c.classList.remove('selected');
  });
  card.classList.add('selected');
  selectedCategory = card.dataset.category;
  checkForm();
});

starRating.addEventListener('click', function (e) {
  let star = e.target.closest('.star');
  if (!star) return;

  let value = parseInt(star.dataset.value);

  starRating.querySelectorAll('.star').forEach(function (s) {
    let shouldFill = parseInt(s.dataset.value) <= value;
    s.classList.toggle('filled', shouldFill);
    let path = s.querySelector('svg path');
    if (path) path.setAttribute('fill', shouldFill ? 'currentColor' : 'none');
  });

  selectedRating = value;
  checkForm();
});

feedbackText.addEventListener('input', function () {
  let len = feedbackText.value.length;
  charHint.textContent = len + ' / 10 min';
  checkForm();
});

submitBtn.addEventListener('click', async function () {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    let res = await fetch('/api/feedback-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: selectedCategory,
        rating: selectedRating,
        feedback: feedbackText.value.trim(),
        contact: feedbackContact.value.trim(),
        cfToken: turnstile.getResponse(),
      }),
    });

    let data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Submission failed');

    feedbackForm.style.display = 'none';
    feedbackSuccess.classList.add('show');
    lucide.createIcons();
  } catch (err) {
    alert('Something went wrong. Please try again.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Feedback';
  }
});

(function renderTurnstile() {
  if (window.turnstile) {
    turnstile.render('#turnstile-feedback', {
      sitekey: '0x4AAAAAADugg40RVC10rsmD',
      callback: function () {
        checkForm();
      },
    });
    turnstileRendered = true;
    return;
  }
  setTimeout(renderTurnstile, 200);
})();

lucide.createIcons();

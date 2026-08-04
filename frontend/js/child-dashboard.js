const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

const params = new URLSearchParams(window.location.search);
const childId = params.get('id');

if (!childId) {
  window.location.href = 'parent-dashboard.html';
}

function getAvatarEmoji(avatar) {
  const avatars = {
    'avatar-1': '🤖',
    'avatar-2': '🚀',
    'avatar-3': '💻'
  };

  return avatars[avatar] || '🤖';
}

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = String(value);
  return div.innerHTML;
}

function renderCourses(courses) {
  const coursesList = document.getElementById('courses-list');

  if (!coursesList) return;

  coursesList.innerHTML = '';

  if (!courses.length) {
    coursesList.innerHTML = `
      <div class="courses-empty">
        <span>📚</span>
        <div>
          <strong>No courses available yet</strong>
          <p>New courses for your age will appear here soon.</p>
        </div>
      </div>
    `;
    return;
  }

  courses.forEach((course) => {
    const courseCard = document.createElement('article');
    courseCard.className = 'course-item';

    courseCard.innerHTML = `
      <div class="course-item-icon">
        ${course.category === 'quizzes' ? '🧠' : '🤖'}
      </div>

      <div class="course-item-content">
        <div class="course-item-top">
          <div>
            <h3>${escapeHtml(course.title)}</h3>
            <p>${escapeHtml(course.description)}</p>
          </div>

          <span class="course-difficulty">
            ${escapeHtml(course.difficulty)}
          </span>
        </div>

        <div class="course-meta">
          <span>📖 ${course.lessonsCount || 0} lessons</span>
          <span>⭐ ${course.xpReward || 0} XP</span>
        </div>

        <a
          class="course-start-button"
          href="course-details.html?courseId=${course._id}&childId=${childId}"
        >
          Start Course
        </a>
      </div>
    `;

    coursesList.appendChild(courseCard);
  });
}

async function loadCourses() {
  const coursesList = document.getElementById('courses-list');

  try {
    const data = await apiRequest(`/courses/child/${childId}`);
    renderCourses(data.courses || []);
  } catch (error) {
    console.error('Unable to load courses:', error);

    if (coursesList) {
      coursesList.innerHTML = `
        <p class="courses-error">
          ${escapeHtml(error.message || 'Unable to load courses')}
        </p>
      `;
    }
  }
}

async function loadChild() {
  try {
    const data = await apiRequest(`/children/${childId}`);
    const child = data.child;

    document.getElementById('child-name').textContent = child.name;
    document.getElementById('child-age').textContent = child.age;

    document.getElementById('child-avatar').textContent =
      getAvatarEmoji(child.avatar);

    document.getElementById('child-xp').textContent =
      child.xp || 0;

    document.getElementById('child-streak').textContent =
      `${child.currentStreak || 0} days`;

    document.getElementById('child-coins').textContent =
      child.coins || 0;

    document.getElementById('child-level').textContent =
  child.level || 1;

    document.title = `AI Kids — ${child.name}`;

    await loadCourses();
  } catch (error) {
    console.error('Unable to load child:', error);

    if (
      error.message === 'Invalid or expired token' ||
      error.message === 'You must be logged in'
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'login.html';
      return;
    }

    alert(error.message || 'Unable to load child');
    window.location.href = 'parent-dashboard.html';
  }
}

loadChild();
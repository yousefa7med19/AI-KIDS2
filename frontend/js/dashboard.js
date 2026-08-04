const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

if (!user || !token) {
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const parentNameElement = document.getElementById('parent-name');
  const welcomeNameElement = document.getElementById('welcome-name');
  const logoutButton = document.getElementById('logout-button');

  const addChildButton = document.getElementById('add-child-button');
  const childModal = document.getElementById('child-modal');
  const closeChildModalButton = document.getElementById('close-child-modal');
  const addChildForm = document.getElementById('add-child-form');
  const childModalTitle = document.getElementById('child-modal-title');
  const childSubmitButton = document.getElementById('child-submit-button');

  const childNameInput = document.getElementById('child-name');
  const childAgeInput = document.getElementById('child-age');
  const childAvatarInput = document.getElementById('child-avatar');

  const childrenList = document.getElementById('children-list');
  const childrenEmptyState = document.getElementById('children-empty-state');
  const childrenCount = document.getElementById('children-count');
  const totalXp = document.getElementById('total-xp');
  const bestStreak = document.getElementById('best-streak');
  const childFormStatus = document.getElementById('child-form-status');

  let editingChildId = null;

  if (parentNameElement) {
    parentNameElement.textContent = user.fullName;
  }

  if (welcomeNameElement) {
    welcomeNameElement.textContent = user.fullName;
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'login.html';
    });
  }

  function openAddChildModal() {
    editingChildId = null;

    childModalTitle.textContent = 'Add Child';
    childSubmitButton.textContent = 'Add Child';

    addChildForm.reset();
    childFormStatus.textContent = '';

    childModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function openEditChildModal(child) {
    editingChildId = child._id;

    childModalTitle.textContent = 'Edit Child';
    childSubmitButton.textContent = 'Save Changes';

    childNameInput.value = child.name;
    childAgeInput.value = String(child.age);
    childAvatarInput.value = child.avatar || 'avatar-1';

    childFormStatus.textContent = '';

    childModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeChildModal() {
    editingChildId = null;

    childModal.hidden = true;
    document.body.style.overflow = '';

    addChildForm.reset();
    childFormStatus.textContent = '';

    childModalTitle.textContent = 'Add Child';
    childSubmitButton.textContent = 'Add Child';
  }

  if (addChildButton) {
    addChildButton.addEventListener('click', openAddChildModal);
  }

  if (closeChildModalButton) {
    closeChildModalButton.addEventListener('click', closeChildModal);
  }

  if (childModal) {
    childModal.addEventListener('click', (event) => {
      if (event.target === childModal) {
        closeChildModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && childModal && !childModal.hidden) {
      closeChildModal();
    }
  });

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

  function renderChildren(children) {
    if (
      !childrenList ||
      !childrenEmptyState ||
      !childrenCount ||
      !totalXp ||
      !bestStreak
    ) {
      return;
    }

    childrenList.innerHTML = '';

    if (!children.length) {
      childrenEmptyState.hidden = false;
      childrenCount.textContent = '0';
      totalXp.textContent = '0';
      bestStreak.textContent = '0 days';
      return;
    }

    childrenEmptyState.hidden = true;

    children.forEach((child) => {
      const card = document.createElement('article');
      card.className = 'child-card';

      card.innerHTML = `
        <div class="child-card-info">
          <div class="child-avatar">
            ${getAvatarEmoji(child.avatar)}
          </div>

          <div>
            <h3>${escapeHtml(child.name)}</h3>

            <p>
              Age ${child.age} ·
              ${child.currentStreak || 0} day streak
            </p>
          </div>
        </div>

        <div class="child-card-actions">
          <span class="child-xp">
            ${child.xp || 0} XP
          </span>

          <a
            class="child-dashboard-button"
            href="./child-dashboard.html?id=${child._id}"
          >
            Open Dashboard
          </a>

          <button
            class="edit-child-button"
            type="button"
          >
            Edit
          </button>

          <button
            class="delete-child-button"
            type="button"
          >
            Delete
          </button>
        </div>
      `;

      const editButton = card.querySelector('.edit-child-button');
      const deleteButton = card.querySelector('.delete-child-button');

      editButton.addEventListener('click', () => {
        openEditChildModal(child);
      });

      deleteButton.addEventListener('click', async () => {
        const confirmed = window.confirm(
          `Are you sure you want to delete ${child.name}?`
        );

        if (!confirmed) {
          return;
        }

        deleteButton.disabled = true;
        deleteButton.textContent = 'Deleting...';

        try {
          await apiRequest(`/children/${child._id}`, {
            method: 'DELETE'
          });

          await loadChildren();
        } catch (error) {
          alert(error.message || 'Unable to delete child');

          deleteButton.disabled = false;
          deleteButton.textContent = 'Delete';
        }
      });

      childrenList.appendChild(card);
    });

    childrenCount.textContent = children.length;

    const xpSum = children.reduce(
      (sum, child) => sum + (child.xp || 0),
      0
    );

    totalXp.textContent = xpSum;

    const highestStreak = Math.max(
      ...children.map((child) => child.currentStreak || 0)
    );

    bestStreak.textContent = `${highestStreak} days`;
  }

  async function loadChildren() {
    try {
      const data = await apiRequest('/children');
      renderChildren(data.children || []);
    } catch (error) {
      console.error('Unable to load children:', error);

      if (
        error.message === 'Invalid or expired token' ||
        error.message === 'You must be logged in'
      ) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
      }
    }
  }

  if (addChildForm) {
    addChildForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = childNameInput.value.trim();
      const age = childAgeInput.value;
      const avatar = childAvatarInput.value;

      childSubmitButton.disabled = true;
      childSubmitButton.textContent = editingChildId
        ? 'Saving...'
        : 'Adding Child...';

      childFormStatus.textContent = '';

      try {
        if (editingChildId) {
          await apiRequest(`/children/${editingChildId}`, {
            method: 'PUT',
            body: JSON.stringify({
              name,
              age,
              avatar
            })
          });

          childFormStatus.style.color = 'green';
          childFormStatus.textContent =
            'Child updated successfully!';
        } else {
          await apiRequest('/children', {
            method: 'POST',
            body: JSON.stringify({
              name,
              age,
              avatar
            })
          });

          childFormStatus.style.color = 'green';
          childFormStatus.textContent =
            'Child added successfully!';
        }

        await loadChildren();

        setTimeout(() => {
          closeChildModal();
        }, 700);
      } catch (error) {
        childFormStatus.style.color = 'red';
        childFormStatus.textContent = error.message;
      } finally {
        childSubmitButton.disabled = false;
        childSubmitButton.textContent = editingChildId
          ? 'Save Changes'
          : 'Add Child';
      }
    });
  }

  loadChildren();
});
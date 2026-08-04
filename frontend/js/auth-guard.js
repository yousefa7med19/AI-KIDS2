(function protectPage() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    window.location.replace('login.html');
    return;
  }

  try {
    const tokenPayload = JSON.parse(
      atob(token.split('.')[1])
    );

    const tokenExpiry = tokenPayload.exp * 1000;
    const now = Date.now();

    if (tokenExpiry <= now) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      window.location.replace('login.html');
    }
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.replace('login.html');
  }
})();
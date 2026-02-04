const register = async (name, email, password, role = 'PASSENGER') => {
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  
  if (users.find(u => u.email === email)) {
    throw new Error('User already exists');
  }
  
  // Validate name contains at least one capital letter
  if (!/[A-Z]/.test(name)) {
    throw new Error('Name must contain at least one capital letter');
  }
  
  // Validate password is 6 or more characters
  if (password.length < 6) {
    throw new Error('Password must be 6 or more characters');
  }
  
  const newUser = { id: Date.now(), name, email, password, role };
  users.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  
  return { message: 'Registration successful' };
};

const login = async (email, password) => {
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const user = users.find(u => u.email === email);
  
  const loginUser = user || {
    id: Date.now(),
    name: email.split('@')[0],
    email: email,
    role: 'PASSENGER'
  };
  
  const response = {
    token: 'demo-token-' + Date.now(),
    user: loginUser
  };
  
  localStorage.setItem('user', JSON.stringify(loginUser));
  localStorage.setItem('token', response.token);
  
  return response;
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const getToken = () => {
  return localStorage.getItem('token');
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getToken,
};

export default authService;
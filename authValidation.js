// src/utils/authValidation.js

export const canBookTickets = (user) => {
  return user && user.role === 'PASSENGER';
};

export const canAccessDashboard = (user, requiredRole) => {
  return user && user.role === requiredRole;
};

export const getRoleBasedRedirect = (user) => {
  if (!user) return '/login';
  
  switch (user.role) {
    case 'ADMIN':
      return '/admin';
    case 'TRAVEL_AGENT':
      return '/travel-agent';
    case 'DRIVER':
      return '/driver';
    case 'FLEET_MANAGER':
      return '/fleet-manager';
    case 'BUS_OPERATOR':
      return '/bus-operator';
    case 'PASSENGER':
    default:
      return '/';
  }
};
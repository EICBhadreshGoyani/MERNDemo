// Route paths for the application
export const ROUTE_PATH = {
    LOGIN: '/login',
    DASHBOARD: '/',
}

// Mock data for Users
export const MOCK_USERS = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', firstName: 'James', lastName: 'Smith', email: 'james@example.com', role: 'Editor' },
  { id: '3', firstName: 'Laura', lastName: 'Jackson', email: 'laura@example.com', role: 'Manager' },
  { id: '4', firstName: 'Michael', lastName: 'Brown', email: 'michael@example.com', role: 'Viewer' },
];

// Slice name for Redux store
export const SLICE_NAME = {
    AUTH: 'auth',
    USERS: 'users',
}

// Role options for user management
export const USER_ROLES = [
  { id: '1', value: 'Admin', label: 'Admin' },
  { id: '2', value: 'Manager', label: 'Manager' },
  { id: '3', value: 'User', label: 'User' },
  { id: '4', value: 'Viewer', label: 'Viewer' },
];

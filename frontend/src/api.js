const API = 'http://localhost:3001/api';

// ── helpers ──────────────────────────────────────────────────────────────────

function get(url) {
  return fetch(url, { credentials: 'include' }).then((r) => r.json());
}

function post(url, body) {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => r.json());
}

function patch(url) {
  return fetch(url, { method: 'PATCH', credentials: 'include' }).then((r) => r.json());
}

function put(url, body) {
  return fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => r.json());
}

function del(url) {
  return fetch(url, { method: 'DELETE', credentials: 'include' });
}

// ── auth ─────────────────────────────────────────────────────────────────────

export const getMe      = ()                      => get(`${API}/auth/me`);
export const signupUser = (username, password)    => post(`${API}/auth/signup`, { username, password });
export const loginUser  = (username, password)    => post(`${API}/auth/login`,  { username, password });
export const logoutUser = ()                      => post(`${API}/auth/logout`);

// ── tasks ─────────────────────────────────────────────────────────────────────

export const getTasks   = ()                      => get(`${API}/tasks`);
export const createTask = (title)                 => post(`${API}/tasks`, { title });
export const toggleTask = (id)                    => patch(`${API}/tasks/${id}`);
export const updateTask = (id, title)             => put(`${API}/tasks/${id}`, { title });
export const removeTask = (id)                    => del(`${API}/tasks/${id}`);

// ── report ────────────────────────────────────────────────────────────────────

export const getReport   = ()  => get(`${API}/report`);
export const downloadCSV = ()  => window.open(`${API}/report/csv`, '_blank');

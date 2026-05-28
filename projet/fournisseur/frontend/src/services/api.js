import axios from 'axios';
import { auth } from '../firebase';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Injecter le token Firebase dans chaque requête
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Auth ---
export const getMe = () => api.get('/api/auth/me');
export const registerSupplier = (data) => api.post('/api/auth/register', data);

// --- Orders ---
export const getOrders = (supplierId, status) =>
  api.get('/api/orders', { params: { supplier_id: supplierId, status } });

export const acceptOrder = (orderId, supplierId) =>
  api.patch(`/api/orders/${orderId}/accept`, { supplierId });

export const rejectOrder = (orderId, supplierId, reason) =>
  api.patch(`/api/orders/${orderId}/reject`, { supplierId, reason });

export const assignDeliverer = (orderId, supplierId, delivererId) =>
  api.patch(`/api/orders/${orderId}/assign-deliverer`, { supplierId, delivererId });

export const getOrderById = (orderId) => api.get(`/api/orders/${orderId}`);

// --- Suppliers ---
export const getSupplier = (supplierId) => api.get(`/api/suppliers/${supplierId}`);
export const updateSupplier = (supplierId, data) =>
  api.patch(`/api/suppliers/${supplierId}`, data);
export const getSupplierStats = (supplierId) =>
  api.get(`/api/suppliers/${supplierId}/stats`);

// --- Deliverers ---
export const getDeliverers = (supplierId) =>
  api.get('/api/deliverers', { params: { supplier_id: supplierId } });

// --- Geolocation ---
export const getNearbySuppliers = (lat, lng, radius) =>
  api.get('/api/geolocation/nearby-suppliers', { params: { lat, lng, radius } });

export default api;

import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
}

export const listingService = {
  create: (data) => api.post('/listings', data),
  search: (params) => api.get('/listings/search', { params }),
  getById: (id) => api.get(`/listings/${id}`),
}

export const transactionService = {
  request: (data) => api.post('/transactions/request', data),
  accept: (id) => api.put(`/transactions/${id}/accept`),
  complete: (id) => api.put(`/transactions/${id}/complete`),
  getById: (id) => api.get(`/transactions/${id}`),
  getBySeller: (sellerId) => api.get(`/transactions/seller/${sellerId}`),
  getByBuyer: (buyerId) => api.get(`/transactions/buyer/${buyerId}`),
}

export const dashboardService = {
  getSellerStats: (id) => api.get(`/dashboard/seller/${id}`),
  getBuyerStats: (id) => api.get(`/dashboard/buyer/${id}`),
  getHouseholdStats: (id) => api.get(`/dashboard/household/${id}`),
}

export const pickupService = {
  create: (data) => api.post('/pickup-requests', data),
  assign: (id, userId) =>
    api.put(`/pickup-requests/${id}/assign`, null, { params: { userId } }),
  collect: (id) => api.put(`/pickup-requests/${id}/collect`),
  getAll: (params) => api.get('/pickup-requests', { params }),
  getById: (id) => api.get(`/pickup-requests/${id}`),
  getByUser: (userId) => api.get(`/pickup-requests/user/${userId}`),
}

export const agentService = {
  register: (userId, city) =>
    api.post('/agents', null, { params: { userId, city } }),
  list: (city) => api.get('/agents', { params: city ? { city } : {} }),
}

export const rewardsService = {
  getBalance: (householdUserId) => api.get(`/rewards/${householdUserId}`),
}

export const aggregationService = {
  getBatches: (params) => api.get('/aggregation-batches', { params }),
  sellBatch: (id, data) => api.put(`/aggregation-batches/${id}/sell`, data),
}

export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getListings: () => api.get('/admin/listings'),
  getTransactions: () => api.get('/admin/transactions'),
  getPickups: () => api.get('/admin/pickups'),
  getAgents: () => api.get('/admin/agents'),
  getBatches: () => api.get('/admin/batches'),
}

export default api

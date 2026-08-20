export const WASTE_TYPES = [
  'COOKING_OIL',
  'FOOD_WASTE',
  'PLASTIC',
  'FABRIC_SCRAP',
  'METAL',
  'PAPER',
  'WOOD',
  'OTHER',
]

export const WASTE_TYPE_LABELS = {
  COOKING_OIL: 'Cooking Oil',
  FOOD_WASTE: 'Food Waste',
  PLASTIC: 'Plastic',
  FABRIC_SCRAP: 'Fabric Scrap',
  METAL: 'Metal',
  PAPER: 'Paper',
  WOOD: 'Wood',
  OTHER: 'Other',
}

export const UNITS = ['KG', 'LITRE']

export const ROLES = {
  BUSINESS_SELLER: 'BUSINESS_SELLER',
  BUSINESS_BUYER: 'BUSINESS_BUYER',
  HOUSEHOLD_USER: 'HOUSEHOLD_USER',
  COLLECTION_AGENT: 'COLLECTION_AGENT',
  ADMIN: 'ADMIN',
}

export const ROLE_LABELS = {
  BUSINESS_SELLER: 'Business Seller',
  BUSINESS_BUYER: 'Business Buyer',
  HOUSEHOLD_USER: 'Household User',
  COLLECTION_AGENT: 'Collection Agent',
  ADMIN: 'Admin',
}

export const STATUS_COLORS = {
  REQUESTED: 'text-yellow-600 bg-yellow-50',
  PENDING: 'text-yellow-600 bg-yellow-50',
  ASSIGNED: 'text-indigo-600 bg-indigo-50',
  ACCEPTED: 'text-blue-600 bg-blue-50',
  PICKED_UP: 'text-purple-600 bg-purple-50',
  ACTIVE: 'text-green-600 bg-green-50',
  MATCHED: 'text-blue-600 bg-blue-50',
  COLLECTED: 'text-green-600 bg-green-50',
  COMPLETED: 'text-green-700 bg-green-100',
  CANCELLED: 'text-red-600 bg-red-50',
  REJECTED: 'text-red-600 bg-red-50',
  COLLECTING: 'text-blue-600 bg-blue-50',
  READY_FOR_SALE: 'text-amber-600 bg-amber-50',
  SOLD: 'text-green-700 bg-green-100',
}

export const ROLE_COLORS = {
  BUSINESS_SELLER: 'text-blue-600 bg-blue-50',
  BUSINESS_BUYER: 'text-purple-600 bg-purple-50',
  HOUSEHOLD_USER: 'text-green-600 bg-green-50',
  COLLECTION_AGENT: 'text-amber-600 bg-amber-50',
  ADMIN: 'text-red-600 bg-red-50',
}

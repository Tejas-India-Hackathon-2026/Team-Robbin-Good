import { useAuth } from '../context/AuthContext'
import { ROLES } from '../utils/constants'
import SellerDashboard from './SellerDashboard'
import BuyerDashboard from './BuyerDashboard'

export default function BusinessDashboard() {
  const { user } = useAuth()

  if (user?.role === ROLES.BUSINESS_BUYER) {
    return <BuyerDashboard />
  }

  return <SellerDashboard />
}

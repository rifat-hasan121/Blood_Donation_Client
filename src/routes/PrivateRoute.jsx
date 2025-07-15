import PropTypes from 'prop-types'
import {useContext,} from 'react'
import { Navigate, useLocation } from 'react-router'
import LoadingSpinner from '../Shared/LoadingSpinner'
import {  AuthContext} from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) return <LoadingSpinner />
  if (user) return children
  return <Navigate to='/login' state={{ from: location }} replace='true' />
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
}

export default PrivateRoute
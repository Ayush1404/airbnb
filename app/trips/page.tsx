import { getCurrentUser } from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState'
import getReservations from '../actions/getReservations'
import TripsClient from './TripsClient'

const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser ){
        return (
            
            <EmptyState 
                title='Unautharized'
                subtitle='Please login.'
            />
            
        )
    }
    const reservations = await getReservations({
        userId : currentUser.id
    })

    if(!reservations || reservations.length === 0 ) return(
        
        <EmptyState 
            title='No trips found'
            subtitle='Looks like you have no trip reservations'
        />
        
    )
    return (
        
        
            <TripsClient
                reservations = {reservations}
                currentUser = {currentUser}
            />
        
        
  )
}

export default TripsPage
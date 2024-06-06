
import { getCurrentUser } from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings"
import EmptyState from "../components/EmptyState"
import FavoritesClient from "./FavoritesClient"

const FavoritesPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser)
    {
        return (
            
                <EmptyState
                    title="Unautharized"
                    subtitle="Please login"    
                />
        )   
    }
    const favorites = await getFavoriteListings()

    if(!favorites || favorites.length === 0 ) return(
        
            <EmptyState 
                title='No favorites found'
                subtitle='Looks like you have no favorites listings'
            />
    )
    return (
    
       <FavoritesClient
            listings={favorites}
            currentUser={currentUser}
       />
    )
}

export default FavoritesPage


import Paginator from '../common/Paginator/Paginator.tsx';
import User from './User.tsx';
import { UserType } from '../../types/types.ts'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users?: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) =>{

    return <div>
    <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize}/>
    {
            users.map( u => <User 
            user={u} 
            key={u.id} 
            followingInProgress={props.followingInProgress}
            unfollow={props.unfollow}
            follow={props.follow}
            />)
    }
</div>
}

export default Users;
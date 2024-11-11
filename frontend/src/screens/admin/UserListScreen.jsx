import { Button, Table } from 'react-bootstrap'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { LinkContainer } from "react-router-bootstrap"
import { toast } from 'react-toastify'
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { useDeleteUserMutation, useGetUsersQuery } from "../../slices/usersApiSlice"



const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const res = await deleteUser(id);
                console.log(res)
                refetch();
                if(res.error){ 
                    toast.danger("You Can not delete an admin user");
                }
                else{
                    toast.success("User deleted");
                }
               
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    return (isLoading || loadingDelete) ? <Loader /> 
        : error ? <Message variant='danger'>{error}</Message> 
        : (
        <>
            <h1>Users</h1>
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </td>
                            <td>
                                {user.isAdmin ? (
                                    <FaCheck color='green' />
                                ) : (
                                    <FaTimes color='red' />
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>
                                {!user.isAdmin && <Button 
                                    variant='danger' 
                                    className='btn-sm mx-2' 
                                    onClick={()=> deleteHandler(user._id)}
                                >
                                    <FaTrash color='white' />
                                </Button>}
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )


    
}

export default UserListScreen
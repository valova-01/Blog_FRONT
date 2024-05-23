export const deleteUser = (userId) =>
	fetch(`http://localhost:3005/users/${userId}`, {
		method: 'DELETE',
	}).catch((error) => {
		console.error('Error deleting user:', error);
	});

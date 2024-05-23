export const deleteComment = async (commentId) =>
	fetch(`http://localhost:3005/comments/${commentId}`, {
		method: 'DELETE',
	}).catch((error) => {
		console.error('Error deleting user:', error);
	});

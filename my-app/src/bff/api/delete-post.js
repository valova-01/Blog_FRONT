export const deletePost = (postId) =>
	fetch(`http://localhost:3005/posts/${postId}`, {
		method: 'DELETE',
	}).catch((error) => {
		console.error('Error deleting:', error);
	});

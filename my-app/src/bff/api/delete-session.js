export const deleteSession = async (sessionId) =>
	fetch(`http://localhost:3005/sessions/${sessionId}`, {
		method: 'DELETE',
	}).catch((error) => {
		console.error('Error deleting user:', error);
	});

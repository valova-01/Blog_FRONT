import { deleteUser } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removeUser = async (hash, userId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	try {
		await deleteUser(userId);

		return {
			error: null,
			res: true,
		};
	} catch (error) {
		console.error('Error removing user:', error);

		return {
			error: 'Произошла ошибка при удалении пользователя',
			res: null,
		};
	}
};

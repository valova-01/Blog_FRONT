import { addComment, getPost } from '../api';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';
import { ROLE } from '../constants';

export const addPostComment = async (hash, userId, postId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await addComment(userId, postId, content);

	const post = await getPost(postId);

	const commentsWithAuthor = await getPostCommentsWithAuthor();

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};

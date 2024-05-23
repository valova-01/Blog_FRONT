import { generateDate } from '../utils';

export const addPost = ({ imageUrl, title, content }) =>
	fetch('http://localhost:3005/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			imageUrl: imageUrl,
			publishedAt: generateDate(),
			title,
			content,
		}),
	}).then((createdPost) => createdPost.json());

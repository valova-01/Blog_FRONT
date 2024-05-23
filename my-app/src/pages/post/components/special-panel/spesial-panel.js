import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { Icon } from '../../../../components';
import { useServerRequest } from '../../../../hooks';
import { checkAccess } from '../../../../utils';
import { selectUserRole } from '../../../../selectors';
import { ROLE } from '../../../../constants';

import styled from 'styled-components';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить Статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon inactive={true} id="fa-calendar-o" margin="0 7px 0 0" size="18px" />
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className="buttons">
					{editButton}
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							size="21px"
							margin="0 0 0 7px"
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .buttons {
		display: flex;
	}

	& i {
		top: -1px;
		position: relative;
	}

	& .published-at {
		display: flex;
		font-size: 18px;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
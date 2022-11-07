import { List, ListItem, Tooltip } from '@mui/material';
// import React, { useState } from 'react';
import {
	FaDesktop,
	FaListOl,
	FaRegCreditCard,
	FaRegUser,
	FaScroll,
	FaStoreAlt,
	FaThLarge,
} from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as PATH from '../../constant/path';
import { logout, reset } from '../../features/auth/authSlice';

const Navlist = () => {
	// const navigate = useNavigate();
	// const dispatch = useDispatch();
	// const [open, setOpen] = useState(false);

	// const handleClick = () => {
	// 	setOpen(!open);
	// };

	// const onLogout = () => {
	// 	dispatch(logout());
	// 	dispatch(reset());
	// 	navigate(PATH.LOGIN);
	// };

	return (
		<List component='nav' sx={{ height: '100%', width: '100%' }}>
			<Tooltip title='Dashboard' placement='right'>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.DASHBOARD}
						navlinkIcon={<FaThLarge />}
						navlinkLabel='Dashboard'
					/>
				</ListItem>
			</Tooltip>
			<Tooltip title='Monitoring' placement='right'>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.MONITORING}
						navlinkIcon={<FaDesktop />}
						navlinkLabel='Monitoring'
					/>
				</ListItem>
			</Tooltip>
			<Tooltip title='Group' placement='right'>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.BRANCH_GROUP}
						navlinkIcon={<FaStoreAlt />}
						navlinkLabel='Group'
					/>
				</ListItem>
			</Tooltip>
			<Tooltip title='Transaction' placement='right'>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.BRANCH_TRANSACTION}
						navlinkIcon={<FaRegCreditCard />}
						navlinkLabel='Transaction'
					/>
				</ListItem>
			</Tooltip>
			<Tooltip title='Profile' placement='right'>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.BRANCH_PROFILE}
						navlinkIcon={<FaRegUser />}
						navlinkLabel='Profile'
					/>
				</ListItem>
			</Tooltip>
			<Tooltip title='Summary' placement='right'>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.BRANCH_SUMMARY}
						navlinkIcon={<FaListOl />}
						navlinkLabel='Summary'
					/>
				</ListItem>
			</Tooltip>
			<Tooltip title='Settlement' placement='right'>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.BRANCH_SETTLEMENT}
						navlinkIcon={<FaScroll />}
						navlinkLabel='Settlement'
					/>
				</ListItem>
			</Tooltip>
			{/* <button onClick={onLogout}>logout</button> */}
		</List>
	);
};

const ListItemNavLink = ({ navlinkPath, navlinkIcon, navlinkLabel }) => {
	return (
		<NavLink
			className={({ isActive }) =>
				isActive ? 'navlink navlink-active' : 'navlink'
			}
			to={navlinkPath}>
			{navlinkIcon} <p>{navlinkLabel}</p>
		</NavLink>
	);
};

export default Navlist;

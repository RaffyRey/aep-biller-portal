import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import { Box, List, ListItem, Tooltip } from '@mui/material';
import {
	FaDesktop,
	FaListOl,
	FaRegCreditCard,
	FaRegUser,
	FaStoreAlt,
	FaThLarge,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import * as PATH from '../../constant/path';

import AllEasyLogo from '../alleasyLogo/AllEasyLogo';

function ResponsiveDrawer({ onClose }) {
	return (
		<Box
			width={250}
			position='relative'
			display='flex'
			flexDirection='column'
			alignItems='center'
			sx={{ height: '100%' }}>
			<header style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
				{/* <button className='menu-button' onClick={onClose}>
					
				</button> */}
				<AllEasyLogo />
			</header>
			<List component='nav' sx={{ height: '100%', width: '100%' }}>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.DASHBOARD}
						navlinkIcon={<FaThLarge />}
						navlinkLabel='Dashboard'
					/>
				</ListItem>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.MONITORING}
						navlinkIcon={<FaDesktop />}
						navlinkLabel='Monitoring'
					/>
				</ListItem>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.BRANCH_GROUP}
						navlinkIcon={<FaStoreAlt />}
						navlinkLabel='Group'
					/>
				</ListItem>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.BRANCH_TRANSACTION}
						navlinkIcon={<FaRegCreditCard />}
						navlinkLabel='Transaction'
					/>
				</ListItem>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.BRANCH_PROFILE}
						navlinkIcon={<FaRegUser />}
						navlinkLabel='Profile'
					/>
				</ListItem>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.BRANCH_SUMMARY}
						navlinkIcon={<FaListOl />}
						navlinkLabel='Summary'
					/>
				</ListItem>
				<ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
					<ListItemNavLink
						navlinkPath={PATH.BRANCH_SETTLEMENT}
						navlinkIcon={<HistoryEduOutlinedIcon />}
						navlinkLabel='Settlement'
					/>
				</ListItem>
			</List>
		</Box>
	);
}

const ListItemNavLink = ({ navlinkPath, navlinkIcon, navlinkLabel }) => {
	return (
		<NavLink
			className={({ isActive }) =>
				isActive ? 'navlink-drawer navlink-active' : 'navlink-drawer'
			}
			to={navlinkPath}>
			{navlinkIcon} <p>{navlinkLabel}</p>
		</NavLink>
	);
};

export default ResponsiveDrawer;

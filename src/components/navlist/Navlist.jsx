import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import { Collapse, List, ListItem } from '@mui/material';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaDesktop, FaListOl, FaRegCreditCard, FaRegUser, FaStoreAlt, FaThLarge } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import * as PATH from '../../constant/path';

const Navlist = () => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List component="nav" sx={{ height: '100%', width: '100%' }}>
      <ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
        <ListItemNavLink navlinkPath={PATH.DASHBOARD} navlinkIcon={<FaThLarge />} navlinkLabel="Dashboard" />
      </ListItem>
      <ListItem sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
        <ListItemNavLink navlinkPath={PATH.MONITORING} navlinkIcon={<FaDesktop />} navlinkLabel="Monitoring" />
      </ListItem>
      <ListItem onClick={handleClick} sx={{ height: '50px', width: '100%', marginTop: '8px' }}>
        <button className='navlink' style={{ width: '100%', height: '100%', cursor: 'pointer', }}> {open ? <FaChevronUp /> : <FaChevronDown />}  Biller</button>
      </ListItem>
      {/* collapsing */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <ListItemNavLink navlinkPath={PATH.BRANCH_GROUP} navlinkIcon={<FaStoreAlt />} navlinkLabel="Group" />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemNavLink navlinkPath={PATH.BRANCH_TRANSACTION} navlinkIcon={<FaRegCreditCard />} navlinkLabel="Transaction" />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemNavLink navlinkPath={PATH.BRANCH_PROFILE} navlinkIcon={<FaRegUser />} navlinkLabel="Profile" />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemNavLink navlinkPath={PATH.BRANCH_SUMMARY} navlinkIcon={<FaListOl />} navlinkLabel="Summary" />
          </ListItem>
          <ListItem sx={{ pl: 4 }}>
            <ListItemNavLink navlinkPath={PATH.BRANCH_SETTLEMENT} navlinkIcon={<HistoryEduOutlinedIcon />} navlinkLabel="Settlement" />
          </ListItem>
        </List>
      </Collapse>

    </List>
  )
}

const ListItemNavLink = ({ navlinkPath, children, navlinkIcon, navlinkLabel }) => {
  return (
    <NavLink className={({ isActive }) => isActive ? 'navlink navlink-active' : 'navlink'} to={navlinkPath}>
      {navlinkIcon} {navlinkLabel}
    </NavLink>
  )
}

export default Navlist
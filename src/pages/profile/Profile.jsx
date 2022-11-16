import { Box, Divider, Skeleton, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { WebLayout } from '../../components';
import { Data } from './components/Data';
import DataCard from './components/DataCard';
import Filters from './components/Filters';
import ProfileCard from './components/ProfileCard';

// new imports
import { useDispatch, useSelector } from 'react-redux';
import {
	getBillerProfile,
	getBillers,
} from '../../features/biller_group/billerSlice';

export default function Profile() {
	const dispatch = useDispatch();
	const {
		profile,
		isLoading: profileLoading,
		isError: profileError,
	} = useSelector((state) => state.biller);
	const {
		billers,
		isLoading: billersLoading,
		isError: billersError,
	} = useSelector((state) => state.biller);

	const [page, setPage] = useState(1);
	const [params, setParams] = useState(`page=${page}`);
	const [searchData, setSearchData] = useState('');

	const handleChange = (e, value) => {
		e.preventDefault();
		setPage(value);
		setParams(`biller?page=${value}`);
	};

	const [billerParams, setBillerParams] = useState(0);

	let billerId = billers && billers.data.listings.billers[billerParams].id;

	// search
	const searchOnClick = (e) => {
		e.preventDefault();

		if (!searchData) {
			setBillerParams(`${billerId}`);
		} else {
			setParams(`page=${page}&keyword=${searchData}`);
		}
	};

	useEffect(() => {
		dispatch(getBillers(params));
		dispatch(getBillerProfile(billerId));
	}, [dispatch, params, billerId]);

	return (
		<WebLayout>
			<Box
				width='100%'
				height='100%'
				display='flex'
				flexDirection='column'
				paddingY={1}
				paddingX={2}
				bgcolor='#fff'>
				{/* filters */}
				<Filters
					searchValue={searchData}
					searchOnChange={(e) => setSearchData(e.target.value)}
					searchOnClick={searchOnClick}
				/>
				<Divider orientation='horizontal' sx={{ marginBottom: 2 }} flexItem />
				{/* data */}
				<Box width='100%' height='100%' overflow='hidden' display='flex'>
					<Data
						onCount={billers && billers.data.listings.meta.pagination.total_pages}
						handleChange={handleChange}>
						{billersLoading ? (
							<TableRow sx={{ width: '100%', position: 'relative' }}>
								<TableCell>
									<Skeleton variant='rectangular' width='100%' height='100%' />
								</TableCell>
							</TableRow>
						) : (
							billers &&
							billers.data.listings.billers.map((res, index) => (
								<TableRow key={res.id}>
									<TableCell>
										<DataCard
											billerLogo={res.logo}
											billerName={res.name}
											billerEmail={res.contact_email}
											cardOnClick={() => setBillerParams(index)}
										/>
									</TableCell>
								</TableRow>
							))
						)}
					</Data>
					<ProfileCard
						profileImg={
							profileLoading ? (
								<ProfileDataLoader />
							) : (
								profile && profile.data.billers.logo
							)
						}
						profileName={
							profileLoading ? (
								<ProfileDataLoader />
							) : (
								profile && profile.data.billers.name
							)
						}
						profileCompany={
							profileLoading ? (
								<ProfileDataLoader />
							) : (
								profile && profile.data.billers.name
							)
						}
						profileCategory={
							profileLoading ? (
								<ProfileDataLoader />
							) : (
								profile && profile.data.billers.category
							)
						}
						profileStatus={
							profileLoading ? (
								<ProfileDataLoader />
							) : profile && profile.data.billers.is_live === 0 ? (
								'InActive'
							) : (
								'Active'
							)
						}
						profileFee={
							profileLoading ? (
								<ProfileDataLoader />
							) : (
								profile && profile.data.billers.ae_system_fee
							)
						}
						profileConvenience={
							profileLoading ? (
								<ProfileDataLoader />
							) : (
								profile && profile.data.billers.fee
							)
						}
						profileContact={
							profileLoading ? (
								<ProfileDataLoader />
							) : (
								profile && profile.data.billers.contact_person
							)
						}
						profileNumber={
							profileLoading ? (
								<ProfileDataLoader />
							) : (
								profile && profile.data.billers.contact_no
							)
						}
						profileEmail={
							profileLoading ? (
								<ProfileDataLoader />
							) : (
								profile && profile.data.billers.contact_email
							)
						}
					/>
				</Box>
			</Box>
		</WebLayout>
	);
}

const ProfileDataLoader = () => {
	return <Skeleton width={150} height={20} sx={{ marginLeft: 1 }} />;
};

import {
	Box,
	CircularProgress,
	Divider,
	Skeleton,
	TableCell,
	TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import { WebLayout } from '../../components';
import {
	useBillerQuery,
	useProfileQuery,
} from '../../features/biller/billerApi';
import { Data } from './components/Data';
import DataCard from './components/DataCard';
import Filters from './components/Filters';
import ProfileCard from './components/ProfileCard';

export default function Profile() {
	const [page, setPage] = useState(1);
	const [params, setParams] = useState(`biller?page=${page}`);
	const { data, isFetching } = useBillerQuery(params);
	const [searchData, setSearchData] = useState('');

	let billers = data && data.data.listings.billers;
	let total_page = data && data.data.listings.meta.pagination.total_pages;

	const handleChange = (e, value) => {
		e.preventDefault();
		setPage(value);
		setParams(`biller?page=${value}`);
	};

	const [billerParams, setBillerParams] = useState(0);

	let billerId = data && data.data.listings.billers[billerParams].id;

	const { data: biller, isFetching: billerFetching } = useProfileQuery(billerId);

	// search
	const searchOnClick = (e) => {
		e.preventDefault();

		if (!searchData) {
			setBillerParams(`${billerId}`);
		} else {
			setParams(`biller?page=${page}&keyword=${searchData}`);
		}
	};

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
					<Data onCount={total_page} handleChange={handleChange}>
						{isFetching ? (
							<TableRow sx={{ width: '100%', position: 'relative' }}>
								<TableCell>
									<Skeleton variant='rectangular' width='100%' height='100%' />
								</TableCell>
							</TableRow>
						) : (
							billers.map((res, index) => (
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
							billerFetching ? (
								<ProfileDataLoader />
							) : (
								biller && biller.data.billers.logo
							)
						}
						profileName={
							billerFetching ? (
								<ProfileDataLoader />
							) : (
								biller && biller.data.billers.name
							)
						}
						profileCompany={
							billerFetching ? (
								<ProfileDataLoader />
							) : (
								biller && biller.data.billers.name
							)
						}
						profileCategory={
							billerFetching ? (
								<ProfileDataLoader />
							) : (
								biller && biller.data.billers.category
							)
						}
						profileStatus={
							billerFetching ? (
								<ProfileDataLoader />
							) : biller && biller.data.billers.is_live === 0 ? (
								'InActive'
							) : (
								'Active'
							)
						}
						profileFee={
							billerFetching ? (
								<ProfileDataLoader />
							) : (
								biller && biller.data.billers.ae_system_fee
							)
						}
						profileConvenience={
							billerFetching ? (
								<ProfileDataLoader />
							) : (
								biller && biller.data.billers.fee
							)
						}
						profileContact={
							billerFetching ? (
								<ProfileDataLoader />
							) : (
								biller && biller.data.billers.contact_person
							)
						}
						profileNumber={
							billerFetching ? (
								<ProfileDataLoader />
							) : (
								biller && biller.data.billers.contact_no
							)
						}
						profileEmail={
							billerFetching ? (
								<ProfileDataLoader />
							) : (
								biller && biller.data.billers.contact_email
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

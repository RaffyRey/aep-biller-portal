import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Skeleton,
  TableFooter,
} from "@mui/material";
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Modal, Spinner, TablePagination } from "../../../components";
import NoImg from "../../../assets/image/no-image.png";
import { formatPesos } from "../../../utilities/formatCurrency";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getBillerProfile } from "../../../features/biller_group/billerSlice";

const TableHeader = ({ label }) => {
  return (
    <Typography
      variant="subtitle2"
      fontFamily="Montserrat"
      fontSize={16}
      fontWeight={600}
      color="#545252"
    >
      {label}
    </Typography>
  );
};

function ProfileTable({ data }) {
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector((state) => state.biller);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          minWidth: 700,
        }}
      >
        <Table size="small" aria-label="a dense table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <TableHeader label="Name" />
              </TableCell>
              <TableCell align="center">
                <TableHeader label="Code" />
              </TableCell>
              <TableCell align="center">
                <TableHeader label="Email" />
              </TableCell>
              <TableCell align="center">
                <TableHeader label="Mobile" />
              </TableCell>
              <TableCell align="right">
                <TableHeader label="Action" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="center">{item.code}</TableCell>
                <TableCell align="center">{item.contact_email}</TableCell>
                <TableCell align="center">{item.contact_no}</TableCell>
                <TableCell align="right">
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setOpen(true);
                      dispatch(getBillerProfile(item.id));
                    }}
                  >
                    <FaEllipsisV />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination />
      <Modal open={open} close={handleClose}>
        <Box
          component="div"
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          padding={2}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={300}
            height={100}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <img
                width={profile?.data?.billers?.logo === null ? 100 : 300}
                height={100}
                src={
                  profile?.data?.billers?.logo === null
                    ? NoImg
                    : profile?.data?.billers?.logo
                }
                alt="Biller's Logo"
                loading="lazy"
              />
            )}
          </Box>
          <Box component="div" padding={2} width="100%" marginTop={2}>
            <Typography
              color="#333"
              fontSize={24}
              letterSpacing={1}
              fontFamily="Montserrat"
              fontWeight={700}
              textAlign="center"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="100%"
            >
              {isLoading ? <Skeleton /> : profile?.data?.billers?.name}
            </Typography>
            <Box width="100%" display="flex" marginTop={2} gap={3}>
              <Box component="div" width="50%">
                <ProfileData
                  label="Biller Category"
                  data={
                    isLoading ? <Skeleton /> : profile?.data?.billers?.category
                  }
                />
                <ProfileData
                  label="Status"
                  data={
                    isLoading ? (
                      <Skeleton />
                    ) : profile?.data?.billers?.is_live === 1 ? (
                      "Active"
                    ) : (
                      "Inactive"
                    )
                  }
                />
                <ProfileData
                  label="Biller's Fee"
                  data={
                    isLoading ? (
                      <Skeleton />
                    ) : (
                      formatPesos(profile?.data?.billers?.ae_system_fee)
                    )
                  }
                />
                <ProfileData
                  label="Convinience Fee"
                  data={
                    isLoading ? (
                      <Skeleton />
                    ) : (
                      formatPesos(profile?.data?.billers?.fee)
                    )
                  }
                />
              </Box>
              <Box component="div" width="50%">
                <ProfileData
                  label="Contact Person"
                  data={
                    isLoading ? (
                      <Skeleton />
                    ) : (
                      profile?.data?.billers?.contact_person
                    )
                  }
                />
                <ProfileData
                  label="Contact Number"
                  data={
                    isLoading ? (
                      <Skeleton />
                    ) : (
                      profile?.data?.billers?.contact_no
                    )
                  }
                />
                <ProfileData
                  label="Contact Email"
                  data={
                    isLoading ? (
                      <Skeleton />
                    ) : (
                      profile?.data?.billers?.contact_email
                    )
                  }
                />
                <ProfileData
                  label="Group"
                  data={
                    isLoading ? <Skeleton /> : profile?.data?.billers?.group
                  }
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const ProfileData = ({ label, data }) => {
  return (
    <Box
      component="span"
      display="flex"
      gap={2}
      width="100%"
      justifyContent="space-between"
      marginY={1}
    >
      <Typography color="#6c757d" fontFamily="Montserrat">
        {label}:
      </Typography>
      <Typography color="#333" fontFamily="Montserrat" fontWeight={600}>
        {data}
      </Typography>
    </Box>
  );
};

export default ProfileTable;

<Box width="100%" height="100%" overflow="hidden" display="flex">
          <Data
            onCount={billers?.data?.listings.meta.pagination.total_pages}
            handleChange={handleChange}
          >
            {billersLoading ? (
              <TableRow sx={{ width: "100%", position: "relative" }}>
                <TableCell>
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                </TableCell>
              </TableRow>
            ) : (
              billers?.data?.listings.billers.map((res, index) => (
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
                profile?.data.billers.logo
              )
            }
            profileName={
              profileLoading ? (
                <ProfileDataLoader />
              ) : (
                profile?.data.billers.name
              )
            }
            profileCompany={
              profileLoading ? (
                <ProfileDataLoader />
              ) : (
                profile?.data.billers.name
              )
            }
            profileCategory={
              profileLoading ? (
                <ProfileDataLoader />
              ) : (
                profile?.data.billers.category
              )
            }
            profileStatus={
              profileLoading ? (
                <ProfileDataLoader />
              ) : profile?.data.billers.is_live === 0 ? (
                "InActive"
              ) : (
                "Active"
              )
            }
            profileFee={
              profileLoading ? (
                <ProfileDataLoader />
              ) : (
                profile?.data.billers.ae_system_fee
              )
            }
            profileConvenience={
              profileLoading ? <ProfileDataLoader /> : profile?.data.billers.fee
            }
            profileContact={
              profileLoading ? (
                <ProfileDataLoader />
              ) : (
                profile?.data.billers.contact_person
              )
            }
            profileNumber={
              profileLoading ? (
                <ProfileDataLoader />
              ) : (
                profile?.data.billers.contact_no
              )
            }
            profileEmail={
              profileLoading ? (
                <ProfileDataLoader />
              ) : (
                profile?.data.billers.contact_email
              )
            }
          />
        </Box>
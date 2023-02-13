<ProfileCard
            profileName={
              summariesLoading ? (
                <Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
              ) : (
                summaries?.data.billers.name
              )
            }
            profileTransactionDate={
              summariesLoading ? (
                <Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
              ) : (
                summaries?.data.total[0].date
              )
            }
            profileTransactionCount={
              summariesLoading ? (
                <Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
              ) : (
                summaries?.data.total[0].count
              )
            }
            profileTransactionAmount={
              summariesLoading ? (
                <Skeleton width={250} height={30} sx={{ marginLeft: 1 }} />
              ) : (
                formatPesos(summaries?.data.total[0].revenue)
              )
            }
          />

          {/* <DatePicker
              selectsRange={true}
              startDate={pickerStartDate}
              endDate={pickerEndDate}
              onChange={pickerOnchange}
              placeholderText="Date Range"
              isClearable={true}
              className="input-datePicker"
            /> */}


           <ProfileCard
            profileName={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                settlement?.data.billers.name
              )
            }
            profileTransactionDate={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                settlement?.data.total[0].date
              )
            }
            profileTransactionCount={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                settlement?.data.total[0].count
              )
            }
            profileTransactionAmount={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                formatPesos(settlement?.data.total[0].revenue)
              )
            }
            profileTransactionFee={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                formatPesos(settlement?.data.total[0].transaction_fee)
              )
            }
            profileTotalTransactionFee={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                formatPesos(settlement?.data.total[0].totalBillerFee)
              )
            }
            profileSettlementAmount={
              settlementLoading ? (
                <SkeletonLoader />
              ) : (
                formatPesos(settlement?.data.total[0].totalSettlement)
              )
            }
          />

          <TransactionTable>
              {transactionsLoading ? (
                <TableRow
                  sx={{ width: "100%", height: 50, position: "relative" }}
                >
                  <TableCell>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  </TableCell>
                </TableRow>
              ) : (
                transactions &&
                transactions.data.listings.collections.map((row) => (
                  <StyledTableRow
                    key={row.refno}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
                      {getFormattedDateTwo(row.created_at)}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
                      {row.refno}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
                      {row.dynamic_columns[0].value}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
                      {row.dynamic_columns[1].value}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
                      {row.dynamic_columns[2].value}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
                      {row.dynamic_columns[3].value}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TransactionTable>
            <TablePagination
              total_page={
                transactions &&
                transactions.data.listings.meta.pagination.total_pages
              }
              handleChange={onPagination}
            />
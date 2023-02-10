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
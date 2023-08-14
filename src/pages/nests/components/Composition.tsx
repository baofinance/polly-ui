import Badge from '@/components/Badge'
import DonutGraph from '@/components/Graphs/PieGraph'
import { PageLoader } from '@/components/Loader'
import { Progress } from '@/components/ProgressBar'
import Tooltipped from '@/components/Tooltipped'
import Typography from '@/components/Typography'
import { NestComponent } from '@/hooks/nests/useComposition'
import { getDisplayBalance } from '@/utils/numberFormat'
import { formatUnits } from 'ethers/lib/utils'
import Image from 'next/future/image'
import React from 'react'

type CompositionProps = {
	composition: NestComponent[]
	rates: any
	info: any
	nestId: string
}

const Composition: React.FC<CompositionProps> = ({ composition, rates, info, nestId }) => {
	return (
		<>
			<div className='mb-2 mt-4 flex flex-row'>
				<div className='flex flex-row items-center justify-center'>
					<Typography className='font-bakbak !text-xl lg:!text-2xl'>Allocation Breakdown</Typography>
				</div>
			</div>
			<>
				<div className='glassmorphic-card min-h-[200px] !rounded-3xl lg:p-4'>
					{composition ? (
						<div className='grid grid-cols-4 lg:grid-cols-6'>
							<div className='hidden lg:col-span-1 lg:block'>
								<div className='flex flex-row justify-center'>
									<div className='flex flex-col'>
										<DonutGraph width={200} height={200} composition={composition} nest={nestId} rates={rates} info={info} />
									</div>
								</div>
							</div>
							<div className='col-span-4 lg:col-span-5'>
								<table className='w-full'>
									<thead>
										<tr className='rounded-t-lg'>
											<th className='w-[20%] rounded-tl-lg p-2 text-center font-bakbak text-lg font-normal text-pollyWhite/60 lg:w-[10%]'>
												Token
											</th>
											<th className='w-[40%] p-2 text-start font-bakbak text-lg font-normal text-pollyWhite/60'>Allocation</th>
											<th className='w-[20%] p-2 text-center font-bakbak text-lg font-normal text-pollyWhite/60 lg:w-[20%]'>Price</th>
											<th className='w-[20%] p-2 text-center font-bakbak text-lg font-normal text-pollyWhite/60 lg:w-[15%]'>APY</th>
											<th className='hidden w-[20%] rounded-tr-lg p-2 font-bakbak text-lg font-normal text-pollyWhite/60 lg:block lg:!w-auto  lg:!text-center'>
												Strategy
											</th>
										</tr>
									</thead>
									<tbody>
										{composition
											.sort((a, b) => (a.percentage.lt(b.percentage) ? 1 : -1))
											.map(component => {
												return (
													<tr key={component.symbol} className='even:'>
														<td className='p-2 text-center'>
															<Tooltipped content={component.symbol} placement='left'>
																<a>
																	<Image
																		src={`/images/tokens/${component.symbol}.png`}
																		width={32}
																		height={32}
																		alt={component.symbol}
																		className='inline'
																	/>
																</a>
															</Tooltipped>
														</td>
														<td className='p-2'>
															<Progress
																width={parseFloat(getDisplayBalance(component.percentage))}
																label={`${getDisplayBalance(component.percentage)}%`}
																assetColor={component.color}
															/>
														</td>
														<td className='p-2 text-center'>
															<Typography className='font-lg font-bakbak'>${getDisplayBalance(component.price)}</Typography>
														</td>
														<td className='p-2 text-center'>
															<Tooltipped content={component.apy ? `${formatUnits(component.apy.mul(100), 8)}%` : '-'}>
																<a>
																	<Badge>{component.apy ? `${getDisplayBalance(component.apy.mul(100))}%` : '-'}</Badge>
																</a>
															</Tooltipped>
														</td>
														<td className='hidden p-2 text-center lg:block'>
															<Badge>{component.strategy || 'None'}</Badge>
														</td>
													</tr>
												)
											})}
									</tbody>
								</table>
							</div>
						</div>
					) : (
						<PageLoader />
					)}
				</div>
			</>
		</>
	)
}

export default Composition

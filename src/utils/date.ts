export const getDayDiff = (current: Date, future: Date): number => {
	return Math.ceil((future.getTime() - current.getTime()) / (1000 * 60 * 60 * 24))
}

export const getDayOffset = (date: Date, offset: number): Date => {
	const newDate = new Date(date)
	newDate.setDate(newDate.getDate() + offset)
	return newDate
}

export const getEpochSecondForDay = (date: Date): number => {
	return Math.ceil(date.getTime() / (1000 * 60 * 60 * 24)) * 60 * 60 * 24
}

export const getWeekDiff = (current: Date, future: Date): number => {
	return Math.ceil((future.getTime() - current.getTime()) / (1000 * 60 * 60 * 24 * 7))
}

export const getTimeEpoch = (): number => {
	return Math.ceil(new Date().getTime() / (1000 * 60 * 60 * 24)) * 60 * 60 * 24
}

export const formatDate = (date: Date): string => {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const dateFromEpoch = (epoch: number): Date => {
	const date = new Date()
	date.setTime(epoch * 1000)
	return date
}

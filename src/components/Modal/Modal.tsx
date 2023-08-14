import ModalActions, { ModalActionsProps } from '@/components/Modal/Actions'
import ModalBody, { ModalBodyProps } from '@/components/Modal/Body'
import ModalHeader, { ModalHeaderProps } from '@/components/Modal/Header'
import classNames from 'classnames'
import { Dialog, Transition } from '@headlessui/react'
import React, { FC, Fragment } from 'react'
import { isDesktop } from 'react-device-detect'
import ModalOptions, { ModalOptionsProps } from './Options'

const MAX_WIDTH_CLASS_MAPPING = {
	sm: 'lg:max-w-sm',
	md: 'lg:max-w-md',
	lg: 'lg:max-w-lg',
	xl: 'lg:max-w-xl',
	'2xl': 'lg:max-w-2xl',
	'3xl': 'lg:max-w-3xl',
}

type ModalType<P> = FC<P> & {
	Body: FC<ModalBodyProps>
	Actions: FC<ModalActionsProps>
	Header: FC<ModalHeaderProps>
	Options: FC<ModalOptionsProps>
}

export interface ModalProps {
	isOpen: boolean
	onDismiss: () => void
	afterLeave?: () => void
	children?: React.ReactNode
	transparent?: boolean
	maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
	unmount?: boolean
}

const Modal: ModalType<ModalProps> = ({ isOpen, onDismiss, afterLeave, children, transparent = false, maxWidth = 'lg', unmount }) => {
	return (
		<Transition appear show={isOpen} as={Fragment} afterLeave={afterLeave} unmount={unmount}>
			<Dialog as='div' className='fixed inset-0 z-50' onClose={onDismiss} unmount={unmount}>
				<div className='relative flex min-h-screen items-center justify-center text-center'>
					<Transition.Child
						unmount={false}
						as={Fragment}
						enter='ease-out duration-150'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-150'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay
							className={classNames(
								'fixed inset-0 bg-[rgb(0,0,0,0.8)] filter backdrop-blur-[10px] lg:bg-[rgb(0,0,0,0.4)] lg:backdrop-blur-[10px]',
							)}
						/>
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className='inline-block h-screen align-middle' aria-hidden='true'>
						&#8203;
					</span>

					<Transition.Child
						unmount={unmount}
						as={Fragment}
						enter='ease-out duration-150'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-150'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<div
							className={classNames(
								transparent
									? ''
									: 'mx-auto inline-block max-h-[85vh] w-[85vw] transform rounded-3xl !border !border-solid !border-pollyWhite !border-opacity-20 bg-pollyBlack bg-opacity-80 p-4 text-left align-bottom lg:w-full lg:p-6',
								isDesktop ? MAX_WIDTH_CLASS_MAPPING[maxWidth] : '',
							)}
						>
							{children}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	)
}

Modal.Header = ModalHeader
Modal.Options = ModalOptions
Modal.Body = ModalBody
Modal.Actions = ModalActions

export default Modal

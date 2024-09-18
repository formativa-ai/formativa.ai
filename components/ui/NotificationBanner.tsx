'use client'

import { useState } from 'react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import {ExclamationTriangleIcon} from "@heroicons/react/16/solid";

export default function NotificationBanner({ notification, onClose }) {
    switch(notification.category){
        case 'success':
            return <SuccessFullNotification message={notification.message} onClose={onClose} />
        case 'alert':
            return <AlertNotification message={notification.message} onClose={onClose} />
    }
}
function AlertNotification({ message, onClose }) {
    return (
        <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-yellow-400"/>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                        {message + ' '}
                        {/*<a href="#" className="font-medium text-yellow-700 underline hover:text-yellow-600">*/}
                        {/*    Upgrade your account to add more credits.*/}
                        {/*</a>*/}
                    </p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            onClick={onClose}
                            type="button"
                            className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-700 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:text-yellow-700 focus:ring-offset-2 focus:ring-offset-green-50"
                        >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon aria-hidden="true" className="h-5 w-5"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SuccessFullNotification({message, onClose}) {
    return (
        <div className="m-4 rounded-md bg-green-50 p-4 shadow-lg">
            <div className="flex">
                <div className="flex-shrink-0">
                    <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-green-400"/>
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">{message}</p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            onClick={onClose}
                            type="button"
                            className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                        >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon aria-hidden="true" className="h-5 w-5"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
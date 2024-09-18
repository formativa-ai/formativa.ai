'use client'

import { useState } from 'react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import {NotificationType} from "@/lib/types/NotificationType";
import NotificationBanner from "@/components/ui/NotificationBanner";

export default function NotificationList({notificationList,setNotificationList}: {notificationList: NotificationType[], setNotificationList: (notificationList: NotificationType[]) => void}) {

    return (
        <div className="fixed bottom-0 right-0">
            {notificationList.map((notification,index)=> (
                <NotificationBanner
                    key={index}
                    notification={notification}
                    onClose={() => {
                        // Remove the notification from the list
                        setNotificationList(notificationList.filter((_,i) => i !== index))
                    }}
                />
            ))}
        </div>
    )
}
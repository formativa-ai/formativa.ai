import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverBackdrop,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {FetchUserAttributesOutput, signOut} from "aws-amplify/auth";
import {useAuthenticator} from "@aws-amplify/ui-react";
import Footer from "@/components/sections/Footer";
import Image from "next/image";


const navigation = [
    {name: 'Maco', href: '/maco', current: false},
    {name: 'Perfil', href: '/perfil', current: true},
    // {name: 'Resources', href: '#', current: false},
    // {name: 'Company Directory', href: '#', current: false},
    // {name: 'Openings', href: '#', current: false},
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

interface UserProfileDetailsProps {
    profilePictureUrl?: string,
    setEditingProfile?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    userAttributes?: FetchUserAttributesOutput
}

export default function UserProfileDetails({
                                               profilePictureUrl,
                                               setEditingProfile,
                                               userAttributes
                                           }: UserProfileDetailsProps) {
    const { signOut } = useAuthenticator((context) => [context.user]);

    const userNavigation = [
        {name: 'Settings', onClick: () => setEditingProfile(true)},
        {name: 'Sign out', onClick: signOut},
    ]

    return (
        <>
            <div className="min-h-full">
                <Popover as="header" className="bg-black pb-24">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="relative flex items-center justify-center py-5 lg:justify-between">
                            {/* Logo */}
                            <div className="absolute left-0 flex-shrink-0 lg:static">
                                <a href="/">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        alt="Your Company"
                                        src="/logo-white.svg"
                                        className="h-8 w-auto"
                                    />
                                </a>
                            </div>

                            {/* Right section on desktop */}
                            <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                                <button
                                    type="button"
                                    className="relative flex-shrink-0 rounded-full p-1 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <span className="absolute -inset-1.5"/>
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6"/>
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-4 flex-shrink-0">
                                    <div>
                                        <MenuButton
                                            className="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                                            <span className="absolute -inset-1.5"/>
                                            <span className="sr-only">Open user menu</span>
                                            <img alt="" src={profilePictureUrl? profilePictureUrl: '/blank-profile.webp'}  className="h-8 w-8 rounded-full"/>
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:scale-95 data-[closed]:data-[leave]:transform data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-75 data-[leave]:ease-in"
                                    >
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                <a onClick={item.onClick}
                                                   className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 hover:cursor-pointer">
                                                    {item.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>

                            {/* Search */}
                            <div className="min-w-0 flex-1 px-12 lg:hidden">
                                <div className="mx-auto w-full max-w-xs">
                                    <label htmlFor="desktop-search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative text-white focus-within:text-gray-600">
                                        <div
                                            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5"/>
                                        </div>
                                        <input
                                            id="desktop-search"
                                            name="search"
                                            type="search"
                                            placeholder="Search"
                                            className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Menu button */}
                            <div className="absolute right-0 flex-shrink-0 lg:hidden">
                                {/* Mobile menu button */}
                                <PopoverButton
                                    className="group relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden"/>
                                    <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block"/>
                                </PopoverButton>
                            </div>
                        </div>
                        <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                            <div className="grid grid-cols-3 items-center gap-8">
                                <div>
                                    <div className="mx-auto w-full max-w-md">
                                        <label htmlFor="mobile-search" className="sr-only">
                                            Search
                                        </label>
                                        <div className="relative text-white focus-within:text-gray-600">
                                            <div
                                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5"/>
                                            </div>
                                            <input
                                                id="mobile-search"
                                                name="search"
                                                type="search"
                                                placeholder="Search"
                                                className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <nav className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                aria-current={item.current ? 'page' : undefined}
                                                className={classNames(
                                                    item.current ? 'bg-opacity-10 text-white' : 'text-indigo-100',
                                                    'rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10',
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:hidden">
                        <PopoverBackdrop
                            transition
                            className="fixed inset-0 z-20 bg-black bg-opacity-25 duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
                        />

                        <PopoverPanel
                            focus
                            transition
                            className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition duration-150 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <div
                                className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="pb-2 pt-3">
                                    <div className="flex items-center justify-between px-4">
                                        <div>
                                            <img
                                                alt="Formativa Technologies"
                                                src="/logo-blue.svg"
                                                className="h-8 w-auto"
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <PopoverButton
                                                className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <span className="absolute -inset-0.5"/>
                                                <span className="sr-only">Close menu</span>
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                                            </PopoverButton>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {navigation.map((item) => {
                                            return (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    aria-current={item.current ? 'page' : undefined}

                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                                >
                                                    {item.name}
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="pb-2 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img alt="" src={profilePictureUrl? profilePictureUrl: '/blank-profile.webp'} className="h-10 w-10 rounded-full"/>
                                        </div>
                                        <div className="ml-3 min-w-0 flex-1">
                                            <div
                                                className="truncate text-base font-medium text-gray-800">{userAttributes.name}</div>
                                            <div
                                                className="truncate text-sm font-medium text-gray-500">{userAttributes.email}</div>
                                        </div>
                                        <button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            <span className="absolute -inset-1.5"/>
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon aria-hidden="true" className="h-6 w-6"/>
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <a
                                                key={item.name}
                                                onClick={item.onClick}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800 hover: cursor-pointer"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </PopoverPanel>
                    </div>
                </Popover>
                <main className="-mt-24 pb-8">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="sr-only">Page title</h1>
                        {/* Main 3 column grid */}
                        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                            {/* Left column */}
                            <ProfileCard profilePictureUrl={profilePictureUrl} userAttributes={userAttributes}/>

                            {/* Right column */}
                            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                                <section aria-labelledby="section-1-title">
                                    <h2 id="section-1-title" className="sr-only">
                                        Section title
                                    </h2>
                                    <div className="overflow-hidden rounded-lg bg-white shadow">
                                        <div className="p-6">
                                            RIGHT CONTENT
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

function ProfileCard({profilePictureUrl, userAttributes}: {profilePictureUrl: string, userAttributes: FetchUserAttributesOutput}) {
    return (
        <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
                <h2 id="section-2-title" className="sr-only">
                    Section title
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="rounded-t-lg h-32 overflow-hidden">
                        <img className="object-cover object-top w-full"
                             src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
                             alt='Mountain'/>
                    </div>
                    <div
                        className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                        <Image
                            className="object-cover object-center h-32"
                            src={profilePictureUrl? profilePictureUrl: '/blank-profile.webp'}
                            alt={userAttributes.given_name + ' ' + userAttributes.family_name}
                            width={128}
                            height={128}
                        />
                    </div>
                    <div className="text-center mt-2">
                        <h2 className="font-semibold">{userAttributes.given_name + ' ' + userAttributes.family_name}</h2>
                        <p className="text-gray-500">{userAttributes["custom:userType"]}</p>
                        <p className="text-gray-500">{userAttributes.preferred_username && '@'+ userAttributes.preferred_username}</p>
                    </div>
                    <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                        <li className="flex flex-col items-center justify-around">
                            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                            <div>2k</div>
                        </li>
                        <li className="flex flex-col items-center justify-between">
                            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z"/>
                            </svg>
                            <div>10k</div>
                        </li>
                        <li className="flex flex-col items-center justify-around">
                            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"/>
                            </svg>
                            <div>15</div>
                        </li>
                    </ul>
                    <div className="p-4 border-t mx-8 mt-2">
                        <button
                            className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Follow
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
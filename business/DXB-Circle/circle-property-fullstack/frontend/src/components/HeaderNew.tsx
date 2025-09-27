'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Market Intelligence', href: '/market-intelligence' },
    { name: 'Strategy Playbooks', href: '/strategy-playbooks' },
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'About', href: '/about' },
  ]

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              Circle Property
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 px-3 rounded-lg font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all hover-lift"
            >
              Book Call
            </Link>
          </div>

          {/* Mobile menu */}
          <Menu as="div" className="relative lg:hidden">
            <Menu.Button className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100">
              <Bars3Icon className="w-6 h-6" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-slate-200">
                {navigation.map((item) => (
                  <Menu.Item key={item.href}>
                    {({ active }) => (
                      <Link
                        href={item.href}
                        className={`block px-4 py-2 text-sm font-medium ${
                          active ? 'bg-slate-50' : ''
                        } ${
                          pathname === item.href 
                            ? 'text-primary-700 bg-primary-50' 
                            : 'text-slate-700'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/contact"
                      className={`block px-4 py-2 text-sm font-medium ${
                        active ? 'bg-slate-50' : ''
                      } text-primary-600 border-t border-slate-200`}
                    >
                      Book Call
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  )
}

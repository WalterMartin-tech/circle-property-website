'use client'

import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SubscriptionModal from './SubscriptionModal'

export default function HeaderProfessional() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false)
  
  const navigation = [
    { 
      name: 'Home', 
      href: '/', 
      subtitle: 'Customer benefits & conversion' 
    },
    { 
      name: 'Invest', 
      href: '/invest', 
      subtitle: 'Strategies, tools & market data' 
    },
    { 
      name: 'Own', 
      href: '/own', 
      subtitle: 'Property management & services' 
    },
    { 
      name: 'Develop', 
      href: '/develop', 
      subtitle: 'Absorption analytics & leasing' 
    },
    { 
      name: 'Services', 
      href: '/services', 
      subtitle: 'Delivery models & pricing' 
    },
    { 
      name: 'Trends', 
      href: '/trends', 
      subtitle: 'Market insights & case studies' 
    },
  ]

  return (
    <>
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-lg font-bold gradient-text hover:opacity-80 transition-opacity">
              Circle Property
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div 
                key={item.href}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-md font-medium transition-all text-sm ${
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
                
                {/* Hover Tooltip */}
                {hoveredItem === item.href && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-50">
                    {item.subtitle}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Contact CTA */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 hover:bg-slate-50 px-4 py-2 rounded-md font-medium transition-all text-sm"
            >
              Subscribe
            </button>
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-all hover-lift text-sm"
            >
              Book Call
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Menu as="div" className="relative">
              <Menu.Button className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <Bars3Icon className="h-6 w-6" />
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
                <Menu.Items className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-slate-200">
                  {navigation.map((item) => (
                    <Menu.Item key={item.href}>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          className={`block px-4 py-3 text-sm ${
                            active ? 'bg-slate-50' : ''
                          } ${
                            pathname === item.href
                              ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-600'
                              : 'text-slate-700'
                          }`}
                        >
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {item.subtitle}
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setIsSubscriptionModalOpen(true)}
                        className={`block w-full text-left px-4 py-2 text-sm font-medium ${
                          active ? 'bg-slate-50' : ''
                        } text-slate-700 border-t border-slate-200`}
                      >
                        Subscribe
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/contact"
                        className={`block px-4 py-2 text-sm font-medium ${
                          active ? 'bg-slate-50' : ''
                        } text-blue-600`}
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
      </div>
    </header>

    {/* Subscription Modal */}
    <SubscriptionModal
      isOpen={isSubscriptionModalOpen}
      onClose={() => setIsSubscriptionModalOpen(false)}
    />
  </>
)

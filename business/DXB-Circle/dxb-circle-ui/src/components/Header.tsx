import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, PhoneIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
  activeSection: 'home' | 'invest' | 'own' | 'develop'
  setActiveSection: (section: 'home' | 'invest' | 'own' | 'develop') => void
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const navigation = [
    { name: 'Home', key: 'home' as const },
    { name: 'Invest', key: 'invest' as const, subtitle: 'Private markets' },
    { name: 'Own', key: 'own' as const, subtitle: 'Portfolio mgmt' },
    { name: 'Develop', key: 'develop' as const, subtitle: 'Leasing & QA' },
  ]

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setActiveSection('home')}
              className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              DXB Circle
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                  activeSection === item.key
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="font-medium">{item.name}</span>
                {item.subtitle && (
                  <span className="text-xs text-slate-500">{item.subtitle}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Contact CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://wa.me/971501234567"
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <PhoneIcon className="w-4 h-4" />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu */}
          <Menu as="div" className="relative md:hidden">
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
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {navigation.map((item) => (
                    <Menu.Item key={item.key}>
                      <button
                        onClick={() => setActiveSection(item.key)}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          activeSection === item.key
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item.name}
                        {item.subtitle && (
                          <div className="text-xs text-slate-500">{item.subtitle}</div>
                        )}
                      </button>
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    <a
                      href="https://wa.me/971501234567"
                      className="block px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                    >
                      WhatsApp Contact
                    </a>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  )
}

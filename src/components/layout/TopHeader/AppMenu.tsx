
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'
import { FaChevronDown, FaPlus } from 'react-icons/fa6'

import { findAllParent, findMenuItem, getAppMenuItems, getMenuItemFromURL } from '@/helpers/menu'
import type { MenuItemType } from '@/types/menu'

type SubMenus = {
  item: MenuItemType
  itemClassName?: string
  linkClassName?: string
  activeMenuItems?: Array<string>
  level: number
}

const MenuItemWithChildren = ({ item, activeMenuItems, itemClassName, linkClassName, level }: SubMenus) => {
  const level1 = level === 1
  return (
    <Dropdown as="li" className={itemClassName} drop={level >= 2 ? 'end' : undefined}>
      <DropdownToggle
        as={Link}
        to=""
        role="button"
        className={clsx('content-none', linkClassName)}
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-haspopup="true"
        aria-expanded="false">
        {item.label}
        {level1 ? <FaChevronDown size={8} className="ms-1" /> : <FaPlus size={10} />}
      </DropdownToggle>
      <DropdownMenu as="ul" aria-labelledby="listingMenu" className="custom-navbar-dropdown-menu" data-bs-popper="static" renderOnMount>
        {(item.children ?? []).map((child, idx) => (
          <Fragment key={idx + child.key + idx}>
            {child.children ? (
              <MenuItemWithChildren
                item={child}
                level={level + 1}
                activeMenuItems={activeMenuItems}
                itemClassName="dropdown-submenu"
                linkClassName={clsx('dropdown-item dropdown-toggle arrow-none d-flex align-items-center justify-content-between', {
                  active: activeMenuItems?.includes(child.key),
                })}
              />
            ) : (
              <MenuItem item={child} level={level + 1} linkClassName={clsx(activeMenuItems?.includes(child.key) && 'active')} />
            )}
          </Fragment>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

const MenuItem = ({ item, linkClassName, level, itemClassName }: SubMenus) => {
  return item.isDivider ? (
    <DropdownDivider />
  ) : (
    <li className={itemClassName}>
      <MenuItemLink item={item} linkClassName={linkClassName} level={level + 1} />
    </li>
  )
}

const MenuItemLink = ({ item, linkClassName }: SubMenus) => {
  const Icon = item.icon;
  const [about,setAbout] = useState<boolean>(false);

  return (
    <DropdownItem
      as={Link}
      to={item.url ?? ''}
      target={item.target}
      style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
    >
    <div
      style={{
        padding: '8px',
        borderRadius : '10%',
        marginLeft : '20px',
        background: 'rgba(136, 209, 254, 0.2)',
        backdropFilter: 'blur(8px)',
        transition: 'background 0.3s ease',
      }}
      about='Label'
      
      onMouseEnter={(e) => {
        (e.currentTarget.style.background = 'rgba(30, 161, 242, 0.4)');
        setAbout(true);
      }}
      onMouseLeave={(e) => {
        (e.currentTarget.style.background = 'rgba(30, 161, 242, 0.2)');
        setAbout(false);
      }}
    >
      {Icon && <Icon style={{ color: '#1ea1f2' }} />}
    </div>
      {about && <span
        style={{
          position: 'absolute',
          marginTop : '40px',
          marginLeft : '15px',
          top: '50%',
          zIndex : 10000,
          transform: 'translateY(-50%)',
          background: '#333',
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
        }}
        className="label"
      >
        {item.label}
      </span>}
    </DropdownItem>
  )
}

const AppMenu = () => {
  const [activeMenuItems, setActiveMenuItems] = useState<string[]>([])

  const menuItems = getAppMenuItems()

  const { pathname } = useLocation()

  const activeMenu = useCallback(() => {
    const trimmedURL = pathname?.replaceAll('', '')
    const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL)

    if (matchingMenuItem) {
      const activeMt = findMenuItem(menuItems, matchingMenuItem.key)
      if (activeMt) {
        setActiveMenuItems([activeMt.key, ...findAllParent(menuItems, activeMt)])
      }
    }
  }, [pathname, menuItems])

  useEffect(() => {
    activeMenu()
  }, [activeMenu, menuItems])

  return (
    <ul className={clsx('navbar-nav navbar-nav-scroll ms-auto')}>
      {(menuItems ?? []).map((item, idx) => {
        return (
          <Fragment key={item.key + idx}>
            {item.children ? (
              <MenuItemWithChildren
                item={item}
                activeMenuItems={activeMenuItems}
                level={1}
                itemClassName="nav-item"
                linkClassName={clsx('nav-link content-none d-flex align-items-center gap-1 justify-content-between', {
                  active: activeMenuItems.includes(item.key),
                })}
              />
            ) : (
              <MenuItem
                item={item}
                level={1}
                itemClassName="nav-item"
                linkClassName={clsx('nav-link', activeMenuItems.includes(item.key) && 'active')}
              />
            )}
          </Fragment>
        )
      })}
    </ul>
  )
}

export default AppMenu

import { useState, useEffect } from 'react';
import avatar7 from '@/assets/images/avatar/default avatar.png'
import { Collapse } from 'react-bootstrap';
import AppMenu from './AppMenu';
import { useLayoutContext } from '@/context/useLayoutContext';
import { BsSearch } from 'react-icons/bs';
import debounce from 'lodash.debounce';
import { useAuthContext } from '@/context/useAuthContext';
import { ListGroup, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const CollapseMenu = ({ isSearch }: { isSearch?: boolean }) => {
  const {
    mobileMenu: { open },
  } = useLayoutContext();
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const fetchUsers = async (query: string) => {
    try {
      const response = await fetch('https://strengthholdings.com/api/v1/auth/get-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          searchQuery: query,
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setSearchResults(data?.data);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const debouncedSearch = debounce((query) => {
    if (query.trim()) {
      fetchUsers(query);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery]);

  console.log('searchResults:', searchResults);

  const handleNavigation = (id: string) => {
    console.log('Navigating to:', id);
    
    navigate(`/profile/feed/${id}`);
    // setSearchResults([])
    setSearchQuery('')
  };
  

  return (
    <Collapse in={open} className="navbar-collapse">
      <div>
        {isSearch && (
          <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0 position-relative">
            <div className="nav-item w-100">
              <form className="rounded position-relative" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control ps-5 bg-light"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={(e) => {
                    if (!e.relatedTarget || !e.relatedTarget.closest('.search-result-item')) {
                      setTimeout(() => setShowDropdown(false), 3000);
                    }
                  }} />
                <button className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y" type="submit">
                  <BsSearch className="fs-5" />
                </button>
              </form>

              {/* Search Results Dropdown */}
              {showDropdown && (
                <div className="position-absolute bg-white shadow rounded w-100 mt-1" style={{ zIndex: 1000, maxHeight: '300px', overflowY: 'auto' }}>
                  <div className="d-flex flex-column">
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <div 
                        role="button" 
                        tabIndex={0} 
                        onClick={() => handleNavigation(result.id)}
                        key={result?.id} 
                        className="d-flex align-items-center p-2 cursor-pointer"
                      >
                          <Image src={result.profileImgUrl ? result.profileImgUrl : avatar7} alt={`${result.firstName} ${result.lastName}`} roundedCircle width={40} height={35} className="me-3" />
                          <div>
                          <h6 className="mb-0">{`${result.firstName} ${result.lastName}`}  <span className="badge bg-success bg-opacity-10 text-success small">{result.mutualConnectionCount>0?result.mutualConnectionCount:""}</span></h6>
                         
                          <small className="text-muted">{result.userRole}</small>

                          </div>
                        </div>
                      ))
                    ) : (
                      <ListGroup.Item className="text-muted text-center">No results found</ListGroup.Item>
                    )}
                    {/* {searchResults.length > 0 && (
                      <ListGroup.Item action className="text-center text-primary">
                        See all results
                      </ListGroup.Item>
                    )} */}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <AppMenu />
      </div>
    </Collapse>
  );
};

export default CollapseMenu;

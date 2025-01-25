import { useAuthContext } from "@/context/useAuthContext";
import { DollarSign, Heart, MapPin, PiggyBank, Trash2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MarketplaceCard = ({business, isMyBusiness, isMyWishlist}) => {
    const {user} = useAuthContext();
    const [Wishlists, setWishlists] = useState([]);
    const [isInWishlist, setIsInWishlist] = useState(false);
    console.log(user?.id)

    const fetchWishlist = async() => {
        const response = await fetch(`http://54.177.193.30:5000/wishlists/getall/${user?.id}`)
        const result = await response.json();
        setWishlists(result)
        
        // Check if this business is already in wishlist
        const isBusinessInWishlist = result.data.some(wishlist => 
            wishlist.Wishlistdata.some(item => item.id === business.id)
        );
        setIsInWishlist(isBusinessInWishlist);
        
        console.log("-------WISHLISTS-------" , Wishlists)
        console.log(result)
    }

    useEffect(() => {
        fetchWishlist()
    } ,[])

    console.log("-------WISHLISTS-------" , Wishlists)

    const handleWishlistDelete = async () => {
        const response = await fetch(`http://54.177.193.30:5000/wishlists/delete/${Wishlists.data[0].id}`, {
            method: "DELETE",
        });
        console.log(await response.json())
        setIsInWishlist(false);
    }

    const handleWishlist = async () => {
        try {
            const payload = {
                name: "My Wishlist",
                Wishlistdata: [business],
                Identity : user?.id
            };
            console.log("---Payload----" , payload)
            
            const response = await fetch("http://54.177.193.30:5000/wishlists/create" , {
                method : "POST",
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            console.log("--------response-------" , response.body)
            setIsInWishlist(true);
        } catch (error) {
            console.log("error in sending wishlist" , error)
        }
    }

    const data = business;
    const [isDeleted,setIsDeleted] = useState(false);

    const handledelete = async() => {
        try {
            if (user?.id == business.UserId) {
                const response = await fetch(`http://54.177.193.30:5000/businessseller/delete/${business.id}`, {
                    method: "DELETE",
                });
                console.log(await response.json())
                setIsDeleted(true);
            }
            console.log("deleted")
        } catch (error) {
            console.log(error ,"in deletion")
        }
    }

    const formatCurrency = (value) => value ? (value.startsWith('$') ? value : `$${value}`) : 'N/A';

    const MetricBox = ({ icon: Icon, label, value }) => (
        <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            flex: 1 
        }}>
            <Icon style={{ width: '1.25rem', height: '1.25rem', color: '#0d6efd' }} />
            <div>
                <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>{label}</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#212529' }}>{value}</div>
            </div>
        </div>
    );

    if(isDeleted) return null;           

    return (
        <div key={business.id} className="col-md-6">
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                height: '100%',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
            }} className="hover-card">
                <div style={{ padding: '1.5rem' }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'start',
                        marginBottom: '1rem'
                    }}>
                        <div>
                            <h5 style={{ 
                                fontSize: '1.25rem', 
                                fontWeight: '600',
                                marginBottom: '0.5rem'
                            }}>
                                {isMyBusiness ? business.businessName : business.businessName || "Unnamed"}
                            </h5>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem',
                                color: '#6c757d'
                            }}>
                                <MapPin size={16} />
                                <span style={{ fontSize: '0.875rem' }}>{isMyBusiness ? business.businessLocation : business.businessLocation}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ 
                                backgroundColor: '#e9ecef',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: '500'
                            }}>
                                {isMyBusiness ? business.businessType : business.businessType || "undefined"}
                            </div>
                            {isMyBusiness ? 
                                <button
                                    onClick={() => {
                                        console.log("Clicking....")
                                        handledelete()
                                    }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: '0.25rem',
                                        cursor: 'pointer',
                                        color: '#dc3545',
                                        transition: 'color 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    title="Delete business"
                                >
                                    <Trash2 size={18} />
                                </button>
                            : isMyWishlist ? 
                                <button
                                    onClick={() => {
                                        console.log("Clicking Wishlist Delete....")
                                        handleWishlistDelete()
                                    }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: '0.25rem',
                                        cursor: 'pointer',
                                        color: '#dc3545',
                                        transition: 'color 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    title="Delete business"
                                >
                                    <Trash2 size={18} />
                                </button>
                            :
                                <button
                                    onClick={() => {
                                        console.log("Wishlist id", Wishlists.data?.Identity)
                                        isInWishlist ? handleWishlistDelete() : handleWishlist()
                                    }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: '0.25rem',
                                        cursor: 'pointer',
                                        color: isInWishlist ? '#dc3545' : '#6c757d',
                                        transition: 'color 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                                >
                                    <Heart 
                                        size={25} 
                                        fill={isInWishlist ? '#dc3545' : 'none'} 
                                        strokeWidth={1.5}
                                        color="red"
                                    />
                                </button>
                            }
                        </div>
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        gap: '0.75rem',
                        marginBottom: '1.5rem' 
                    }}>
                        <MetricBox 
                            icon={TrendingUp}
                            label="TTM Revenue"
                            value={formatCurrency(isMyBusiness ? business.annualRevenue : business.annualRevenue)}
                        />
                        <MetricBox 
                            icon={PiggyBank}
                            label="TTM Profit"
                            value={formatCurrency(isMyBusiness ? business.annualProfit : business.annualProfit)}
                        />
                        <MetricBox 
                            icon={DollarSign}
                            label="Asking Price"
                            value={formatCurrency(isMyBusiness ? business.askingPrice : business.askingPrice)}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h6 style={{ 
                            fontSize: '0.875rem', 
                            fontWeight: '600',
                            marginBottom: '0.5rem'
                        }}>
                            About
                        </h6>
                        <p style={{ 
                            fontSize: '0.875rem',
                            color: '#6c757d',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {isMyBusiness ? business.productsServices : business.productsServices}
                        </p>
                    </div>

                    <Link
                        to={`/marketplacedetails/${isMyBusiness ? business.id : business.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <button style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#0d6efd',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '500',
                            transition: 'background-color 0.2s ease'
                        }}>
                            {isMyBusiness ? 'View Details' : 'Learn More'}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MarketplaceCard;
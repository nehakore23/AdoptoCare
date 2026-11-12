import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicAPI } from '../api/axios';
import './Gallery.css';

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

   
    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            setLoading(true);
            console.log("[DEBUG] Fetching pets for gallery...");
            
            const response = await PublicAPI.get("/pets/available");
            console.log("[DEBUG] Gallery pets response:", response.data);
            
            setPets(response.data);
            setError('');
        } catch (err) {
            console.error("Failed to fetch pets for gallery:", err);
            setError('Failed to load pet gallery. Please try again later.');
            
            setPets([]);
        } finally {
            setLoading(false);
        }
    };

    const handleImageClick = (petId) => {
        navigate(`/pet/${petId}`);
    };

    
    const getSpeciesIcon = (species) => {
        switch (species?.toLowerCase()) {
            case 'dog':
            case 'dogs':
                return 'ðŸ•';
            case 'cat':
            case 'cats':
                return 'ðŸ±';
            case 'bird':
            case 'birds':
                return 'ðŸ¦';
            case 'rabbit':
            case 'rabbits':
                return 'ðŸ°';
            case 'fish':
                return 'ðŸ ';
            default:
                return 'ðŸ¾';
        }
    };

    
    const getCategoryFromSpecies = (species) => {
        switch (species?.toLowerCase()) {
            case 'dog':
            case 'dogs':
                return 'dogs';
            case 'cat':
            case 'cats':
                return 'cats';
            default:
                return 'other';
        }
    };

  
    const galleryItems = pets.map(pet => ({
        id: pet.id,
        category: getCategoryFromSpecies(pet.species),
        name: pet.petName,
        image: pet.photoUrls && pet.photoUrls.trim() !== '' 
            ? (pet.photoUrls.startsWith('http') 
                ? pet.photoUrls.split(',')[0] 
                : `https://adoptocare.onrender.com/api/pets/images/${pet.photoUrls.split(',')[0]}`)
            : (pet.species?.toLowerCase().includes('cat') ? 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=300&fit=crop' : 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop'),
        species: pet.species
    }));

    const categories = [
        { id: 'all', name: 'All Pets', icon: 'ðŸ¾' },
        { id: 'dogs', name: 'Dogs', icon: 'ðŸ•' },
        { id: 'cats', name: 'Cats', icon: 'ðŸ±' },
        { id: 'other', name: 'Other Pets', icon: 'ðŸ°' }
    ];

   
    const filteredItems = galleryItems.filter(item => {
        return selectedCategory === 'all' || item.category === selectedCategory;
    });

    if (loading) {
        return (
            <div className="gallery-page fullwidth-page">
                <div className="gallery-container">
                    <div className="hero-section">
                        <h1 className="hero-title">Pet Gallery</h1>
                        <p className="hero-subtitle">Loading amazing pets from our partner shelters...</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <div className="spinner"></div>
                        <p>Loading pets from database...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="gallery-page fullwidth-page">
            <div className="gallery-container">
                <div className="hero-section">
                    <h1 className="hero-title">Pet Gallery</h1>
                    <p className="hero-subtitle">Discover amazing pets from our partner shelters</p>
                    {error && (
                        <div className="error-message" style={{ 
                            color: '#e74c3c', 
                            backgroundColor: '#fdf2f2', 
                            padding: '1rem', 
                            borderRadius: '8px', 
                            marginTop: '1rem' 
                        }}>
                            {error}
                        </div>
                    )}
                </div>
                
                <div className="filters-section">
                    <div className="category-filters">
                        <h3>Filter by Pet Type:</h3>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                <span className="category-icon">{category.icon}</span>
                                <span className="category-name">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="photo-gallery-grid">
                    {filteredItems.length > 0 ? (
                        filteredItems.map(item => (
                            <div key={item.id} className="photo-item" onClick={() => handleImageClick(item.id)}>
                                {item.image ? (
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="photo-image"
                                        onError={(e) => {
                                            console.log(`[DEBUG] Image failed to load for pet ${item.id}: ${item.image}`);
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                        onLoad={() => {
                                            console.log(`[DEBUG] Image loaded successfully for pet ${item.id}: ${item.image}`);
                                        }}
                                    />
                                ) : null}
                                <div 
                                    className="photo-placeholder"
                                    style={{
                                        display: item.image ? 'none' : 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '4rem',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#f8f9fa',
                                        color: '#6c757d'
                                    }}
                                >
                                    {getSpeciesIcon(item.species)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-pets-message" style={{ 
                            gridColumn: '1 / -1', 
                            textAlign: 'center', 
                            padding: '3rem',
                            color: '#6c757d'
                        }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>ðŸ¾</div>
                            <h3>No pets found</h3>
                            <p>Try adjusting your filters or check back later for new pets!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 

import React, { useState, useEffect } from 'react';

function Navbar() {
    const [user, setUser] = useState(null);

    const loadUserFromLocalStorage = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            try {
                setUser(JSON.parse(currentUser));
            } catch (error) {
                console.error("Failed to parse currentUser from localStorage", error);
                setUser(null); // Clear user state if parsing fails
            }
        } else {
            setUser(null); // Clear user state if no currentUser is found
        }
    };

    useEffect(() => {
        // Initial load
        loadUserFromLocalStorage();

        // Listen for storage changes
        const handleStorageChange = () => {
            loadUserFromLocalStorage();
        };

        window.addEventListener('storageChange', handleStorageChange);
        window.addEventListener('storage', handleStorageChange);

        // Cleanup event listener
        return () => {
            window.removeEventListener('storageChange', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    function logout(){
        localStorage.removeItem('currentUser')
        window.location.href='/login'
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg ">
                <a class="navbar-brand" href="#">Valence Reserve</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mr-5">
                        {user ? (<><div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {user.name}
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Bookings</a>
                                <a class="dropdown-item" href="#" onClick={logout}>Log Out</a>
                            </div>
                        </div>
                        </>) : (<>
                            <li class="nav-item active">
                                <a class="nav-link" href="/register">Register </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/login">Login</a>
                            </li>

                        </>)}

                    </ul>
                </div>
            </nav>
        </div>

    )
}

export default Navbar
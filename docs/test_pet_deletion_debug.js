// Debug script to test pet deletion
async function testPetDeletion() {
    console.log('=== Testing Pet Deletion ===');
    
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    
    console.log('Token:', token ? 'Present' : 'Missing');
    console.log('Role:', role);
    console.log('User ID:', userId);
    
    if (!token) {
        console.error('❌ No token found - please login first');
        return;
    }
    
    try {
        // Step 1: Get all pets
        console.log('\n--- Step 1: Get all pets ---');
        const petsResponse = await fetch('http://localhost:8080/api/pets', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (petsResponse.ok) {
            const pets = await petsResponse.json();
            console.log('✅ Found pets:', pets.length);
            
            if (pets.length > 0) {
                const testPet = pets[0];
                console.log('Testing deletion on pet:', {
                    id: testPet.id,
                    name: testPet.petName,
                    species: testPet.species,
                    shelter: testPet.shelter ? testPet.shelter.shelterName : 'No shelter'
                });
                
                // Step 2: Check if pet has adoption requests
                console.log('\n--- Step 2: Check adoption requests ---');
                const adoptionRequestsResponse = await fetch('http://localhost:8080/api/adoption-requests', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (adoptionRequestsResponse.ok) {
                    const adoptionRequests = await adoptionRequestsResponse.json();
                    const petRequests = adoptionRequests.filter(req => req.pet && req.pet.id === testPet.id);
                    console.log(`Pet has ${petRequests.length} adoption requests`);
                    
                    if (petRequests.length > 0) {
                        console.log('Adoption requests for this pet:');
                        petRequests.forEach((req, index) => {
                            console.log(`Request ${index + 1}:`, {
                                id: req.id,
                                status: req.status,
                                adopter: req.adopter ? req.adopter.fullName : 'Unknown'
                            });
                        });
                    }
                }
                
                // Step 3: Try to delete the pet
                console.log('\n--- Step 3: Attempt pet deletion ---');
                const deleteResponse = await fetch(`http://localhost:8080/api/pets/${testPet.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                console.log('Delete response status:', deleteResponse.status);
                console.log('Delete response ok:', deleteResponse.ok);
                
                if (deleteResponse.ok) {
                    const result = await deleteResponse.json();
                    console.log('✅ Deletion successful:', result);
                } else {
                    const errorText = await deleteResponse.text();
                    console.log('❌ Deletion failed:', errorText);
                    
                    try {
                        const errorJson = JSON.parse(errorText);
                        console.log('Error details:', errorJson);
                    } catch (e) {
                        console.log('Raw error response:', errorText);
                    }
                }
            } else {
                console.log('❌ No pets found to test deletion');
            }
        } else {
            const errorText = await petsResponse.text();
            console.log('❌ Error fetching pets:', errorText);
        }
        
    } catch (error) {
        console.error('❌ Test error:', error);
    }
}

// Run the test
console.log('🔧 Testing pet deletion...');
testPetDeletion().then(() => {
    console.log('\n✅ Pet deletion test completed!');
}); 
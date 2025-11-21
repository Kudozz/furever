import {create} from 'zustand';
export const usePetInventory = create((set) =>({
    pets: [],
    setPets: (pets)=>set({pets}),

    createPet: async(newPet) =>{
        if (!newPet.name || !newPet.breed || !newPet.age || !newPet.status || !newPet.image) {
            return{ success: false, message: "Please fill all fields"};
        }

        const res = await fetch("/api/pets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPet),
        });

        // const res = await fetch("/api/pets", {
        //     method: "POST", 
        //     headers:{
        //         "Content-Type":"application/json"
        //     }, 
        //     body:JSON.stringify(newPet)
        // });

        const data = await res.json();
        
        set((state)=> ({pets:[...state.pets, data.data]}))

        return { success: true, message: "Pet added successfully!" };
    },

    fetchPets: async() =>{
        const res = await fetch("/api/pets");
        const data= await res.json();
        set({pets: data.data});
    },

    deletePet: async(pid) =>{
        const res = await fetch(`/api/pets/${pid}`, {
                                method: "DELETE",});

        const data = await res.json();
        if(!data.success) 
            return {success: false, message: data.message };

        //update ui immediately without needing refresh
        set(state=>({pets: state.pets.filter(pet => pet._id !== pid)}));
        return {success: true, message: data.message};
    },

    updatePet: async (pid, updatedPet) => {
        const res = await fetch(`/api/pets/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPet),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // update the ui immediately, without needing a refresh
        set((state) => ({
            pets: state.pets.map((pet) => (pet._id === pid ? data.data : pet)),
        }));

        return { success: true, message: data.message };
    },
}));
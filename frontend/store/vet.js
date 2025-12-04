import { create } from "zustand";

export const useVetInventory = create((set) => ({
    vets: [],
    setVets: (vets) => set({ vets }),

    // CREATE VET
    createVet: async (newVet) => {
        if (
            !newVet.name ||
            !newVet.email ||
            !newVet.password ||
            !newVet.speciality ||
            !newVet.experienceYears ||
            !newVet.bio ||
            !newVet.profilePicture ||
            !newVet.phoneNumber
        ) {
            return { success: false, message: "Please fill all fields" };
        }

        const res = await fetch("/api/vets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newVet),
        });

        const data = await res.json();

        if (!data.success) {
            return { success: false, message: data.message };
        }

        set((state) => ({ vets: [...state.vets, data.data] }));

        return { success: true, message: "Vet added successfully!" };
    },

    // GET ALL VETS
    fetchVets: async () => {
        const res = await fetch("/api/vets");
        const data = await res.json();
        set({ vets: data.data });
    },

    // SEARCH VETS BY NAME
    searchVetsByName: async (name) => {
        if (!name || !name.trim()) {
            return { success: false, message: "Please enter a name to search" };
        }

        const res = await fetch(`/api/vets/search/by-name?name=${encodeURIComponent(name)}`);
        const data = await res.json();

        if (!data.success) {
            return { success: false, message: data.message };
        }

        return { success: true, data: data.data };
    },

    // DEACTIVATE VET
    deactivateVet: async (vetId) => {
        const res = await fetch(`/api/vets/deactivate/${vetId}`, { method: "PUT" });
        const data = await res.json();

        if (!data.success) return { success: false, message: data.message };

        // Update local state to reflect deactivation
        set(state => ({
            vets: state.vets.map(vet => vet._id === vetId ? { ...vet, status: false } : vet)
        }));

        return { success: true, message: data.message };
    },

    // UPDATE VET
    updateVet: async (vid, updatedVet) => {
        const res = await fetch(`/api/vets/${vid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedVet),
        });

        const data = await res.json();

        if (!data.success) {
            return { success: false, message: data.message };
        }

        // Update UI instantly
        set((state) => ({
            vets: state.vets.map((vet) =>
                vet._id === vid ? data.data : vet
            ),
        }));

        return { success: true, message: data.message };
    },
}));

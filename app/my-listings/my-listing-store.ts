import { create } from 'zustand'

export type ItemType = {
    name?: string,
    description?: string,
    category?: string,
    price?: {
        daily: number,
        hourly: number
    },
    photos?: string[],
}

export interface ItemState {
    data: ItemType,
    updateState: (data: ItemType) => void,
    restart: () => void
}
export const useMyListingStore = create<ItemState>()((set) => ({
    data: {
        name: '',
        category: '',
        description: '',
        price: {
            daily: 0,
            hourly: 0
        },
        photos: [],
    },
    updateState: (data) => set((state) => ({
        data: { ...state.data, ...data}
    })),
    restart: () => set({
        data: {
            name: '',
            category: '',
            description: '',
            price: {
                daily: 0,
                hourly: 0
            },
            photos: [],
        }
    })
}))
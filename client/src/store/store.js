import {create} from 'zustand';

const useStore = create(set => ({
    user: null,
    posts: [],
    comments: [],  // Initialize comments as an empty array
    setUser: (user) => set({ user }),
    setPosts: (posts) => set({ posts }),
    setComments: (comments) => set({ comments }),
}));

export default useStore;

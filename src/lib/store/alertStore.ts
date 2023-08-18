import { writable } from 'svelte/store';

export const alertStore = writable({
    type: "",
    text: "",
    animationDelay: 250,
    animationDuration: 300,
    show: false
});
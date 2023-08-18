import { alertStore } from '$lib/store/alertStore';

export const triggerAlert = (
	type: string,
	text: string,
	animationDelay: number = 250,
	animationDuration: number = 300,
	alertDuration: number = 3000
) => {
	alertStore.set({ type, text, animationDelay, animationDuration, show: true });

	setTimeout(() => {
		alertStore.set({ type: '', text: '', animationDelay, animationDuration, show: false });
	}, alertDuration);
};

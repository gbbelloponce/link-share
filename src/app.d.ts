// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface UserData {
			username: string;
			bio: string;
			photoURL: string;
			links: App.UserLink[];
			public: boolean;
		}
		interface UserLink {
			title: string;
			url: string;
			icon: string;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

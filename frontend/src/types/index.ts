export interface INavigationDB {
    name: string;
    max_length: number;
    min_length: number;
    has_image: boolean;
}

export interface ILinkDB {
    id: string;
    title: string;
    navigation_name: string;
    link_url: string;
    image_url?: string;
    order: number;
}

export interface INavigationComponent {
	navigationName: string;
	maxLength: number;
	minLength: number;
	hasImage: boolean;
}

export interface IStoreState {
    navigations: INavigationDB[];
    navigationsAjaxloading: boolean;
    links: ILinkDB[];
}

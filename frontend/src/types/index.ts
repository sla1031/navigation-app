export interface INavigationType {
	name: string;
	maxLength: number;
	minLength: number;
	hasImage: boolean;
}

export interface INavigationDB {
  id: string;
	navigationType: string;
}


export interface INavigationComponent {
  id: string;
	navigationTypeName: string;
  navigationType: INavigationType;
  allNavigationTypes: INavigationType[];
  links: ILinkComponent[];
}

export interface ILinkDB {
    id: string;
    title: string;
    navigation: string;
    linkUrl: string;
    imageUrl?: string;
    order: number;
}


export interface ILinkComponent extends ILinkDB{
    canHaveImage: boolean;
}


export interface IStoreState {
    navigationTypes: INavigationType[];
    navigationTypesAjaxloading: boolean;
    navigations: INavigationDB[];
    navigationsAjaxloading: boolean;
    links: ILinkDB[];
    linksAjaxLoading: boolean;
}

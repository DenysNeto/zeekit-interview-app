import { RootStore } from './RootStore';
import { action, computed, observable, toJS } from 'mobx';
import axios from 'axios';
import { API_KEY, URL_PATH } from './consts';
import { APISearchResponse, CardData, FilmDetails, Messages } from '../userTypes';

export default class FilmsStore {
    
    root: RootStore;
    @observable _filmsArray: CardData[]              = [];
    @observable filmID_to_show_details: string;
    @observable _currentFilmWithDetails: FilmDetails = {
        main_info : {
            photo_url: '',
            film_name: '',
            year     : '',
            id       : '',
        },
        short_plot: '',
        long_plot : '',
    };
    
    @action setFilmIdToShowDetails ( id: string ) {
        this.filmID_to_show_details = id;
    }
    
    @observable currentFilmNameSearch: string = '';
    @observable currentQueryPagesCount: number;
    @observable warningMessage: string        = Messages.START_MESSAGE;
    
    constructor ( root: RootStore ) {
        this.root = root;
    }
    
    @computed get currentFilmWithDetails () {
        return toJS ( this._currentFilmWithDetails );
    }
    
    @action setCurrentFilmWithDetails ( value: FilmDetails ) {
        this._currentFilmWithDetails = value;
    }
    
    @action setCurrentFilmNameSearch ( value: string ) {
        this.currentFilmNameSearch = value;
    }
    
    @action resetWarningMessage () {
        this.warningMessage = Messages.START_MESSAGE;
    }
    
    @computed get filmsArray (): CardData[] {
        return toJS ( this._filmsArray );
    }
    
    @action addFilmsToArray ( films: CardData[] ) {
        this._filmsArray = films;
    }
    
    @action resetFilmArray () {
        this._filmsArray.length = 0;
    }
    
    @action
    async getFilmByIdWithLongPlot () {
        return await axios.get ( `${URL_PATH}`, {
            params: {
                apikey: API_KEY,
                i     : this.filmID_to_show_details,
                plot  : 'full',
                
            },
        } );
    }
    
    @action
    async handleGetFilmByIdWithLongPlot () {
        
        const response: any = await this.getFilmByIdWithLongPlot ();
        if ( response.data.Response === 'True' ) {
            this.setCurrentFilmWithDetails ( {
                ...this.currentFilmWithDetails,
                long_plot: response.data.Plot,
            } );
            
        } else {
            
            // this.root.guiStore.setISModalOpen ( false );
            //alert ( response.data.Error );
        }
    }
    
    @action
    async handleGetFilmById () {
        const response: any = await this.getFilmById ();
        if ( response.data.Response === 'True' ) {
            this.setCurrentFilmWithDetails ( {
                main_info : {
                    photo_url: response.data.Poster !== 'N/A' && response.data.Poster,
                    film_name: response.data.Title,
                    year     : response.data.Year,
                    id       : response.data.imdbID,
                },
                short_plot: response.data.Plot,
                long_plot : '',
            } );
            
        } else {
            
            // this.root.guiStore.setISModalOpen ( false );
            //alert ( response.data.Error );
        }
    }
    
    @action
    async getFilmById () {
        return await axios.get ( `${URL_PATH}`, {
            params: {
                apikey: API_KEY,
                i     : this.filmID_to_show_details,
                
            },
        } );
    }
    
    @action getFilmsPageByName ( name: string, page: number ) {
        axios.get ( `${URL_PATH}`, {
            params: {
                apikey: API_KEY,
                s     : name,
                page  : page,
            },
        } );
    };
    
    @action
    async handleFilmsSearch () {
        this.root.guiStore.setIsFetching ( true );
        const response: any = await this.getFilmsByName ();
        if ( response.data.Response === 'True' ) {
            if ( response.data.Search && response.data.Search.length > 0 ) {
                
                this.filmsArray.length > 0 && this.resetFilmArray ();
                this.warningMessage = '';
                
                // how much pages exists
                if ( response.data.totalResults > 10 ) {
                    this.currentQueryPagesCount = response.data.totalResults % 10 !== 0 ?
                        Math.floor ( response.data.totalResults / 10 ) + 1 :
                        response.data.totalResults / 10;
                } else {
                    this.currentQueryPagesCount = 0;
                }
                
                let response_arr = response.data.Search.map ( ( elem: APISearchResponse ) => {
                    return {
                        photo_url: elem.Poster !== 'N/A' && elem.Poster,
                        film_name: elem.Title,
                        year     : elem.Year,
                        id       : elem.imdbID,
                    };
                } );
                
                this.addFilmsToArray ( response_arr );
                this.root.guiStore.setIsFetching ( false );
            } else {
                this.currentQueryPagesCount = 0;
                this.root.guiStore.setIsFetching ( false );
                this.warningMessage = Messages.NOTHING_TO_SHOW;
            }
        } else {
            
            this.resetFilmArray ();
            this.currentQueryPagesCount = 0;
            this.root.guiStore.setIsFetching ( false );
            this.warningMessage = response.data.Error;
        }
    }
    
    async handleFilmsSearchWithPage ( page: string ) {
        this.root.guiStore.setIsFetching ( true );
        const response: any = await this.getFilmsByNameAndPage ( page );
        this.filmsArray.length > 0 && this.resetFilmArray ();
        if ( response.data.Search && response.data.Search.length > 0 ) {
            
            let response_arr = response.data.Search.map ( ( elem: APISearchResponse ) => {
                return {
                    photo_url: elem.Poster !== 'N/A' && elem.Poster,
                    film_name: elem.Title,
                    year     : elem.Year,
                    id       : elem.imdbID,
                };
            } );
            
            this.addFilmsToArray ( response_arr );
            this.root.guiStore.setIsFetching ( false );
            
        }
        
    }
    
    @action
    async getFilmsByName () {
        return await axios.get ( `${URL_PATH}`, {
            params: {
                apikey: API_KEY,
                s     : this.currentFilmNameSearch,
            },
        } );
    }
    
    @action
    async getFilmsByNameAndPage ( page: string ) {
        return await axios.get ( `${URL_PATH}`, {
            params: {
                apikey: API_KEY,
                s     : this.currentFilmNameSearch,
                page,
            },
        } );
        
    }
    
}

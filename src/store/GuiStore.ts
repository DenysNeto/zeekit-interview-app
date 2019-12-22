import { RootStore } from './RootStore';
import { action, observable } from 'mobx';

export default class GuiStore {
    
    root: RootStore;
    
    constructor ( root: RootStore ) {
        this.root = root;
    }
    
    @observable isFetching: boolean                   = false;
    @observable listFilmsColumnsNumber: 1 | 2 | 3 | 4 = 2;
    @observable isModalOpen: boolean                  = false;
    
    @action setIsFetching ( value: boolean ) {
        this.isFetching = value;
    }
    
    @action setISModalOpen ( value: boolean ) {
        this.isModalOpen = value;
    }
    
    @action setListFilmsColumnsNumber ( value: 1 | 2 | 3 | 4 ) {
        this.listFilmsColumnsNumber = value;
    }
    
    @action columnsNumbersDependingOnDimensions ( extra_big: boolean, big: boolean, medium: boolean ) {
        if ( this.root.filmsStore.filmsArray.length < 4 ) {
            this.setListFilmsColumnsNumber ( 1 );
        } else if ( this.root.filmsStore.filmsArray.length >= 4 && this.root.filmsStore.filmsArray.length < 6 ) {
            this.setListFilmsColumnsNumber ( 2 );
        } else if ( this.root.filmsStore.filmsArray.length >= 6 && this.root.filmsStore.filmsArray.length < 8 ) {
            this.setListFilmsColumnsNumber ( 3 );
        } else {
            if ( extra_big && this.root.filmsStore.filmsArray.length >= 8 ) {
                this.setListFilmsColumnsNumber ( 4 );
            } else if ( big ) {
                this.setListFilmsColumnsNumber ( 3 );
            } else if ( medium ) {
                this.setListFilmsColumnsNumber ( 2 );
            } else {
                this.setListFilmsColumnsNumber ( 1 );
            }
            
        }
        
     
    }
    
}

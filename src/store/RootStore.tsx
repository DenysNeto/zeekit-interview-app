import React, { createContext, useContext } from 'react';
import { observable } from 'mobx';
import FilmsStore from './FilmsStore';
import GuiStore from './GuiStore';

let StoreContext = createContext ( null );

export class RootStore {
    @observable name = 'Denis';
    
    guiStore: GuiStore;
    filmsStore: FilmsStore;
    
    constructor () {
        this.filmsStore = new FilmsStore ( this );
        this.guiStore   = new GuiStore ( this );
    }
    
}

const rootStore = new RootStore ();

//injection in app component
export function InjectStoreContext ( { children }: any ) {
    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
}

//hook to use in components
export function useStore () {
    return useContext ( StoreContext );
}



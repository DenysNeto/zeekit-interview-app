import * as React from 'react';
import { Input, SearchProps } from 'semantic-ui-react';
import { observer, useLocalStore } from 'mobx-react';
import { useStore } from '../store/RootStore';
import { useEffect } from 'react';

const SearchComponent = () => {
    const { filmsStore } = useStore ();
    
    useEffect ( () => {
        searchLocalStore.inputValue = filmsStore.currentFilmNameSearch;
    } );
    
    const searchLocalStore = useLocalStore ( () => ({
        inputValue: '',
        
        searchChangeHandler ( _: any, data: SearchProps ) {
            
            //check that string not empty
            if ( data.value.length === 0 ) {
                searchLocalStore.inputValue = data.value;
                filmsStore.setCurrentFilmNameSearch ( searchLocalStore.inputValue );
                filmsStore.resetWarningMessage ();
                return 0;
            }
            
            //check that string doesn't contains only whitespaces
            if ( data.value.replace ( /\s/g, '' ).length && !data.value.endsWith ( '  ' ) ) {
                if ( data.value.endsWith ( ' ' ) && data.value.length > 1 ) {
                    if ( searchLocalStore.inputValue.length > data.value.length ) {
                        searchLocalStore.inputValue = data.value.slice ( 0, data.value.length - 1 );
                        filmsStore.setCurrentFilmNameSearch ( searchLocalStore.inputValue );
                        filmsStore.handleFilmsSearch ();
                    } else {
                        searchLocalStore.inputValue = data.value;
                    }
                    return 0;
                }
                searchLocalStore.inputValue = data.value;
                filmsStore.setCurrentFilmNameSearch ( searchLocalStore.inputValue );
                filmsStore.handleFilmsSearch ();
            }
        },
        
    }) );
    
    return (
        <div className={filmsStore.filmsArray.length > 0 ? 'search-top' : 'search-center'}>
            <Input icon='search'
                   size='massive'
                   value={searchLocalStore.inputValue}
                   onChange={searchLocalStore.searchChangeHandler}
                   focus={true}
            />
        </div>
    );
};

export default observer ( SearchComponent );


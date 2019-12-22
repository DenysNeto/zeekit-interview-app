import { observer } from 'mobx-react';
import * as React from 'react';
import { Pagination } from 'semantic-ui-react';
import { useStore } from '../store/RootStore';
import { useHistory } from 'react-router';
import {  useState } from 'react';

const PaginationCustom = ( ) => {
    
    const history                       = useHistory ();
    const { filmsStore, guiStore }      = useStore ();
    const [ activePage, setActivePage ] = useState ( 1 );
    
    const onPageChangeHandler = ( _: any, data: any ) => {
        setActivePage ( data.activePage );
        if ( data.activePage === 1 ) {
            filmsStore.handleFilmsSearch ().then ( () => {
                history.push ( '/' );
            } );
        } else {
            history.push ( `/filmsList/${data.activePage}` );
        }
    };
    
    return (
        <>
            {
                filmsStore.currentQueryPagesCount > 0 &&
                !guiStore.isFetching &&
                <Pagination onPageChange={onPageChangeHandler} activePage={activePage}
                            totalPages={filmsStore.currentQueryPagesCount}/>
            }
        </>
    );
};

export default observer ( PaginationCustom );

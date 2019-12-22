import * as React from 'react';
import SearchComponent from './SearchComponent';
import FilmsCardList from './films-cards/FilmsCardList';
import PaginationCustom from './PaginationComponent';
import { Route, Switch } from 'react-router';
import FilmsCardListPage from './films-cards/FilmsCardListPage';
import ModalCustom from './modals/ModalCustom';
import { useStore } from '../store/RootStore';
import { observer } from 'mobx-react';

const WrapperMainPage = () =>
    (<> <SearchComponent/>
        <FilmsCardList/> </>);

const MainComponent = () => {
    
    const { filmsStore } = useStore ();
    
    return (
        <div style={{
            padding       : '3rem',
            height        : filmsStore.filmsArray.length === 0 && '100%',
            display       : 'flex',
            flexDirection : 'column',
            alignItems    : 'center',
            justifyContent: 'center',
        }}>
            
            <Switch>
                <Route path={'/filmsList/:page_number'} component={FilmsCardListPage}/>
                <Route path={'/'} component={WrapperMainPage}/>
            </Switch>
            <PaginationCustom/>
            <ModalCustom/>
        
        </div>);
    
};

export default observer ( MainComponent );

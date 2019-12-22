import * as React from 'react';
import { Grid, Item, Loader } from 'semantic-ui-react';
import { useStore } from '../../store/RootStore';
import FilmCardComponent from './FilmCardComponent';
import { CardData } from '../../userTypes';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { BIG_SCREEN, EXTRA_BIG_SCREEN, MEDIUM_SCREEN } from '../../store/consts';

const FilmsCardListPage = () => {
    
    let routeParams: {
        page_number?: string
    }                              = useParams ();
    const { filmsStore, guiStore } = useStore ();
    
    const isExtraBigScreen = useMediaQuery ( { minDeviceWidth: EXTRA_BIG_SCREEN } );
    const isBigScreen      = useMediaQuery ( { minDeviceWidth: BIG_SCREEN, maxDeviceWidth: EXTRA_BIG_SCREEN } );
    const isMediumScreen   = useMediaQuery ( { minDeviceWidth: MEDIUM_SCREEN, maxDeviceWidth: BIG_SCREEN } );
    
    const listener = guiStore.columnsNumbersDependingOnDimensions ( isExtraBigScreen, isBigScreen, isMediumScreen );
    
    useEffect ( () => {
        
        window.addEventListener ( 'resize', listener );
        return () => {
            window.removeEventListener ( 'resize', listener );
        };
    },  );
    
    useEffect ( () => {
        const asyncFuncHandler = async () => {
            await filmsStore.handleFilmsSearchWithPage ( routeParams.page_number );
        };
        asyncFuncHandler ();
        
    }, [ routeParams.page_number ] );
    
    return (
        <div style={{
            display      : 'flex',
            flexDirection: 'column',
            alignItems   : 'center',
            margin       : '5rem',
        }}>
            {
                guiStore.isFetching
                    ?
                    <Loader active/>
                    :
                    <Grid relaxed centered columns={guiStore.listFilmsColumnsNumber}>
                        {
                            filmsStore.filmsArray.map ( ( elem: CardData, _: number ) => {
                                
                                return (
                                    <Grid.Column>
                                        <Item.Group>
                                            <FilmCardComponent key={elem.id}
                                                               film_name={elem.film_name}
                                                               id={elem.id}
                                                               photo_url={elem.photo_url}
                                                               year={elem.year}/>
                                        </Item.Group>
                                    </Grid.Column>
                                );
                            } )
                        }
                    </Grid>
            }
        </div>
    );
    
};

export default observer ( FilmsCardListPage );

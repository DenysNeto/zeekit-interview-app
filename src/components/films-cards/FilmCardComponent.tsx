import { Item } from 'semantic-ui-react';
import * as React from 'react';
import { CardData } from '../../userTypes';
import { observer } from 'mobx-react';
import { IMG_NO_POSTER } from '../../store/consts';
import { useStore } from '../../store/RootStore';


const FilmCardComponent = ( props: CardData ) => {
    const { guiStore, filmsStore } = useStore ();
    
    const onClickHandler = () => {
        if ( filmsStore.filmID_to_show_details === props.id ) {
            guiStore.setISModalOpen ( true );
        } else {
            filmsStore.setFilmIdToShowDetails ( props.id );
            filmsStore.handleGetFilmById ().then ( () =>
                guiStore.setISModalOpen ( true ),
            );
        }
        
    };
    
    return (
        <>
            <Item style={{
                border       : '1px solid black',
                padding      : '1rem',
                cursor       : 'pointer',
                display      : 'flex',
                flexDirection: 'row',
                minWidth     : '20rem',
                minHeight    : '13rem',
            }}
                  onClick={onClickHandler}
            >
                <Item.Image id="item-image" style={{ minHeight: '4rem' }}
                            size={'tiny'}
                            onError={( error: any ) => {
                                error.target.src = IMG_NO_POSTER;
                            }} src={props.photo_url || IMG_NO_POSTER}/>
                
                <Item.Content id='item-content'>
                    <Item.Header>{props.film_name}</Item.Header>
                    <Item.Meta>Year : {props.year}</Item.Meta>
                </Item.Content>
            </Item>
        
        </>
    );
    
};

export default observer ( FilmCardComponent );

import React, { useState } from 'react';
import { Image, Modal } from 'semantic-ui-react';
import { useStore } from '../../store/RootStore';
import { observer } from 'mobx-react';
import { IMG_NO_POSTER, SMALL_SCREEN } from '../../store/consts';
import { useMediaQuery } from 'react-responsive';

const ModalCustom = () => {
    const { guiStore, filmsStore }                  = useStore ();
    const [ isLongPlotOpened, setIsLongPlotOpened ] = useState ( false );
    
    const isSmallScreen = useMediaQuery ( { maxDeviceWidth: SMALL_SCREEN } );
    
    const handleLongPlotAction = async () => {
        if ( !filmsStore.currentFilmWithDetails.long_plot ) {
            await filmsStore.handleGetFilmByIdWithLongPlot ();
        }
        setIsLongPlotOpened ( !isLongPlotOpened );
    };
    
    const handleCloseAction = () => {
        setIsLongPlotOpened ( false );
        guiStore.setISModalOpen ( false );
    };
    
    const { film_name, photo_url, year } = filmsStore.currentFilmWithDetails.main_info;
    
    return (
        <Modal size={isSmallScreen ? 'fullscreen' : 'small'} style={{ minHeight: '25rem' }} onClose={handleCloseAction}
               dimmer
               open={guiStore.isModalOpen}
               closeIcon>
            <Modal.Header>{film_name}</Modal.Header>
            <Modal.Content image>
                <Image style={{
                    minHeight: '10rem',
                    minWidth : '10rem',
                    maxHeight: '10rem',
                    maxWidth : '10rem',
                }} wrapped
                       size='medium'
                       onError={( error: any ) => {
                           error.target.src = IMG_NO_POSTER;
                       }}
                       src={photo_url || IMG_NO_POSTER}/>
                <Modal.Description id='modal-description'>
                    <p><strong>Year: </strong> {year}</p>
                    {
                        isLongPlotOpened
                            ?
                            <p><strong>Plot: </strong> {filmsStore.currentFilmWithDetails.long_plot}
                                <span
                                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                    onClick={handleLongPlotAction}>Less</span></p>
                            :
                            <p><strong>Plot: </strong> {filmsStore.currentFilmWithDetails.short_plot}
                                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleLongPlotAction}>Read more ...</span>
                            </p>
                        
                    }
                
                </Modal.Description>
            </Modal.Content>
        </Modal>);
};

export default observer ( ModalCustom );

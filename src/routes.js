import React from 'react';
import { MainComponent } from './components/MainComponent';

export const routes = [
    // {
    //     path:      '/filmsList/:page_number',
    //     component: () => <FilmsCardListPage/>,
    //     exact:     true,
    // },
    
    {
        path:      '/',
        exact:     false,
        component: () => <MainComponent/>,
        
    },
    // {
    //     path:      '/review',
    //     exact:     false,
    //     component: () => <Review/>,
    // },
    // {
    //     path:      '/upcoming_events',
    //     exact:     false,
    //     component: () => <UpcomingEvents/>,
    // },

];

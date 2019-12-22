export type CardData = {
    photo_url: string;
    film_name: string;
    year: string;
    //omdb id
    id: string;
}

export type FilmDetails = {
    main_info: CardData;
    short_plot: string;
    long_plot: string;
}

export enum Messages {
    
    NOTHING_TO_SHOW = 'Nothing to show',
    START_MESSAGE   = 'Start input for search',
    ERROR_MESSAGE   = 'Error while performing action'
}

export type APISearchResponse = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: 'movie' | 'series' | 'episode',
    Poster: string,
}

export type APIErrorSearchResponse = {
    Response: string,
    Error: string
    
}

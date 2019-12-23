import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { InjectStoreContext } from './store/RootStore';
import MainComponent from './components/MainComponent';
import { BrowserRouter as Router } from 'react-router-dom';

function App () {
    return (
        <div style={{ height: '100%' }}>
            <InjectStoreContext>
                <Router>
                    <MainComponent/>
                </Router>
            </InjectStoreContext>
        </div>
    );
}

export default App;

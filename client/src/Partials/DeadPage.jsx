import React from 'react';
import {withRouter,Link} from 'react-router-dom';
import brokenLink from '../../src/images/brokenLing.jpg';
import './DeadPage.css'
function DeadPage(props){
    
    function goBack(){
        props.history.goBack();
    }
    
    return(
        <div className = 'main'>
            <h1>Page Not Found</h1>
            <br></br>
            <br></br>
            <strong>Page isn't availible, the link may be broken or the page may have been removed.</strong>
            <br></br>
            <br></br>
            <img src={brokenLink} alt="broken link"></img>
            <br></br>
            <br></br>
            <Link>Home</Link>
            <br></br>
            <Link onClick={goBack}>Go Back</Link>
        </div>
    )
}

export default withRouter(DeadPage);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {uncolorNavbar, getNotifications, removeNotification} from '../../store/actions/notificationsActions';
import './Notifications.css'
import NotificationCard from './NotificationCard';

class Notifications extends Component{
    constructor(props){
        super(props);
        this.deleteNotif = this.deleteNotif.bind(this);
    }

    // After first render, remove highlighted icon and destructure props
    componentDidMount(){
        const {uid, uncolorNavbar, getNotifications} = this.props;
        uncolorNavbar();
        getNotifications(uid);  // Get notifications for specific user
    }

    deleteNotif(id){
        const {
            notifs, 
            removeNotification
        } = this.props;

        removeNotification(id, notifs);
    }

    render(){
        // read notifications for current user
        const {uid, notifs} = this.props;
        // Create list of notifications
        const list = notifs.map(notif =>
            <NotificationCard notif = {notif} uid={uid} deleteNotif={this.deleteNotif}/>
        );


        return(
            <div className="notifs">
                <header>
                    <h1>Notifications</h1>
                </header>

                <h4>Latest</h4>

                {list.length ===0? <h3 className='text-center my-4'>You have no notifications</h3>: list}
            </div>
        )
    }
}

// Props from redux store. UserID and notifications
const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        notifs: state.notifs.notifs
    }
}
// Methods for notifications to use after mounting
const mapDispatchToProps = (dispatch) =>{
    return{
        uncolorNavbar: () => {dispatch(uncolorNavbar());},
        getNotifications: (uid) => {dispatch(getNotifications(uid));},
        removeNotification: (notifId, notifs) => {dispatch(removeNotification(notifId, notifs));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
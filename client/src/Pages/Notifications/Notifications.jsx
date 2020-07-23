import React, {Component} from 'react';
import NotifRow from './NotifRow';
import {connect} from 'react-redux';
import {uncolorNavbar, getNotifications} from '../../store/actions/notificationsActions';
import './Notifications.css'

class Notifications extends Component{
    componentDidMount(){
        const {uid, uncolorNavbar, getNotifications} = this.props;

        uncolorNavbar();

        getNotifications(uid);
    }

    render(){
        const {notifs} = this.props;

        const list = notifs.map(notif =>
            <NotifRow notif = {notif}/>
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

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        notifs: state.notifs.notifs
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        uncolorNavbar: () => {dispatch(uncolorNavbar());},
        getNotifications: (uid) => {dispatch(getNotifications(uid));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
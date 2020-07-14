import React, { Component } from 'react';
import {connect} from 'react-redux';
import {findUsers} from '../../store/actions/friendsActions';
import FriendCard from './FriendCard'
import FindForm from './FindForm'
import FilterForm from './FilterForm'
import './Friends.css'
import Navbar from '../../Partials/Navbar'

// Friends Page composed of separate components that make up the page
class Friends extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props.users);
        return (
            <div className="Friends">
                <Navbar />
                <div className="container-fluid">
                    <FindForm findUsers = {this.props.findUsers}/>
                    <FilterForm />
                    
                    
                    <div className="row no-gutters">
                        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                            <div className="card bg-light mb-4">
                                <div className="card-body d-flex justify-content-center">
                                    <h5 className="card-title">Gugsa Challa</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                            <div className="card bg-light mb-4">
                                <div className="card-body d-flex justify-content-center">
                                    <h5 className="card-title">Elliot Cho</h5>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                            <div className="card bg-light mb-4">
                                <div className="card-body d-flex justify-content-center">
                                    <h5 className="card-title">Tariq Hirji</h5>
                                </div>
                            </div> 
                        </div>
                        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                            <div className="card bg-light mb-4">
                                <div className="card-body d-flex justify-content-center">
                                    <h5 className="card-title">Billy Bob</h5>
                                </div>
                            </div> 
                        </div>
                    </div>
                    {/* <div className="row no-gutters"> */}
                        {/* <FriendCard /> */}
                        {/* <FriendCard /> */}
                    {/* </div> */}
                </div>
            </div>
        )
    }
}

//put data from reducer into props
const mapStateToProps = (state) =>{
    return {
        users: state.friends.users,
        uid: state.auth.uid
    }
}

//puts actions into props
const mapDispatchToProps = (dispatch) =>{
    return {
        findUsers: (name) => {dispatch(findUsers(name));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
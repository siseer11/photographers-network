import React, { Component } from 'react';
import { ProfileEdit } from './ProfileEdit';

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        };
        this.onEdit = this.onEdit.bind(this);
    }

    onEdit() {
        this.setState({ isEdit: true });
    }

    render() {

        const { user } = this.props;

        return (
            <div>
                {
                    this.state.isEdit
                        ? (
                            <div>
                                <ProfileEdit
                                 user={user}
                                />
                            </div>
                        )
                        :
                        (
                            <div className="section-content with-padding">
                                <h3 className="gb-title-small gb-text-black">  Name: {user.displayName}!</h3>
                                <h3 className="gb-title-small gb-text-black">  Email: {user.email}!</h3>
                                <img src={user.photoURL} alt="avatar" className="gb-avatar-x-large" />

                                <div className="btn-container">
                                    <input
                                        type="submit"
                                        value="Edit Profile"
                                        onClick={this.onEdit}
                                        className="gb-btn gb-btn-large gb-btn-primary"
                                    />
                                </div>
                            </div>
                        )
                }

            </div>
        );
    }
}

export default MyProfile;






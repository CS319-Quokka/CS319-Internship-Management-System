import React from 'react';

export const UserContext = React.createContext();


//This is class for passing the id of the selected user in the lists
//inside the class (this can be display list) create add this code after the constructor:  static contextType = UserContext;
// when you are clicking into a specific user, set the id using the setUserIdValue , with the id you got inside the list
// when you go to another page, simply define  static contextType = UserContext, again
///after that, write context.userId to get the id of the clicked user
class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      setUserIdValue: this.setUserIdValue
    };
  }

  setUserIdValue = (id) => {
    this.setState({ userId: id });
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;

import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./loayouts/main";
import Login from "./loayouts/login";
// import Users from "./components/users";
import UsersList from "./components/usersList";
// import UserPage from "./components/userPage";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route
                    path="/users/:userId?"
                    render={(props) => <UsersList {...props} />}
                />
                {/* <Route
                    path="/users/:userId?"
                    render={(props) => <UserPage {...props} />}
                />
                <Route
                    path="/users"
                    render={(props) => <UsersList {...props} />}
                /> */}
            </Switch>
        </>
    );
}

export default App;

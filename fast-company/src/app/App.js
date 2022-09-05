import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Home from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Home} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default App;

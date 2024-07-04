import React from "react";

const Context = React.createContext({
    characterList:[],
    characterListDispatcher:()=>{}
});

export default Context;
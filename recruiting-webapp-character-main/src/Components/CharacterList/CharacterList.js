import { useContext } from "react";
import Context from "../../Store/Context";
import classes from './CharacterList.module.css';
import Character from "./Character";


const CharacterList = () =>{
    const ctx = useContext(Context);
    return (
        <div className={classes.CharacterList}>
            {
                ctx.characterList.map(item=>{
                    return <Character key={item.id} id={item.id} item={item} />
                })
            }
        </div>
    )
}

export default CharacterList;
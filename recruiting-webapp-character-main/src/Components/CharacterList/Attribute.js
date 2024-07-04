import classes from './Character.module.css';
import Context from '../../Store/Context';
import { useContext } from 'react';
import AttrClasses from './Attribute.module.css'

const Attribute = (props) => {

    let ctx = useContext(Context);

    const addAttrHandler = (e) =>{
        ctx.characterListDispatcher({type:'addAttr', item:props.item, attr:e.target.parentElement.parentElement.getAttribute("id")});
    }

    const deleteAttrHandler = (e) =>{
        ctx.characterListDispatcher({type:'deleteAttr', item:props.item, attr:e.target.parentElement.parentElement.getAttribute("id")});
    }

    const renderAttributeList = () =>{
        let list = [];
        for(let [key, value] of Object.entries(props.item)){
            if(key !== "id" && key !== "totalCount"){
                list.push(<div key={`${props.item.id}-${key}`} id={key} className={AttrClasses.AttributeItem}>
                    <div>
                        <span>{`${key}: ${value.count} (Modifier: ${value.modifier})`}</span>
                    </div>
                    <div>
                        <button onClick={addAttrHandler}>+</button>
                        <button onClick={deleteAttrHandler}>-</button>
                    </div>
                </div>)
            }
        }
        return list;
    }

    return (
        <div className={classes.listContainer}>
            <div className={classes.ListTitle}>
                <span>Attributes</span>
                <span>Total: {props.item.totalCount.attrTotal}</span>
            </div>
            <div className={`${classes.ListContent} ${AttrClasses.AttributeList}`} >
                {renderAttributeList()}
            </div>
        </div>
    )
}

export default Attribute;
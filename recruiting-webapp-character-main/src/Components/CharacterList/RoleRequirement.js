import { CLASS_LIST } from '../../consts.js';
import classes from './Character.module.css';
import ReqClasses from './RoleRequirement.module.css';

const RoleRequirement = (props) =>{
    const renderRoleRequirementList  = () =>{
        let list = [];
        if(props.role){
            let requirement = CLASS_LIST[props.role];
            for (let [key, value] of Object.entries(requirement)){
                list.push(<div key={`${props.item.id}-${key}`}>{`${key} : ${value}`}</div>)
            }
        }
        return list;
    }

    const hideHandler = () => {
        props.hideReq();
    }

    return (
        <div className={classes.listContainer}>
            <div className={classes.ListTitle}>
                {props.role ? `${props.role} - Requirements` : "Requirements" }
            </div>
            {
                props.role && 
                <div className={classes.ListContent}>
                    {renderRoleRequirementList()}
                </div>
            }
            <div className={ReqClasses.hiddenButtonOuter}>
                <button onClick = {hideHandler} className={ReqClasses.hiddenButton}>hidden</button>
            </div>
        </div>
    )
}

export default RoleRequirement;
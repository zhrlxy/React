import { CLASS_LIST } from '../../consts.js';
import classes from './Character.module.css';
import RoleClasses from './Role.module.css';

const Role = (props) => {
    const renderRoleList  = () =>{
        let list = [];
        for (let key of Object.keys(CLASS_LIST)){
            list.push(<div key={`${props.item.id}-${key}`} className={`${props.targetRole.indexOf(key)!== -1 ? RoleClasses.targetRole:""} ${key === props.role?RoleClasses.selectedRole:""}`} onClick={props.selectRole}>{key}</div>)
        }
        return list;
    }

    return (
        <div className={classes.listContainer}>
            <div className={classes.ListTitle}>
                Classes
            </div>
            <div className={classes.ListContent}>
                {renderRoleList()}
            </div>
        </div>
    )
}

export default Role;
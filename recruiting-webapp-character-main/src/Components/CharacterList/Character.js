import { useState } from "react";
import { CLASS_LIST } from '../../consts';
import Role from './Role';
import RoleRequirement from './RoleRequirement'
import Attribute from './Attribute'
import Skill from './Skill'
import SkillCheck from "./SkillCheck";
import classes from './Character.module.css';


const Character = (props) =>{
    const [role, setRole] = useState("");
    const [targetRole, setTargetRole] = useState([]);

    let newTargetRole = [...targetRole];
    let TargetRoleChanged = false;
    for(let key of Object.keys(CLASS_LIST)){
        let flag = 1;
        for(let [attr, value] of Object.entries(CLASS_LIST[key])){
            if(value > props.item[attr].count){
                flag = 0;
                if(newTargetRole.indexOf(key) !== -1){
                    TargetRoleChanged = true;
                    newTargetRole.splice(newTargetRole.indexOf(key),1);
                }
                break;
            }
        }
        if(flag && newTargetRole.indexOf(key) === -1){
            TargetRoleChanged = true;
            newTargetRole.push(key);
        }
    }
    if(TargetRoleChanged){
        setTargetRole(newTargetRole);
    }
    
    const selectRoleHandler = (e) =>{
        let value = e.target.innerHTML;
        setRole(value);
    }

    const hideRoleReq = () =>{
        setRole("");
    }
    return (
        <div className={classes.character}>
            <SkillCheck id={props.id} item={props.item}/>
            <div className={classes.Body}>
                <Attribute item={props.item}/>
                <Role selectRole={selectRoleHandler} role={role} targetRole = {targetRole} item={props.item} />
                {role && <RoleRequirement role={role} hideReq = {hideRoleReq} item={props.item} />}
                <Skill item={props.item}/>
            </div>
        </div>
    )
}

export default Character;
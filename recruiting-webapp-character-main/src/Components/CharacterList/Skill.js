import classes from './Character.module.css'
import Context from '../../Store/Context';
import { useContext } from 'react';
import SkillClasses from './Skill.module.css';

const Skill = (props) => {
    let ctx = useContext(Context);
    const addSkillHandler = (e) =>{
        let item = e.target.parentElement.parentElement;
        ctx.characterListDispatcher({type:'addSkill', item:props.item, id:item.getAttribute("id"), attr:item.getAttribute("attr")});
    }

    const deleteSkillHandler = (e) =>{
        let item = e.target.parentElement.parentElement;
        ctx.characterListDispatcher({type:'deleteSkill', item:props.item, id:item.getAttribute("id"), attr:item.getAttribute("attr")});
    }

    const renderSkillList = () =>{
        let list = [];
        for(let [key,value] of Object.entries(props.item)){
            if(key !== "id" && key !== "totalCount"){
                value.relatedSkills.forEach(item => {
                    list.push(
                        <div key={`${props.item.id}-${item.skillName}`} id={item.skillName} attr={key} className={SkillClasses.SkillItem}>
                            <div className={SkillClasses.skillName}>
                                <span>{`${item.skillName}: ${item.count} (Modifier: ${key}): ${value.modifier}`}</span>
                            </div>
                            <div>
                                <button onClick={addSkillHandler}>+</button>
                                <button onClick={deleteSkillHandler}>-</button>
                            </div>
                            <div>
                                Total: {item.totalCount}
                            </div>
                        </div>
                    )
                })
            }
        }
        return list;
    }
    return(
        <div className={classes.listContainer}>
            <div className={classes.ListTitle}>
                <span>Skills</span>
                <span>Total Skill Points Available: {props.item.totalCount.skillAvailable}</span>
            </div>
            <div className={`${classes.ListContent} ${SkillClasses.SkillList}`}>
                {renderSkillList()}
            </div>  
        </div>
    )
}

export default Skill;
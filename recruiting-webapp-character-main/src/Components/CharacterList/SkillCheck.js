import { useContext, useEffect, useState } from 'react';
import { SKILL_LIST } from '../../consts.js';
import classes from './SkillCheck.module.css';
import Context from '../../Store/Context.js';

const SkillCheck = (props) =>{
    
    const [roll, setRoll] = useState(0);
    const [dc, setDC] = useState(0);
    const [result, setResult] = useState("failure");
    const [skillCount, setSkillCount] = useState(0);
    const [dropdownValue, setdropdownValue] = useState(`${SKILL_LIST[0].attributeModifier}-${SKILL_LIST[0].name}`)
    const ctx = useContext(Context);


    const renderDropDownList = () =>{
        return SKILL_LIST.map((item) => {
            return <option key={`${props.item.id}-${item.name}`} value={`${item.attributeModifier}-${item.name}`} >{item.name}</option>
        })
    }


    const dcChangeHandler = (e) =>{
        setDC(e.target.value);
    }
    const rollHandler = () =>{
        setRoll(Math.ceil(Math.random() * 20));
    }
    const dropdownChangeHandler = (e) =>{
        setdropdownValue(e.target.value);
    }

    useEffect(()=>{
        let skill = dropdownValue.split("-")[1];
        let attr = dropdownValue.split("-")[0];
        let skillcount = 0;
        if(props.item[attr]){
            props.item[attr].relatedSkills.forEach(item=>{
                if(item.skillName === skill){
                    skillcount = item.totalCount;
                }
            })
        }
        setSkillCount(skillcount);
    },[dropdownValue, props.item, roll,dc])


    useEffect(()=>{
        if(skillCount + roll >= dc){
            setResult("successful")
        }
        else{
            setResult("failure")
        }
    },[roll,dc,skillCount]);

    const deleteHandler = () =>{
        ctx.characterListDispatcher({
            type:"delete",
            item:props.item
        })
    }

    return (
        <div className={classes.SkillCheck}>
            <div className={classes.DeleteCharacter} onClick={deleteHandler}>X</div>
            <div className={classes.SkillCheckTitle}>Character</div>
            <p className={classes.SkillCheckTitle}>Skill Check</p>
            <div className={classes.SkillCheckContent}>
                <div className={classes.SkillCheckDropdown}>
                    <label htmlFor={`${props.item.id}-skillCheckDropdown`}>Skills:</label>
                    <select value={dropdownValue} onChange={dropdownChangeHandler} id={`${props.item.id}-skillCheckDropdown`}>
                        {renderDropDownList()}
                    </select>
                </div>
                <div className={classes.DCInput}>
                    <label htmlFor={`${props.item.id}-DC`}>DC:</label>
                    <input id={`${props.item.id}-DC`} value={dc} onChange={dcChangeHandler} />
                </div>
                <div className={classes.Roll}>
                    <button onClick={rollHandler}>Roll</button>
                </div>
            </div>
            {
                roll? <div className={classes.SkillCheckResult}>
                    <span>Skill: {skillCount}</span>
                    <span>Roll: {roll}</span>
                    <span>DC: {dc}</span>
                    <span>Result: {result}</span>
                </div> : ""
            }
        </div>
    )
}

export default SkillCheck;
import { useEffect, useReducer } from 'react';
import classes from './App.module.css';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts.js';
import Context from './Store/Context.js';
import CharacterList from './Components/CharacterList/CharacterList.js';

const characterListReducerHandler = (state, action) => {
  let newState = [...state];
  switch(action.type){
    case "init":
      newState.push(action.fun());
      return newState;
    case "load":
      newState = [...action.body];
      return newState;
    case "delete":
      newState.splice(newState.indexOf(action.item),1);
      return newState;
    case "addAttr":
      newState.forEach(item=>{
        if(item === action.item){
          if(item.totalCount.attrTotal < 70){
            item[action.attr].count += 1;
            item.totalCount.attrTotal +=1;
            item[action.attr].modifier = Math.floor((item[action.attr].count - 10)/2);
            item[action.attr].relatedSkills.forEach(skill=>{
              skill.totalCount = skill.count + item[action.attr].modifier;
            });
            if(action.attr === "Intelligence"){
              item.totalCount.skillTotal = (item[action.attr].modifier * 4) + 10;
              item.totalCount.skillAvailable = item.totalCount.skillTotal - item.totalCount.skillUsed;
              if(item.totalCount.skillAvailable < 0){
                item.totalCount.skillAvailable = 0;
              }
            }
          }
          else{
            window.alert("The Delegated Attribute Points can not be exceed 70!");
          }
          
        }
      });
      return newState;
    case "deleteAttr":
      newState.forEach(item=>{
        if(item === action.item){
          item[action.attr].count -= 1;
          item.totalCount.attrTotal -=1;
          item[action.attr].modifier = Math.floor((item[action.attr].count - 10)/2);
          item[action.attr].relatedSkills.forEach(skill=>{
            skill.totalCount = skill.count + item[action.attr].modifier;
          });
          if(action.attr === "Intelligence"){
            item.totalCount.skillTotal = (item[action.attr].modifier * 4) + 10;
            item.totalCount.skillAvailable = item.totalCount.skillTotal - item.totalCount.skillUsed;
            if(item.totalCount.skillAvailable < 0){
              item.totalCount.skillAvailable = 0;
            }
          }
        }
      });
      return newState;
    case "addSkill":
      newState.forEach(item=>{
        if(item === action.item){
          item[action.attr].relatedSkills.forEach(skill=>{
            if(skill.skillName === action.id){
              if(item.totalCount.skillAvailable > 0){
                skill.count += 1;
                skill.totalCount = skill.count + item[action.attr].modifier;
                item.totalCount.skillUsed += 1;
                item.totalCount.skillAvailable = item.totalCount.skillTotal - item.totalCount.skillUsed;
                if(item.totalCount.skillAvailable < 0){
                  item.totalCount.skillAvailable = 0;
                }
              }
              else{
                window.alert("No more skill points available! Please add more intelligence.");
              }
            }
          })
        }
      })
      return newState;
    case "deleteSkill":
      newState.forEach(item=>{
        if(item === action.item){
          item[action.attr].relatedSkills.forEach(skill=>{
            if(skill.skillName === action.id){
              if(skill.count <=0){
                window.alert(`There is no skill point delegated to ${skill.skillName}`);
              }
              else if(item.totalCount.skillUsed <= 0){
                window.alert("There is no skill points delegated!");
              }
              else{
                skill.count -= 1;
                skill.totalCount = skill.count + item[action.attr].modifier;
                item.totalCount.skillUsed -= 1;
                item.totalCount.skillAvailable = item.totalCount.skillTotal - item.totalCount.skillUsed;
                if(item.totalCount.skillAvailable < 0){
                  item.totalCount.skillAvailable = 0;
                }
              }
            }
          })
        }
      })
      return newState;
    default:
      return state;
  }
}


const App = () => {
  const [characterSet, characterListDispatcher] = useReducer(characterListReducerHandler,[]);


  useEffect(()=>{
    fetch('https://recruiting.verylongdomaintotestwith.ca/api/zhrlxy/character', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      characterListDispatcher({
        type:"load",
        body:data.body
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  },[]);

  const initCharacterData = () =>{
    let data = {};
    data.id = + new Date();
    data.totalCount = {
      "attrTotal":60,
      "skillTotal": 10,
      "skillUsed":0,
      "skillAvailable":10
    };
    ATTRIBUTE_LIST.forEach((attribute) => {
      data[attribute] = {
        "count":10,
        "modifier":0,
        "attrName":attribute,
        "relatedSkills":[]
      }
      SKILL_LIST.forEach((skill)=>{
        if(skill.attributeModifier === attribute){
          let skillObj = {
            "skillName":skill.name,
            "count":0,
            "totalCount":0
          }
          data[attribute].relatedSkills.push(skillObj);
        }
      });
    });
    return data;
  }

  const addCharacterHandler = () =>{
    characterListDispatcher({
      type:"init",
      fun:initCharacterData
    });
  }

  const saveCharacterHandler = () =>{
      fetch('https://recruiting.verylongdomaintotestwith.ca/api/zhrlxy/character', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(characterSet)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        window.alert("Successfully saved the data to the server.");
      })
      .catch((error) => {
        console.error('Error:', error);
        window.alert("Failed saved the data to the server.");
      });
  }


  return (
    <Context.Provider value={{characterList:characterSet, characterListDispatcher:characterListDispatcher}}>
      <div className={classes.App}>
        <header className={classes.Appheader}>
          <h1>React Coding Exercise</h1>
        </header>
        <section className={classes.Appsection}>
          <div className={classes.buttonouter}>
            <button className={classes.AddCharacterButton} onClick={addCharacterHandler} >Add Character</button>
            <button className={classes.SaveButton} onClick={saveCharacterHandler} >Save to Server</button>
          </div>
          {characterSet.length === 0?"No character, please click Add Character Button": <CharacterList />}
        </section>
      </div>
    </Context.Provider>
  );
}

export default App;

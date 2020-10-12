import { createStore } from 'redux';

const initData = {
  data:[],
  message: 'please type message:',
  mode: 'default',
  fdata:[]
};

export function memoReducer(state = initData, action) {
  switch (action.type) {
    case 'ADD':
      return addReduce(state, action);

    case 'DELETE':
      return deleteReduce(state, action);
    
    case 'FIND':
      return findReduce(state, action);

    default:
      return state;
  }
}

//ReduceAction

//Add
function addReduce(state, action){
  let d = new Date();
  let f = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  let data = {
    message:action.message,
    created:f
  };
  let newdata = state.data.slice();
  newdata.unshift(data);
  return {
    data:newdata,
    message:'Added!',
    mode:'default',
    fdata:[]
  };
}

//Search
function findReduce(state, action){
  let f = action.find;
  let fdata = [];
  state.data.forEach((value)=>{
    if (value.message.indexOf(f) >= 0){
      fdata.push(value);
    }
  });
  return {
    data:state.data,
    message:'find "' + f + '":',
    mode:'find',
    fdata:fdata
  };
}

//Delete
function deleteReduce(state, action){
  let newdata = state.data.slice();
  newdata.slice(action.index, 1);
  return {
    data:newdata,
    message:'delete "' + action.index + '":',
    mode:'delete',
    fdata:[]
  }
}

//Action Creater

// Add Action
export function addMemo(text) {
  return {
    type: 'ADD',
    message:text
  }
}

// Delete Action
export function deleteMemo(num) {
  return {
    type: 'DELETE',
    index:num
  }
}

// Search Action
export function findMemo(text) {
  return {
    type: 'FIND',
    find:text
  }
}

// Create Store
export default createStore(memoReducer);
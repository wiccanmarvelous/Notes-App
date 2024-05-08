import React, { useState } from 'react'
import Editor from '../../Notes/NewNote/Menus';
import { useDispatch } from 'react-redux';
import { placeholderActions } from '../../../store/notePlaceholder';

const Card = (props) => {
  const [tools, setTools] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      className='card'
      style={{ background: `${props.bgColor}` }}
      onClick={() => {
        dispatch(placeholderActions.setPlaceholder(true));
        props.editNote();
      }}
    // onMouseOver={() => {setTools(true); console.log(props.note.split('\n').length);}} 
    // onMouseOut={() => setTools(false)}
    >
      <h1 className='title'>{props.title}</h1>
      {props.title.trim().length > 0 && <div style={{ backgroundColor: 'black', height: '3px', width: '100%', marginBottom: '1rem' }} />}
      {/* <p>{props.note && props.note.length > 115 ? props.note.slice(0, 115) + '...' : props.note}</p> */}
      <Editor className='editor'
        content={props.note}
        haveMenuBar={false}
      />
    </div>
  )
}

export default Card;
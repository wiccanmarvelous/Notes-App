import React, { useEffect, useReducer, useState } from 'react'
import ReactDOM from 'react-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor2 from './Menus';
import { useDispatch } from 'react-redux';
import { placeholderActions } from '../../../store/notePlaceholder';

const colorSet = ['#FAAFA8', '#F39F76', '#FFF8B8', '#E2F6D3', '#B4DDD3', '#D4E4ED', '#AECCDC', '#D3BFDB', '#F6E2DD', '#000', '#FFF']

const NewNote = (props) => {
    const [inputTitle, setInputTitle] = useState(props.dataItem?.title ? props.dataItem.title : '');
    const [inputTextarea, setInputTextarea] = useState(props.dataItem?.note ? props.dataItem.note : ``);
    const [color, setColor] = useState(props.dataItem?.color ? props.dataItem.color : 'white');
    const [useColor, setUseColor] = useState(false);
    const [useTextColor, setUseTextColor] = useState('#000');
    const dispatch = useDispatch();

    const boxColorChange = (passedColor) => {
        const parent = document.getElementById('newNote');
        parent.style.backgroundColor = `${passedColor}`;
        const childElements = parent.getElementsByTagName('*');
        Array.from(childElements).forEach(ele => ele.style.backgroundColor = `${passedColor}`);
    };

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        }
    }, []);

    useEffect(() => {
        if (color === '#000')
            setUseTextColor('#FFF')
        else
            setUseTextColor('#000')
        boxColorChange(color);
    }, [color]);

    const titleChangeHandler = value => setInputTitle(value);

    const textareaChangeHandler = value => setInputTextarea(value);

    return ReactDOM.createPortal(
        <>
            <div className='wrapper'></div>
            <div>
                <div className="new-note" id='newNote' style={{ color: `${useTextColor}` }}>
                    <div className="new-note-header">
                        <button
                            onClick={() => {
                                props.emptyHandler();
                                dispatch(placeholderActions.setPlaceholder(false));
                            }}
                        >
                            <ArrowBackIcon />
                        </button>
                    </div>
                    <hr />
                    <input
                        onClick={() => setUseColor(false)}
                        onChange={(event) => titleChangeHandler(event.target.value)}
                        value={inputTitle}
                        className='title'
                        type="text"
                        placeholder='Title'
                    />

                    <div className="textarea">
                        {/* <Editor
                            handleClick={setUseColor}
                            content={inputTextarea}
                            setContent={textareaChangeHandler}
                            haveMenuBar={true}
                        /> */}
                        <Editor2 content={inputTextarea} setContent={textareaChangeHandler} />
                    </div>
                    <div
                        className='tools'
                    >
                        <div className="tools1">
                            <button
                                onClick={() => useColor ? setUseColor(false) : setUseColor(true)}
                                style={{ fontSize: '2rem' }}
                            >
                                <PaletteOutlinedIcon />
                            </button>
                        </div>
                        <div className="tools2">
                            <button
                                className='submit'
                                onClick={() => {
                                    props.submitHandler(inputTitle, inputTextarea, color);
                                    dispatch(placeholderActions.setPlaceholder(false));
                                }}
                                onKeyDown={(e) => e.key === 'Enter' ? props.submitHandler(inputTitle, inputTextarea, color) : null}
                            >
                                <CheckCircleIcon style={{ fontSize: '2rem' }} />
                            </button>
                            <button
                                onClick={() => {
                                    props.removeItemHandler();
                                    dispatch(placeholderActions.setPlaceholder(false));
                                }}
                            >
                                {props.dataItem && <DeleteIcon style={{ fontSize: '2rem' }} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {useColor &&
                <div className='color-pannel'>
                    {colorSet.map((col) => (
                        <button
                            key={col}
                            style={{ backgroundColor: `${col}` }}
                            onClick={() => { setColor(col); setUseColor(false); }}
                            onMouseOver={() => boxColorChange(col)}
                            onMouseOut={() => boxColorChange(color)}
                        ></button>
                    ))}
                </div>
            }
        </>,
        document.getElementById('createNote')
    )
}

export default NewNote

import React, { useState, useContext } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from '../../hooks/useLogout';
import useSetNotes from '../../hooks/useSetNotes';
import NewNote from '../Notes/NewNote/NewNote';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import Logo from '../../../public/logo.png';
import { useSelector } from 'react-redux';
const Header = (props) => {
    const { logout } = useLogout();
    const [addNote, setAddNote] = useState(false);
    const { loading, setNotes } = useSetNotes();
    const user = useSelector(state => state.auth.authUser);

    const handleLogout = async () => {
        await logout();
    }

    const submitHandler = async (inputTitle, inputTextarea, color) => {

        await setNotes(inputTitle, inputTextarea, color);
        setAddNote(false);
    }

    const emptyHandler = () => {
        setAddNote(false);
    }

    return (
        <>
            <header className='header'>
                <div className="logo">
                    <img src={Logo} style={{ height: '3rem' }} alt="logo" />
                    <h1>{`${user.name}'s Notes`}</h1>
                </div>
                <div className="modification">
                    <button onClick={() => setAddNote(true)} className='addItemBtn'> <NoteAddOutlinedIcon style={{ fontSize: 35 }} /></button>
                    <button onClick={handleLogout} ><LogoutIcon style={{ fontSize: 35 }} /></button>
                    {addNote && <NewNote submitHandler={submitHandler} emptyHandler={emptyHandler} />}
                </div>
            </header>
        </>
    );
};

export default Header;
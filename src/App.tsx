import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Modal, Typography, TextField, Container } from '@material-ui/core';
import { BlockPicker } from 'react-color';
import moment from 'moment';

import NoteItem from "./components/NoteItem";
import {
    CustomHeader,
    HeaderLogoDiv,
    AppLogo,
    HeaderContent,
    HeaderBtnGroup
} from "./components/styledComponent/headerComponents";
import {
    MainContent,
    AddNoteBox,
    NoteListBox
} from "./components/styledComponent/mainContent";

interface User {
    email: string;
    password: string;
}

const initialNote = [
    {
        title: 'Note1',
        date: '01 Jan 2022',
        favourite: true
    },
    {
        title: 'Note2',
        date: '01 Feb 2022',
        favourite: true
    },

    {
        title: 'Note3',
        date: '01 Mar 2022',
        favourite: false
    },
    {
        title: 'Note4',
        date: '01 Apr 2022',
        favourite: false
    },
    {
        title: 'Note5',
        date: '01 May 2022',
        favourite: false
    },
];

function App() {

    const [color, setColor] = useState('#e0ecfc');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [noteList, setNoteList] = useState(initialNote);

    const [openModal, setOpenModal] = useState(false);
    const [signinStatus, setSigninStatus] = useState("logout");
    const [signInUp, setSignInUp] = useState("signup");
    const [currentUserEmail, setCurrentUserEmail] = useState("");
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [signUpData, setSignUpData] = useState({ email: '', password: '' });

    const sllideSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    const popover = {
        position: 'absolute',
        zIndex: '2',
    } as React.CSSProperties;
    const cover = {
        position: 'fixed',
        top: '5px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    } as React.CSSProperties;

    useEffect(() => {
        const currentUser: User = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (localStorage.getItem('noteDataList')) {
            const localNote = JSON.parse(localStorage.getItem('noteDataList') || '[]');
            setNoteList(localNote);
        } else {
            localStorage.setItem('noteDataList', JSON.stringify(initialNote));
        }
        if (currentUser && currentUser.email) {
            setSigninStatus("signin");
        }
        setCurrentUserEmail(currentUser.email);
    }, []);

    const handleClick = () => {
        setDisplayColorPicker((displayColorPicker) => !displayColorPicker);
    };
    const handleClose = () => {
        setDisplayColorPicker(false);
    }
    const handleColorChange = (cl: any) => {
        setColor(cl.hex);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const handleSignInChange = (e: any) => {
        const { name, value } = e.target;
        setSignInData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignUpChange = (e: any) => {
        const { name, value } = e.target;
        setSignUpData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignInSubmit = (e: any) => {
        e.preventDefault();
        // Handle sign in logic here        
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(user => user.email === signInData.email && user.password === signInData.password);
        if (user) {
            alert('Login successfully');
            localStorage.setItem('currentUser', JSON.stringify(user));
            setSigninStatus("signin");
            setCurrentUserEmail(signInData.email);
            // redirect to dashboard or home page
        } else {
            alert('Invalid email or password');
        }

        setOpenModal(false);
    };

    const handleSignUpSubmit = (e: any) => {
        e.preventDefault();
        // Handle sign up logic here
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(user => user.email === signUpData.email);
        if (user) {
            alert('Email already exists');
        } else {
            let email = signUpData.email;
            let password = signUpData.password;

            const newUser: User = { email, password };
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            localStorage.setItem('users', JSON.stringify([...users, newUser]));
            setSigninStatus("signin");
            setCurrentUserEmail(signUpData.email);
            alert('SignUp successfully');
            // redirect to dashboard or home page
        }
        setOpenModal(false);
    };

    const handleSignOutSubmit = () => {
        setSigninStatus("logout");
        localStorage.removeItem('currentUser');
    }

    const addNoteHandle = () => {
        if (signinStatus === "signin" && newNote !== '' && !noteList.some(item => item.title === newNote)) {
            const newNoteObj: any = {
                title: newNote,
                date: moment(new Date()).format('DD MMM YYYY'),
                favourite: false
            };
            setNoteList((prevNote: any) => {
                localStorage.setItem('noteDataList', JSON.stringify([...prevNote, newNoteObj]));
                return [...prevNote, newNoteObj]
            });
            setNewNote('');
        } else {
            alert('Please check login status and correct value')
        }
    }

    const deleteNote = (title: string) => {
        if (signinStatus === "signin") {
            const confirmed = window.confirm('Confirm Delete?');
            if (confirmed) {
                setNoteList((prevNote) => {
                    const newList = prevNote.filter(item => item.title !== title);
                    localStorage.setItem('noteDataList', JSON.stringify(newList));
                    return newList;
                });
            }
        }
    }

    const setFavouriteNote = (data: any) => {
        if (signinStatus === "signin") {
            setNoteList((prevNote: any) => {
                let newList = prevNote.map((item: any) => {
                    if (item.title === data.title) {
                        item.favourite = !data.favourite
                    }
                    return item;
                });
                newList = newList.sort((a: any, b: any) => b.favourite - a.favourite);
                localStorage.setItem('noteDataList', JSON.stringify(newList));
                return newList;
            });
        }
    }


    return (
        <div className="main-app">
            <CustomHeader bgColor={color}>
                <HeaderLogoDiv>
                    <AppLogo src={logo} alt="logo" />
                </HeaderLogoDiv>
                <HeaderContent />
                <HeaderBtnGroup>
                    <div className="header-setting">
                        <Dropdown title="SETTING">
                            <Dropdown.Menu title="Audio Input Device">
                                <Dropdown.Item>Input #1</Dropdown.Item>
                                <Dropdown.Item>Input #2</Dropdown.Item>
                                <Dropdown.Item>Input #3</Dropdown.Item>
                            </Dropdown.Menu>
                            <Dropdown.Item>
                                <span style={{ display: 'flex' }} onClick={handleClick}>Color theme</span>
                                {displayColorPicker ? <div style={popover}>
                                    <div style={cover} onClick={handleClose} />
                                    <BlockPicker color={color} onChange={handleColorChange} />
                                </div> : null}
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                    <div className="header-signup">
                        {
                            signinStatus === "signin" ?
                                <Dropdown title={currentUserEmail}>
                                    <Dropdown.Item onClick={handleSignOutSubmit}>Log Out</Dropdown.Item>
                                </Dropdown>
                                :
                                <Button className="signup-btn" variant="outlined" size="large" onClick={handleOpenModal}>
                                    Sign Up
                                </Button>
                        }
                    </div>
                </HeaderBtnGroup>
            </CustomHeader>
            <MainContent>
                <AddNoteBox>
                    <Button className="add-note-btn" variant="contained" size="large" onClick={addNoteHandle}>
                        Add Note
                    </Button>
                    <OutlinedInput
                        className="add-note-input"
                        placeholder="Add your note text here..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                </AddNoteBox>
                <NoteListBox>
                    <Slider {...sllideSettings}>
                        {
                            noteList.map((item: any, index: number) => {
                                return <div key={index}>
                                    <NoteItem notedata={item} deleteNote={deleteNote} setFavouriteNote={setFavouriteNote} />
                                </div>
                            })
                        }
                    </Slider>
                </NoteListBox>
            </MainContent>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Container maxWidth="xs">

                    {
                        signInUp == "signin" ?
                            <div>
                                <Typography variant="h4" align="center">
                                    Sign In
                                </Typography>
                                <form onSubmit={handleSignInSubmit}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={signInData.email}
                                        onChange={handleSignInChange}
                                        fullWidth
                                        required
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={signInData.password}
                                        onChange={handleSignInChange}
                                        fullWidth
                                        required
                                        margin="normal"
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Sign In
                                    </Button>
                                </form>

                                <p className="signinup" onClick={() => setSignInUp("signup")}>Sign Up</p>
                            </div>
                            :
                            <div>
                                <Typography variant="h4" align="center">
                                    Sign Up
                                </Typography>
                                <form onSubmit={handleSignUpSubmit}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={signUpData.email}
                                        onChange={handleSignUpChange}
                                        fullWidth
                                        required
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={signUpData.password}
                                        onChange={handleSignUpChange}
                                        fullWidth
                                        required
                                        margin="normal"
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Sign Up
                                    </Button>
                                </form>

                                <p onClick={() => setSignInUp("signin")}>Sign In</p>
                            </div>
                    }
                </Container>
            </Modal>
        </div>
    );
}

export default App;

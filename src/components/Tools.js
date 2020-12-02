import React, { useRef, useState } from 'react'
import { Stage, Layer, Rect, Text, Circle, Line, Image, Shape, Group, Transformer } from 'react-konva';
import ReactDOM from 'react-dom';
import Portal from './Portal.js';
import useImage from 'use-image';
import "../App.css";
import Modale from './Modale'
import Mockup from '../medias/iphone.png'
import beach from '../medias/beach.jpeg'
import sky from '../medias/sky.jpg'
import shortid from "shortid";


const IconURL1 = ({ image }) => {
    const [img] = useImage(image.src);
    return (
        <Image
            draggable
            image={img}
            x={image.x}
            y={image.y}
            width="100"
            height="100"
            // I will use offset to set origin to the center of the image
            offsetX={0}
            // offsetY={img ? img.height / 2 : 0}
            offsetY={0}
        />
    );
};




export default function Tools() {
    const dragUrl = useRef();
    const stageRef = useRef();
    const [icons, setIcons] = React.useState([]);

    const [images, setImages] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [input, setInput] = useState([]);
    const [template, setTemplate] = useState(0);



    const handleDragStart = (e) => {
        setShapes(
            shapes.map((shape) => {
                return {
                    ...shape,
                    isDragging: shape.id === e.target.id(),
                };
            })
        );
    };


    const handleDragEnd = (e) => {
        setShapes(
            shapes.map((shape) => {
                return {
                    ...shape,
                    isDragging: false,
                };
            })
        );
    };

    const [show, setShow] = useState(false);

    const [editId, setEditId] = useState();

    const handleChange = (value) => {

        setInput(value);
        var temp = shapes;

        for (const i in temp) {

            const element = temp[i];
            if (element.id == editId) {
                element.content = value;
                break;
            }

        }

        setShapes([...temp]);

    }

    return (
        <>
            <Modale show={show} setShow={(value) => { setShow(value); setInput(""); }} text={input} setText={handleChange} editId={editId} />

            <div style={{ backgroundImage: `url(${Mockup})`, backgroundSize: 270, position: "absolute", top: 114, left: 50, width: 270, height: 550, backgroundRepeat: "no-repeat" }} />

            <div style={{ backgroundImage: `url(${beach})`, position: "absolute", top: 150, left: 70, width: 230, height: 484, backgroundRepeat: "no-repeat", opacity: template === 1 ? 1 : 0 }} />
            <div style={{ backgroundImage: `url(${sky})`, position: "absolute", top: 150, left: 70, width: 230, height: 484, backgroundRepeat: "no-repeat", opacity: template === 2 ? 1 : 0 }} />
            {/* <div style={{ backgroundImage: `url(${sky})`, backgroundSize: 200, position: "absolute", top: 200, left: 80, width: 270, height: 550, backgroundRepeat: "no-repeat", opacity: template === 2 ? 1 : 0 }} /> */}



            <div style={{ backgroundColor: "#344073", marginTop: 20 }}>
                <div>
                    {/* The icons to spawn when drag to canvas */}
                    <h2 style={{ position: "absolute", top: 380, right: 493, color: "#fff" }} >Icons</h2>
                    {/* First icon */}
                    <img
                        style={{ position: "absolute", top: 430, right: 500 }}
                        alt="facebook"
                        src="https://www.flaticon.com/svg/static/icons/svg/1384/1384005.svg"
                        height="50"
                        width="50"
                        draggable
                        onDragStart={(e) => {
                            dragUrl.current = e.target.src;
                        }}
                    />
                    <div
                        onDrop={(e) => {
                            e.preventDefault();
                            // register event position
                            stageRef.current.setPointersPositions(e);
                            // add image
                            setIcons(
                                icons.concat([
                                    {
                                        ...stageRef.current.getPointerPosition(),
                                        src: dragUrl.current,
                                    },
                                ])
                            );
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        draggable
                        height="50"
                        width="50"
                    >
                        {/* Second icon */}
                        <img
                            style={{ position: "absolute", top: 430, right: 410 }}
                            alt="music"
                            src="https://freepngimg.com/thumb/musical_notes/5-2-musical-notes-picture.png"
                            height="50"
                            width="50"
                            draggable
                            onDragStart={(e) => {
                                dragUrl.current = e.target.src;
                            }}
                        />
                        <div
                            onDrop={(e) => {
                                e.preventDefault();
                                // register event position
                                stageRef.current.setPointersPositions(e);
                                // add image
                                setIcons(
                                    icons.concat([
                                        {
                                            ...stageRef.current.getPointerPosition(),
                                            src: dragUrl.current,
                                        },
                                    ])
                                );
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            draggable
                            height="150"
                            width="150"
                        ></div>
                        {/* Third icon */}
                        <img
                            style={{ position: "absolute", top: 430, right: 310 }}
                            alt="3 lines"
                            src="https://www.flaticon.com/svg/static/icons/svg/50/50772.svg"
                            height="50"
                            width="50"
                            draggable
                            onDragStart={(e) => {
                                dragUrl.current = e.target.src;
                            }}
                        />
                        <div
                            onDrop={(e) => {
                                e.preventDefault();
                                // register event position
                                stageRef.current.setPointersPositions(e);
                                // add image
                                setIcons(
                                    icons.concat([
                                        {
                                            ...stageRef.current.getPointerPosition(),
                                            src: dragUrl.current,
                                        },
                                    ])
                                );
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            draggable
                            height="150"
                            width="150"
                        ></div>
                        {/* Fourth icon */}
                        <img
                            style={{ position: "absolute", top: 430, right: 210 }}
                            alt="apple"
                            src="https://www.flaticon.com/svg/static/icons/svg/1532/1532495.svg"
                            height="50"
                            width="50"
                            draggable
                            onDragStart={(e) => {
                                dragUrl.current = e.target.src;
                            }}
                        />
                        <div
                            onDrop={(e) => {
                                e.preventDefault();
                                // register event position
                                stageRef.current.setPointersPositions(e);
                                // add image
                                setIcons(
                                    icons.concat([
                                        {
                                            ...stageRef.current.getPointerPosition(),
                                            src: dragUrl.current,
                                        },
                                    ])
                                );
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            draggable
                            height="150"
                            width="150"
                        ></div>





                        {/* <div style={{ backgroundColor: "#344073", marginTop: 70, display: "flex", flexDirection: "row" }}> */}


                        <Stage className="test" ref={stageRef} width={232} height={485} style={
                            {
                                zIndex: 3000,
                                border: "2px solid red",
                                marginLeft: 67,
                                marginTop: 148,
                                width: 236,
                                height: 490
                            }}>




                            <Layer >
                                {/* in this layer we spawn the buttons and texts */}

                                {shapes.map(shape => (
                                    <>
                                        {
                                            (shape.type === "rect") &&
                                            <Group
                                                onDblClick={() => { setInput(shape.content); setEditId(shape.id); setShow(true) }}
                                                draggable
                                                onDragStart={handleDragStart}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <Rect
                                                    style={{ position: "absolute" }}
                                                    key={shape.id}
                                                    id={shape.id}
                                                    x={shape.x}
                                                    y={shape.y}
                                                    width={shape.width}
                                                    height={shape.height}
                                                    fill={shape.fill}
                                                    shadowBlur={2}
                                                    scaleX={shape.isDragging ? 1.2 : 1}
                                                    scaleY={shape.isDragging ? 1.2 : 1}


                                                />
                                                <Text align="center" text={shape.content} fontSize={18} fill={'black'} x={shape.x} y={shape.y + 6} width={shape.width} height={shape.height} ></Text>

                                            </Group>

                                        }

                                    </>

                                ))}

                            </Layer>


                            <Layer>
                                {icons.map((icon) => {
                                    return <IconURL1 image={icon} />;
                                })}
                            </Layer>

                        </Stage>

                    </div>
                </div>
            </div>

            {/* Add simple buttons */}
            <h2 style={{ position: "absolute", top: 120, right: 450, color: "white" }} >Buttons</h2>
            <button style={{ position: "absolute", top: 180, right: 430, backgroundColor: "#48cae4", color: "black", paddingRight: 30, paddingLeft: 30, paddingTop: 10, paddingBottom: 10, border: "none", fontSize: 14 }}
                onClick={() => {
                    let temp = shapes;

                    temp.push({
                        id: shortid.generate(),
                        type: "rect",
                        fill: "#48cae4",
                        x: 100,
                        y: 40,
                        width: 100,
                        height: 30,
                        content: "Button"
                    })
                    console.log(shapes.id);
                    setShapes([...temp])
                }} >Add button</button>

            <button style={{ position: "absolute", top: 180, right: 280, backgroundColor: "#fc8621", color: "white", paddingRight: 30, paddingLeft: 30, paddingTop: 10, paddingBottom: 10, border: "none", fontSize: 14 }}
                onClick={() => {
                    let temp = shapes;

                    temp.push({
                        id: shortid.generate(),
                        type: "rect",
                        fill: "#fc8621",
                        x: 100,
                        y: 40,
                        width: 100,
                        height: 30,
                        content: "Button"
                    })

                    setShapes([...temp])
                }} >Add button</button>
            <button style={{ position: "absolute", top: 180, right: 130, backgroundColor: "#222831", color: "white", paddingRight: 30, paddingLeft: 30, paddingTop: 10, paddingBottom: 10, border: "none", fontSize: 14 }}
                onClick={() => {
                    let temp = shapes;

                    temp.push({
                        id: shortid.generate(),
                        type: "rect",
                        fill: "#222831",
                        x: 100,
                        y: 40,
                        width: 100,
                        height: 30,
                        content: "Button"
                    })

                    setShapes([...temp])
                }} >Add button</button>


            {/* Notes */}
            <Portal>
                <Layer style={{ position: "absolute", top: 120, left: 360, color: "BLACK" }}>
                    <Text>THIS APP IS UNDER DEVELOPEMENT</Text>
                </Layer>
                <Layer style={{ position: "absolute", top: 160, left: 360, color: "#bdbdbd" }}>
                    <Text><i>*Note that you can drag the buttons<br></br> to move them in the canvas</i></Text>
                </Layer>
                <Layer style={{ position: "absolute", top: 230, left: 360, color: "#bdbdbd" }}>
                    <Text><i>*Double click on the button to change it's inner text</i></Text>
                </Layer>
                <Layer style={{ position: "absolute", top: 275, left: 360, color: "#bdbdbd" }}>
                    <Text><i>*You can choose one of our templates<br></br> then edit them as you want</i></Text>
                </Layer>
                <Layer style={{ position: "absolute", top: 350, left: 360, color: "#bdbdbd" }}>
                    <Text><i>*You can drag the icon to the canvas</i></Text>
                </Layer>
            </Portal>



            {/* Templates */}
            <h2 style={{ position: "absolute", top: 250, right: 420, color: "#fff" }} >Templates</h2>

            <button style={{ position: "absolute", top: 310, right: 430, backgroundColor: "#aee6e6", color: "black", paddingRight: 30, paddingLeft: 30, paddingTop: 10, paddingBottom: 10, border: "none", fontSize: 14 }}
                onClick={() => {
                    let temp = [];

                    setTemplate(1)

                    temp.push({
                        id: shortid.generate(),
                        type: "rect",
                        fill: "#e05297",
                        x: 70,
                        y: 250,
                        width: 100,
                        height: 30,
                        content: 'Login'
                    })
                    temp.push({
                        id: shortid.generate(),
                        type: "rect",
                        fill: "#fecd1a",
                        x: 70,
                        y: 200,
                        width: 100,
                        height: 30,
                        content: 'Sign Up'
                    })

                    setShapes([...temp])
                }}
            >Home page</button>

            <button style={{ position: "absolute", top: 310, right: 300, backgroundColor: "#aee6e6", color: "black", paddingRight: 30, paddingLeft: 30, paddingTop: 10, paddingBottom: 10, border: "none", fontSize: 14 }}
                onClick={() => {
                    let temp = [];
                    // let template2 = null;

                    setTemplate(2)

                    temp.push({
                        id: shortid.generate(),
                        type: "rect",
                        fill: "#ec524b",
                        x: 35,
                        y: 150,
                        width: 170,
                        height: 30,
                        content: 'Home'
                    })
                    temp.push({
                        id: shortid.generate(),
                        type: "rect",
                        fill: "#f5b461",
                        x: 35,
                        y: 200,
                        width: 170,
                        height: 30,
                        content: 'Profile'
                    })
                    temp.push({
                        id: shortid.generate(),
                        type: "rect",
                        fill: "#f3eac2",
                        x: 35,
                        y: 250,
                        width: 170,
                        height: 30,
                        content: 'App'
                    })

                    setShapes([...temp])
                }}
            >Menu</button>





        </>
    )
}

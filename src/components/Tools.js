import React, { useRef, useState } from 'react'
import { Stage, Layer, Rect, Text, Circle, Line, Image, Shape, Group } from 'react-konva';
import ReactDOM from 'react-dom';
import Portal from './Portal.js';
import useImage from 'use-image';
import Modale from './Modale'
import Mockup from '../medias/iphone.png'
import beach from '../medias/beach.jpeg'
import sky from '../medias/sky.jpg'
import shortid from "shortid";


const URLImage = ({ image }) => {
    const [img] = useImage(image.src);
    return (
        <Image
            image={img}
            x={image.x}
            y={image.y}
            // I will use offset to set origin to the center of the image
            offsetX={img ? img.width / 2 : 0}
            offsetY={img ? img.height / 2 : 0}
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


            {/* The icons to spawn when drag to canvas */}
            <img
                alt="lion"
                src="https://konvajs.org/assets/lion.png"
                draggable="true"
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
                    setImages(
                        images.concat([
                            {
                                ...stageRef.current.getPointerPosition(),
                                src: dragUrl.current,
                            },
                        ])
                    );
                }}
                onDragOver={(e) => e.preventDefault()}
            >





                <div style={{ backgroundColor: "#344073", marginTop: 70, display: "flex", flexDirection: "row" }}>


                    <Stage className="test" ref={stageRef} width={232} height={485} style={
                        {
                            zIndex: 3000,
                            border: "2px solid red",
                            marginLeft: 67,
                            marginTop: 78,
                            width: 232,
                            height: 485
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



                    </Stage>

                </div>
            </div>

            {/* Add simple buttons */}
            <button style={{ position: "absolute", top: 180, right: 300, backgroundColor: "#48cae4", color: "black", paddingRight: 30, paddingLeft: 30, paddingTop: 10, paddingBottom: 10, border: "none", fontSize: 14 }}
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

            <button style={{ position: "absolute", top: 180, right: 150, backgroundColor: "red", color: "white", paddingRight: 30, paddingLeft: 30, paddingTop: 10, paddingBottom: 10, border: "none", fontSize: 14 }}
                onClick={() => {
                    let temp = shapes;

                    temp.push({
                        id: shortid.generate(),
                        type: "rect",
                        fill: "red",
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
                <Layer style={{ position: "absolute", top: 200, left: 400, color: "black" }}>
                    <Text>*Note that you can drag the buttons to move them in the canvas</Text>
                </Layer>
                <Layer style={{ position: "absolute", top: 300, left: 400 }}>
                    <Text>*Double click on the button to change it's inner text</Text>
                </Layer>
                <Layer style={{ position: "absolute", top: 400, left: 400 }}>
                    <Text>*You can choose one of our templates then edit them as you want</Text>
                </Layer>
                <Layer style={{ position: "absolute", top: 450, left: 400 }}>
                    <Text>*You can drag the icon to the canvas</Text>
                </Layer>
            </Portal>



            {/* Templates */}
            <h2 style={{ position: "absolute", top: 250, right: 500, color: "black" }} >Templates</h2>

            <button style={{ position: "absolute", top: 320, right: 470, backgroundColor: "yellow", color: "black", paddingRight: 30, paddingLeft: 30, paddingTop: 10, paddingBottom: 10, border: "none", fontSize: 14 }}
                onClick={() => {
                    let temp = [];

                    setTemplate(1)

                    temp.push({
                        id: shortid.generate(),
                        type: "rect",
                        fill: "yellow",
                        x: 70,
                        y: 350,
                        width: 100,
                        height: 30,
                        content: 'Login'
                    })

                    setShapes([...temp])
                }}
            >Template 1</button>

            <button style={{ position: "absolute", top: 320, right: 330, backgroundColor: "yellow", color: "black", paddingRight: 30, paddingLeft: 30, paddingTop: 10, paddingBottom: 10, border: "none", fontSize: 14 }}
                onClick={() => {
                    let temp = [];
                    // let template2 = null;

                    setTemplate(2)

                    temp.push({
                        id: shortid.generate(),
                        type: "rect",
                        fill: "yellow",
                        x: 70,
                        y: 250,
                        width: 100,
                        height: 30,
                        content: 'Login'
                    })

                    setShapes([...temp])
                }}
            >Template 2</button>





        </>
    )
}

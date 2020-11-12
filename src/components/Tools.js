import React, { useRef, useState } from 'react'
import { Stage, Layer, Rect, Text, Circle, Line, Image, Shape } from 'react-konva';
import ReactDOM from 'react-dom';
import Portal from './Portal.js';
import useImage from 'use-image';
import Mockup from '../medias/iphone.png'
import fakeButton from '../medias/test.jpg'



const URLImage = ({ image }) => {
    const [img] = useImage(image.src);
    return (
        <Image
            image={img}
            x={image.x}
            y={image.y}
            draggable
            // I will use offset to set origin to the center of the image
            offsetX={img ? img.width / 2 : 0}
            offsetY={img ? img.height / 2 : 0}
        />
    );
};

export default function Tools() {
    const dragUrl = useRef();
    const stageRef = useRef();
    const [images, setImages] = useState([]);
    const [shapes, setShapes] = useState([{
        id: 0,
        type: "rect",
        fill: "#d62828",
        x: 800,
        y: 50,
        width: 200,
        height: 50
    }, {
        id: 1,
        type: "rect",
        fill: "purple",
        fill: "#fca311",
        x: 800,
        y: 130,
        width: 200,
        height: 50
    }, {
        id: 2,
        type: "rect",
        fill: "blue",
        fill: "#48cae4",
        x: 800,
        y: 250,
        width: 200,
        height: 50
    }
    ]);



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

    const [image] = useImage('https://i.pinimg.com/originals/54/b9/72/54b972c504b660f6e7905ff1242245c9.png');


    return (
        <>
            <div style={{ backgroundImage: `url(${Mockup})`, backgroundSize: 270, position: "absolute", top: 100, left: 50, width: 270, height: 550, backgroundRepeat: "no-repeat" }} />

            <div style={{ backgroundColor: "#344073", marginTop: 70, display: "flex", flexDirection: "row" }}>
                <div
                    style={{ backgroundImage: `url(${fakeButton})`, position: "fixed", top: 50, zIndex: 30000, height: "100%", width: "100%", backgroundRepeat: "no-repeat" }}

                    draggable
                    onDragOver={e => e.preventDefault()}
                    onDragStart={e => {
                        dragUrl.current = e.target.src;
                    }}
                ></div>
                <button style={{ backgroundImage: `url(${fakeButton})` }} onClick={console.log("okayyyyyyyyyyyy")}>test</button>

                <div
                    onDrop={e => {
                        // register event position
                        stageRef.current.setPointersPositions(e);
                        // add image
                        setImages(
                            images.concat([
                                {
                                    ...stageRef.current.getPointerPosition(),
                                    src: dragUrl.current
                                }
                            ])
                        );
                    }}
                    onDragOver={e => e.preventDefault()}
                >

                    <Stage className="test" ref={stageRef} width={232} height={485} style={
                        {
                            zIndex: 3000,
                            border: "2px solid red",
                            marginLeft: 67,
                            marginTop: -78,
                            width: 232,
                            height: 485
                        }}>

                        <Layer style={{ marginLeft: 490 }}>
                            {images.map(image => {
                                return <URLImage image={image} />;
                            })}
                        </Layer>
                        <Layer>
                            <Rect
                                x={200}
                                y={80}
                                width={40}
                                height={60}
                                fill={"red"}
                                draggable
                                onDragStart={e => {
                                    dragUrl.current = e.target.src;
                                }}
                            />
                        </Layer>
                    </Stage>

                    <button onClick={() => {
                        let temp = shapes;

                        temp.push({
                            id: shapes.length + 1,
                            type: "rect",
                            fill: "#48cae4",
                            x: 300,
                            y: 80,
                            width: 200,
                            height: 50
                        })

                        setShapes([...temp])

                    }} >Add button</button>
                </div>
            </div>


            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
                <div style={{ backgroundColor: "#344073", display: "flex", flexDirection: "row", marginTop: 70 }}>
                    <button onClick={() => {
                        let temp = shapes;

                        temp.push({
                            id: shapes.length + 1,
                            type: "rect",
                            fill: "blue",
                            fill: "#48cae4",
                            x: 80,
                            y: 80,
                            width: 200,
                            height: 50
                        })

                        setShapes([...temp])

                    }} >tttt</button>


                    <Stage width={window.innerWidth} height={window.innerHeight} style={{ zIndex: 200, border: "16px solid green" }}>

                        <Layer>
                            <Image
                                x={60}
                                y={15}
                                width={window.innerHeight / 1.7}
                                height={window.innerHeight / 1.16}
                                image={image}
                            />
                        </Layer>
                        <Layer>
                            <Rect
                                x={80}
                                y={80}
                                width={40}
                                height={60}
                                fill={"green"}
                                draggable
                                onDragStart={e => {
                                    dragUrl.current = e.target.src;
                                }}
                            />
                        </Layer>
                        <Layer>
                            {shapes.map(shape => (
                                <>
                                    {
                                        (shape.type === "rect") && <Rect
                                            key={shape.id}
                                            id={shape.id}
                                            x={shape.x}
                                            y={shape.y}
                                            width={shape.width}
                                            height={shape.height}
                                            fill={shape.fill}
                                            shadowBlur={10}
                                            draggable
                                            scaleX={shape.isDragging ? 1.2 : 1}
                                            scaleY={shape.isDragging ? 1.2 : 1}
                                            onDragStart={handleDragStart}
                                            onDragEnd={handleDragEnd}

                                        />
                                    }

                                    {
                                        (shape.type === "circle") && <Circle
                                            key={shape.id}
                                            id={shape.id}
                                            x={100}
                                            y={100}
                                            radius={50}
                                            fill={shape.fill}
                                            stroke="yellow"
                                            strokeWidth={4}
                                            shadowOffset="20"
                                            shadowBlur="10"
                                            draggable
                                            scaleX={shape.isDragging ? 1.2 : 1}
                                            scaleY={shape.isDragging ? 1.2 : 1}
                                            onDragStart={handleDragStart}
                                            onDragEnd={handleDragEnd}
                                        />
                                    }
                                </>
                            ))}
                        </Layer>
                    </Stage>


                </div>
            </div>
        </>
    )
}

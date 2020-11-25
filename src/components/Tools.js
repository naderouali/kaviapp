import React, { useRef, useState } from 'react'
import { Stage, Layer, Rect, Text, Circle, Line, Image, Shape, Group } from 'react-konva';
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
    const [shapes, setShapes] = useState([]);
    const [input, setInput] = useState([]);

    const onChangeInput = (e) => {
        setInput(e.target.value);
        //console.log(e.target.value);
    };




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

            <div style={{ backgroundImage: `url(${Mockup})`, backgroundSize: 270, position: "absolute", top: 114, left: 50, width: 270, height: 550, backgroundRepeat: "no-repeat" }} />

            <div style={{ backgroundColor: "#344073", marginTop: 70, display: "flex", flexDirection: "row" }}>
                {/* <div
                    style={{ backgroundImage: `url(${fakeButton})`, position: "fixed", top: 50, zIndex: 30000, height: "100px", width: "100px", backgroundRepeat: "repeat" }}

                    draggable
                    onDragOver={e => e.preventDefault()}
                    onDragStart={e => {
                        dragUrl.current = e.target.src;
                    }}
                ></div> */}

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
                                        <Group draggable>
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
                                                onDragStart={handleDragStart}
                                                onDragEnd={handleDragEnd}
                                            />
                                            <Text text={shape.content} fontSize={18} fill={'black'} x={shape.x + 6} y={shape.y + 6} width={shape.width} height={shape.height}></Text>

                                        </Group>

                                    }

                                </>

                            ))}

                        </Layer>

                        <Layer >

                            <Group draggable style={{ position: "absolute" }} zIndex={50000} >

                                <Rect style={{ position: "absolute" }} fill={"yellow"} width={50} height={50} zIndex={50000} />
                                <Text text={'slm'} fontSize={20} />



                            </Group>
                        </Layer>


                        {/* layer of the input text of the button */}
                        <Layer >
                            <Portal>
                                <input
                                    onChange={onChangeInput}
                                    style={{
                                        position: 'absolute',
                                        top: 180,
                                        right: 450,
                                        width: '160px',
                                        height: 30,
                                        backgroundColor: 'white',
                                        textDecoration: 'none',
                                        border: 'none'
                                    }}
                                    placeholder="your button text here.."
                                />
                            </Portal>
                        </Layer>
                    </Stage>

                    <button style={{ position: "absolute", top: 180, right: 300, backgroundColor: "#48cae4", color: "white", paddingRight: 30, paddingLeft: 30, paddingTop: 10, paddingBottom: 10, border: "none", fontSize: 14 }}
                        onClick={() => {
                            let temp = shapes;

                            temp.push({
                                id: shapes.length + 1,
                                type: "rect",
                                fill: "#48cae4",
                                x: 100,
                                y: 40,
                                width: 100,
                                height: 30,
                                content: input
                            })

                            setShapes([...temp])
                        }} >Add button</button>

                    <button style={{ position: "absolute", top: 180, right: 150, backgroundColor: "red", color: "white", paddingRight: 30, paddingLeft: 30, paddingTop: 10, paddingBottom: 10, border: "none", fontSize: 14 }}
                        onClick={() => {
                            let temp = shapes;

                            temp.push({
                                id: shapes.length + 1,
                                type: "rect",
                                fill: "red",
                                x: 100,
                                y: 40,
                                width: 100,
                                height: 30,
                                content: input
                            })

                            setShapes([...temp])
                        }} >Add button</button>
                </div>
            </div>

        </>
    )
}

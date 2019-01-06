import React from "react";

export interface BlockProps {

}

export interface BlockState {

}

class Block extends React.Component<BlockProps, BlockState> {
    public state = {};
    public render() {
        return (
            <h1>hi</h1>
        );
    }
}

export default Block;

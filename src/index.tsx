import * as React from "react";
import {CursorAdapter, CursorDescription, Cursor, RoomMember} from "white-web-sdk";
import "./index.less";

export type CursorStyleType = {
    iconUrl: string;
    iconStyle?: React.CSSProperties;
    iconDescription?: CursorDescription;
};
export class CursorIcon implements CursorAdapter {
    private cursor: CursorStyleType;
    public constructor(cursor: CursorStyleType) {
        this.cursor = cursor;
    }
    
    private readonly cursors: {[memberId: number]: Cursor} = {};

    public createCursor(): CursorDescription {
        if (this.cursor.iconDescription) {
            return this.cursor.iconDescription;
        } else {
            return {x: 16, y: 16, width: 32, height: 32};
        }
    }

    public onAddedCursor(cursor: Cursor): void {
        cursor.setReactNode((
            <img
                style={this.cursor.iconStyle ?
                this.cursor.iconStyle :
                {width: 32, height:32, borderRadius: "50%"}}
                src={this.cursor.iconUrl}/>
        ));
        this.cursors[cursor.memberId] = cursor;
    }
    public onRemovedCursor(cursor: Cursor): void {
        delete this.cursors[cursor.memberId];
    }
}

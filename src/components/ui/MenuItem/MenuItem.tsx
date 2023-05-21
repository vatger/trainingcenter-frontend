import { joinClassNames } from "../../../utils/helper/ClassNameHelper";
import React, { useContext } from "react";
import { MENU_ITEM_HEIGHT } from "../../../assets/theme.config";
import { MenuItemProps } from "./MenuItem.props";
import { Link } from "react-router-dom";
import { RenderIf } from "../../conditionals/RenderIf";
import authContext from "../../../utils/contexts/AuthContext";

const menuItemActiveClass = `menu-item-active`;
const menuItemHoverClass = `menu-item-hoverable`;
const disabledClass = "menu-item-disabled";

export function MenuItem(props: MenuItemProps) {
    const { userPermissions } = useContext(authContext);

    const classes = joinClassNames(
        "menu-item",
        `menu-item-transparent`,
        props.active ? menuItemActiveClass : "",
        props.disabled ? disabledClass : menuItemHoverClass,
        props.className ?? ""
    );

    return (
        <RenderIf
            truthValue={props.requiredPerm == null || userPermissions.indexOf(props.requiredPerm?.toUpperCase()) != -1}
            elementTrue={
                <RenderIf
                    truthValue={props.isNoLink ?? false}
                    elementTrue={
                        <div onClick={e => props.onClick?.(e)} className={classes} style={{ height: MENU_ITEM_HEIGHT }}>
                            <div className="h-full w-full flex flex-row items-center overflow-hidden">
                                <span className="text-2xl mr-2">{props.icon ?? null}</span>
                                <span>{props.children}</span>

                                {props.icon_suffix != null && <span className="text-2xl ml-auto">{props.icon_suffix ?? null}</span>}
                            </div>
                        </div>
                    }
                    elementFalse={
                        <Link onClick={e => props.onClick?.(e)} to={props.href ?? ""}>
                            <div className={classes} style={{ height: MENU_ITEM_HEIGHT }}>
                                <div className="h-full w-full flex flex-row items-center overflow-hidden">
                                    <span className="text-2xl mr-2">{props.icon ?? null}</span>
                                    <span>{props.children}</span>

                                    {props.icon_suffix != null && <span className="text-2xl ml-auto">{props.icon_suffix ?? null}</span>}
                                </div>
                            </div>
                        </Link>
                    }
                />
            }
        />
    );
}

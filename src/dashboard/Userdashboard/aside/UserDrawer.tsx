import { Link } from "react-router";
import {userDrawerData  } from "./drawerData";

export const UserDrawer = () => {
    return (
        <div>
            <h2 className="text-xl font-bold  bg-gray-700 text-teal-500 p-4 border-b-2 border-gray-900">
                Cake Éclair🎂
            </h2>

            <ul>
                {userDrawerData.map((item) => {
                    const Icon = item.icon; // 👈 ICON COMPONENT

                    return (
                        <li key={item.id}>
                            <Link
                                to={item.link}
                                className="flex items-center space-x-3 border-b-2 border-transparent 
                                           hover:border-blue-700 text-white hover:bg-gray-900 p-4"
                            >
                                {/* 👇 ICON */}
                                <Icon className="w-6 h-6" />

                                {/* 👇 NAME */}
                                <span className="text-lg">{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

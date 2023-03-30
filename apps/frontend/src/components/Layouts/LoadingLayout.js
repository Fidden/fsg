import {PuffLoader} from "react-spinners";
import MainLayout from "@/components/Layouts/MainLayout";
import React from "react";

export default function LoadingLayout() {
    return (
        <MainLayout className="flex justify-center items-center mt-[20%]"><PuffLoader color="#ff6534"/></MainLayout>
    );
}

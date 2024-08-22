"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Robot from "../assets/robot.png";

import { Button } from "@/components/ui/button";
import Work from "../assets/work.png";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CourseworkCard from "@/components/CourseworkCard";
import { useEffect, useState } from "react";
import { useFileStore } from "@/hooks/useFileStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUpload from "@/components/FileUpload";

export default function PlaceholderContent() {
  const { files, addFile, removeFile, clearFiles } = useFileStore();

  useEffect(() => {
    // Cleanup object URLs when component unmounts or files change
    return () => {
      files.forEach((file) => {
        if (file.dataUrl) {
          URL.revokeObjectURL(file.dataUrl);
        }
      });
    };
  }, [files]);

  const handleFileSelect = (file: File) => {
    // Handle the selected file, e.g., upload to server
    console.log("Selected file:", file);
  };

  const handleRemove = (fileName: string) => {
    removeFile(fileName);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-100">
      <div className="flex flex-col lg:flex-row  justify-between">
        <div className="lg:w-7/12 xl:w-2/3">
          <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-6">
            Hey IB Folks! Unsure about the quality of your answers?{" "}
            <span className="text-[#6947BF]">We get you.</span>
          </h1>
          <Card className="bg-slate-100">
            <CardContent className="p-4 sm:p-6">
              <div className=" rounded-lg p-4">
                <FileUpload onFileSelect={handleFileSelect} />
              </div>
              <div className="mt-6">
                <p className="font-medium text-slate-500 mb-2">
                  Select Course and Subjects *
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Select>
                    <SelectTrigger className="w-full sm:w-[180px] rounded-full border-none bg-white">
                      <SelectValue placeholder="Select Coursework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-full sm:w-[180px] rounded-full border-none bg-white">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-6">
                <p className="font-medium text-slate-500 mb-2">
                  Enter your essay title * (Required)
                </p>
                <Input
                  placeholder="How nation works..."
                  className="rounded-full w-full sm:w-[300px]"
                />
              </div>
              <Button className="mt-6 rounded-full font-semibold bg-slate-300 text-white w-full sm:w-auto">
                Evaluate Your Score
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:w-5/12 xl:w-1/3 lg:flex flex-col items-center hidden justify-center mt-8 lg:mt-0">
          <Image src={Robot} alt="Robot" width={270} height={160} />
          <Image src={Work} alt="Work" width={300} height={190} />
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl text-slate-400 font-semibold mb-4">
          CourseWorks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {files.length < 1 && <div>No Course work found</div>}
          {files.map((file, index) => {
            return (
              <div key={index}>
                <CourseworkCard pdfUrl={file.dataUrl} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl text-slate-400 font-semibold mb-4">
          Explore Course works
        </h2>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="iaexample">IA Example</TabsTrigger>
            <TabsTrigger value="ieexample">IE Example</TabsTrigger>
            <TabsTrigger value="3">IA Example</TabsTrigger>
            <TabsTrigger value="4">IE Example</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {files.map((file, index) => {
                return (
                  <div key={index}>
                    <CourseworkCard pdfUrl={file.dataUrl} />
                  </div>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

"use server";
import { NextResponse } from "next/server";
export async function GET() {
    try{
        return NextResponse.json({text:"ABC"},{status :200});
    }catch(Err){
        console.log(Err);
        return NextResponse.json({error:"ABC"},{status :500});

    }
}
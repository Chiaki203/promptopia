import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Prompt from '@/models/prompt';

export const GET = async(req: NextRequest) => {
  try {
    await connectToDB()
    const prompts = await Prompt.find({}).populate('creator')
    console.log('api get prompts', prompts)
    return NextResponse.json(prompts, {status:200})
  } catch (error) {
    return new Response(`Failed to fetch prompts : ${error}`, {status: 500})
  }
}
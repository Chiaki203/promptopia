import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Prompt from '@/models/prompt';

type Props = {
  params: {
    id: string
  }
}

export const GET = async(req:NextRequest, {params}:Props) => {
  try {
    console.log('api route params userId', params)
    await connectToDB()
    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator')
    console.log('api get user prompts', prompts)
    return NextResponse.json(prompts, {status:200})
  } catch (error) {
    return new Response(`Failed to fetch user prompts: ${error}`, {status: 500})
  }
}
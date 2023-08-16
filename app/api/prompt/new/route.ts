import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/utils/database'
import Prompt from '@/models/prompt'

export const POST = async(req:NextRequest) => {
  const {userId, prompt, tag} = await req.json()
  try {
    await connectToDB()
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })
    console.log('api POST newPrompt', newPrompt)
    await newPrompt.save()
    return NextResponse.json(newPrompt, {status:201})
  } catch (error) {
    return new Response('Failed to create a new prompt', {status: 500})
  }
}
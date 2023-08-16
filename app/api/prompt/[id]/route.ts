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
    console.log('api route params', params)
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate('creator')
    if (!prompt) return NextResponse.json({error: 'Prompt not found'}, {status: 404})
    console.log('api get prompt', prompt)
    return NextResponse.json(prompt, {status:200})
  } catch (error) {
    return NextResponse.json({error: `Failed to fetch prompt: ${error}`}, {status: 500})
  }
}

export const PATCH = async(req:NextRequest, {params}:Props) => {
  const {prompt, tag} = await req.json()
  try {
    console.log('api route params', params)
    console.log('api patch prompt, tag', prompt, tag)
    await connectToDB()
    const existingPrompt = await Prompt.findById(params.id)
    console.log('api patch existingPrompt', existingPrompt)
    if (!existingPrompt) return NextResponse.json({error: 'Prompt not found'}, {status: 404})
    existingPrompt.prompt = prompt
    existingPrompt.tag = tag
    await existingPrompt.save()
    console.log('api patch existingPrompt changed', existingPrompt)
    return NextResponse.json(existingPrompt, {status:200})
  } catch (error) {
    return NextResponse.json({error: `Failed to update prompt: ${error}`}, {status:500})
  }
}

export const DELETE = async(req:NextRequest, {params}:Props) => {
  try {
    await connectToDB()
    await Prompt.findByIdAndDelete(params.id)
    return NextResponse.json({message: 'Prompt deleted successfully'}, {status: 200})
  } catch (error) {
    return NextResponse.json({error: `Failed to delete prompt: ${error}`}, {status: 500})
  }
}
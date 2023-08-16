'use client'

import {useState, FormEvent} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'

import Form from '@/components/Form'

const CreatePrompt = () => {
  const {data:session}:any = useSession()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })
  const createPrompt = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('created!')
    setSubmitting(true)
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id
        })
      })
      console.log('create prompt response', response)
      if (response.ok) {
        router.push('/')
      }
    } catch(error) {
      console.log('Error creating prompt', error)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
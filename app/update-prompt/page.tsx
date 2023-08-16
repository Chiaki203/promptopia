'use client'

import {useState, useEffect, FormEvent} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'

import Form from '@/components/Form'

const UpdatePrompt = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })
  const updatePrompt = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    if (!promptId) return alert('Prompt ID not found')
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      console.log('update prompt response', response)
      if (response.ok) {
        router.push('/profile')
      }
    } catch (error) {
      console.log('Error updating prompt', error)
    } finally {
      setSubmitting(false)
    }
  }
  useEffect(() => {
    const getPromptDetails = async() => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()
      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }
    if (promptId) getPromptDetails()
  }, [promptId])
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt